import React from "react";
import { Link, Redirect } from "react-router-dom";
import "./ProductSell.css";
import samosaImage from "../../assets/samosa.jpg";
// import Header from '../Header'

class SellProducts extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      _id: "86",
      sellingList: [],
      email: "",
      searchInput: "",
      searched: false,
      searchMessage: "",
    };
  }
  refreshData = async (e) => {
    e.preventDefault();
    this.setState({
      sellingList: this.document.sell,
      _id: this.document._id,
      email: this.document.email,
    });
    const response = await fetch("/api/user/datacourier/userdata", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        _id: this.state._id,
        email: this.state.email,
      }),
    });
    const resMsg = await response.json();
    this.setState({
      sellingList: resMsg.sell,
    });
    localStorage.setItem("userData", JSON.stringify(resMsg));
  };

  async componentDidMount() {
    this.document = JSON.parse(localStorage.getItem("userData"));
    if (localStorage.getItem("userData")) {
      this.setState({
        sellingList: this.document.sell,
        _id: this.document._id,
        email: this.document.email,
      });
    } else {
      this.setState({
        sellingList: [],
        _id: "",
        email: "",
      });
    }
  }

  authenticatingSell = () => {
    if (localStorage.getItem("userData")) {
      // ---
    } else {
      return <Redirect to="/user/signin" />;
    }
  };
  clearInput = () => {
    this.setState({
      searchInput: "",
      sellingList: this.document.sell,
      searched: false,
    });
  };
  searchingResult = async (e) => {
    this.setState({
      searchInput: e.target.value,
    });
    if (e.target.value === "") {
      this.setState({
        searched: false,
      });
    } else {
      this.setState({
        searched: true,
      });
    }

    this.setState({
      sellingList: this.document.sell.filter((item) =>
        item.productName
          .toString()
          .toLowerCase()
          .includes(e.target.value.toString().toLowerCase().trim())
      ),
    });

    if (this.state.sellingList === [null]) {
      this.setState({
        searchMessage: "Nothing Found!",
      });
    } else {
      this.setState({
        searchMessage: "",
      });
    }
  };
  gettingDetail = (item) => {
    localStorage.setItem("myPrdDetails", JSON.stringify(item));
  };
  render() {
    return (
      <>
        <div>{this.authenticatingSell()}</div>

        <div className="sellPage">
          <div className="secondHeader">
            <div className="forNavLinks">
              <a href="/">Home</a>
            </div>
            <div className="forSearchBar">
              <input
                type="text"
                value={this.state.searchInput}
                onChange={this.searchingResult}
                placeholder="search & see your products"
              />
              <i
                className={this.state.searched ? "fa fa-times" : "fa fa-search"}
                onClick={this.clearInput}
              />
              {this.state.searchResult}
            </div>
          </div>
          <h1>sell your products here</h1>

          <div className="addedProductListHead">
            <div className="head">
              <h2>added items</h2>
              <Link to="/user/addprd">
                <i className="fa fa-plus" />
              </Link>
            </div>
          </div>
          <div className="sellProducts">
            <div className="addedProductListBox">
              <button id="refreshBTN" onClick={this.refreshData}>
                Refresh your products
              </button>
              <h2>{this.state.searchMessage}</h2>

              <div className="addedProductList">
                {this.state.sellingList.map((item, i) => (
                  <div className="addedProductBox" key={i}>
                    {" "}
                    <div className="addedProduct">
                      <div className="addedProductImageBox">
                        <div className="addedProductImage">
                          <Link
                            to={{
                              pathname: "/user/myprd/" + item.product_id,
                              prd_id: item.product_id,
                            }}
                          >
                            <div
                              className="xPrdImage"
                              onClick={() => this.gettingDetail(item)}
                            >
                              <img src={samosaImage} alt="" />
                            </div>
                          </Link>
                        </div>
                      </div>
                      <div className="addedProductDetailBox">
                        <div className="addedProductDetails">
                          <div id="addedPrd">
                            <p>
                              <b>{item.productName}</b>
                            </p>
                          </div>
                          <div id="addedPrd">
                            <p>{item.productPrice}₹</p>
                          </div>
                          <div id="addedPrd">
                            <i>{item.productDescription}</i>
                          </div>
                        </div>
                      </div>
                    </div>
                    {/* <hr style={{width: '85%', align: 'center', color: 'grey' }} /> */}
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </>
    );
  }
}

export default SellProducts;
