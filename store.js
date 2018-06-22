'use strict';
/* global */

// eslint-disable-next-line no-unused-vars
const store = (function(){
  const addBookmarkToStore = function(bookmark) {
    bookmark.expanded = false;
    this.bookmark.push(bookmark);
  };

//   const findById = function(id) {
//     console.log(id);
//     const array = this.bookmark.find(item => item.id === id);
//     console.log(array);
//   };

  // const findAndToggleChecked = function(id) {
  //   const item = this.findById(id);
  //   item.checked = !item.checked;
  // };

  const findAndDelete = function(id) {
    this.bookmark = this.bookmark.filter(item => item.id !== id);
  };

  // const findAndUpdateName = function(id, name) {
  //   try {
  //     Item.validateName(name);
  //     const item = this.findById(id);
  //     item.name = name;
  //   } catch(e) {
  //     console.log('Cannot update name: ' + e.message);
  //   }
  // };


  const filterBookmarks = function(starVal) {
    console.log(starVal);
    return store.bookmark.filter(bkmk => bkmk.rating >= starVal);
  };

  return {
    bookmark: [],
    filter: 1,

    addBookmarkToStore,
    // findById,
    findAndDelete,
    filterBookmarks,
  };
  
}());
