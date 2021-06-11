import React from "react";
import "./css/Sign.css";
import { Link, Redirect } from "react-router-dom";

class Signup extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      firstName: "",
      lastName: "",
      // phone: "",
      email: "",
      password: "",
      sell: [],
      message: "",
      isLoggedin: false,
      redirect: false,
      // conPass: ""
    };
  }
  setRedirect() {
    this.setState({
      redirect: true,
    });
  }
  renderRedirect() {
    if (this.state.redirect) {
      return <Redirect to="/" />;
    }
  }
  changeMessage = (resM) => {
    this.setState({
      message: resM,
    });
  };
  liveSearching = async (e) => {
    e.preventDefault();
    this.setState({ email: e.target.value });
    const response = await fetch("/api/user/signUpEmailLiveSearch", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        // phone: this.state.phone,
        email: e.target.value,
      }),
    });

    const resmessage = JSON.parse(await response.text());
    this.changeMessage(resmessage.message);
  };
  handleSubmit = async (e) => {
    e.preventDefault();
    const response = await fetch("/api/user/signup", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        firstName: this.state.firstName,
        lastName: this.state.lastName,
        // phone: this.state.phone,
        email: this.state.email,
        password: this.state.password,
        sell: this.state.sell,
      }),
    });

    const resmessage = JSON.parse(await response.text());
    if (resmessage.isLoggedIn === true) {
      localStorage.setItem("userData", JSON.stringify(resmessage));
      this.setRedirect();
    } else {
      this.changeMessage(resmessage.message);
    }
  };
  render() {
    return (
      <>
        <div>{this.renderRedirect()}</div>
        <form onSubmit={this.handleSubmit}>
          <div className="pg">
            <div className="page">
              <div className="logo">
                <h1>ShopKart</h1>
              </div>
              <div className="message">
                <p>{this.state.message}</p>
              </div>
              <div className="form">
                <span>Create Account</span>
                <div>
                  <label>First Name</label>
                  <br />
                  <input
                    value={this.state.firstName}
                    onChange={(e) =>
                      this.setState({ firstName: e.target.value })
                    }
                    type="text"
                    required
                  />
                  <br />
                </div>
                <div>
                  <label>Last Name</label>
                  <br />
                  <input
                    value={this.state.lastName}
                    onChange={(e) =>
                      this.setState({ lastName: e.target.value })
                    }
                    type="text"
                  />
                  <br />
                </div>
                {/* <div>
                                    <label>Mobile number</label><br />
                                    <input value={this.state.phone} onChange={e => this.setState({phone: e.target.value})} type="tel" pattern="[0-9]{10}" placeholder="Optional" /><br />
                                </div> */}
                <div>
                  <label>Email</label>
                  <br />
                  <input
                    value={this.state.email}
                    onChange={this.liveSearching}
                    type="email"
                    required
                  />
                  <br />
                </div>
                <div>
                  <label>Password</label>
                  <br />
                  <input
                    value={this.state.password}
                    onChange={(e) =>
                      this.setState({ password: e.target.value })
                    }
                    type="text"
                    required
                  />
                  <br />
                </div>
                <div>
                  <p style={{ color: "red" }}></p>
                </div>
                <div>
                  <button type="submit">Create Account</button>
                </div>
              </div>
              <div className="abc">
                <span>Already have an account? </span>
                <Link to="/user/signin">Sign in</Link>
                <Link to="/">
                  <button>Cancel Signup</button>
                </Link>
              </div>
            </div>
          </div>
        </form>
      </>
    );
  }
}

export default Signup;
