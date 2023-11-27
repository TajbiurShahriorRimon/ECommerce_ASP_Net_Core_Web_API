import React, { useState } from 'react';
//import '../../App.css';
import {Button,Form,FormGroup,Label,Container,Input,Row,Col,FormFeedback} from "reactstrap";
//import { group } from 'console';
import { useEffect } from 'react';
import base_url from '../../Api/apiUrl';
import axios from 'axios';
//import events from "node:events";
import { useParams } from 'react-router-dom';
//import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import { Toast, ToastContainer, Modal } from 'react-bootstrap';

function timeout(delay) {
    return new Promise( res => setTimeout(res, delay) );
}

function ProductAddBody(){

    var errorColor = {color: "red"};

    const [showMessage, setShowMessage] = useState(false);
    const toggleShowMessage = () => setShowMessage(!showMessage);

    const [showModal, setShowModal] = useState(false);

    const handleCloseModal = () => setShowModal(false);
    const handleShowModal = () => setShowModal(true);

    const initialValues = {
        name: '',
        email: '',
        password: '',
        city: '',
        phone: '',
        province: 'Ontario',
        streetAddress: '',
        postalCode: '',
        type: "customer",
        gender: 'male',
    };

    const validationSchema = Yup.object().shape({
        name: Yup.string().required('Name is required'),
        email: Yup.string().email('Invalid email address').required('Email is required'),
        password: Yup.string()
        .required('Password is required')
        .min(5, 'Password must be at least 5 characters'),
        streetAddress: Yup.string().required('Street Address is required'),
        postalCode: Yup.string().required('Postal Code number is required'),
        phone: Yup.string().required('Phone number is required'),
        city: Yup.string().required('City is required'),
    });

    const[imageBase64String,setImageBase64String]=useState("");
    
    useEffect(()=>{
        getAllCategory();

    },[]);

    const [category,setCategory] = useState([]);

    const getAllCategory = () => {
        axios.get(`${base_url}category`).then(
            (response) => {
                //console.log(response.data);
                setCategory(response.data);
            },
            (error) => {

            }

        );

    };
    //change made...
    // VendorParams={
    //     mail: ""
    //  };
    
    // const { mail } = useParams<VendorParams>();
    let vendorMail=""
    // const [vendorMail,setVendorMail]=useState({
    //     mail:"" //for multiple selected photo
    // });
    

    let [user,setUser]=useState({
        name:"",
        mail:"",
        phone:"",
        address:"",
        gender:"male",
        type:"vendor"
        
    });
    let [vendorOb,setVendor]=useState({
        id:"",
        registrationNumber:"",
        shopPhone:"",
        shopAddress:"",
        shopName:"",
        mail:user
        
    });
    const [products,setProducts]=useState({
        productName:"",
        price: "",
        //categoryId:"", //changes made
        category: {
            categoryId: ""
        },
        vendor:vendorOb,
        description:"",
        photoUrl:"",
        thumbnail: "", //used to set the photo blob path of the selected photo
        otherImage : [] //for multiple selected photo
    });

    const [prodNameErr, setProdNameErr] = useState({
        productNameErr: "",
    })
    const [prodPriceErr, setProdPriceErr] = useState({
        priceErr: "",
    })
    const [descErr, setDescErr] = useState({
        descriptionErr: "",
    })
    const [prodCategoryErr, setProdCategoryErr] = useState({
        categoryErr: "",
    })
    const [photoErr, setPhotoErr] = useState({
        thumbnailErr: "",
    })

    const AddPhoto = (e) => {
        let reader= new FileReader();
        let image = e.target.files[0];
        //tested code, probably isn't being used. will dlt later
        if(image){
            reader.readAsDataURL(image);
            reader.onload=()=>{
                let base64= reader.result;
                setImageBase64String(base64)
                //console.log(imageBase64String)
            };
            reader.onerror=function(error){
                console.log(error)
            }
        }
        //ends here
        setProducts({
            ...products,
            thumbnail: image,
            photoUrl: URL.createObjectURL(image) //displays the image in the image box
        });
        e.preventDefault();
    }

    const AddOtherImages = (e) => {
        let images = e.target.files;
        setProducts({
            ...products,
            otherImage: images
        });
    }

    const handleForm= (e)=>{
        e.preventDefault();
        var isValid = true;
        if(products.productName == ""){
            isValid = false;
            setProdNameErr({
                productNameErr: "name must not be empty"
            })
        }
        else {
            setProdNameErr({
                productNameErr: ""
            })
        }

        if(products.price == ""){
            isValid = false;
            setProdPriceErr({
                priceErr: "price must not be empty"
            })
        }
        else if(!products.price.match(/^-?[0-9]*[.][0-9]+$/) && !products.price.match(/^[0-9]+$/)){
            isValid = false;
            setProdPriceErr({
                priceErr: "only (positive) value is allowed"
            })
        }
        else if(+products.price < 0){
            isValid = false;
            setProdPriceErr({
                priceErr: "(positive) value is allowed"
            })
        }
        else {
            setProdPriceErr({
                priceErr: ""
            })
        }

        if(products.description == ""){
            isValid = false;
            setDescErr({
                descriptionErr: "description must not be empty"
            })
        }
        else {
            setDescErr({
                descriptionErr: ""
            })
        }

        if(products.category.categoryId == "" || +products.category.categoryId == 0){
            isValid = false;
            setProdCategoryErr({
                categoryErr: "select a category"
            })
        }
        else {
            setProdCategoryErr({
                categoryErr: ""
            })
        }

        if(products.thumbnail == ""){
            isValid = false;
            setPhotoErr({
                thumbnailErr: "select a photo for thumbnail"
            })
        }
        else {
            setPhotoErr({
                thumbnailErr: ""
            })
        }

        if(isValid == true) {
            //console.log(products);
            const formData = new FormData();
            formData.append('file', products.thumbnail)
            // console.log(products.thumbnail)
            // postDataToServer(JSON.stringify(products));
            products.thumbnail = ""
            //console.log(products.thumbnail)
            products.vendor = vendorOb;
            getUserFromServer(localStorage.getItem("email")); //getUserFromServer(mail); //changes made params_localStorage

            setTimeout(() => {
                getVendorFromServer(user.mail);
            }, 2000);
            //posting data to server
            //posting product
            setTimeout(() => {
                products.vendor = vendorOb;
            }, 3000);

            setTimeout(() => {
                postDataToServer(JSON.stringify(products));
            }, 3000);

            setTimeout(() => {
                postImageToServer(formData);
            }, 5000);
        }
         
        e.preventDefault();
    }

    //function to post data on server
    const postDataToServer=(data)=>{
        axios.post(`${base_url}addProducts`,data,{
            headers: {
                'Content-Type': 'application/json',
                 'Accept': 'application/json'
            }}).then(
            (response)=>{
                    alert("Success");
            },(error)=>{

                let res=Object.values(error.response.data);
                let errorMsg="";
                
                for(let i=0;i<res.length;i++){
                    errorMsg+=res[i];
                    errorMsg+="\n"
                }
                
                  alert(errorMsg);
            }
        );
    };

    
    // const config = {
    //     headers: {
    //         'content-type': 'multipart/form-data'
    //     }
    // }
    const postImageToServer=(data)=>{
        //console.log("Image");
        axios.post(`${base_url}addImage`,data,{
           }).then(
            (response)=>{
                    //alert(response.data);
            },(error)=>{
                
                let res=Object.values(error.response.data);
                let errorMsg="";
                
                for(let i=0;i<res.length;i++){
                    errorMsg+=res[i];
                    errorMsg+="\n"
                }
                
                  alert(errorMsg);
            }
        );
    };

    const getUserFromServer=(data)=>{
        //alert(data)
        axios.post(`${base_url}getUser`,data,{
            headers: {
                'Content-Type': 'application/json',
                 'Accept': 'application/json'
            }}).then(
            (response)=>{
                   
                    user =response.data
                    //console.log(user.mail);
            },(error)=>{
                
                let res=Object.values(error.response.data);
                let errorMsg="";
                
                for(let i=0;i<res.length;i++){
                    errorMsg+=res[i];
                    errorMsg+="\n"
                }
                
                  alert(errorMsg);
            }
        );
    };

    const  getVendorFromServer=(data)=>{
        //alert(data);
        axios.post(`${base_url}getVendorIdByUserMail`,data,{
            headers: {
                'Content-Type': 'application/json',
                 'Accept': 'application/json'
            }}).then(
            (response)=>{
                
                    console.log(response.data);
                    vendorOb=response.data;
            },(error)=>{
                
                let res=Object.values(error.response.data);
                let errorMsg="";
                
                for(let i=0;i<res.length;i++){
                    errorMsg+=res[i];
                    errorMsg+="\n"
                }
                
                  alert(errorMsg);
            }
        );
    };
    return(
        <div >
            <Container >
            <Row className='justify-content-center my-5'>
                <Col md={4}>
                    <Form /*onSubmit={handleForm}*/>
                            <Label className="form-label my-2" for="name">
                                Product Name
                            </Label>
                            <Input 
                                id="productName"
                                name="productName"
                                placeholder="Enter Product Name"
                                type="text"
                                className='form-control'
                                onChange={(e)=>{
                                    setProducts({...products,productName:e.target.value})
                                }}
                            />
                            <div className="text-danger">
                                {prodNameErr.productNameErr == "" ? "" : prodNameErr.productNameErr}
                            </div>

                            <Label className='form-label my-2' for="price">
                                Price
                            </Label>
                            <Input
                                id="price"
                                name="price"
                                placeholder="Enter Product Price"
                                type="text"
                                className='form-control'
                                onChange={(e)=>{
                                    setProducts({...products,price:e.target.value})
                                }}
                            />
                            <div className="text-danger">
                                {prodPriceErr.priceErr == "" ? "" : prodPriceErr.priceErr}
                            </div>

                            <Label className='form-label my-2' for="description">
                                Description
                            </Label>
                            <Input
                                id="description"
                                name="description"
                                placeholder="Enter Product Description"
                                type="text"
                                className='form-control'
                                style={{width: 400, height: 100}}
                                onChange={(e)=>{
                                    setProducts({...products,description:e.target.value})
                                }}
                            />
                            <div className="text-danger">
                                {descErr.descriptionErr == "" ? "" : descErr.descriptionErr}
                            </div>

                            <Label className='form-label my-2' for="category">
                                Category
                            </Label>
                            <select className="form-select" aria-label="Default select example" id="category" onChange={(e)=>{
                                    setProducts({...products,
                                        //categoryId:e.target.value //changes made
                                        category: {
                                            categoryId: e.target.value
                                        }
                                    })
                                }}>
                                <option key={0} selected disabled={true}
                                        onChange={(e)=>{
                                            setProducts({...products,
                                                //categoryId:e.target.value //changes made
                                                category: {
                                                    categoryId: "0"
                                                }
                                            })
                                        }}
                                >
                                    Select Category
                                </option>
                                {
                                    category.map((item ) => (
                                        <option key={item.categoryId} value={item.categoryId}>
                                            {item.categoryName}
                                        </option>
                                    ))
                                }
                            </select>
                        <div className="text-danger">
                            {prodCategoryErr.categoryErr == "" ? "" : prodCategoryErr.categoryErr}
                        </div>

                        <Label className='form-label my-2' for="thumbnail">
                        Thumbnail
                        </Label>
                        <div>
                            <img src={products.photoUrl} id="photoSrc" style={{height: 200, width: 300}}/>
                            <Input
                                accept="image/*"
                                id="thumbnail"
                                name="thumbnail"
                                type="file"
                                className='form-control'
                                onChange={AddPhoto}
                            />
                        </div>
                        <div className="text-danger">
                            {photoErr.thumbnailErr == "" ? "" : photoErr.thumbnailErr}
                        </div>

                        {/*<Label className='form-label my-2' for="otherImage">
                            Other Images
                        </Label>
                        <Input
                            accept="image/*"
                            id="otherImage"
                            name="otherImage"
                            type="file"
                            className='form-control'
                            multiple
                            onChange={AddOtherImages}
                        />*/}
                    </Form>
                    <Button onClick={handleForm} className='my-2 w-100' type='button' color='primary'>Save</Button>
                   
                </Col>
                </Row>
            
            </Container>

            {/* <Container>
                <Row>
                    <Col>
                    <Formik
                            initialValues={initialValues}
                            validationSchema={validationSchema}
                            onSubmit={handleSubmit}
                        >

                        {({ isSubmitting }) => (
                            <Form>

                                <div>
                                    <label className='form-label my-2' htmlFor="name">Name</label>
                                    <Field className='form-control' type="text" name="name" />
                                    <ErrorMessage style={errorColor} name="name" component="div" className="error" />
                                </div>

                                <div>
                                    <label className='form-label my-2' htmlFor="email">Email</label>
                                    <Field className='form-control' type="text" name="email" />
                                    <ErrorMessage style={errorColor} name="email" component="div" className="error" />
                                </div>

                                <div>
                                    <label className='form-label my-2' htmlFor="password">Password</label>
                                    <Field className='form-control' type="password" name="password" />
                                    <ErrorMessage style={errorColor} name="password" component="div" className="error" />
                                </div>

                                <div>
                                    <label className='form-label my-2' htmlFor="phone">Phone</label>
                                    <Field className='form-control' type="text" name="phone" />
                                    <ErrorMessage style={errorColor} name="phone" component="div" className="error" />
                                </div>

                                <div>
                                    <label className='form-label my-2' htmlFor="streetAddress">Street Address</label>
                                    <Field className='form-control' type="text" name="streetAddress" />
                                    <ErrorMessage style={errorColor} name="streetAddress" component="div" className="error" />
                                </div>
                                
                                <div>
                                <Label className='form-label my-2' for="gender">
                                    Gender
                                </Label>
                                <Field as="select" className='form-select' name="gender">
                                    <option value="male">Male</option>
                                    <option value="female">Female</option>
                                </Field>
                                </div>

                                <div>
                                <Label className='form-label my-2' for="province">
                                    Province
                                </Label>
                                <Field as="select" className='form-select' name="province">
                                <option value="Ontario">Ontario</option>
                                    <option value="Alberta">Alberta</option>
                                    <option value="Quebec">Quebec</option>
                                    <option value="New Brunswick">New Brunswick</option>
                                    <option value="Manitoba">Manitoba</option>
                                    <option value="British Columbia">British Columbia</option>
                                    <option value="Saskatchewan">Saskatchewan</option>
                                    <option value="New Foundland and Labrador">New Foundland and Labrador</option>
                                    <option value="Nova Scotia">Nova Scotia</option>
                                    <option value="Price Edward Island">Price Edward Island</option>
                                </Field>
                                </div>

                                <div>
                                    <label className='form-label my-2' htmlFor="city">City</label>
                                    <Field className='form-control' type="text" name="city" />
                                    <ErrorMessage style={errorColor} name="city" component="div" className="error" />
                                </div>      

                                <div>
                                    <label className='form-label my-2' htmlFor="userPostalCode">Postal Code</label>
                                    <Field className='form-control' type="text" name="postalCode" />
                                    <ErrorMessage style={errorColor} name="postalCode" component="div" className="error" />
                                </div>
                                <Button className='my-2 w-100' type='submit' color='primary'>Submit</Button>
                            </Form>

                        )}
                        </Formik>
                    </Col>
                </Row>
            </Container> */}
   
        </div>
    )
}

export default ProductAddBody;