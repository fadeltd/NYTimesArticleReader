import React, { Component } from 'react';
import { FlatList } from 'react-native';
import {
  Body,
  Container,
  Header,
  Icon,
  ListItem,
  Picker,
  Spinner,
  Text,
  Toast,
} from 'native-base';
import { connect } from 'react-redux';
import moment from 'moment';
import { listBook } from '../../actions/book';
import { clearError } from '../../actions/popup';

class Book extends Component {
  constructor(props) {
    super(props);
    this.state = {
      list: 'e-book-fiction',
      isRefreshing: false,
      showToast: false,
    }
  }

  // Load list of books by list type (ebook / hardcover)
  listBook(offset) {
    const { list, isRefreshing } = this.state;
    const { data } = this.props;
    if (!data.book.isLoading && !isRefreshing) {
      const loadMore = offset !== undefined;
      let callback;
      if (!loadMore) {
        this.setState({ isRefreshing: true });
        callback = () => this.setState({ isRefreshing: false });
      }
      const offset = offset ? offset : 0;
      this.props.listBook(list, offset, loadMore, callback);
    }
  }

  // Handle load more books
  onLoadMore() {
    const { book } = this.props.data;
    this.listBook(book.offset + 20);
  }

  // Handle on refresh
  onRefresh() {
    this.listBook();
  }

  // Render book items
  renderItem = ({ item }) => {
    return (
      <ListItem>
        <Body>
          <Text numberOfLines={2} style={{ fontWeight: '600', fontSize: 14 }}>{item.book_details[0].title}</Text>
          <Text numberOfLines={1} style={{ fontWeight: '300', fontSize: 12 }}>{`by ${item.book_details[0].author}`}</Text>
        </Body>
      </ListItem>
    );
  };

  // Render loading on load more
  renderFooter = () => {
    return !this.state.isRefreshing && this.props.data.book.isLoading ? (<Spinner color="black" />) : (null);
  }

  // Show toast for errors
  showToast(message) {
    Toast.show({
      text: message
    });
  }

  componentDidMount() {
    setTimeout(() => this.listBook(), 100);
  }

  componentDidUpdate() {
    const { error } = this.props.data;
    if (error) {
      this.showToast(error);
      clearError();
    }
  }

  render() {
    const { book } = this.props.data;
    const { items } = book;
    const { isRefreshing, list } = this.state;
    return (
      <Container>
        <Header style={{ backgroundColor: '#F44336' }}>
          <Picker
            mode="dropdown"
            iosHeader="Book Type"
            style={{
              width: undefined,
              height: 30,
              marginTop: 8,
              borderRadius: 40,
              backgroundColor: 'white',
            }}
            iosIcon={<Icon name="ios-arrow-down-outline" />}
            selectedValue={list}
            onValueChange={list => this.setState({list}, () => this.listBook())}
          >
            <Picker.Item label="E-Book" value="e-book-fiction" />
            <Picker.Item label="Hardcover" value="hardcover-fiction" />
          </Picker>
        </Header>
        <FlatList
          data={items}
          extraData={book}
          keyExtractor={item => item.book_details[0].primary_isbn13}
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
  listBook: (list, offset, loadMore, callback) =>
    dispatch(listBook(list, offset, loadMore, callback)),
  clearError: () => dispatch(clearError())
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Book);