/*
 * @file: configureStore.js
 * @description: configure redux store
 * @date: 14.12.2017
 * @author: Ankush Rishi
 * */

if (process.env.NODE_ENV === 'production') {
  module.exports = require('./configureStore.dev');
} else {
  module.exports = require('./configureStore.prod');
}