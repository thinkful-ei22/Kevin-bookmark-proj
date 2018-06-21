'use strict';
/*eslint-env jquery*/


const api = (function () {
  const BASE_URL = 'https://thinkful-list-api.herokuapp.com/KevinT/bookmarks';
  
  const getBookmark = function(callback){
    console.log('i ran');
    $.getJSON(`${BASE_URL}`, callback);
    // const item = store.items[0];
    // console.log('current name: ' + item.name);
    // store.findAndUpdate(item.id, { name: 'foobar' });
    // console.log('new name: ' + item.name);
  };

  const createBookmark = function (data, callback) {    
    $.ajax({
      url: BASE_URL,
      method: 'POST',
      contentType: 'application/json',
      data: JSON.stringify(data),
      success: callback,
      error: function(err){
        console.log('something went wrong', err);
      }
    });
  };

  //   const deleteBookmark= function(id, updateData, callback) {
  //     console.log(updateData, id);
  //     $.ajax({
  //       url: `${BASE_URL}/items/${id}`,
  //       method: 'DELETE',
  //       contentType: 'application/json',
  //       data: JSON.stringify(updateData),
  //       success: callback,
  //     });
  //   };



  return {
    getBookmark,
    createBookmark,
    // deleteBookmark,
  };
}());



// const getItems = (function(item){
//   try {
//     Item.validateName(name);
//     this.items.push(item);
//   } catch(e) {
//     console.log(e.message);
//   }
// }());
