import React, { Component } from 'react';
import { FlatList } from 'react-native';
import {
  Button,
  Body,
  Container,
  Header,
  Content,
  Icon,
  Input,
  Item,
  List,
  ListItem,
  Picker,
  Spinner,
  Thumbnail,
  Text,
  Toast
} from 'native-base';
import { StackActions } from 'react-navigation';
import { connect } from 'react-redux';
import moment from 'moment';
import { searchArticle } from '../../actions/article';
import { clearError } from '../../actions/popup';
import { HOST_WEB, DEFAULT_IMAGE } from '../../constants/config';
import { strings } from '../../helpers';

class Article extends Component {
  constructor(props) {
    super(props);
    this.state = {
      search: '',
      lastSearch: '',
      isRefreshing: false,
      showToast: false,
      sort: 'newest'
    }
  }

  // Handle search article with parameters
  searchArticle(page) {
    const { isRefreshing, search, sort } = this.state;
    const { data } = this.props;
    if (!data.article.isLoading && !isRefreshing) {
      const loadMore = page !== undefined;
      let callback;
      if (!loadMore) {
        this.setState({ isRefreshing: true, lastSearch: search });
        callback = () => this.setState({ isRefreshing: false });
      }
      const newPage = page ? page : 0;
      this.props.searchArticle(search, sort, newPage, loadMore, callback);
    }
  }

  // Handle on load more
  onLoadMore() {
    const { article } = this.props.data;
    this.searchArticle(article.page + 1);
  }

  // Handle on article list refresh
  onRefresh() {
    this.searchArticle();
  }

  // Handle on clear search bar
  onClearSearch = () => {
    const { lastSearch } = this.state;
    this.setState({ search: '' },
      () => {
        if (lastSearch.length > 0) {
          this.searchArticle()
        }
      });
  }

  // Handle on submit search
  onSubmitSearch = () => {
    const { search } = this.state;
    if (search.length > 0) {
      this.searchArticle();
    }
  }

  // Handle on article item click
  onPressArticle = (item) => {
    const pushAction = StackActions.push({
      routeName: 'article-detail',
      params: item,
    });
    this.props.navigation.dispatch(pushAction);
  }

  // Render each item of article
  renderItem = ({ item }) => {
    const uri = item.multimedia.length > 0 ?
      `${HOST_WEB}/${item.multimedia[0].url}` :
      DEFAULT_IMAGE;
    const relativeTime = moment(item.pub_date).fromNow();
    const description = item.byline ? `${strings.toTitleCase(item.byline.original)} - ${relativeTime}` : `${relativeTime}`;
    return (
      <ListItem button onPress={() => this.onPressArticle(item)}>
        <Thumbnail style={{
          borderRadius: 10,
          backgroundColor: 'black'
        }} source={{ uri: uri }} />
        <Body>
          <Text numberOfLines={2} style={{ fontWeight: '600', fontSize: 14 }}>{item.headline.main}</Text>
          <Text numberOfLines={1} style={{ fontWeight: '300', fontSize: 12 }}>{description}</Text>
          <Text numberOfLines={3} style={{ fontSize: 12 }}>{item.snippet}</Text>
        </Body>
      </ListItem>
    );
  };

  // Render loading on load more
  renderFooter = () => {
    return !this.state.isRefreshing && this.props.data.article.isLoading ? (<Spinner color="black" />) : (null);
  }

  // Show toast for error messages
  showToast(message) {
    Toast.show({
      text: message
    });
  }

  componentDidMount() {
    setTimeout(() => this.searchArticle(), 100);
  }

  componentDidUpdate() {
    const { error } = this.props.data;
    if (error) {
      this.showToast(error);
      clearError();
    }
  }

  render() {
    const { data } = this.props;
    const { article } = data;
    const { items } = article;
    const { isRefreshing, search, sort } = this.state;
    return (
      <Container>
        <Header style={{ backgroundColor: '#F44336' }} searchBar rounded>
          <Item style={{ backgroundColor: 'white' }}>
            <Icon name="ios-search" />
            <Input
              placeholder="Search"
              returnKeyType="search"
              onChangeText={search => this.setState({ search })}
              onSubmitEditing={() => this.onSubmitSearch()}
              value={search}
            />
            {search.length > 0 && (
              <Icon onPress={this.onClearSearch} name="close" />
            )}
          </Item>
          <Picker
            mode="dropdown"
            iosHeader="sort"
            style={{
              width: undefined,
              height: 30,
              marginTop: 8,
              borderRadius: 40,
              backgroundColor: 'white',
            }}
            iosIcon={<Icon name="ios-arrow-down-outline" />}
            selectedValue={sort}
            onValueChange={sort => this.setState({sort}, () => this.searchArticle())}
          >
            <Picker.Item label="Newest" value="newest" />
            <Picker.Item label="Oldest" value="oldest" />
          </Picker>
        </Header>
        <FlatList
          data={items}
          extraData={article}
          keyExtractor={item => item._id}
          onRefresh={() => this.onRefresh()}
          onEndReached={() => this.onLoadMore()}
          onEndReachedThreshold={.1}
          refreshing={isRefreshing}
          renderItem={this.renderItem}
          ListFooterComponent={this.renderFooter}
        />
      </Container>
    );
  }
}

const mapStateToProps = state => {
  return {
    data: state.data
  }
};

const mapDispatchToProps = dispatch => ({
  searchArticle: (search, sort, page, loadMore, callback) =>
    dispatch(searchArticle(search, sort, page, loadMore, callback)),
  clearError: () => dispatch(clearError())
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Article);