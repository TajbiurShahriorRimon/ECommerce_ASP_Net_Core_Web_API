import React, { useState, useEffect } from 'react';
import {Button,Form,FormGroup,Label,Container,Input,Row,Col,FormFeedback} from "reactstrap";
import base_url from '../../Api/apiUrl';

const ProductCreation = () => {
  const [productName, setProductName] = useState('');
  const [file, setFile] = useState(null);
  const [createStatus, setCreateStatus] = useState('');

    const handleProductNameChange = (event) => {
        const { value } = event.target;
        setProductName(value);
    };    

  const handleFileChange = (event) => {
    const selectedFile = event.target.files[0];
    setFile(selectedFile);

  };

  const handleCreateProduct = async () => {
    alert("dssd");
    if (!productName || !file) {
      setCreateStatus('Please enter a product name and select a file.');
      return;
    }

    const formData = new FormData();
    formData.append('name', productName);
    formData.append('id', 1); // Example ID, adjust as needed
    formData.append('File', file);
    formData.append('description', "description");
    formData.append('vendorId', 2);
    formData.append('categoryId', 1);
    formData.append('price', 200);
    formData.append('filePath', '');
    formData.append('status', 'active');


    try {
      const response = await fetch(base_url+'product', {
        method: 'POST',
        body: formData
      });

      if (response.ok) {
        setCreateStatus('Product created successfully.');
      } else {
        setCreateStatus('Failed to create product.');
      }
    } catch (error) {
      console.error('Error creating product:', error);
      setCreateStatus('Error creating product.');
    }
  };

  return (
    <div>
        <input type="text" placeholder="Enter Product Name" value={productName} onChange={handleProductNameChange} />
        <input type="file" onChange={handleFileChange} />
        <button onClick={handleCreateProduct}>Create Product</button>
      <p>{createStatus}</p>
    </div>
  );
};

function ProductCreation1(){
    const [productName, setProductName] = useState('');
    const [file, setFile] = useState(null);
    const [createStatus, setCreateStatus] = useState('');
    const [description, setDescription] = useState('');
    const [price, setPrice] = useState('');
    const [categoryId, setCategoryId] = useState('');
    const [vendorId, setVendorId] = useState('');

    const [categories, setCategories] = useState([]);
    const [selectedCategory, setSelectedCategory] = useState('');

    const [createPhotoUrl, setPhotoUrl] = useState({
      photoUrl: ''
    });

    const [thumbnail, setThumbnail] = useState('');

    const [imagePreview, setImagePreview] = useState(null);

    //Error Tracing
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

    useEffect(() => {
      // Fetch categories from the backend API
      const fetchCategories = async () => {
        try {
          const response = await fetch(base_url+'category');
          if (response.ok) {
            const data = await response.json();
            setCategories(data); // Assuming data is an array of category objects with 'id' and 'name'
          } else {
            console.error('Failed to fetch categories');
          }
        } catch (error) {
          console.error('Error fetching categories:', error);
        }
      };
  
      fetchCategories();
    }, []);

    const handleFileChange = (event) => {
        const selectedFile = event.target.files[0];
        setFile(selectedFile);

        const reader = new FileReader();
        reader.onload = () => {
          setImagePreview(reader.result);
        };
        reader.readAsDataURL(selectedFile);

      // setPhotoUrl({
      //   photoUrl: selectedFile
      // })

      setThumbnail(selectedFile)
    };

    const handleProductNameChange = (event) => {
        const { value } = event.target;
        setProductName(value);
    };

    const handleDescriptionChange = (event) => {
        const { value } = event.target;
        setDescription(value);
    };

    const handlePriceChange = (event) => {
        const { value } = event.target;
        setPrice(value);
    };

    const handleCategoryChange = (event) => {
      const { value } = event.target;
      setSelectedCategory(value);
      alert(value);
    };

    const handleCreateProduct = async (e) => {
      e.preventDefault();
      
      var isValid = true;
      if(productName == ""){
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

    if(price == ""){
        isValid = false;
        setProdPriceErr({
            priceErr: "price must not be empty"
        })
    }
    else if(!price.match(/^-?[0-9]*[.][0-9]+$/) && !price.match(/^[0-9]+$/)){
        isValid = false;
        setProdPriceErr({
            priceErr: "only (positive) value is allowed"
        })
    }
    else if(+price < 0){
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

    if(description == ""){
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

    if(selectedCategory == "" || +selectedCategory == 0){
        isValid = false;
        setProdCategoryErr({
            categoryErr: "Select a Category"
        })
    }
    else {
      setProdCategoryErr({
        categoryErr: ""
      })
    }

    if(thumbnail == ""){
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

        console.log(description);
        //alert(selectedCategory);
        if (!productName || !file) {
          setCreateStatus('Please enter a product name and select a file.');
          return;
        }
        
        if(isValid){
        const formData = new FormData();
        formData.append('name', productName);
        formData.append('id', 1); // Example ID, adjust as needed
        formData.append('File', file);
        formData.append('description', description);
        formData.append('vendorId', 2); //session...
        //formData.append('categoryId', 1);
        formData.append('price', price);
        formData.append('filePath', '');
        formData.append('status', 'active');

        formData.append('categoryId', selectedCategory);
    
    
        try {
          const response = await fetch(base_url+'product', {
            method: 'POST',
            body: formData
          });
    
          if (response.ok) {
            setCreateStatus('Product created successfully.');
          } else {
            setCreateStatus('Failed to create product.');
          }
        } catch (error) {
          console.error('Error creating product:', error);
          setCreateStatus('Error creating product.');
        }
      }
      };

    return(
    <div>
        <Container >
            <Row className='justify-content-center my-5'>
                <Col md={4}>
              <           Label className='form-label my-2' for="price">
                              Product Name
                          </Label>
                        <input className='form-control' type="text" placeholder="Enter Product Name" value={productName} onChange={handleProductNameChange} />
                        <div className="text-danger">
                            {prodNameErr.productNameErr == "" ? "" : prodNameErr.productNameErr}
                        </div>

                        <Label className='form-label my-2' for="price">
                            Photo
                        </Label> <br/>
                        <img src={imagePreview} id="photoSrc" style={{height: 200, width: 300}}/>
                        <input type="file" onChange={handleFileChange} /> <br/>
                        <div className="text-danger">
                                {photoErr.thumbnailErr == "" ? "" : photoErr.thumbnailErr}
                        </div>

                            <Label className='form-label my-2' for="price">
                                Price
                            </Label>
                            <Input id="price" name="price" placeholder="Enter Product Price"
                                type="text" className='form-control' onChange={handlePriceChange}
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
                                onChange={handleDescriptionChange}
                            />
                            <div className="text-danger">
                                {descErr.descriptionErr == "" ? "" : descErr.descriptionErr}
                            </div>

                            <Label className='form-label my-2' for="category">
                                Category
                            </Label>
                            <select className="form-select" value={selectedCategory} onChange={handleCategoryChange}>
                                  <option disabled value="">Select a Category</option>
                                  {categories.map((category) => (
                                    <option key={category.categoryId} value={category.categoryId}>
                                      {category.categoryName}
                                    </option>
                                  ))}
                            </select>
                            <div className="text-danger">
                                {prodCategoryErr.categoryErr == "" ? "" : prodCategoryErr.categoryErr}
                            </div>
                            <Button onClick={handleCreateProduct} className='my-2 w-100' type='button' color='primary'>Save</Button>
                </Col>
            </Row>
        </Container>
    </div>
    )
}

export default ProductCreation1;
