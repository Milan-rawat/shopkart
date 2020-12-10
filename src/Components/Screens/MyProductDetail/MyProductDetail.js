import React from 'react'
import './MyProductDetail.css'

class MyProductDetail extends React.Component {
    constructor(props) {
        super(props)
        this.document = JSON.parse(localStorage.getItem('userData'));
        this.prdDetls = JSON.parse(localStorage.getItem('myPrdDetails'));
        this.state = {
            product: this.prdDetls,
            productName: this.prdDetls.productName,
            productPrice: this.prdDetls.productPrice,
            productCategory: this.prdDetls.productCategory,
            productQuantity: this.prdDetls.productQuantity,
            productDescription: this.prdDetls.productDescription
        }
        console.log(this.document)
        console.log()

    }
    updateProduct = () => {
        // e.preventDefault();
        // const response = await fetch('/api/user/prddetails/update', {
        //     method: 'POST',
        //     headers: { 'Content-Type': 'application/json' },
        //     body: JSON.stringify({
        //         user_id: this.document._id,
        //         productName: this.state.productName,
        //         productPrice: this.state.productPrice,
        //         productCategory: this.state.productCategory,
        //         productQuantity: this.state.productQuantity,
        //         productDescription: this.state.productDescription
        //     })
        // });
        console.log(this.document._id)
    }
    render() {
        // const product = Products.data.find(x => x.product_id === props.match.params.product_id);
        return (
            <>  
                <div className="myPrdDetails">

                    <div className="pDetails">
                        <h2>Product Details</h2>
                        <span>Product id:- {this.state.product.product_id}</span>
                        <span>Product Name:- {this.state.product.productName}</span>
                        <span>Product Description:- {this.state.product.productDescription}</span>
                        <span>Product Quantity:- {this.state.product.productQuantity}</span>
                        <span>Product Category:- {this.state.product.productCategory}</span>
                    </div>
                    <form onSubmit={this.updateProduct}>
                        {/* <div className="imgHolder">
                            <img src={this.state.productImagePreview} alt="" />
                        </div>
                        <div>{this.state.productImageName}</div> */}
                        <h2>Update your Product details</h2>
                        <div>
                            <label>Product Image</label><br />
                            <input onChange={this.imageHandler} type="file" accept="image/*" /><br />
                        </div>
                        <div>
                            <label>Product Name</label><br />
                            <input value={this.state.productName} onChange={e => this.setState({productName: e.target.value})} type="text" required /><br />
                        </div>
                        <div>
                            <label>Product Price</label><br />
                            <input value={this.state.productPrice} onChange={e => this.setState({productPrice: e.target.value})} type="text" required /><br />
                        </div>
                        <div>
                            <label>Product Category</label><br />
                            <select value={this.state.productCategory} onChange={e => this.setState({productCategory: e.target.value})} type="text" required >
                                <option disabled style={{display: 'none'}}></option>
                                <option>CARS</option>
                                <option>MOBILE</option>
                                <option>BIKES</option>
                                <option>ELECTRONICS</option>
                                <option>FURNITURE</option>
                                <option>FASHION</option>
                                <option>SPORTS</option>
                                <option>PETS</option>
                                <option>BOOKS</option>
                                <option>HOBBIES & OTHERS</option>
                            </select><br />
                        </div>
                        <div>
                            <label>Product Quantity</label><br />
                            <input value={this.state.productQuantity} onChange={e => this.setState({productQuantity: e.target.value})} type="number" required /><br />
                        </div>
                        <div>
                            <label>Product Description</label><br />
                            <textarea value={this.state.productDescription} onChange={e => this.setState({productDescription: e.target.value})} type="text" required /><br />
                        </div>
                        <div>
                            <button type="submit">Update Product</button>
                        </div>
                    </form>
                </div>
            </>
        )
    }
}

export default MyProductDetail
