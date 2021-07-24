import React from "react";
import ImageGalleryItem from "./ImageGalleryItem/ImageGalleryItem";

const ImageGallery = ({ gallery }) => (
  <ul className="ImageGallery">
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

export default ImageGallery;
