import SimpleLightbox from 'simplelightbox';
import 'simplelightbox/dist/simple-lightbox.min.css';
import iziToast from 'izitoast';
import 'izitoast/dist/css/iziToast.min.css';

export const renderImages = (images) => {
  const gallery = document.getElementById('gallery');
  const imageCards = images.map(image => {
    return `
      <a href="${image.largeImageURL}" class="gallery__item">
        <img src="${image.webformatURL}" alt="${image.tags}" class="gallery__image">
        <div class="gallery__info">
          <div>Likes: ${image.likes}</div>
          <div>Views: ${image.views}</div>
          <div>Comments: ${image.comments}</div>
          <div>Downloads: ${image.downloads}</div>
        </div>
      </a>
    `;
  }).join('');
  
  gallery.insertAdjacentHTML('beforeend', imageCards);
  new SimpleLightbox('.gallery a').refresh();
};

export const showLoading = () => {
  const loading = document.querySelector('.loading');
  loading.style.display = 'block';
};

export const hideLoading = () => {
  const loading = document.querySelector('.loading');
  loading.style.display = 'none';
};

export const showLoadMoreButton = () => {
  const loadMoreButton = document.getElementById('load-more');
  loadMoreButton.style.display = 'block';
};

export const hideLoadMoreButton = () => {
  const loadMoreButton = document.getElementById('load-more');
  loadMoreButton.style.display = 'none';
};

export const showEndOfResultsMessage = () => {
  const message = document.getElementById('end-of-results-message');
  message.style.display = 'block';
  iziToast.info({ title: 'Info', message: "We're sorry, but you've reached the end of search results." });
};

export const hideEndOfResultsMessage = () => {
  const message = document.getElementById('end-of-results-message');
  message.style.display = 'none';
};
