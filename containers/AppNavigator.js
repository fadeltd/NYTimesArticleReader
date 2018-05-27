import React from 'react';
import {
  createStackNavigator,
  createBottomTabNavigator
} from 'react-navigation';
import { Icon } from 'native-base';

import {
  Article,
  ArticleDetail
} from './article';
import Book from './book';
import { strings } from '../helpers';

const Main = createBottomTabNavigator({
  'article': {
    title: 'Articles',
    screen: Article,
  },
  'book': {
    tiitle: 'Books',
    screen: Book,
  }
}, {
    navigationOptions: ({ navigation }) => ({
      tabBarLabel: `${strings.toTitleCase(navigation.state.routeName)}s`,
      tabBarIcon: ({ focused, tintColor }) => {
        const iconName = navigation.state.routeName === 'article' ?
          'news' :
          'book';
        return <Icon
          type="Entypo"
          name={iconName}
          style={{
            fontSize: 25,
            color: tintColor
          }} />;
      },
    }),
    tabBarOptions: {
      activeTintColor: 'tomato',
      inactiveTintColor: 'silver',
    },
  });

const AppNavigator = createStackNavigator({
  'main': {
    screen: Main,
    navigationOptions: {
      header: null
    }
  },
  'article-detail': {
    screen: ArticleDetail
  }
}, {
    initialRouteName: 'main',
  }
);

export default AppNavigator;