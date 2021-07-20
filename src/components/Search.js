import React, {Component} from 'react'
import escapeRegExp from 'escape-string-regexp'
import sortBy from 'sort-by'
import { Link } from 'react-router-dom'
import PropTypes from 'prop-types'
import Book from './Book'
import * as BooksAPI from '../BooksAPI'

class Search extends Component {

    static propTypes = {
        booksOnShelf: PropTypes.array,
        changeHandler: PropTypes.func.isRequired
    }

    state = {
        query: '',
        books: []
    }

    updateQuery = (query) => {
        this.setState({ query })
    }

    clearQuery = () => {
        this.setState({ query: '', books: []})
    }

    handleBookSearch = (query) => {
        if(!query) {
            this.clearQuery(query)
        } else {
            this.updateQuery(query)

            BooksAPI.search(query, 20).then(books => {
                if(!books.error) {
                    books.map(book => (this.props.booksOnShelf.filter((b) => b.id === book.id).map(b => book.shelf = b.shelf)))
                    this.setState({ books })
                } else {
                    console.log(books.error)
                }
            })
        }
    }

    render() {
        const { changeHandler } = this.props
        const { query, books } = this.state;
        let searchResult

        if (query) {
            const match = new RegExp(escapeRegExp(query), 'i')
            searchResult = books.filter(book => match.test(book.title))
        } else {
            searchResult = books
        }
        searchResult.sort(sortBy('title'))

        return (
            <div className='search-books'>
                <div className='search-books-bar'>
                    <Link to='/' className='close-search'>Close</Link>
                    <div className='search-books-input-wrapper'>
                        <input
                            type='text'
                            autoFocus
                            placeholder='Search by title or author'
                            value={query}
                            onChange={(event) => this.handleBookSearch(event.target.value)}
                        />
                    </div>
                </div>
                <div className='search-books-results'>

                    {searchResult.length !== 0 && (
                        <div className='showing-books'>
                            <span> {searchResult.length} books matched your search terms.</span>
                        </div>
                    )}
                    <ol className='books-grid'>
                        { searchResult.map((book) => {
                            return (
                                <Book key={book.id} book={book} changeHandler={changeHandler} />
                            )
                        })
                        }
                    </ol>
                </div>
            </div>
        )
    }
}

export default Search
