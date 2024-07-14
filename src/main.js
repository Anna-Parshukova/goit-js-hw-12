import { fetchImages, resetPage } from './js/pixabay-api';
import { renderImages, showLoading, hideLoading, clearGallery, hideLoadMoreButton, showLoadMoreButton } from './js/render-functions';
import iziToast from 'izitoast';
import 'izitoast/dist/css/iziToast.min.css';
import SimpleLightbox from 'simplelightbox';
import 'simplelightbox/dist/simple-lightbox.min.css';

let currentQuery = '';
let totalHits = 0;
let fetchedImages = 0;
let lightbox = new SimpleLightbox('.gallery a'); 

const form = document.getElementById('search-form');
const loadMoreButton = document.getElementById('load-more');

// form.addEventListener('submit', async (event) => {
//   event.preventDefault();
//   const query = document.getElementById('search-input').value.trim();

//   if (!query) {
//     iziToast.warning({ title: 'Warning', message: 'Search query cannot be empty!' });
//     return;
//   }

//   if (query !== currentQuery) {
//     currentQuery = query;
//     resetPage();
//     clearGallery();
//     hideLoadMoreButton();
//     fetchedImages = 0;
//   }

//   showLoading();

//   try {
//     const data = await fetchImages(query);
//     totalHits = data.totalHits;
//     fetchedImages += data.hits.length;
//     renderImages(data.hits);
//     lightbox.refresh();
//     scrollPage();

//     if (fetchedImages >= totalHits) {
//       iziToast.info({ title: 'Info', message: "We're sorry, but you've reached the end of search results." });
//       hideLoadMoreButton();
//     } else {
//       showLoadMoreButton();
//     }
//   } catch (error) {
//     iziToast.error({ title: 'Error', message: error.message });
//   } finally {
//     hideLoading();
//   }
// });
form.addEventListener('submit', async (event) => {
  event.preventDefault();
  const query = document.getElementById('search-input').value.trim();

  if (!query) {
    iziToast.warning({ title: 'Warning', message: 'Search query cannot be empty!' });
    return;
  }

  if (query!== currentQuery) {
    currentQuery = query;
    resetPage();
    clearGallery();
    hideLoadMoreButton();
    fetchedImages = 0; 
  }

  showLoading();

  try {
    const data = await fetchImages(query);
    totalHits = data.totalHits; 
    fetchedImages += data.hits.length;
    renderImages(data.hits);
    lightbox.refresh(); 

    if (fetchedImages >= totalHits) {
      iziToast.info({ title: 'Info', message: "We're sorry, but you've reached the end of search results." });
      hideLoadMoreButton();
    } else {
      showLoadMoreButton();
    }
  } catch (error) {
    iziToast.error({ title: 'Error', message: error.message });
  } finally {
    hideLoading();
  }
});

loadMoreButton.addEventListener('click', async () => {
  showLoading();

  try {
    const data = await fetchImages(currentQuery);
    fetchedImages += data.hits.length;
    renderImages(data.hits);
    lightbox.refresh(); 
    scrollPage(); 

    if (fetchedImages >= totalHits) {
      iziToast.info({ title: 'Info', message: "We're sorry, but you've reached the end of search results." });
      hideLoadMoreButton();
    }
  } catch (error) {
    iziToast.error({ title: 'Error', message: error.message });
  } finally {
    hideLoading();
  }
});

function scrollPage() {
  const { height: cardHeight } = document
    .querySelector('.gallery')
    .firstElementChild.getBoundingClientRect();

  window.scrollBy({
    top: cardHeight * 2,
    behavior: 'smooth',
  });
}
