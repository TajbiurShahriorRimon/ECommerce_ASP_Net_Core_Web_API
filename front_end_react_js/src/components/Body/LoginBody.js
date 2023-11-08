import React, { useState } from "react";
import { Button, Form, Container, Input, Row, Col, Label } from 'reactstrap';
import {useNavigate} from "react-router-dom";


function LoginBody(){
    var navigate = useNavigate();

    const [login,setLogin]=useState({
        mail:"",
        password:""
        
    });

    const [error,setError]=useState({
        errorMessage: "",

    });

    const handleForm=(e)=>{
        console.log(login);
        if(login.mail == "" || login.password == ""){
            setError({
                errorMessage: "Fields cannot be empty"
            })
            return;
        }
        
        
        //change..postDataToServer(JSON.stringify(login));
        e.preventDefault();
    }
    return(
        <div>
            <Container >
                <Row className='justify-content-center my-5'>
                    <Col md={4}>
                    <h1  className="form-label my-2">Login</h1><br></br>
                        <div className="text-danger">
                            <u><strong>{error.errorMessage}</strong></u>
                            
                        </div>
                                <br></br>
                        <Form /*onSubmit={handleForm}*/>
                                <Label className="form-label my-2" for="email">
                                    Email
                                </Label>
                                <Input 
                                    id="email"
                                    name="email"
                                    placeholder="Enter Your Email"
                                    type="email"
                                    className='form-control'
                                    onChange={(e)=>{
                                        setLogin({...login,mail:e.target.value})
                                    }}
                                />
                                
    
                                <Label className='form-label my-2' for="password">
                                    Password
                                </Label>
                                <Input
                                    id="password"
                                    name="price"
                                    placeholder="Enter Your Password"
                                    type="password"
                                    className='form-control'
                                    onChange={(e)=>{
                                        setLogin({...login,password:e.target.value})
                                    }}
                                />                                
    
                        </Form>
                        <Button onClick={handleForm} className='my-2 w-100' type='submit' color='primary'>Login</Button><br></br><br></br>
                       
                    </Col>
                </Row>
                
            </Container>
        </div>
    )
}

export default LoginBody;