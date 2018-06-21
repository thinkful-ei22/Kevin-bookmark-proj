'use strict';
/*eslint-env jquery*/
/*globals api*/
/*
  We want our store to hold a `videos` array of "decorated" objects - i.e. objects that
  have been transformed into just the necessary data to display on our page, compared to the large
  dataset Youtube will deliver to us.  Example object:
  
  {
    id: '98ds8fbsdy67',
    title: 'Cats dancing the Macarena',
    thumbnail: 'https://img.youtube.com/some/thumbnail.jpg'
  }

*/
// const tempBookMarks1 = {
//     id: cuid(),
//     title: 'Roboto',
//     url: 'https://google.com',
//     rating: 5,
// };

// const tempBookMarks2 = {
//     id: cuid(),
//     title: 'Robo',
//     url: 'https://google.com',
//     rating: 1,
// };

// const tempBookMarks3 = {
//     id: cuid(),
//     title: 'Rob',
//     url: 'https://google.com',
//     rating: 4,
// };

// console.log(tempBookMarks1);
// console.log(tempBookMarks2);
// console.log(tempBookMarks3);
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

// const fetchBookmarks = function(searchTerm, callback) {//Create a `fetchVideos` function that receives a `searchTerm` and `callback`
//   const query = {
//     q: searchTerm,//Use `searchTerm` to construct the right query object based on the Youtube API docs
//     part: 'snippet',
//     type: 'video',
//   };
//   $.getJSON(BASE_URL, query, callback);//Make a getJSON call using the query object and sending the provided callback in as the last argument
// };

// const fetchMoreVideos = function(searchTerm, callback) {//Create a `fetchVideos` function that receives a `searchTerm` and `callback`
//   const query = {
//     q: searchTerm,//Use `searchTerm` to construct the right query object based on the Youtube API docs
//     part: 'snippet',
//     type: 'video',
//     pageToken,
//   };
//   $.getJSON(BASE_URL, query, callback);//Make a getJSON call using the query object and sending the provided callback in as the last argument
// }

const generateBkMarkItemHtml = function(bookmark) { //Create a `generateVideoItemHtml` function that receives the decorated object
  return `
<li class="js-item-element bookmark-item" data-item-id="">
    ${bookmark.title} <span class = "rating-star">${bookmark.rating}</span>
    <div class="bookmark-details">
        <div class="url">
        <a href = "${bookmark.url}">${bookmark.url}</a>
        </div>
        <div class="description">
        <p>${bookmark.desc}</p>
        </div>
        <button class="bookmark-item-expand js-bookmark-item-expand">
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

const handleFormSubmit = function() { //Create a `handleFormSubmit` function that adds an event listener to the form
  $('form').on('submit', function(event){
    event.preventDefault();//Prevent default event
    // console.log(event.target);
    // const dataObj= $.fn.serializeJson(event.target);
    const dataObj = {
      title: event.target.title.value,
      url: event.target.url.value,
      desc: event.target.desc.value,
      rating: event.target.rating.value
    };
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
    //addBookmarkToStore(dataObj);//Inside the callback, add the decorated response into your store using the `addVideosToStore` function
    //inside the callback, run the `render` function 
  });
};

// When DOM is ready:
$(function () {
  handleFormSubmit();//Run `handleFormSubmit` to bind the event listener to the DOM
});
