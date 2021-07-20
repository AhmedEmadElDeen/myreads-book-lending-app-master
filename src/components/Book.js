import React, {Component} from 'react'
import PropTypes from 'prop-types'

class Book extends Component {
    static propTypes = {
        book: PropTypes.object.isRequired,
        changeHandler: PropTypes.func.isRequired
    }

    render() {
        const {book, changeHandler} = this.props

        return (
            <li key={book.id}>
                <div className='book'>
                    <div className='book-top'>
                        <div className='book-cover' style={ book && book.imageLinks && book.imageLinks.thumbnail && { backgroundImage: `url(${book.imageLinks.thumbnail})` }}></div>
                        <div className='book-shelf-changer'>
                            <select defaultValue={this.props.book.shelf ? this.props.book.shelf : 'none'} onChange={(event) => changeHandler(event, book)}>
                                <option value='none' disabled>Move to...</option>
                                <option value='currentlyReading'>Currently Reading</option>
                                <option value='wantToRead'>Want to Read</option>
                                <option value='read'>Read</option>
                                <option value='none'>None</option>
                            </select>
                        </div>
                    </div>
                    <div className='book-title'>{book.title}</div>
                    <div className='book-authors'>{book.authors}</div>
                </div>
            </li>
        )
    }
}

export default Book
