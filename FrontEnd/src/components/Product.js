/**
 * Created by josephawwal on 28/05/17.
 */
import React from 'react'
import {Link} from 'react-router-dom'
import {observer} from 'mobx-react'
import BooksForm from './BooksForm'

const Product = observer((props) =>{
    if(books == null) books = []
    const BooksMapped = books.map((book) => {
        return(
            <li key={book.id}>
                <Link to={`products/details/${book.id}`}> {book.title} - (details)</Link>
                    </li>)})

    return(
        <div>
            <h2>Our books</h2>
            <h4>All our good books</h4>
            <ul>
                {BooksMapped}

            </ul>

            <BooksForm bookStore ={props.bookStore}/>


        </div>
        )
    })

export default Product
