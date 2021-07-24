// import axios from "axios";

const API_KEY = "21946293-ddb661a7c3de00e68a212d36c";
const url = "https://pixabay.com/api/?image_type=photo&orientation=horizontal";

function fetchImages(searchQuery, page) {
  return fetch(
    `${url}&q=${searchQuery}&page=${page}&per_page=12&key=${API_KEY}`
  ).then((responce) => {
    if (responce.ok) {
      return responce.json();
    }
    return Promise.reject(new Error("No response from server"));
  });
}

const ApiServise = { fetchImages };

export default ApiServise;
