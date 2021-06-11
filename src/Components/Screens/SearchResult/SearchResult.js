import React from "react";
import "../../Header/Header.css";
import "./SearchResult.css";
import { Link } from "react-router-dom";
import NoUserImage from "../../assets/defaultNoUser.jpg";
import pd4 from "../../assets/pd4.jpeg";

class SearchResult extends React.PureComponent {
  constructor(props) {
    super(props);
    this.key = JSON.parse(localStorage.getItem("searchKey"));
    this.document = JSON.parse(localStorage.getItem("userData"));
    this.state = {
      userName: "Signin",
      userMail: "",
      sideMenuClass: false,
      scollUp: false,
      searchedFor: this.key.searchKeyword,
      searched: true,
      product: [],
      searchResultMessage: "",
      showOnly: 10,
      showOnlyBtn: false,
    };
  }
  listenScrollEvent = async () => {
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
  searchForProduct = async () => {
    localStorage.setItem(
      "searchKey",
      JSON.stringify({ searchKeyword: this.state.searchedFor })
    );
    // this.setState({
    //     product: this.document.sell.filter(item => item.productName.includes(this.state.searchedFor.trim()))
    // })
    const response = await fetch("/api/user/mainSearch", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        searchedKey: this.state.searchedFor.trim(),
      }),
    });

    const resMsg = await response.json();
    if (resMsg.status === "ok") {
      this.setState({
        product: resMsg.data,
      });
      if (resMsg.data.length === 0) {
        this.setState({
          searchResultMessage: "no product available of this type",
        });
      } else {
        this.setState({
          searchResultMessage: "",
        });
      }
    }
    this.setState({
      showOnlyBtn: true,
      showOnly: 10,
    });
    // localStorage.setItem('userData',JSON.stringify(resMsg));
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
    // localStorage.removeItem('searchKey')
  }
  componentDidMount = () => {
    this.searchForProduct();

    window.addEventListener("scroll", this.listenScrollEvent);
    this.searchingResult = this.searchingResult.bind(this);
    this.document = JSON.parse(localStorage.getItem("userData"));
    if (localStorage.getItem("userData")) {
      this.setState({
        userName: this.document.firstName,
        userMail: this.document.email,
      });
    }
  };
  gettingDetail = (item) => {
    localStorage.setItem("itemDetails", JSON.stringify(item));
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
              <a href="/">
                <i className="fa fa-home" />
                Home
              </a>
              <a href="/user/signin">
                <i className="fa fa-user" />
                Account
              </a>
              <a href="1">
                <i className="fa fa-cog" />
                Setting
              </a>
              <a href="2">
                <i className="fa fa-list" />
                WishList
              </a>
              <a href="3">
                <i className="fa fa-car" />
                Cars
              </a>
              <a href="4">
                <i className="fa fa-users" />
                About us
              </a>
              <a href="5">
                <i className="fa fa-phone" />
                Contact us
              </a>
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
                  <a href="/user/sell">
                    <i className="fa fa-plus" />
                  </a>
                </div>
                <div className="userLog">
                  <a href="/user/signin">
                    <i className="fa fa-user" />
                  </a>
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
                    <i
                      style={{ Color: this.state.scrollUp ? "white" : "" }}
                      className="fa fa-search"
                    />
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
        <div className="searchResultPage">
          <span
            style={{
              margin: "10px 0",
              textAlign: "center",
              fontSize: "22px",
              fontFamily: "Itim, cursive",
              display: this.state.product.length === 0 ? "block" : "none",
            }}
          >
            {this.state.searchResultMessage}
          </span>
          <div className="searchResult">
            {this.state.product.slice(0, this.state.showOnly).map((item, i) => (
              <div className="searchResultProductCard" key={i}>
                <Link
                  to={{
                    pathname: "/user/prddetails/" + item.productName,
                  }}
                  onClick={() => this.gettingDetail(item)}
                >
                  <div className="resultProductImg">
                    <img src={pd4} alt={item.productName} />
                  </div>
                </Link>
                <div className="resultDescription">
                  <span>
                    <b>{item.productName}</b>
                  </span>
                  <span style={{ color: "green" }}>{item.productPrice}₹</span>
                  <span style={{ color: "grey" }}>
                    {item.productDescription}
                  </span>
                </div>
              </div>
            ))}
          </div>
          <div
            style={{ display: this.state.showOnlyBtn ? "flex" : "none" }}
            className="moreShowBtns"
          >
            <button
              onClick={() =>
                this.setState({ showOnly: this.state.showOnly - 10 })
              }
              style={{ display: this.state.showOnly <= 10 ? "none" : "block" }}
            >
              show less
            </button>
            <button
              onClick={() =>
                this.setState({ showOnly: this.state.showOnly + 10 })
              }
              style={{
                display:
                  this.state.showOnly >= this.state.product.length
                    ? "none"
                    : "block",
              }}
            >
              show more
            </button>
          </div>
        </div>
      </>
    );
  }
}

export default SearchResult;
