import React, { Component } from 'react'
import PropTypes from 'prop-types';
import { SearchBar, SearchForm, SearchFormInput, SearchFormButton, SearchFormButtonLabel } from './Searchbar.styled'
import { BsArrowDownCircle } from "react-icons/bs";



export class Searchbar extends Component {
   
    render() {
        return(
            <SearchBar>
                <SearchForm onSubmit={this.props.onHandleSubmit}>
                    <SearchFormButton type="submit" >
                        <BsArrowDownCircle size="2em" />
                        <SearchFormButtonLabel>Search</SearchFormButtonLabel>
                    </SearchFormButton>

                <SearchFormInput
                    name="name"
                    type="text"
                    autocomplete="off"
                    autoFocus
                    placeholder="Search images and photos"
                />
            </SearchForm>
            </SearchBar>
    )
    }
}

Searchbar.propTypes = {
  onHandleSubmit: PropTypes.func.isRequired,
};