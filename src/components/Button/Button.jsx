import React, { Component } from 'react';
import { LoadMoreBtn } from './Button.styled';

export default class Button extends Component {
  render() {
    const { handleBtnClick } = this.props;
    return (
      <LoadMoreBtn type="button" onClick={handleBtnClick}>
        {this.props.children}
      </LoadMoreBtn>
    );
  }
}
