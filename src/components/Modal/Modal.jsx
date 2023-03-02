import React, { Component } from 'react'
import PropTypes from 'prop-types';
import { Modal, Overlay } from './Modal.styled'

export class ModalWindow extends Component {

    handleKeyDown = (e) => 
         {
            if(e.code === 'Escape'){
             this.props.closeModal()

            }
        
    }
    componentDidMount() {
        window.addEventListener('keydown', this.handleKeyDown)
    }
    componentWillUnmount() {
        window.removeEventListener('keydown', this.handleKeyDown)
    }
    render() {
        const { onModalClick, data } = this.props
        return (
        <Overlay onClick={(evt) => {onModalClick(evt)}}>
            <Modal >
                    <img src={data.largeImageURL} alt={data.largeImageURL} />
            </Modal>
        </Overlay>
    )
    }
    
}

ModalWindow.propTypes = {
  closeModal: PropTypes.func.isRequired,
  onModalClick: PropTypes.func.isRequired,
  data: PropTypes.shape({
    largeImageURL: PropTypes.string.isRequired,
  }).isRequired,
};
