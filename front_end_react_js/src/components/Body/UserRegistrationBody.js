import React, { useState } from 'react';
import {Button,Form,FormGroup,Label,Container,Input,Row,Col,FormFeedback} from "reactstrap";
import { useEffect } from 'react';

import {  useNavigate } from 'react-router-dom';
/* TODO

1) Response message misbehaves somtimes
 */


function UserRegistration(props){


    useEffect(()=>{

    },[]);
    const [user,setUser]=useState({
        name:"",
        mail:"",
        phone:"",
        address:"",
        gender:"male",
        type:"customer"

    });

    const [errorUser,setErrorUser]=useState({
        name:"",
        mail:"",
        phone:"",
        address:""
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

    return(
        <div >
            <Container >
                <Row className='justify-content-center my-5'>
                    <Col md={4}>
                        <Form onSubmit={handleForm}>
                            <Label className="form-label my-2" for="mail">
                                Email
                            </Label>
                            <Input
                                id="userEmail"
                                name="mail"
                                placeholder="Enter Your Mail Id"
                                type="text"
                                className='form-control'
                                onChange={(e)=>{
                                    setUser({...user,mail:e.target.value})
                                }}
                            />
                            <div className="text-danger">
                                {errorUser.mail == "" ? "" : errorUser.mail}
                            </div>

                            <Label className='form-label my-2' for="Name">
                                Name
                            </Label>
                            <Input
                                id="userName"
                                name="Name"
                                type="text"
                                className='form-control'
                                onChange={(e)=>{
                                    setUser({...user,name:e.target.value})
                                }}
                            />
                            <div className="text-danger">
                                {errorUser.name == "" ? "" : errorUser.name}
                            </div>
                            <Label className='form-label my-2' for="userPhone">
                                Phone
                            </Label>
                            <Input
                                id="userPhone"
                                name="userPhone"
                                placeholder="Phone Number"
                                type="text"
                                className='form-control'
                                onChange={(e)=>{
                                    setUser({...user,phone:e.target.value})
                                }}
                            />
                            <div className="text-danger">
                                {errorUser.phone == "" ? "" : errorUser.phone}
                            </div>

                            <Label className='form-label my-2' for="userPhone">
                                Address
                            </Label>
                            <textarea className="form-control styleTextarea"  id="userAddress"
                                      onChange={(e)=>{
                                          setUser({...user,address:e.target.value})
                                      }}
                            ></textarea>
                            <div className="text-danger">
                                {errorUser.address == "" ? "" : errorUser.address}
                            </div>
                            <Label className='form-label my-2' for="userPhone">
                                Gender
                            </Label>
                            <select className="form-select" aria-label="Default select example" id="userGender" onChange={(e)=>{
                                setUser({...user,gender:e.target.value})
                            }}>
                                <option selected value="male">Male</option>
                                <option value="female">Female</option>
                            </select>
                            <Button className='my-2 w-100' type='submit' color='primary'>Submit</Button>
                        </Form>

                    </Col>
                </Row>

            </Container>

        </div>
    )
}

export default UserRegistration;