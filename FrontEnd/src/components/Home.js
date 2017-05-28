import React from 'react'
import Auth from './../models/Auth'

const Home = ({reRender}) => {

    function handleSubmit(evt) {
        evt.preventDefault()
        const target = evt.target
        const password = target.password.value
        const userName = target.username.value
        Auth.sendLoginToServer(userName, password, function (token) {
            if (token != null) {
                Auth.authenticateUser(token, userName)
                reRender()
            }
            else {
                alert("Username and Password is not matching..")
            }
        })
    }

    function logout() {
        console.log("Logout..")
        Auth.deauthenticateUser()
        reRender()
    }

    if (!Auth.isUserAuthenticated()) {
        return (
            <div>
                <h2>Home</h2>
                <h4>Log-in</h4>
                <form id="loginform" className="col-md-4" onSubmit={handleSubmit}>
                    <div className="form-group">
                        <label htmlFor="username">Username</label>
                        <input id="username" className="form-control" />
                        <br/>

                        <button type="submit" className="btn">
                                Log-in
                            </button>
                        </div>
                    </form>

            </div>
        )
    }
}
export default Home

