import { fetchImages } from './js/pixabay-api';
import { renderImages, showLoading, hideLoading, showLoadMoreButton, hideLoadMoreButton, showEndOfResultsMessage, hideEndOfResultsMessage } from './js/render-functions';
import iziToast from 'izitoast';
import 'izitoast/dist/css/iziToast.min.css';

let currentPage = 1;
let currentQuery = '';

const form = document.getElementById('search-form');
const loadMoreButton = document.getElementById('load-more');

form.addEventListener('submit', async (event) => {
  event.preventDefault();
  currentQuery = document.getElementById('search-input').value.trim();
  currentPage = 1;

  if (!currentQuery) {
    iziToast.warning({ title: 'Warning', message: 'Search query cannot be empty!' });
    return;
  }

  showLoading();
  hideLoadMoreButton();
  hideEndOfResultsMessage();

  try {
    const { hits, totalHits } = await fetchImages(currentQuery, currentPage);
    document.getElementById('gallery').innerHTML = '';
    renderImages(hits);

    if (hits.length === 0) {
      iziToast.error({ title: 'Error', message: 'Sorry, there are no images matching your search query. Please try again!' });
    } else if (totalHits > hits.length) {
      showLoadMoreButton();
    } else if (totalHits <= hits.length) {
      showEndOfResultsMessage();
    }
  } catch (error) {
    iziToast.error({ title: 'Error', message: error.message });
  } finally {
    hideLoading();
  }
});

loadMoreButton.addEventListener('click', async () => {
  currentPage += 1;
  showLoading();

  try {
    const { hits, totalHits } = await fetchImages(currentQuery, currentPage);
    renderImages(hits);

    const gallery = document.getElementById('gallery');
    const { height: cardHeight } = gallery.firstElementChild.getBoundingClientRect();
    window.scrollBy({
      top: cardHeight * 2,
      behavior: 'smooth',
    });

    const totalLoadedImages = document.querySelectorAll('.gallery__item').length;
    if (totalLoadedImages >= totalHits) {
      hideLoadMoreButton();
      showEndOfResultsMessage();
    }
  } catch (error) {
    iziToast.error({ title: 'Error', message: error.message });
  } finally {
    hideLoading();
  }
});
