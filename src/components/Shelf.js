import React, {Component} from 'react'
import PropTypes from 'prop-types'
import Book from './Book'

class Shelf extends Component {
    static propTypes = {
        books: PropTypes.array.isRequired,
        title: PropTypes.string.isRequired,
        changeHandler: PropTypes.func.isRequired
    }

    render() {
        const { books, title, changeHandler } = this.props

        return (
            <div className='bookshelf'>
                <h2 className='bookshelf-title'>{title}</h2>
                <div className='bookshelf-books'>
                    <ol className='books-grid'>
                    { books.map((book) => {
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

export default Shelf