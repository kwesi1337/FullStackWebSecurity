/**
 * Created by josephawwal on 28/05/17.
 */

import {observable, action, useStrict, extendObservable} from 'mobx'
import axios from 'axios'
import Auth from './Auth'
var baseFetchUrl = "https://localhost:3050"

useStrict(true)
class BookStore {

    constructor() {
        extendObservable(this, {
            _books: []
        })
        this._books = this.fetchBooks()
    }

    getAllBooks() {
        return this._books
    }

    getSingleBook = action((id) => {
        if (this._books == null) {
            return null
        }
        var returnBook;
        this._books.forEach((book, index) => {
            if (book.id == id) {
                returnBook = this._books[index]
            }
        })
        return returnBook;
    })

    changeBooks = action((books) => {
        this._books = books
        // Not good but doesnt work else.
    })

    addBook = action((book) => {

        var config = {
            headers: {'Authorization': "JWT" + Auth.getToken()}
        }

        axios.delete(`${baseFetchUrl}/api/books/${bookId}`, config)
            .then((response) => {
                console.log(response)
                this.fetchBooks()
            })
            .catch((error) => {
                console.log(error)
            })

    })

    fetchBooks = () => {
        fetch(`${baseFetchUrl}/api/books `).then((response) => {
            return response.json()
        }).then((response) => {
            this.changeBooks(response)
        }).catch((err) =>{
            console.log(err)
        })

    }

}

let store = new BookStore()
window.store = store

export default store