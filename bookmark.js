'use strict';
/*eslint-env jquery*/
/*globals api, store*/

$.fn.extend(
  {
    serializeJson: function(data) {
      const formData = new FormData(data);
      const itemData = {};
      formData.forEach((val, name) => itemData[name] = val);
      return JSON.stringify(itemData);
    }
  });

const BASE_URL = 'https://thinkful-list-api.herokuapp.com/KevinT/bookmarks';

const generateBkMarkItemHtml = function(bookmark) { //Create a `generateVideoItemHtml` function that receives the decorated object
  return `<li class="js-item-element bookmark-item" data-item-id="${bookmark.id}">
    ${bookmark.title} <span class = "rating-star">${bookmark.rating}</span>
    <div class="bookmark-details">
    ${bookmark.expanded ?`
        <div class="url">
        <a href = "${bookmark.url}">Visit the Site!</a>
        </div>
        <div class="description">
        <p>${bookmark.desc}</p>
        </div>`: ''}
    <button class="bookmark-item-expand js-bookmark-expand">
        <span class="button-label">Expand</span>
    </button>
    <button class="bookmark-item-delete js-bookmark-item-delete">
        <span class="button-label">Remove</span>
    </button>
    </div>
    </li>`; //Using the object, return an HTML string containing all the expected data
};

// const handleValidInput = function (){
//   try{
        
//   }
//   catch(sdsdf){

//   } 
// };

// const declareNonValidInputs = function(bookmark) {
//     if(bookmark.id === null) console.log('This is not a title!');
//     if(bookmark.url < 5)
// };
function getBookmarkIdFromElement(item) {
  return $(item).closest('.js-item-element').attr('data-item-id');
}

const expandBookMark = function() {
  $('.js-item-element').on('click', '.js-bookmark-expand', function(){
    const id = getBookmarkIdFromElement(event.currentTarget);
    id.expanded = true;
    console.log(id.expanded);
  });
};

const handleExpandBookmark = function() {
  $('.js-bookmark-list').on('click', '.js-bookmark-expand', event => {
    const currentId = getBookmarkIdFromElement(event.currentTarget);
    store.bookmark.map(bookmark =>{
      if(bookmark.id === currentId) bookmark.expanded = !bookmark.expanded;
    });
    render();
  });
};

const generateHtmlString = function (list){
  console.log(list);
  const bookElements = list.map((bkmk) => generateBkMarkItemHtml(bkmk));
  return bookElements.join('');
};

const filterMinStars = function(){
  $('#js-star-filter').on('submit', function(){
    console.log('filter button clicked');
    event.preventDefault();
    const starVal = $('.star-filter').val();
    const filtered = store.bookmark.filter(bkmk => bkmk.rating >= starVal);
    console.log('new filtered array', filtered);
    console.log('this is the store', store.bookmark);
    render(filtered);
  });
};
  
const toggleForm = function (){
  
  $('.container').on('click','.js-show-bookmark-form', function(){
    event.preventDefault();
    console.log('show bookmark form button clicked');
    $('.form-box').fadeToggle(1000, 'linear');
  });
};

const render = function(filtered = null) { 
  let tempStore = store.bookmark;
  if (filtered !== null) tempStore = filtered;
  console.log('DOM STORE', store.bookmark);
  console.log('tempStore', tempStore);
  const bookElements = generateHtmlString(tempStore);
  $('.bookmark-list').html(bookElements);
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
      store.findAndDelete(id);
      render();
    });
  });
};

const handleFormSubmit = function() { //Create a `handleFormSubmit` function that adds an event listener to the form
  $('.form-box').on('submit', '#js-bookmark-list-form', function(event){
    event.preventDefault();//Prevent default event
    console.log('add bookmark submitted');
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
      console.log('reponse', response);
      console.log('i uploaded');
      store.addBookmarkToStore(response);
      render();
    }));
    //addBookmarkToStore(dataObj);//Inside the callback, add the decorated response 
    //into your store using the `addBookmarkToStore` function
    //inside the callback, run the `render` function 
  });
};

// When DOM is ready:

function bindEventListeners() { 
  handleFormSubmit();
  handleDeleteItemClicked();
  toggleForm();
  expandBookMark();
  filterMinStars();
  handleExpandBookmark();
}