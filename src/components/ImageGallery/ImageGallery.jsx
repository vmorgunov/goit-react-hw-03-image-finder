import React, { Component } from 'react';
import { ImageGalleryList } from './ImageGallery.styled';
import fetchImage from 'service/ApiService';
import { toast } from 'react-toastify';
import ImageGalleryItem from 'components/ImageGalleryItem';
import { ImageGalleryItemValue } from 'components/ImageGalleryItem/ImageGalleryItem.styled';
import Button from 'components/Button/Button';
import Spinner from 'components/Loader/Loader';

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
          toast.error(`No match found.`);
          this.setState({ status: 'idle' });
          return;
        }
        this.setState({ status: 'resolved', page: 1 });
        this.setState({
          images: data.hits,
        });
      });
    }

    if (prevPage !== newPage) {
      fetchImage(newQuery, newPage)
        .then(data =>
          this.setState(prevState => ({
            images: [...prevState.images, ...data.hits],
          })),
        )
        .then(this.handleScroll);
    }
  }

  handleScroll = () => {
    window.scrollTo({
      top: document.documentElement.scrollHeight,
      behavior: 'smooth',
    });
  };

  handleBtnClick = () => {
    this.setState(prevState => ({
      page: prevState.page + 1,
    }));
  };

  render() {
    const { status, images } = this.state;
    const { onSelect } = this.props;

    if (status === 'idle') {
      return <></>;
    }

    if (status === 'pending') {
      return <Spinner />;
    }

    if (status === 'resolved') {
      return (
        <>
          <ImageGalleryList>
            {images.map(({ id, webformatURL, tags, largeImageURL }) => {
              return (
                <ImageGalleryItemValue
                  key={id}
                  onClick={() => onSelect(largeImageURL)}
                >
                  <ImageGalleryItem src={webformatURL} tag={tags} />
                </ImageGalleryItemValue>
              );
            })}
          </ImageGalleryList>
          {images.length >= 12 && (
            <Button handleBtnClick={this.handleBtnClick}>Load more</Button>
          )}
        </>
      );
    }
  }
}
