import React from "react";
import "./Header.css";
import { Link } from "react-router-dom";
import NoUserImage from "../assets/defaultNoUser.jpg";

class Header extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      userName: "Signin",
      userMail: "",
      sideMenuClass: false,
      scollUp: false,
      searchedFor: "",
      searched: false,
    };
  }
  listenScrollEvent = async (e) => {
    if (window.scrollY >= 70) {
      this.setState({
        scrollUp: true,
      });
    } else {
      this.setState({
        scrollUp: false,
      });
    }
  };
  searchForProduct = () => {
    localStorage.setItem(
      "searchKey",
      JSON.stringify({ searchKeyword: this.state.searchedFor })
    );
  };
  searchingResult = async (e) => {
    this.setState({
      searchedFor: e.target.value,
    });
    if (e.target.value.trim() === "") {
      this.setState({
        searched: false,
      });
    } else {
      this.setState({
        searched: true,
      });
    }
  };
  componentWillUnmount() {
    window.removeEventListener("scroll", this.listenScrollEvent);
  }
  componentDidMount = () => {
    window.addEventListener("scroll", this.listenScrollEvent);

    this.document = JSON.parse(localStorage.getItem("userData"));
    if (localStorage.getItem("userData")) {
      this.setState({
        userName: this.document.firstName,
        userMail: this.document.email,
      });
    }
  };
  sideMenuToggle = () => {
    this.setState({
      sideMenuClass: !this.state.sideMenuClass,
    });
  };
  render() {
    return (
      <>
        <div
          className="sideMenuBack"
          style={{ display: this.state.sideMenuClass ? "flex" : "none" }}
        >
          <div
            className={
              this.state.sideMenuClass ? "sideMenuOpen" : "sideMenuClose"
            }
          >
            <div className="userProfileBox">
              <div className="userDP">
                <img src={NoUserImage} alt="" />
              </div>
              <div className="userName">
                <span id="name">Hello, {this.state.userName}</span>
                <span id="email" style={{ color: "grey" }}>
                  {this.state.userMail}
                </span>
              </div>
            </div>
            <div className="sideMenuLinkBox">
              <Link to="/">
                <span>
                  <i className="fa fa-home" />
                  Home
                </span>
              </Link>
              <Link to="/user/signin">
                <span>
                  <i className="fa fa-user" />
                  Account
                </span>
              </Link>
              <Link to="1">
                <span>
                  <i className="fa fa-cog" />
                  Setting
                </span>
              </Link>
              <Link to="2">
                <span>
                  <i className="fa fa-list" />
                  WishList
                </span>
              </Link>
              <Link to="3">
                <span>
                  <i className="fa fa-car" />
                  Cars
                </span>
              </Link>
              <Link to="4">
                <span>
                  <i className="fa fa-users" />
                  About us
                </span>
              </Link>
              <Link to="5">
                <span>
                  <i className="fa fa-phone" />
                  Contact us
                </span>
              </Link>
            </div>
          </div>
          <div className="closeMenuBtn" onClick={this.sideMenuToggle}>
            <i className="fa fa-times" />
          </div>
        </div>

        <header>
          <div className="upperNav">
            <div className="burgerMenuBox">
              <div className="burgerMenu" onClick={this.sideMenuToggle}>
                <i className="fa fa-bars"></i>
              </div>
            </div>
            <div className="mainBox">
              <div className="logo">
                <span id="logo">ShopKart</span>
              </div>
              <div className="menus">
                <div className="userSell">
                  <Link to="/user/sell">
                    <i className="fa fa-plus" />
                  </Link>
                </div>
                <div className="userLog">
                  <Link to="/user/signin">
                    <i className="fa fa-user" />
                  </Link>
                </div>
                <div className="userChat">
                  <i className=" fa fa-comment"></i>
                </div>
              </div>
            </div>
          </div>
          <div
            className="bottomNav"
            style={{
              backgroundColor: this.state.scrollUp
                ? "rgba(100, 200, 255, 0.3)"
                : "",
            }}
          >
            <div
              className="menuBTN BATAN"
              style={{
                display: this.state.scrollUp ? "flex" : "none",
                minwidth: "0",
              }}
              onClick={this.sideMenuToggle}
            >
              <i className="fa fa-bars" />
            </div>
            <div
              className="searchBarBox"
              style={{ width: this.state.scrollUp ? "75%" : "95%" }}
            >
              <div className="searchBar">
                <input
                  value={this.state.searchedFor}
                  onChange={this.searchingResult}
                  type="text"
                  placeholder="Search..."
                />
              </div>
              <div className="searchIcon">
                {this.state.searched ? (
                  <button type="submit" onClick={this.searchForProduct}>
                    <Link
                      to={{
                        pathname: "/user/searched/" + this.state.searchedFor,
                      }}
                    >
                      <i
                        style={{ Color: this.state.scrollUp ? "white" : "" }}
                        className="fa fa-search"
                      />
                    </Link>
                  </button>
                ) : (
                  <button>
                    <i
                      style={{ Color: this.state.scrollUp ? "white" : "" }}
                      className="fa fa-search"
                    />
                  </button>
                )}
              </div>
            </div>
            <div
              className="chatBTN BATAN"
              style={{ display: this.state.scrollUp ? "flex" : "none" }}
            >
              <i className="fa fa-comment" />
            </div>
          </div>
        </header>
      </>
    );
  }
}

export default Header;
