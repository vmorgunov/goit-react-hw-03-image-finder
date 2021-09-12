import React, { Component } from 'react';
import Searchbar from 'components/Searchbar';
import { AppContainer } from 'App.styled';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import ImageGallery from 'components/ImageGallery';
import Modal from 'components/Modal';

export default class App extends Component {
  state = {
    searchQuery: '',
    selectedImage: '',
  };

  handleFormSubmit = searchQuery => {
    console.log(searchQuery);
    this.setState({ searchQuery });
  };

  handleSelectedImage = imageUrl => {
    this.setState({ selectedImage: imageUrl });
  };

  handleModalClose = () => {
    this.setState({ selectedImage: '' });
  };

  render() {
    const { searchQuery, selectedImage } = this.state;
    return (
      <AppContainer>
        <Searchbar onSubmit={this.handleFormSubmit} />
        <ImageGallery
          searchQuery={searchQuery}
          onSelect={this.handleSelectedImage}
        />
        {selectedImage && (
          <Modal src={selectedImage} onClose={this.handleModalClose} />
        )}

        <ToastContainer autoClose={3000} />
      </AppContainer>
    );
  }
}
