import React from "react";
import { Link, Redirect } from "react-router-dom";
import "./css/Sign.css";

class Signin extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      name: "",
      phone: "",
      email: "",
      password: "",
      isLoggedin: false,
      message: "",
      redirect: false,
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
    const response = await fetch("/api/user/signInEmailLiveSearch", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        // phone: this.state.phone,
        email: e.target.value,
      }),
    });

    const resmessage = JSON.parse(await response.text());
    if (resmessage.isLoggedIn === true) {
      this.changeMessage(resmessage.message);
    } else {
      this.changeMessage(resmessage.message);
    }
  };
  handleSubmit = async (e) => {
    e.preventDefault();
    const response = await fetch("/api/user/signin", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        email: this.state.email,
        password: this.state.password,
      }),
    });
    const resmessage = await response.json();
    if (resmessage.isLoggedIn === true) {
      localStorage.setItem("userData", JSON.stringify(resmessage));

      this.setRedirect();
    } else {
      this.changeMessage(resmessage.message);
    }
  };

  authenticating = () => {
    if (localStorage.getItem("userData")) {
      return <Redirect to="/user/signout" />;
    }
  };
  render() {
    return (
      <>
        <div>{this.authenticating()}</div>
        <div>{this.renderRedirect()}</div>
        <div className="pg">
          <div className="page">
            <div className="logo">
              <h1>ShopKart</h1>
            </div>
            <div className="message">
              <p>{this.state.message}</p>
            </div>
            <div className="form">
              <form onSubmit={this.handleSubmit}>
                <h2>Login</h2>
                <div>
                  <label>Email</label>
                  <br />
                  <input
                    value={this.state.email}
                    onChange={this.liveSearching}
                    type="email"
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
                    type="password"
                  />
                  <br />
                </div>
                <div>
                  <button type="submit">Sign in</button>
                </div>
              </form>
            </div>
            <div className="abc">
              <span>New to ShopKart?</span>
              <Link to="/user/signup">
                <button>Create your Account</button>
              </Link>
              <Link to="/">
                <button>Cancel Signin</button>
              </Link>
            </div>
          </div>
        </div>
      </>
    );
  }
}

export default Signin;
