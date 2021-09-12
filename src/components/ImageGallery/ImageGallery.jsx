import React, { Component } from 'react';
import { ImageGalleryList } from './ImageGallery.styled';
import fetchImage from 'service/ApiService';
import { toast } from 'react-toastify';
import ImageGalleryItem from 'components/ImageGalleryItem';

export default class ImageGallery extends Component {
  state = {
    images: [],
    status: 'idle',
    page: 1,
  };

  componentDidUpdate(prevProps, prevState) {
    const prevQuery = prevProps.searchQuery;
    const newQuery = this.props.searchQuery;
    const prevPage = prevState.page;
    const newPage = this.state.page;

    if (prevQuery !== newQuery) {
      this.setState({ status: 'pending' });
      fetchImage(newQuery, newPage).then(data => {
        if (data.hits.length === 0) {
          this.setState({ status: 'rejected' });
          return;
        }
        this.setState({ images: data.hits, status: 'resolved' });
      });
    }

    if (prevPage !== newPage) {
      fetchImage(newQuery, newPage).then(data =>
        this.setState(prevState => ({
          images: [...prevState.images, ...data.hits],
        })),
      );
    }
  }
  render() {
    const { status, images } = this.state;
    const { onSelect } = this.props;

    if (status === 'idle') {
      return <></>;
    }

    if (status === 'pending') {
      return <div>Loading</div>;
    }

    if (status === 'rejected') {
      toast.error('Oops, something gone wrong');
    }

    if (status === 'resolved') {
      return (
        <ImageGalleryList>
          {images.map(({ id, webformatURL, tags, largeImageURL }) => {
            return (
              <li key={id} onClick={() => onSelect(largeImageURL)}>
                <ImageGalleryItem src={webformatURL} tag={tags} />
              </li>
            );
          })}
        </ImageGalleryList>
      );
    }
  }
}
