/**
 * Created by josephawwal on 28/05/17.
 */
import React from 'react'
import {Component} from 'react'
import Home from './Home'
import Blog from './Blog'
import Product from './Product'
import Details from './Details'
import LoginStatus from './LoginStatus'
import {observer} from 'mobx-react'
import {
    BrowserRouter as Router,
    HashRouter,
    Switch,
    Route,
    Link
    NavLink
} from 'react-router-dom'
import NoMatch404 from './404NoMatch'

@observer
class RouterComponent extends Component {
    constructor(props) {

        super(props)

    }

    render() {
        var bookStore = this.props.bookStore
        return (
            <HashRouter>
                <div>
                    <ul className="header"><Route path="/products/details/:id" render={(props) =>(
                        <Details bookStore={bookStore} id={props.match.params.id}/>)}></Route>
                        <li><Link to="/" selected="activeclass">Home </Link></li>
                        <li><Link to="/products">Product </Link></li>
                        <li><Link to="/blog">Blog</Link></li>
                        <li style={{float: "right"}}><LoginStatus/></li>
                    </ul>

                    <Route path="/" exact component={()=> (<Home reRender={this.reRender}/>)}></Route>
                    <Route path="/blog" component={Blog}></Route>
                    <Route exact path="/products" component={() => (<Product bookStore={bookStore}/>)}></Route>
                    <Route path="/products/details/:id"
                           render={(props) =>( <Details bookStore={bookStore} id={props.match.params.id}/>)}></Route>
                    <Route path="/*" component={NoMatch404}></Route>

                </div>
            </HashRouter>
        )
    }

}
export default RouterComponent