import React, { Component } from 'react';

import { ImageGallery } from './ImageGalleryItem.styled';

export default class ImageGalleryItem extends Component {
  render() {
    const { src, tag } = this.props;
    return <ImageGallery src={src} alt={tag} />;
  }
}
