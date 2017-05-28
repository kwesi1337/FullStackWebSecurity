/**
 * Created by josephawwal on 28/05/17.
 */
import {Component} from 'react'

class BooksForm extends Component{

    constructor(props){
        super(props);
    }

    handleSubmit = (evt) =>{
        evt.preventDefault()
        const target = evt.target
        var book = {}
        book.title = target.title.value
        book.moreInfo = target.moreInfo.value
        this.props.bookStore.addBook(book)

    }

    render() {
        return (
            <div>
                <form style={{ marginTop: 50 }} onSubmit={this.handleSubmit} >
                    <div className="row">
                        <div className="col-sm-2" >
                            <p>Title:</p>
                        </div>
                        <div className="col-sm-4">
                            <input type="text" id="title" />
                        </div>
                    </div>
                    <div className="row">
                        <div className="col-sm-2">
                            <p>Info:</p>
                        </div>
                        <div className="col-sm-4">
                            <input type="text" id="info" />
                        </div>
                        <div className="row">
                            <div className="col-sm-2">
                                <p>MoreInfo:</p>
                            </div>
                            <div className="col-sm-4">
                                <input type="text" id="moreInfo" />
                            </div>
                        </div>
                    </div>

                    <button className="btn">Save</button>
                </form>
            </div>
        )
    }
}

export default BooksForm