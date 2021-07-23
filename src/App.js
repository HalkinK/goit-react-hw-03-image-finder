import React from "react";
import { ToastContainer } from "react-toastify";
import "./App.css";
import Serchbar from "./components/Searchbar/Searchbar";

class App extends React.Component {
  state = { searchQuery: "" };

  handleFormSubmit = (searchQuery) => {
    this.setState({ searchQuery });
  };

  render() {
    return (
      <div>
        <Serchbar onSubmit={this.handleFormSubmit} />
        <ToastContainer position="top-center" autoClose={3000} />
      </div>
    );
  }
}

export default App;
