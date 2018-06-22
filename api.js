'use strict';
/*eslint-env jquery*/


const api = (function () {
  const BASE_URL = 'https://thinkful-list-api.herokuapp.com/KevinT/bookmarks';
  
  const getBookmark = function(callback){
    $.getJSON(`${BASE_URL}`, callback);
  };

  const createBookmark = function (data, callback) {    
    $.ajax({
      url: BASE_URL,
      method: 'POST',
      contentType: 'application/json',
      data,
      success: callback,
      error: function(err){
        console.log('something went wrong with create', err);
      }
    });
  };

  const deleteBookmark= function(id, callback) {
    console.log(id);
    $.ajax({
      url: `${BASE_URL}/${id}`,
      method: 'DELETE',
      contentType: 'application/json',
      success: callback,
      error: function(err){
        console.log('something went wrong with delete', err);
      }
    });
  };


  return {
    getBookmark,
    createBookmark,
    deleteBookmark,
  };
}());