import React from 'react'
import { Redirect } from 'react-router-dom'
import './css/SignOut.css'

class Signout extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            _id: "",
            name: "",
            phone: "",
            email: "",
            password: "",
            isDataRemoved: false
        }
    }
    componentDidMount() {
        this.document = JSON.parse(localStorage.getItem('userData'));
        if(localStorage.getItem('userData')) {
            this.setState({
                _id: this.document._id,
                name: this.document.name,
                phone: this.document.phone,
                email: this.document.email,
                password: this.document.password
            })
        }
        else {
            this.setState({
                _id: '',
                name: '',
                phone: '',
                email: '',
                password: '',
            })
        }
    }
    loggingOut = () => {
        localStorage.removeItem("userData");
        this.setState({
            isDataRemoved: true
        })
    }
    goingBack = () => {
        if(this.state.isDataRemoved) {
            return <Redirect to="/" />
        }
    }
    render() {
        return (
            <>

                <div className="userPage">
                    <div className="userBox">
                        <div className="forUserPofile">
                            <div className="userProfile">
                                <img src={require('../../assets/p1.jpeg')} alt="" />
                            </div>
                        </div>
                        <div className="forUserDetails">
                            <div className="userDetails">
                                <div className="userId">
                                    <span>{this.state._id}</span>
                                </div>
                                <div className="userName">
                                    <span>{this.state.name}</span>
                                </div>
                                <div className="userPhone">
                                    <span>{this.state.phone}</span>
                                </div>
                                <div className="userEmail">
                                    <span>{this.state.email}</span>
                                </div>
                            </div>
                        </div>
                        <div className="userOut">
                            <button onClick={this.loggingOut}>Logout</button>
                        </div>
                    </div>
                </div>
                
                <div>{this.goingBack()}</div>


            </>
        )
    }
}

export default Signout
