import React from 'react'
import Categories from '../SmallComponents/Categories'
import './Body.css'
import p1 from '../assets/p1.jpeg'
import { Link } from 'react-router-dom'

class Body extends React.PureComponent {
    constructor(props) {
        super(props)
        this.state = {
            productsList: [],
            showPrd: 2,
            showBtn: false,
            mssg: ""
        }
    }
    gettingDetail = (item) => {
        localStorage.setItem('itemDetails',JSON.stringify(item));
        console.log("item details saved")
    }
    categorySearched = async (ctg) => {
        const response = await fetch('/api/user/ctgSearched', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                showQty: this.state.showPrd,
                ctgprd: ctg
            })
        });
        const resMsg = await response.json();
        if(resMsg.length === 0) {
            this.setState({
                mssg: "No product available of this type"
            })
        }
        else {
            this.setState({
                mssg: ""
            })
        }
        this.setState({
            productsList: resMsg,
            showPrd: 2,
            showBtn: true
        })
    }
    render() {
        const ctgList = Categories;
        return (
            <>
                <div className="body">
                    <span className="categoryHeading">Browse Category</span>
                    <div className="categories">
                        {
                            ctgList.data.map(ctg => 
                                <div className="category" key={ctg._id} onClick={() => this.categorySearched(ctg.category)}>
                                    <div className="categoryCard">
                                        <div className="ctgLogo">
                                            <i className={ctg.icon} style={{backgroundColor: ctg.bgcolor}} />
                                        </div>
                                        <div className="ctgDes">
                                            <span>{ctg.category}</span>
                                        </div>
                                    </div>
                                </div>
                            )
                        }
                    </div>
{/* ---------------------------------------------------------------- */}
                    <div className="productsList">
                        {
                            this.state.productsList.slice(0,this.state.showPrd).map(prd => 
                                <div className="prdCard" key={prd.product_id}>
                                    <Link to={{
                                        pathname: "/user/prddetails/" + prd.productName
                                    }} onClick={() => this.gettingDetail(prd)}>
                                        <div className="prdImg">
                                            <img src={p1} alt={prd.productName} />
                                        </div>
                                    </Link>
                                    <div className="prdDes">
                                        <span><b>{prd.productName}</b></span><br/>
                                        <span style={{color: "green"}}>{prd.productPrice}₹</span><br/>
                                        <span style={{color: "grey"}}>{prd.productDescription}</span>
                                    </div>
                                </div>
                            )
                        }
                        <span style={{margin: '0 10px', fontFamily: 'Itim, cursive', display: this.state.productsList.length===0?'block':'none'}}>{this.state.mssg}</span>
                    </div>
                    <div style={{display: this.state.showBtn?'flex':'none'}} className="moreBtns">
                        <button onClick={()=> this.setState({showPrd: this.state.showPrd-2})} style={{display: this.state.showPrd<=2?'none':'block'}}>show less</button>
                        <button onClick={()=> this.setState({showPrd: this.state.showPrd+2})} style={{display: (this.state.showPrd>=this.state.productsList.length)?'none':'block'}}>show more</button>
                    </div>
{/* ----------------------------------------------------------------------- */}
                    <div className="textMsgBox">
                        <div className="msgBox">
                            a small scale apllication to sell products in range of Kotdwara & Najibabad.
                        </div>
                        <div className="msgBox">
                            Search, Check, Chat & call in a particular place, purchase your Product.
                        </div>
                        <div className="msgBox">
                            No online payment, meet face to face, take phone number in chatbox.
                        </div>
                    </div>
                    <div className="sellBox">
                        <Link to="/user/sell">
                            <div className="sellbtn">
                                <i className="fa fa-plus" style={{fontSize: "22px", color: "rgb(100, 200, 255)", fontWeight: "bold"}} />
                            </div>
                        </Link>
                    </div>
                </div>
            </>
        )
    }
}

export default Body
