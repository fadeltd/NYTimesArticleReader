/**
 * Helper class for strings manipulation
 */
export default class Strings {
  static toTitleCase(text) {
    return text.replace(/\w\S*/g, (word) => {
      return word.charAt(0).toUpperCase() + word.substr(1).toLowerCase();
    });
  }
  static getParams(url, params){
    let query = '';
    for(let key in params){
      query += `${key}=${params[key]}&`;
    }
    return `${url}?${query}`;
  }
}
