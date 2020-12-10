import React from 'react'
import './AddProduct.css'
import noUserImage from '../../assets/defaultNoUser.jpg'

class AddProduct extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            productImagePreview: noUserImage,
            productImage: noUserImage,
            productImageName: "",
            productName: "",
            productDescription: "",
            productPrice: "",
            productCategory: "",
            productQuantity: 1,
            _id: "",
            modalShow: false
        }
    }
    imageHandler = e => {
        const reader = new FileReader();


        reader.onload = () => {

        }
        reader.onloadend = () => {
            this.setState({
                productImage: reader.result,
                productImagePreview: reader.result
            })
        }
        reader.readAsDataURL(e.target.files[0])
        this.setState({
            productImageName: e.target.files[0].name
        })
        
       
    }
    handleSubmit = async e => {
        // e.preventDefault();
        
        const response = await fetch('/api/user/productsale', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                _id: this.state._id,
                productImage: this.state.productImage,
                productImageName: this.state.productImageName,
                productName: this.state.productName,
                productCategory: this.state.productCategory,
                productQuantity: this.state.productQuantity,
                productDescription: this.state.productDescription,
                productPrice: this.state.productPrice
            })
        });
        
        const resMsg = await response.json();
        console.log(resMsg)
        this.setState({
            sellingList: resMsg.sell
        })
        if(resMsg.prdadded === "ok") {
            this.setState({
                modalShow: !this.state.modalShow
            })
            alert("product added")
            console.log("product added")
        }
        console.log(this.state.sellingList)
        localStorage.setItem('userData',JSON.stringify(resMsg));
        // this.toggleDialogView()
        this.componentDidMount()
    }
    async componentDidMount() {
        this.document = JSON.parse(localStorage.getItem('userData'));
        if(localStorage.getItem('userData')) {
            console.log(this.document)
            this.setState({
                _id: this.document._id
            })
        }
        else {
            this.setState({
                _id: ''
            })
        }
    }
    toggleDialogView = e => {
        e.preventDefault();
        if(e.target.className !== "dialog" && e.target.id !== "head" && e.target.id !== "mssge" && e.target.className !== "dialogBtns") {
            this.setState({
                modalShow: !this.state.modalShow
            })
        }

    }
    render() {
        return (
            <>
                <div className="addNewProduct">
                    <div className="dialogBox" style={{display: this.state.modalShow?"flex":"none"}} onClick={this.toggleDialogView}>
                        <div className="dialog">
                            <h2 id="head">
                                Add Product
                            </h2>
                            <span id="mssge">
                                Do you want to add ?
                            </span>
                            <div className="dialogBtns">
                                <button onClick={this.toggleDialogView}>Cancel</button>
                                <button onClick={this.handleSubmit}>Yes, add</button>
                            </div>
                        </div>
                    </div>
                    <div className="newProduct">
                        <h2>Add a new Product</h2>
                        <div className="form">
                            <form onSubmit={this.toggleDialogView}>
                                <div className="imgHolder">
                                    <img src={this.state.productImagePreview} alt="" />
                                </div>
                                <div>{this.state.productImageName}</div>
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
                                    <button type="submit">add Product</button>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
            </>
        )
    }
}

export default AddProduct
