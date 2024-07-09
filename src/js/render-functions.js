import SimpleLightbox from 'simplelightbox';
import 'simplelightbox/dist/simple-lightbox.min.css';
import iziToast from 'izitoast';
import 'izitoast/dist/css/iziToast.min.css';

export const renderImages = (images) => {
  const gallery = document.getElementById('gallery');

  if (images.length === 0) {
    iziToast.error({ title: 'Error', message: 'Sorry, there are no images matching your search query. Please try again!' });
    return;
  }

  const imageCards = images.map(image => {
    return `
      <a href="${image.largeImageURL}" class="gallery-item">
        <img src="${image.webformatURL}" alt="${image.tags}">
        <div>Likes: ${image.likes}</div>
        <div>Views: ${image.views}</div>
        <div>Comments: ${image.comments}</div>
        <div>Downloads: ${image.downloads}</div>
      </a>
    `;
  }).join('');

  gallery.insertAdjacentHTML('beforeend', imageCards);
};

export const showLoading = () => {
  const loading = document.querySelector('.loading');
  loading.style.display = 'block';
};

export const hideLoading = () => {
  const loading = document.querySelector('.loading');
  loading.style.display = 'none';
};

export const clearGallery = () => {
  const gallery = document.getElementById('gallery');
  gallery.innerHTML = '';
};

export const hideLoadMoreButton = () => {
  const loadMoreButton = document.getElementById('load-more');
  loadMoreButton.style.display = 'none';
};

export const showLoadMoreButton = () => {
  const loadMoreButton = document.getElementById('load-more');
  loadMoreButton.style.display = 'block';
};
