import { fetchImages, resetPage } from './js/pixabay-api';
import { renderImages, showLoading, hideLoading, clearGallery, hideLoadMoreButton, showLoadMoreButton } from './js/render-functions';
import iziToast from 'izitoast';
import 'izitoast/dist/css/iziToast.min.css';

let currentQuery = '';
let totalHits = 0;
let fetchedImages = 0;

const form = document.getElementById('search-form');
const loadMoreButton = document.getElementById('load-more');

form.addEventListener('submit', async (event) => {
  event.preventDefault();
  const query = document.getElementById('search-input').value.trim();

  if (!query) {
    iziToast.warning({ title: 'Warning', message: 'Search query cannot be empty!' });
    return;
  }

  if (query !== currentQuery) {
    currentQuery = query;
    resetPage();
    clearGallery();
    hideLoadMoreButton();
    fetchedImages = 0; // Скидаємо лічильник завантажених зображень
  }

  showLoading();

  try {
    const data = await fetchImages(query);
    totalHits = data.totalHits; // Зберігаємо загальну кількість зображень
    fetchedImages += data.hits.length;
    renderImages(data.hits);
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