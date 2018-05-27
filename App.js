import React, { Component } from 'react';
import {
  YellowBox,
  NetInfo
} from 'react-native';
import { Root } from 'native-base';
import {
  createStore,
  applyMiddleware,
  combineReducers,
} from 'redux';
import {
  createNavigationPropConstructor,
  createNavigationReducer,
  createReactNavigationReduxMiddleware,
  initializeListeners,
} from 'react-navigation-redux-helpers';
import thunk from 'redux-thunk';
import { Provider, connect } from 'react-redux';
import { connectionStatus } from './actions/network';
import AppNavigator from './containers';
import { dataReducer } from './reducers';

YellowBox.ignoreWarnings(['Warning: isMounted(...) is deprecated', 'Module RCTImageLoader']);

const navReducer = createNavigationReducer(AppNavigator);
const appReducer = combineReducers({
  nav: navReducer,
  data: dataReducer
});

const middleware = createReactNavigationReduxMiddleware(
  "root",
  state => state.nav,
);
const navigationPropConstructor = createNavigationPropConstructor("root");

class AppWithNavigation extends Component {
  componentDidMount() {
    NetInfo.isConnected.addEventListener('connectionChange', this.handleConnectionChange);
    initializeListeners("root", this.props.nav);
  }

  componentWillUnmount() {
    NetInfo.isConnected.removeEventListener('connectionChange', this.handleConnectionChange);
  }

  handleConnectionChange = (isConnected) => {
    const { dispatch } = this.props;
    dispatch(connectionStatus({ status: isConnected }));
  };

  render() {
    const {
      dispatch,
      nav
    } = this.props;
    const navigation = navigationPropConstructor(
      dispatch,
      nav
    );
    return (<Root>
      <AppNavigator navigation={navigation} />
    </Root>);
  }
}

const mapStateToProps = (state) => ({
  nav: state.nav,
});

const AppWithNavigationState = connect(mapStateToProps)(AppWithNavigation);

const store = createStore(
  appReducer,
  applyMiddleware(middleware, thunk),
);

export default class App extends Component {
  render() {
    return (
      <Provider store={store}>
        <AppWithNavigationState />
      </Provider>
    );
  }
}