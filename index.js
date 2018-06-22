'use strict';
/*global api, store*/
/*eslint-env jquery*/

$(document).ready(function() {
  bindEventListeners();
  render();
  
  api.getBookmark((items) => {
    items.forEach((item) => store.addBookmarkToStore(item));
    render();
  });
  
});
  