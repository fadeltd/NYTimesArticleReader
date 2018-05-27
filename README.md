# NY Times Article Reader

This is a mobile application built with react-native to consume API from the [New York Times Developer](https://github.com/ngengs/filkom-news-reader_server) and give you latest news and announcement from [Filkom](http://filkom.ub.ac.id).


## Feature
* Search, Sort (Newest & Oldest) **article** based on input character
(http://developer.nytimes.com/article_search_v2.json)
* Show detail of an **article**, from `web_url` field from API response to open
detail article
* Search books based on list (e-book-fiction and hardcover-fiction
(http://developer.nytimes.com/books_api.json)

## Preview
* Android

![Screenshot](/.github/screenshot/screenshot-android-1.png?raw=true)
![Screenshot](/.github/screenshot/screenshot-android-2.png?raw=true)
![Screenshot](/.github/screenshot/screenshot-android-3.png?raw=true)

* iOS

![Screenshot](/.github/screenshot/screenshot-ios-1.png?raw=true)
![Screenshot](/.github/screenshot/screenshot-ios-2.png?raw=true)
![Screenshot](/.github/screenshot/screenshot-ios-3.png?raw=true)

### Build
### iOS
1. Open `NYTimesArticleReader.xcworkspace`
2. Run via XCode or `$ react-native run-ios`

### Android

1. Build the Android project
2. Run via Android Studio or `$ react-native run-android`

## Testing

The project currently contains test for the actions and reducers within `/js/__tests__/`. Mocks are located within `js/__mocks__/` In order to execute these tests, run `$ npm test`.

#### Try this Application
- Clone this [Repo](https://github.com/fadeltd/NYTimesArticleReader)
```
git clone https://github.com/fadeltd/NYTimesArticleReader
cd NYTimesArticleReader
npm install
react-native link
react-native run-android / react-native run-ios
npm test
```

#### Generate Releases APK
- Run command
  ```
  $ ./gradlew clean assembleRelease
  ```
- Your apk will located at `app/build/outputs/apk/release/`

## Author
**Fadel Trivandi Dipantara** (https://github.com/fadeltd)

### License

Released under the MIT License. Check [`LICENSE.md`](LICENSE.md) for more info.