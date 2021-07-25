import React from "react";

import { ToastContainer } from "react-toastify";
import "./App.css";
import Serchbar from "./components/Searchbar/Searchbar";
import ImageGallery from "./components/ImageGallery/ImageGallery";
import Button from "./components/Button/Button";
import Loader from "react-loader-spinner";
import "react-loader-spinner/dist/loader/css/react-spinner-loader.css";
import ApiServise from "./services/ApiService";
import Modal from "./components/Modal/Modal";

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
    showModal: false,
    currentImage: "",
  };

  componentDidUpdate(prevProps, prevState) {
    const prevQuery = prevState.searchQuery;
    const nextQuery = this.state.searchQuery;

    if (prevQuery !== nextQuery) {
      this.setState({ status: "pending" });
      this.renderGallery();
    }
  }

  renderGallery = () => {
    const { searchQuery, page } = this.state;

    ApiServise.fetchImages(searchQuery, page)
      .then((responce) => {
        // this.loaderToggle();

        this.setState((prevState) => ({
          gallery: [...prevState.gallery, ...responce.hits],
          page: prevState.page + 1,
        }));
      })
      .catch((error) => this.setState({ error, status: Status.REJECTED }))
      .finally(() => {
        // this.loaderToggle();

        this.setState({ status: Status.RESOLVED });

        window.scrollTo({
          top: document.documentElement.scrollHeight,
          behavior: "smooth",
        });
      });
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

  // loaderToggle = () => {
  //   this.setState((prevState) => ({
  //     loader: !prevState.loader,
  //   }));
  // };

  toggleModal = () => {
    this.setState(({ showModal }) => ({
      showModal: !showModal,
    }));
  };

  onImageClick = (e) => {
    if (e.target.nodeName !== "IMG") {
      return;
    }
    this.setState({
      currentImage: e.target.dataset.img,
    });

    this.toggleModal();
  };

  render() {
    return (
      <div className="App">
        <Serchbar
          onSubmit={this.handleFormSubmit}
          value={this.state.searchQuery}
        />
        {this.state.status === Status.PENDING && (
          <Loader
            type="ThreeDots"
            color="#00BFFF"
            height={200}
            width={200}
            timeout={3000} //3 secs
          />
        )}
        {this.state.status === Status.REJECTED && (
          <h1>{"Something went wrong"}</h1>
        )}
        {this.state.status === Status.RESOLVED && (
          <>
            <ImageGallery
              gallery={this.state.gallery}
              onImageClick={this.onImageClick}
            />

            <Button onClick={this.renderGallery} text={"Load more"} />
          </>
        )}
        {this.state.showModal && (
          <Modal
            onClose={this.toggleModal}
            imageForModal={this.state.currentImage}
          />
        )}

        <ToastContainer position="top-center" autoClose={3000} />
      </div>
    );
  }
}

export default App;
