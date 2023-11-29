import React from "react";
import {BrowserRouter as Router, Link, Route, Switch, Routes} from 'react-router-dom';
import {Button} from 'reactstrap';
import HomeBody from "../Body/HomeBody";
import 'bootstrap/dist/css/bootstrap.min.css';
import HomeNavbar from "../Navbar/HomeNavbar";

export default function Home (){
    return(
        <div>
            <HomeNavbar/>
            <Link to='/login'>Got to Login</Link>
            <HomeBody/>
        </div>
    )
}
