import React, { useState } from 'react';
import {Button,FormGroup,Label,Container,Input,Row,Col,FormFeedback} from "reactstrap";
import { useEffect } from 'react';
import base_url from '../../Api/apiUrl';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import { Toast, ToastContainer, Modal, Form as FormBeautify, Row as RowBeautify, Col as ColBeautify } from 'react-bootstrap';


import {  useNavigate } from 'react-router-dom';
/* TODO

1) Response message misbehaves somtimes
 */


function VendorRegistration(props){
    var errorColor = {color: "red"};

    const [showMessage, setShowMessage] = useState(false);
    const toggleShowMessage = () => setShowMessage(!showMessage);

    const [showModal, setShowModal] = useState(false);

    const handleCloseModal = () => setShowModal(false);
    const handleShowModal = () => setShowModal(true);

    useEffect(()=>{

    },[]);
    const [user,setUser]=useState({
        name:"",
        email:"",
        password: '',
        phone: '',
        streetAddress: "",
        city: "",
        postalCode: "",
        registrationNumber: '',
        shopName: ''
    });

    const initialValues = {
        
        name: '',
        email: '',
        password: '',
        phone: '',
        city: '',
        streetAddress: '',
        postalCode: '',
        province: 'Ontario',
        type: "vendor",
        gender: 'male',
        registrationNumber: '',
        shopName: ''
    };

    const validationSchema = Yup.object().shape({
        name: Yup.string().required('Vendor Name is required'),
        email: Yup.string().email('Invalid email address').required('Email is required'),
        password: Yup.string()
        .required('Password is required')
        .min(5, 'Password must be at least 5 characters'),
        phone: Yup.string().required('Phone number is required'),

        streetAddress: Yup.string().required('Street Address is required'),
        postalCode: Yup.string().required('Postal Code number is required'),
        city: Yup.string().required('City is required'),

        registrationNumber: Yup.string().required('City is required'),
        shopName: Yup.string().required('Shop Name is required'),
    });

    const navigate = useNavigate();
    var formData= new FormData();
    //number of inputs in the form excluding gender as it has a default value
    var numberOfInputs= 4;

    const handleForm=(e)=>{
        console.log(user);


        //postDataToServer(JSON.stringify(user));
        e.preventDefault();
    }

    const handleSubmit = async (values, { setSubmitting }) => {
        console.log("hello");
        console.log(values);
        try {
          const response = await fetch(base_url+'vendor', {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify(values),
          });
    
        if (response.ok) {
            const data = await response.json();
            console.log('Data sent successfully:', data);
            //Show success message
            toggleShowMessage();
        }
        else if(response.status == 409){
            handleShowModal();
        }
        else {
            console.error('Failed to send data to the API');
        }
        } catch (error) {
          console.error('Error sending data:', error);
        } finally {
          setSubmitting(false);
        }
      };

    return(
        <div >
            <Container >
                <Row className='justify-content-center my-5'>
                    <Col md={4}>
                        <Formik
                            initialValues={initialValues}
                            validationSchema={validationSchema}
                            onSubmit={handleSubmit}
                        >

                        {({ isSubmitting }) => (
                            // <Form onSubmit={handleForm}>
                            <Form>

                                {/* <Row>
                                    <FormGroup>
                                        <label className='form-label my-2' htmlFor="name">Name</label>
                                        <Field className='form-control' type="text" name="name" />
                                        <ErrorMessage style={errorColor} name="name" component="div" className="error" />
                                    </FormGroup>
                                    <Col md={6}>
                                        <FormGroup>
                                            <label className='form-label my-2' htmlFor="email">Email</label>
                                            <Field className='form-control' type="text" name="email" />
                                            <ErrorMessage style={errorColor} name="email" component="div" className="error" />
                                        </FormGroup>
                                        </Col>
                                        <Col md={6}>
                                        <FormGroup>
                                            <label className='form-label my-2' htmlFor="password">Password</label>
                                            <Field className='form-control' type="password" name="password" />
                                            <ErrorMessage style={errorColor} name="password" component="div" className="error" />
                                        </FormGroup>
                                    </Col>
                                </Row>

                                <FormGroup>
                                    <label className='form-label my-2' htmlFor="phone">Phone</label>
                                    <Field className='form-control' type="text" name="phone" />
                                    <ErrorMessage style={errorColor} name="phone" component="div" className="error" />
                                </FormGroup>

                                <FormGroup>
                                    <Label className='form-label my-2' for="gender">
                                        Gender
                                    </Label>
                                    <Field as="select" className='form-select' name="gender">
                                        <option value="male">Male</option>
                                        <option value="female">Female</option>
                                    </Field>
                                </FormGroup>

                                <FormGroup>
                                <label className='form-label my-2' htmlFor="streetAddress">Street Address</label>
                                    <Field className='form-control' type="text" name="streetAddress" />
                                    <ErrorMessage style={errorColor} name="streetAddress" component="div" className="error" />
                                </FormGroup>                              
                                <FormGroup>
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
                                </FormGroup>

                                <Row>
                                    <Col md={6}>
                                    <FormGroup>
                                        <label className='form-label my-2' htmlFor="city">City</label>
                                        <Field className='form-control' type="text" name="city" />
                                        <ErrorMessage style={errorColor} name="city" component="div" className="error" />
                                    </FormGroup>
                                    </Col>
                                    <Col md={6}>
                                    <FormGroup>
                                        <label className='form-label my-2' htmlFor="postalCode">Postal Code</label>
                                        <Field className='form-control' type="text" name="postalCode" />
                                        <ErrorMessage style={errorColor} name="postalCode" component="div" className="error" />
                                    </FormGroup>
                                    </Col>
                                </Row> */}



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

                                <div>
                                    <label className='form-label my-2' htmlFor="shopName">Shop Name</label>
                                    <Field className='form-control' type="text" name="shopName" />
                                    <ErrorMessage style={errorColor} name="shopName" component="div" className="error" />
                                </div>

                                <div>
                                    <label className='form-label my-2' htmlFor="registrationNumber">Postal Code</label>
                                    <Field className='form-control' type="text" name="registrationNumber" />
                                    <ErrorMessage style={errorColor} name="registrationNumber" component="div" className="error" />
                                </div>

                                <Button className='my-2 w-100' type='submit' color='primary'>Submit</Button>

                            </Form>
                        )}
                        </Formik>
                    </Col>
                </Row>   

                <ToastContainer position="bottom-end" className="p-3">
                        <Toast show={showMessage} onClose={toggleShowMessage} >
                            <Toast.Header>
                            <strong className="me-auto">Success</strong>
                            </Toast.Header>
                        <Toast.Body>Vendor Added Successfully</Toast.Body>
                    </Toast>
                </ToastContainer>

                <Modal show={showModal} onHide={handleCloseModal}>
                    <Modal.Header closeButton>
                    <Modal.Title>Error!</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>This Email Already Exists! Give a new email.</Modal.Body>
                    <Modal.Footer>
                    <Button variant="secondary" onClick={handleCloseModal}>
                        Close
                    </Button>
                    </Modal.Footer>
                </Modal>            

            </Container>
                    
        </div>
    )
}

export default VendorRegistration;