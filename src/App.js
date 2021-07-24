import React from "react";

import { ToastContainer } from "react-toastify";
import "./App.css";
import Serchbar from "./components/Searchbar/Searchbar";
import ImageGallery from "./components/ImageGallery/ImageGallery";
import Button from "./components/Button/Button";
import Loader from "react-loader-spinner";
import "react-loader-spinner/dist/loader/css/react-spinner-loader.css";
import ApiServise from "./services/ApiService";

const Status = {
  IDLE: "idle",
  PENDING: "pending",
  RESOLVED: "resolved",
  REJECTED: "rejected",
};

class App extends React.Component {
  state = {
    searchQuery: "",
    page: 1,
    gallery: [],
    status: "idle",
    openModal: false,
  };

  componentDidUpdate(prevProps, prevState) {
    const prevQuery = prevState.searchQuery;
    const nextQuery = this.state.searchQuery;

    if (prevQuery !== nextQuery) {
      this.renderGallery();
    }
    // const API_KEY = "21946293-ddb661a7c3de00e68a212d36c";
    // const url =
    //   "https://pixabay.com/api/?image_type=photo&orientation=horizontal";

    // const { searchQuery, page, gallery } = this.state;

    // if (searchQuery !== prevState.searchQuery || page !== prevState.page) {
    //   fetch(`${url}&q=${searchQuery}&page=${page}&per_page=12&key=${API_KEY}`)
    //     .then((res) => res.json())
    //     .then(({ hits }) =>
    //       this.setState({ gallery: [...prevState.gallery, ...hits] })
    //     )
    //     .then(() => {
    //       this.loaderToggle();
    //       if (gallery.length > 0) {
    //         window.scrollTo({
    //           top: document.documentElement.scrollHeight,
    //           behavior: "smooth",
    //         });
    //       }
    //     });
    // }
  }

  renderGallery = () => {
    const { searchQuery, page } = this.state;

    ApiServise.fetchImages(searchQuery, page)
      .then((responce) =>
        this.setState((prevState) => ({
          gallery: [...prevState.gallery, ...responce.hits],
          page: prevState.page + 1,
        }))
      )
      .catch((error) => this.setState({ error, status: Status.REJECTED }))
      .finally(() => this.setState({ status: Status.RESOLVED }));
  };

  handleFormSubmit = (searchQuery) => {
    this.setState({
      searchQuery: searchQuery,
      page: 1,
      gallery: [],
    });
  };

  // onLoadMore = () => {
  //   this.setState((prevState) => ({
  //     page: prevState.page + 1,
  //   }));
  // };

  loaderToggle = () => {
    this.setState((prevState) => ({
      loader: !prevState.loader,
    }));
  };

  render() {
    return (
      <>
        <Serchbar
          onSubmit={this.handleFormSubmit}
          value={this.state.searchQuery}
        />
        {this.state.status === Status.PENDING && (
          <Loader
            type="ThreeDots"
            color="#00BFFF"
            height={100}
            width={100}
            timeout={1000} //3 secs
          />
        )}
        {this.state.status === Status.RESOLVED && (
          <>
            <ImageGallery gallery={this.state.gallery} />

            <Button onClick={this.renderGallery} text={"Load more"} />
          </>
        )}

        <ToastContainer position="top-center" autoClose={3000} />
      </>
    );
  }
}

export default App;
