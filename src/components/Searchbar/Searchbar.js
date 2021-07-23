import React from "react";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

class Searchbar extends React.Component {
  state = { searchQuery: "" };

  handleQueryChange = (event) => {
    this.setState({ searchQuery: event.currentTarget.value.toLowerCase() });
  };

  handleSubmit = (event) => {
    event.preventDefault();
    if (this.state.searchQuery.trim() === "") {
      return toast.warn("Введите свой запрос");
    }
    this.props.onSubmit(this.state.searchQuery);
    this.setState({ searchQuery: "" });
  };

  render() {
    return (
      <header className="Searchbar">
        <form className="SearchForm" onSubmit={this.handleSubmit}>
          <button type="submit" className="SearchForm-button">
            <span className="SearchForm-button-label">Search</span>
          </button>

          <input
            className="SearchForm-input"
            type="text"
            autoComplete="off"
            autoFocus
            placeholder="Search images and photos"
            value={this.state.searchQuery}
            name={"searchQuery"}
            onChange={this.handleQueryChange}
          />
        </form>
      </header>
    );
  }
}

export default Searchbar;
