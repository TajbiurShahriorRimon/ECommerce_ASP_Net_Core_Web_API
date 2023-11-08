import React from "react";
import {Col, Dropdown, Input, NavbarToggler, Row} from "reactstrap";
import {Card, Container, Form, FormControl, Navbar, Nav, Button, NavDropdown} from 'react-bootstrap';
import {CgProfile, CgHome} from 'react-icons/cg';
import './navbar.css';
import { Link, Navigate, useNavigate } from "react-router-dom";

function CommonNavBar(){
    const buttonStyle = {
        backgroundColor: 'blue',
        color: 'white',
        padding: '10px',
        borderRadius: '5px',
      };
    return(
        <div>
        <Navbar bg="dark" expand="lg" variant="dark" fixed="top" className="navbar text-opacity-100">
            <Container>
                <Navbar.Brand href="/home">Dokan</Navbar.Brand>
                <Navbar.Toggle aria-controls="basic-navbar-nav" />
                <Navbar.Collapse id="basic-navbar-nav">
                    <Nav className="justify-content-center" style={{ flex: 1}}>
                    </Nav>
                    <Nav.Link href="/home" style={buttonStyle}>Home</Nav.Link>
                    <Nav.Link href="/login" style={buttonStyle}>Login</Nav.Link>
                    <NavDropdown title="Registration" id="basic-nav-dropdown" style={buttonStyle}>
                            <NavDropdown.Item>
                                <Link to={"/"}>Customer Registration <CgProfile style={{color:"blue"}}/></Link>
                            </NavDropdown.Item>

                            <NavDropdown.Item>
                                <Link to="/">Vendor Registration <CgHome style={{color:"red"}}/></Link> 
                            </NavDropdown.Item>
                            
                    </NavDropdown>
                </Navbar.Collapse>
            </Container>
        </Navbar>
            <br/> <br/> <br/>
        </div>
    )
}

export default CommonNavBar;