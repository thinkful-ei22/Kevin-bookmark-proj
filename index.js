'use strict';
/*global api, store, bookmarkList*/
/*eslint-env jquery*/

$(document).ready(function() {
  bookmarkList.bindEventListeners();
  bookmarkList.render();
  
  api.getBookmark((items) => {
    items.forEach((item) => store.addBookmarkToStore(item));
    bookmarkList.render();
  });
  
});
  