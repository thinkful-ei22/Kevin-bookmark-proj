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

const bookmarkList = (function(){

  const generateBkMarkItemHtml = function(bookmark) { 
    return `<li class="js-item-element bookmark-item" data-item-id="${bookmark.id}">
    <span class = "title">${bookmark.title}</span>
    <span class = "rating-star">${bookmark.rating}</span>
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
    </li>`; 
  };
  const declareNonValidInputs = function(bookmark) {
    bookmark = JSON.parse(bookmark);
    if(bookmark.title.length < 1) throw (new Error ('Add a title!'));
    if(bookmark.url.length < 5) throw (new Error('This url is too short!'));
    //handlesubmit still attempts to send incorrect info, which is a minor detail.
  };
  const handleValidInput = function (input){
    try{
      declareNonValidInputs(input);
    }
    catch(error){
      alert(error.message);
    } 
  };

  function getBookmarkIdFromElement(item) {
    return $(item).closest('.js-item-element').attr('data-item-id');
  }

  const generateHtmlString = function (list){
    console.log(list);
    const bookElements = list.map((bkmk) => generateBkMarkItemHtml(bkmk));
    return bookElements.join('');
  };

  const filterMinStars = function(){
    $('#js-star-filter').on('submit', function(){
      event.preventDefault();
      const starVal = $('.star-filter').val();
      const filtered = store.bookmark.filter(bkmk => bkmk.rating >= starVal);
      render(filtered);
    });
  };

  const expandBookMark = function() {
    $('.js-item-element').on('click', '.js-bookmark-expand', function(){
      const id = getBookmarkIdFromElement(event.currentTarget);
      id.expanded = true;
    });
  };

  const handleExpandBookmark = function(filtered = null) {
    $('.js-bookmark-list').on('click', '.js-bookmark-expand', event => {
      const currentId = getBookmarkIdFromElement(event.currentTarget);
      store.bookmark.map(bookmark =>{
        if(bookmark.id === currentId) bookmark.expanded = !bookmark.expanded;
      });
      if(filtered !== null){
        store.bookmark = filtered;
        render(filtered);
      }else {
        render();
      }
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
    const bookElements = generateHtmlString(tempStore);
    $('.bookmark-list').html(bookElements);
  };

  const handleDeleteItemClicked = function() {
    $('.js-bookmark-list').on('click', '.js-bookmark-item-delete', event => {
      console.log('delete button clicked');
      const id = getBookmarkIdFromElement(event.currentTarget);
      // delete the item
      api.deleteBookmark(id);
      store.findAndDelete(id);
      render();
    });
  };

  const handleFormSubmit = function() { //Create a `handleFormSubmit` function that adds an event listener to the form
    $('.form-box').on('submit', '#js-bookmark-list-form', function(event){
      event.preventDefault();
      console.log('add bookmark submitted');
      const dataObj= $.fn.serializeJson(event.target);
      handleValidInput(dataObj);
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
  return {
    render,
    bindEventListeners: bindEventListeners,
  };
}());