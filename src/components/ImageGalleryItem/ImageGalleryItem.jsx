import React, { Component } from 'react';

export default class ImageGalleryItem extends Component {
  render() {
    const { src, tag } = this.props;
    return <img src={src} alt={tag} />;
  }
}
