'use strict';
/*eslint-env jquery*/

const api = (function () {
  const BASE_URL = 'https://thinkful-list-api.herokuapp.com/KevinT/bookmarks';
  
  const getItems = function(callback){
    $.getJSON(`${BASE_URL}/items`, callback);

    // const item = store.items[0];
    // console.log('current name: ' + item.name);
    // store.findAndUpdate(item.id, { name: 'foobar' });
    // console.log('new name: ' + item.name);
  };

  
  const createItem = function (name, callback) {    
    const newItem = {name};
    $.ajax({
      url: `${BASE_URL}/items/`,
      method: 'POST',
      contentType: 'application/json',
      data: JSON.stringify(newItem),
      success: callback,
    });
  };

  const updateItem = function(id, updateData, callback) {
    console.log(updateData, id);
    $.ajax({
      url: `${BASE_URL}/items/${id}`,
      method: 'PATCH',
      contentType: 'application/json',
      data: JSON.stringify(updateData),
      success: callback,
    });
  };



  return {
    getItems,
    createItem,
    updateItem,
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
