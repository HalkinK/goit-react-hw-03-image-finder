import React from "react";
import ImageGalleryItem from "./ImageGalleryItem/ImageGalleryItem";
import PropTypes from "prop-types";

const ImageGallery = ({ gallery, onImageClick }) => (
  <ul className="ImageGallery" onClick={onImageClick}>
    {gallery.map(({ id, webformatURL, largeImageURL, tags }) => (
      <ImageGalleryItem
        key={id}
        src={webformatURL}
        imageForModal={largeImageURL}
        tags={tags}
      />
    ))}
  </ul>
);

ImageGallery.propTypes = {
  gallery: PropTypes.arrayOf(PropTypes.object),
  onImageClick: PropTypes.func.isRequired,
};

export default ImageGallery;
