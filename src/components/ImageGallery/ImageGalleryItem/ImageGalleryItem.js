import React from "react";

const ImageGalleryItem = ({ src, imageForModal, tags }) => (
  <li className="ImageGalleryItem">
    <img
      src={src}
      alt={tags}
      data-img={imageForModal}
      className="ImageGalleryItem-image"
    />
  </li>
);

export default ImageGalleryItem;
