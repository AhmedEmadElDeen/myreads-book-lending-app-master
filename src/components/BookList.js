import React, {Component} from 'react'
import { Link } from 'react-router-dom'
import PropTypes from 'prop-types'
import Shelf from './Shelf'
import Header from './Header'

class BookList extends Component {
    static propTypes = {
        books: PropTypes.array.isRequired,
        changeHandler: PropTypes.func.isRequired
    }

    render() {
        const { books, changeHandler } = this.props
        return (
            <div className='books-list'>
                <Header appLabel='MyReads'/>
                <div className='books-list-content'>
                    <div>
                        <Shelf title='Currently Reading'
                            changeHandler={changeHandler}
                            books={books.filter(book => book.shelf === 'currentlyReading')}
                        />
                        <Shelf
                            title='Want To Read'
                            changeHandler={changeHandler}
                            books={books.filter(book => book.shelf === 'wantToRead')}
                        />
                        <Shelf
                            title='Read'
                            changeHandler={changeHandler}
                            books={books.filter(book => book.shelf === 'read')}
                        />
                    </div>
                </div>
                <div className='start-search'>
                    <Link
                        to='/search'
                        className='add-contact'
                    >Search/Add to Library</Link>
                </div>
            </div>
        )
    }
}

export default BookList