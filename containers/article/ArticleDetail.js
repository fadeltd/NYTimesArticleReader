/**
 * Webview page to load web url from article list item
 */
import React, { Component } from 'react';
import {
  StyleSheet,
  WebView
} from 'react-native';
import {
  Content,
  Text,
  Spinner,
} from 'native-base';
import { connect } from 'react-redux';

class ArticleDetail extends Component {
  // Top navigation bar
  static navigationOptions = ({ navigation }) => ({
    headerStyle: { backgroundColor: '#F44336' },
    headerTitleStyle: { color: 'white' },
    headerTintColor: 'white',
    title: `${navigation.state.params.headline.main}`,
  });

  // Render loading on page loading
  renderLoading = () => {
    return (<Spinner color="black" />);
  };

  // Render error when page failed to load
  renderError = () => {
    return (
      <Content contentContainerStyle={{
        flexGrow: 1,
        justifyContent: 'center',
        alignItems: 'center',
      }}>
        <Text>Something went wrong when loading the page</Text>
      </Content>
    );
  };

  render() {
    const { params } = this.props.navigation.state;
    return (
      <WebView
        renderLoading={() => this.renderLoading()}
        renderError={() => this.renderError()}
        source={{ uri: params.web_url }}
        startInLoadingState
      />
    );
  }
}

const mapStateToProps = state => {
  return {
    book: state.book
  }
};

export default connect(
  mapStateToProps
)(ArticleDetail);