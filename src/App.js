import React, { Component } from 'react'
import { Route } from 'react-router-dom'
import * as BooksAPI from './BooksAPI'
import BookList from './components/BookList'
import Search from './components/Search'
import './App.css'


class App extends Component {
  state = {
    books: []
  }

  componentDidMount() {
    this.populateBooks()
  }

  populateBooks = () => {
    BooksAPI.getAll().then((books) => {
        this.setState({ books });
    })
  }

  changeHandler  = (event, book) => {
      const shelf = event.target.value

      if (this.state.books) {
        BooksAPI.update(book,shelf).then(() => {
          book.shelf = shelf;
          this.setState(state => ({
            books: state.books.filter(b => b.id !== book.id).concat([ book ])
          }))
        })
      }
  }

  render() {
    return (
      <div className='app'>

        <Route exact path='/' render={() => (
            <BookList books={this.state.books} changeHandler={this.changeHandler}/>
        )}/>


        <Route path='/search' render={( {history} ) => (
            <Search booksOnShelf={this.state.books} changeHandler={this.changeHandler} />
        )}/>
      </div>
    )
  }
}

export default App
