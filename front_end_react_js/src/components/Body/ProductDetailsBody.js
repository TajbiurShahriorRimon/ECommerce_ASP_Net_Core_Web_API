import React, {Component} from "react";
import {TransformWrapper, TransformComponent} from "react-zoom-pan-pinch";
import {Button, ButtonGroup} from "reactstrap";
import {ImCart, ImHeart} from "react-icons/im";
import {Badge} from "reactstrap";
//import NumericInput from "react-numeric-input";
import StarRatings from 'react-star-ratings';
import axios from "axios";
import base_url from "../../Api/apiUrl";
import {Link} from "react-router-dom";
import un_auth from "../../unAuthRedirect/unAuth";

class SiteProductDetails extends Component{
    constructor(props) {
        super(props);
    }

    state = {
        result: {
            productName: "",
            price: "",
            thumbnail: "",
            description: "",
            status: "",
            imageFilePath: "",
            // categoryId: "",
            // categoryName: "",
            // vendorId: "",
            // shopName: ""
            category: { //another object
                categoryName: "",
            },
            vendor: {
                shopName: "",
            }
        },
        loading: true,
        urlParameter: "",
        unit: 1,
        cartButtonHidden: false,
        // cartBtn: (
        //     <button className="btn-outline-danger btn" hidden={localStorage.getItem("userType_session") == "customer" ? false : true}>
        //         <strong>Add To Cart</strong> <ImCart/>
        //     </button>
        // ), change...
        ratingStar: 0
    }

    async componentDidMount() {
        /*We have to make the Cart button enable or disable which is to add or subtract item from the cart*/
        if(localStorage.getItem("shoppingCart") != null){
            var ara = JSON.parse(localStorage.getItem("shoppingCart") || '{}')
            //alert("not null, length: "+ara.length);
            console.log(ara);
            if(ara.length > 0){
                var i = 0;
                console.log(localStorage.getItem("shoppingCart"));

                for (i = 0; i < ara.length; i++){
                    if(ara[i].product_id == window.location.pathname.split("/").pop()){
                        //alert("found");
                        this.state.unit = ara[i].unit;
                        this.setState({
                            cartBtn: (
                                <button className="btn-outline-primary btn-info btn"
                                    hidden={localStorage.getItem("userType_session") == "customer" ? false : true}>
                                    <strong>Update Cart</strong> <ImCart/>
                                </button>
                            )
                        })
                        break;
                    }
                }
            }
        }

        //console.log(window.location.pathname.split("/").pop());
        var id = window.location.pathname.split("/").pop();
        const resp = await axios.get(`${base_url}product/${id}`);

        console.log(resp.data);
        if (resp.status === 200){
            this.setState({
                result: resp.data,
                loading: false,
                urlParameter: id
            })
        }
        //if the product does not exists then redirect to login page
        else if(resp.status == 204){
            alert("No product Found")
            window.location.href = un_auth;
        }

        //Now we have to set the rating star
        // const result = await axios.get(`${base_url}product/getReviewsAndRatings/${id}`);
        // console.log(result.data);
        // if(result.status == 200){
        //     if(result.data.length > 0){
        //         var avgRating = 0;
        //         for(let i = 0; i < result.data.length; i++){
        //             avgRating += result.data[i].rating;
        //         }
        //         this.setState({
        //             ratingStar: avgRating / result.data.length
        //         })
        //     }
        // }
    }

    addToCart = (e) => {
        e.preventDefault();
        //Changing the button of the cart
        this.setState({
            cartBtn: (
                <button className="btn-outline-primary btn-info btn"><strong>Update Cart</strong> <ImCart/></button>
            )
        })

        var productId = window.location.pathname.split("/").pop();
        //If the shopping cart is empty then we have to add a product in the cart
        if (localStorage.getItem("shoppingCart") == null){
            var cart = [
                {
                    product_id: productId,
                    product_name: this.state.result.productName,
                    product_category_name: this.state.result.category.categoryName,
                    product_price: this.state.result.price,
                    product:{
                        productId: productId
                    },
                    order:{
                        id: 0
                    },
                    price: this.state.result.price,
                    unit: this.state.unit
                }
            ]
            localStorage.setItem("shoppingCart", JSON.stringify(cart));
            console.log(JSON.parse(localStorage.getItem("shoppingCart") || '{}'))
        }
        else {
            //Check if the product exists in the cart
            var ara = JSON.parse(localStorage.getItem("shoppingCart") || '{}')

            if(ara.length > 0){
                var i = 0;
                console.log(localStorage.getItem("shoppingCart"));

                //If the product exists then we have to update the unit value
                for (i = 0; i < ara.length; i++){
                    if(ara[i].product_id == window.location.pathname.split("/").pop()){
                        //alert("found! already added: " + this.state.unit);
                        ara[i].unit = this.state.unit;
                        this.setState({
                            unit: ara[i].unit
                        })
                        localStorage.setItem("shoppingCart", JSON.stringify(ara));
                        console.log("cart...");
                        console.log(JSON.parse(localStorage.getItem("shoppingCart") || '{}'))
                        return;
                    }
                }
            }

            //So this product is not in the cart. Therefore insert product in the shopping cart
            var cart1 = {
                product_id: productId,
                product_name: this.state.result.productName,
                product_category_name: this.state.result.category.categoryName,
                product_price: this.state.result.price,
                product:{
                    productId: productId
                },
                order:{
                    id: 0
                },
                price: this.state.result.price,
                unit: this.state.unit
            }
            ara.push(cart1);
            localStorage.setItem("shoppingCart", JSON.stringify(ara));
            console.log("Array in Storage");
            console.log(JSON.parse(localStorage.getItem("shoppingCart") || '{}'));
        }
    }

    addUnit = (e) => {
        e.preventDefault();
        if(this.state.unit == 5){
            return
        }
        this.setState({
            unit: this.state.unit + 1
        })
        this.state.unit = this.state.unit + 1
        //alert(this.state.unit);
    }

    subtractUnit = (e) => {
        e.preventDefault();
        if(this.state.unit == 1){
            this.setState({
                cartButtonHidden: this.state.unit - 1
            })
            return
        }
        this.setState({
            unit: this.state.unit - 1
        })
        this.state.unit = this.state.unit - 1
    }

    render() {
        var imageArray = [
            "https://thumbs.dreamstime.com/b/flowers-4999705.jpg",
            "https://cdn.pixabay.com/photo/2015/04/19/08/32/marguerite-729510__480.jpg",
        ]
        const imagePath = "https://www.w3schools.com/html/img_girl.jpg";
        var thumb = "data:image/png;base64,"+this.state.result.thumbnail;
        return(
            <div className="container">
              {/* <img src={require("https://localhost:44352/"+this.state.result.imageFilePath)} style={{ maxWidth: '200px' }} /> */}
                <br/> <br/>
                <div className="form-control">
                    <div className="row">
                        <div className="col-md-5" style={{backgroundColor:"mistyrose"}}>
                            <div style={{display: 'flex', justifyContent:'center', alignItems:'center', backgroundColor: "mistyrose"}}>
                                <TransformWrapper initialScale={1}>
                                    {({ zoomIn, zoomOut, resetTransform, ...rest }) => (
                                        <React.Fragment>

                                            <TransformComponent>
                                                {/*<img src={this.state.result.thumbnail == null ? imagePath : this.state.result.thumbnail} alt="test"
                                                     style={
                                                         {  height: 300,
                                                             width: 250
                                                         }
                                                     }
                                                />*/}
                                                {/* <img src={this.state.result.thumbnail == null ? imagePath : thumb}
                                                     style={
                                                         {  height: 300,
                                                             width: 250
                                                         }
                                                     }
                                                /> */}
                                                
                                            </TransformComponent>
                                            <div>
                                                <ButtonGroup className="me-2" aria-label="Second group">
                                                    <Button onClick={() => zoomIn()} className="btn-dark btn">+</Button>
                                                    <Button onClick={() => zoomOut()} className="btn btn-dark">-</Button>
                                                    <Button onClick={() => resetTransform()} className="btn btn-outline-danger">X</Button>
                                                </ButtonGroup>
                                            </div>
                                        </React.Fragment>
                                    )}
                                </TransformWrapper>                                
                            </div>
                            <br/>
                        </div>

                        <div className="col-md-7">
                            <div>
                                <label><strong>Product Name:</strong> {this.state.result.productName}</label>
                            </div>
                            <div>
                                <label><strong>Price:</strong> <label style={{fontSize: 20}}>{this.state.result.price}</label></label>
                            </div>
                            <div>
                                <label><strong>Category</strong>: <Badge pill bg="success"><strong> {this.state.result.category.categoryName}</strong> </Badge></label>
                            </div>
                            <div>
                                <label><strong>Vendor:</strong> {this.state.result.vendor.shopName} </label>
                            </div>
                            <div>
                                <label style={{fontSize:"1.2em"}}><strong>Rating:</strong> {this.state.ratingStar == 0 ? "No Rating" : this.state.ratingStar} </label>
                                <br/>
                                <StarRatings
                                    rating={this.state.ratingStar}
                                    starDimension="25px"
                                    starSpacing="5px"
                                    starRatedColor="#cee009"
                                />
                            </div>
                            <br/>

                            <div className="row"
                                 hidden={
                                     this.state.result.status == "inactive" ? true :
                                         localStorage.getItem("userType_session") == "customer" ? false : true

                                 }
                            >
                                <div className="col-md-2" onClick={this.addToCart}>
                                    {this.state.cartBtn}
                                </div>
                                <div className="col-md-4">
                                    <span>
                                        {/*<NumericInput size={2} min={0} max={5} value={this.state.unit} type="up-down"
                                            onKeyDown={(e)=>{
                                                e.preventDefault();
                                            }}
                                            onChange={(e:any) => {
                                                alert(e.target.value);
                                            }}
                                        />*/}
                                        <div className="card-group"

                                        >
                                            <input size={2} type="text" readOnly={true} value={this.state.unit}/>
                                            <div className="btn-group">
                                                <button className="btn btn-dark" onClick={this.subtractUnit}>
                                                    ↓
                                                </button>
                                                <button className="btn btn-dark" onClick={this.addUnit}>↑</button>
                                            </div>
                                        </div>
                                    </span>
                                </div>
                            </div>
                            <div className="col-md-7"
                                 hidden={localStorage.getItem("userType_session") == "admin" ? false : true}
                            >
                                <br/>
                                <div className="row">
                                    <div className="btn-group">
                                        <Link to={'/product/yearlySales/'+window.location.pathname.split("/").pop()}>
                                            <button className="btn btn-outline-success btn-dark btn-lg">Check Report</button>
                                        </Link>
                                    </div>
                                </div>
                            </div>
                            <br/>
                            <div>
                                <h2><u>Product Description</u></h2>
                                <p>
                                    {this.state.result.description}
                                    {/*Lorem Ipsum is simply dummy text of the printing and typesetting industry.
                                    Lorem Ipsum has been the industry's standard dummy text ever since the 1500s,
                                    when an unknown printer took a galley of type and scrambled it to make a type specimen book.
                                    It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged.
                                    It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages,
                                    and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.*/}
                                </p>
                            </div>
                            <div className="d-grid gap-2 text-danger">

                                    <Button size="lg">
                                        <Link to={`/product/allReviews/${this.state.urlParameter}`}>
                                            <button className="btn btn" style={{backgroundColor: "green", maxWidth: 100}}>
                                                Check Review
                                            </button>
                                        </Link>
                                    </Button>
                            </div>
                        </div>
                    </div>
                </div>
                
            </div>
        )
    }
}

export default SiteProductDetails;