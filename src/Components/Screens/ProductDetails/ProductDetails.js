import React from 'react'
import './ProductDetails.css'
import Header from '../../Header/Header'

class ProductDetails extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            Item: JSON.parse(localStorage.getItem('itemDetails'))
        }
    }
    render() {
        return (
            <>
                <Header />
                <div className="productDetailPage">
                    <div className="topper">
                        <span id="prdName">{this.state.Item.productName}</span>
                        <div className="itemImg">
                            <img src="" alt="" />
                            <p>your product image will be here</p>
                        </div>
                        <span id="prdPrice">{this.state.Item.productPrice}₹</span>
                        <span>{this.state.Item.productDescription}</span>
                    </div>
                    <div className="middler">
                        <span>Seller Name: {this.state.Item.sellerName}</span>
                        <span>Category: {this.state.Item.productCategory}</span>
                        <span>Qty: {this.state.Item.productQuantity}</span>
                    </div>
                    <div className="lower">

                    </div>
                </div>
            </>
        )
    }
}

export default ProductDetails
