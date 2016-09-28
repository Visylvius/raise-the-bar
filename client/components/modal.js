import React, {PropTypes} from 'react';
import {ModalContainer, ModalDialog} from 'react-modal-dialog';

class Modal extends React.Component {
  constructor(props) {
    super(props);

    this.state = { isShowingModal: false };
  }
  // state = {
  //   ,
  // }
  handleClick() {
    this.setState({isShowingModal: true});
  }

  handleClose() {
    this.setState({isShowingModal: false});
  }
  render() {
    return <div className='modal' onClick={this.handleClick}>
      {
        this.state.isShowingModal &&
        <ModalContainer onClose={this.handleClose}>
          <ModalDialog onClose={this.handleClose}>
            <h1>Main Modal</h1>
            <p>I am a modal</p>
          </ModalDialog>
        </ModalContainer>
      }
    </div>;
  }
}

export default Modal;
