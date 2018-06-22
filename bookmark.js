'use strict';
/*eslint-env jquery*/
/*globals api*/
/*
  We want our store to hold a `videos` array of "decorated" objects - i.e. objects that
  have been transformed into just the necessary data to display on our page, compared to the large
  dataset Youtube will deliver to us.  Example object:
*/
$.fn.extend(
  {
    serializeJson: function(data) {
      const formData = new FormData(data);
      const itemData = {};
      formData.forEach((val, name) => itemData[name] = val);
      return JSON.stringify(itemData);
    }
  });

const store = {
  bookmark: [],
};

const BASE_URL = 'https://thinkful-list-api.herokuapp.com/KevinT/bookmarks';

const toggleForm = function (){
  $('.container').on('click','.js-show-bookmark-form', function(){
    console.log('show bookmark form button clicked');
    $('.form-box').fadeToggle(1000, 'linear');
  });
};

const generateBkMarkItemHtml = function(bookmark) { //Create a `generateVideoItemHtml` function that receives the decorated object
  return `
<li class="js-item-element bookmark-item" data-item-id="${bookmark.id}">
    ${bookmark.title} <span class = "rating-star">${bookmark.rating}</span>
    <div class="bookmark-details">
        <div class="url">
        <a href = "${bookmark.url}">${bookmark.url}</a>
        </div>
        <div class="description">
        <p>${bookmark.desc}</p>
        </div>
        <button class="bookmark-item-expand js-bookmark-expand">
        <span class="button-label">Expand</span>
        </button>
        <button class="bookmark-item-delete js-bookmark-item-delete">
            <span class="button-label">Remove</span>
        </button>
    </div>
</li>`; //Using the object, return an HTML string containing all the expected data
};
//<a href ="http://www.youtube.com/watch?v=${video.id}"> <img src = "${video.thumbnail}"></a> (clickable picture version)


const addBookmarkToStore = function(bookmark) {//Create a `addVideosToStore` function that receives an array of decorated video 
// objects
  store.bookmark.push(bookmark);//sets the array as the value held in store.videos
};

// const preRender = function (){
// api.getBookmark(function(response){
//     console.log('render ran');
//     console.log('response', response);
//     const tempStore = response.map((bookmark)=> {
//       const dataObj = {
//         id: bookmark.id,
//         title: bookmark.title,
//         url: bookmark.url,
//         desc: bookmark.desc,
//         rating: bookmark.rating,
//         expand: false
//       };
//       return dataObj;
//     });
//     console.log('tempStore', tempStore);
//     store.bookmark = tempStore;
//     const bookElements = store.bookmark.map(bkmk => {//Map through `store.videos`, sending each `video` through your `generateVideoItemHtml
//       return generateBkMarkItemHtml(bkmk);
//     });
//     $('.bookmark-list').html(bookElements);
// };

const render = function() { //Create a `render` function
  api.getBookmark(function(response){
    console.log('render ran');
    store.bookmark = [...response];
    const bookElements = store.bookmark.map(bkmk => {//Map through `store.videos`, sending each `video` through your `generateVideoItemHtml
      return generateBkMarkItemHtml(bkmk);
    });
    $('.bookmark-list').html(bookElements);
  });
//     const bookElements = store.bookmark.map(bkmk => {//Map through `store.videos`, sending each `video` through your `generateVideoItemHtml
//     return generateBkMarkItemHtml(bkmk);
//   });
//   $('.results').html(bookElements);//Add your array of DOM elements to the appropriate DOM element
};

function getBookmarkIdFromElement(item) {
  return $(item).closest('.js-item-element').attr('data-item-id');
}

const findAndDelete = function(id) {
  store.bookmark = store.bookmark.filter(item => item.id !== id);
};

const handleDeleteItemClicked = function() {
  // like in `handleItemCheckClicked`, we use event delegation
  $('.js-bookmark-list').on('click', '.js-bookmark-item-delete', event => {
    // get the index of the item in store.items
    console.log('delete button clicked');
    const id = getBookmarkIdFromElement(event.currentTarget);
    console.log(id);
    // delete the item
    api.deleteBookmark(id, (response) =>{
      console.log(response);
      console.log('i deleted');
      findAndDelete(id);
      render();
    });
  });
};

const handleExpandBookmark = function() {
  $('.js-bookmark-list').on('click', '.js-bookmark-expand', event => {
    const id = getBookmarkIdFromElement(event.currentTarget);
    const foundBookmark = store.findById(id);
    Object.assign(foundBookmark, {checked: !foundBookmark.checked});
    // delete foundItem.id;
    // api.updateItem(id, {checked: !foundBookmark.checked}, function(){
    //   store.findAndUpdate(id, foundBookmark);
    render();
  });
};

// const addExpandId = function(id){
//   const objId = store.bookmark.getBookmarkIdFromElement(id);
//   store[objId]["expand"] = false; 
//   console.log(store);
// };


const handleFormSubmit = function() { //Create a `handleFormSubmit` function that adds an event listener to the form
  $('form').on('submit', function(event){
    event.preventDefault();//Prevent default event
    console.log(event.target);
    const dataObj= $.fn.serializeJson(event.target);
    // const dataObj = {
    //   title: event.target.title.value,
    //   url: event.target.url.value,
    //   desc: event.target.desc.value,
    //   rating: event.target.rating.value,
    // };
    console.log(dataObj); 
    $('#bk-title').val('');
    $('#bk-url').val('');
    $('#bk-desc').val('');
    $('#bk-rating').val('');//Clear the search input field
    api.createBookmark(dataObj, ((response) =>{
      console.log(response);
      console.log('i uploaded');
      render();
    }));
    //addBookmarkToStore(dataObj);//Inside the callback, add the decorated response 
    //into your store using the `addBookmarkToStore` function
    //inside the callback, run the `render` function 
  });
};

// When DOM is ready:
$(function () {
  handleFormSubmit();
  handleDeleteItemClicked();
  render();
  toggleForm();
});
