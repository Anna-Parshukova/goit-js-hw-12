import axios from 'axios';

const API_KEY = '44821264-a08a7741629af83990ada8b48';
const BASE_URL = 'https://pixabay.com/api/';

let page = 1;
const perPage = 15;

export const fetchImages = async (query) => {
  try {
    const response = await axios.get(BASE_URL, {
      params: {
        key: API_KEY,
        q: query,
        image_type: 'photo',
        orientation: 'horizontal',
        safesearch: true,
        page,
        per_page: perPage,
      },
    });
    page += 1;
    return response.data;
  } catch (error) {
    throw new Error('Failed to fetch images');
  }
};

export const resetPage = () => {
  page = 1;
};
