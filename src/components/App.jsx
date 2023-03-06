import React, { Component } from "react";
import { Searchbar } from "./Searchbar/Searchbar";
import { AppWrap, BtnLoadMore } from './App.styled'
import { ImageGallery } from "./ImageGallery/ImageGallery";
import { getGallery } from '../api/gallery'
import { Loader } from './Loader/Loader' 
import { ErorMessage } from './ErorMessage/ErorMessage'
import { ModalWindow } from './Modal/Modal'

export class App extends Component {
  state = {
    q: '',
    page: 1,
    gallery: [], 
    isLoad: false, 
    erorOfSerch: false,
    error: false,
    isModal: false,
    modalData: ''

  }
  onHandleSubmit = evt => {
    const { page } = this.state
    const query = evt.target.name.value.toLowerCase()
  
    evt.preventDefault()
    
    if (query.trim() === '') {
    alert('Введите что-нибудь')
      return
    }

    this.setState({
      q: query,
      isLoad: true,
      gallery: [],
      erorOfSerch: false,

    })
    
    setTimeout(() => {
     try {
       getGallery(query, page)
        .then(({ data }) => {
          if (data.hits.length === 0) {
            this.setState({ erorOfSerch: true })
          } this.setState({ gallery: data.hits })

        }).finally(this.setState({ isLoad: false }))
     } catch (error) {
        this.setState({ error: true })
     }
      
    }, 1000);

    
    this.setState(prevState => 
      ({page: prevState.page + 1})
    )
    
    evt.target.reset()
    
  } 
  onLoadMoreBtnClick = () => { 
    const { q, page } = this.state
    
    this.setState({ isLoad: true })

    setTimeout(() => {

      try {
        getGallery(q, page)
      .then(({ data }) => this.setState((prevState) =>
            ({ gallery: [...prevState.gallery, ...data.hits] })))
      .finally(this.setState({isLoad: false}))
      } catch (error) {
        this.setState({ error: true })
      }

      
    }, 1000);

    this.setState(prevState => 
      ({page: prevState.page + 1})
    )
  }
  onSelect = (data) => {

    this.setState({
      modalData: data,
      isModal: true
    })
  }
  toggleModal = (e) => {
    if (e.target === e.currentTarget) {
      this.setState(prevState => ({isModal: !prevState.isModal}))
    }
    
  }
  closeModal = () => {
    this.setState(prevState => ({isModal: !prevState.isModal}))
  }


  render() {
    const { isLoad, gallery, erorOfSerch, q, eror, isModal, modalData } = this.state
    return (
        <AppWrap>
        <Searchbar onHandleSubmit={this.onHandleSubmit} />
        {isModal && <ModalWindow closeModal={this.closeModal} onModalClick={this.toggleModal} data={modalData} /> }
        {erorOfSerch && <ErorMessage text={'No images found by request '} name={q} />} 
        {eror && <ErorMessage text={'something went wrong'}  /> } 
        <ImageGallery gallery={gallery} onSelect={this.onSelect} ></ImageGallery>
        {isLoad
          ? <Loader />
          : gallery.length > 0
                    && <BtnLoadMore onClick={this.onLoadMoreBtnClick} >Load</BtnLoadMore>}
        
        
      </AppWrap>
    )
  }
  
};
