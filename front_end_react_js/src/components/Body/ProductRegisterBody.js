import React, { useState } from 'react';
//import '../../App.css';
import {Button,Form,FormGroup,Label,Container,Input,Row,Col,FormFeedback} from "reactstrap";
//import { group } from 'console';
import { useEffect } from 'react';
import base_url from '../../Api/apiUrl';
import axios from 'axios';
import { useParams } from 'react-router-dom';

/* TODO
1) Response message misbehaves somtimes
 */



function timeout(delay) {
    return new Promise( res => setTimeout(res, delay) );
}

function AddProduct(props){

    const[imageBase64String,setImageBase64String]=useState("");
    
    useEffect(()=>{
        getAllCategory();

    },[]);

    const [file, setFile] = useState(null);
    const [uploadStatus, setUploadStatus] = useState('');

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
    let VendorParams={
        mail:''
     };

    //change made...
    // const { mail } = useParams<VendorParams>();
    // let vendorMail:string=""


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
        // categoryId:"", //changes made
        // category: {
        //     categoryId: ""
        // },
        //vendor:vendorOb,
        vendorId: 1,
        categoryId: "",
        description:"",
        photoUrl:"",
        file: "", //used to set the photo blob path of the selected photo
        //otherImage : [] //for multiple selected photo
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
        fileErr: "",
    })

    const AddPhoto = (e) => {
        //change...
        // let reader= new FileReader();
        // let image = e.target.files[0];
        //tested code, probably isn't being used. will dlt later

        //change...
        // if(image){
        //     reader.readAsDataURL(image);
        //     reader.onload=()=>{
        //         let base64= reader.result;
        //         setImageBase64String(base64)
        //         //console.log(imageBase64String)
        //     };
        //     reader.onerror=function(error){
        //         console.log(error)
        //     }
        // }
        //ends here

        //updated...
        const selectedFile = e.target.files[0];
        setFile(selectedFile);

        // setProducts({
        //     ...products,
        //     file: image,
        //     photoUrl: URL.createObjectURL(image) //displays the image in the image box
        // });
        e.preventDefault();
    }

    // const AddOtherImages = (e) => {
    //     let images = e.target.files;
    //     setProducts({
    //         ...products,
    //         otherImage: images
    //     });
    // }

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

        if(products.file == ""){
            isValid = false;
            setPhotoErr({
                fileErr: "select a photo for thumbnail"
            })
        }
        else {
            setPhotoErr({
                fileErr: ""
            })
        }

        if(isValid == true) {
            //console.log(products);
            const formData = new FormData();
            //formData.append('file', products.file)
            formData.append('file', file);
            // console.log(products.thumbnail)
            // postDataToServer(JSON.stringify(products));
            products.file = ""
            //console.log(products.file)
            //products.vendor = vendorOb; //change...
            products.vendorId = 1; //updated...
            //getUserFromServer(localStorage.getItem("email")); //getUserFromServer(mail); //changes made params_localStorage //change...

            //change...
            // setTimeout(() => {
            //     getVendorFromServer(user.mail);
            // }, 2000);

            //posting data to server
            //posting product
            setTimeout(() => {
                //products.vendor = vendorOb; //change...
                products.vendorId = 1; //updated...
            }, 3000);

            setTimeout(() => {
                let product = products; //updated... also the next line "product" should have been "products"
                // let productData = {
                //     productName: products.productName,
                //     price: products.price,
                //     description: products.description,
                //     status: 1,
                //     file: products.photoUrl,
                //     filePath: "",
                //     categoryId: products.categoryId,
                //     vendorId: products.vendorId,
        
                // };

                // let productData = {
                //     productName: "products.productName",
                //     price: "products.price",
                //     description: "products.description",
                //     status: 1,
                //     file: "products.photoUrl",
                //     filePath: "",
                //     categoryId: 1,
                //     vendorId: 2,
                //     status: "active"        
                // };
                postDataToServer(JSON.stringify(products));
            }, 3000);

            //change...
            // setTimeout(() => {
            //     postImageToServer(formData);
            // }, 5000);
        }
         
        e.preventDefault();
    }

    //function to post data on server
    const postDataToServer=(data)=>{

        // let productData = {
        //     productName: data.productName,
        //     price: data.productPri,
        //     description: data.description,
        //     status: 1,
        //     file: data.photoUrl,
        //     filePath: "",
        //     categoryId: data.categoryId,
        //     vendorId: data.vendorId,

        // };
        console.log(data);

        console.log(data);
        axios.post(`${base_url}product`,data,{
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

    //change...
    // const postImageToServer=(data)=>{
    //     //console.log("Image");
    //     axios.post(`${base_url}addImage`,data,{
    //        }).then(
    //         (response)=>{
    //                 //alert(response.data);
    //         },(error)=>{
                
    //             let res=Object.values(error.response.data);
    //             let errorMsg="";
                
    //             for(let i=0;i<res.length;i++){
    //                 errorMsg+=res[i];
    //                 errorMsg+="\n"
    //             }
                
    //               alert(errorMsg);
    //         }
    //     );
    // };

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

    //change made...
    // const  getVendorFromServer=(data)=>{
    //     //alert(data);
    //     axios.post(`${base_url}getVendorIdByUserMail`,data,{
    //         headers: {
    //             'Content-Type': 'application/json',
    //              'Accept': 'application/json'
    //         }}).then(
    //         (response)=>{
                
    //                 console.log(response.data);
    //                 vendorOb=response.data;
    //         },(error)=>{
                
    //             let res=Object.values(error.response.data);
    //             let errorMsg="";
                
    //             for(let i=0;i<res.length;i++){
    //                 errorMsg+=res[i];
    //                 errorMsg+="\n"
    //             }
                
    //               alert(errorMsg);
    //         }
    //     );
    // };
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
                                    category.map((item) => (
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
                                id="file"
                                name="file"
                                type="file"
                                className='form-control'
                                onChange={AddPhoto}
                            />
                        </div>
                        <div className="text-danger">
                            {photoErr.fileErr == "" ? "" : photoErr.fileErr}
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
                            {/*<Button className='my-2 w-100' type='submit' color='primary'>Save</Button>*/}
                    </Form>
                    <Button onClick={handleForm} className='my-2 w-100' type='button' color='primary'>Save</Button>
                   
                </Col>
                </Row>
            
            </Container>
   
        </div>
    )
}

export default AddProduct;