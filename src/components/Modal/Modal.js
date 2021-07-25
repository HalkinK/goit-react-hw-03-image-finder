import React from "react";
import { createPortal } from "react-dom";
import PropTypes from "prop-types";

const modalRoot = document.querySelector("#modal-root");

export default class Modal extends React.Component {
  static propTypes = {
    onClose: PropTypes.func.isRequired,
    imageForModal: PropTypes.string.isRequired,
    tags: PropTypes.string.isRequired,
  };
  componentDidMount() {
    window.addEventListener("keydown", this.onEscClick);
  }

  componentDidUpdate() {
    window.removeEventListener("keydown", this.onEscClick);
  }

  onEscClick = (e) => {
    if (e.code === "Escape") {
      this.props.onClose();
    }
  };

  handleBackdropClick = (e) => {
    console.log(e.currentTarget);
    if (e.currentTarget === e.target) {
      this.props.onClose();
    }
  };

  render() {
    const { imageForModal, tags } = this.props;

    return createPortal(
      <div className="Overlay" onClick={this.handleBackdropClick}>
        <div className="Modal">
          <img src={imageForModal} alt={tags} />
        </div>
      </div>,
      modalRoot
    );
  }
}
