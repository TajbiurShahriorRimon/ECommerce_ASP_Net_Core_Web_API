import React from "react";
import {BrowserRouter as Router, Link, Route, Switch, Routes} from 'react-router-dom';
import {Button} from 'reactstrap';
import 'bootstrap/dist/css/bootstrap.min.css';

export default function Home (){
    return(
        <div>
            <Link to='/login'>Got to Login</Link>
            <Button className="btn-btn-primary">Hello</Button>
        </div>
    )
}
