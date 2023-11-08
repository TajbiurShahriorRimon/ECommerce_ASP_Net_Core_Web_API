import React, {Component} from "react";
import  "./CSS/home.css";
import {Card, Carousel} from "react-bootstrap";
import {Link} from "react-router-dom";
import {HiInformationCircle} from "react-icons/hi";

class SiteHome extends Component{
    constructor(props) {
        super(props);
    }

    state = {
        result: [],
        loading: true,
    }

    render() {
        var imagePath = "https://www.w3schools.com/html/img_girl.jpg";
        return (
            <div>
                <div className="container">
                    <section id="header" className="jumbotron text-left text-white">
                        
                    </section> <br/>
                    <div className="row justify-content-lg-start">
                        <div className="col-lg-3 mb-5">
                            <Card style={{ width: '18rem' }} className="box">
                                <Card.Img variant="top" src={imagePath} style={{height: "180px", width: "100%"}}/>
                                <Card.Body>
                                    <Card.Title>Fruit</Card.Title>
                                    {/*<Card.Text>Lorem Ipsum Telle Amore</Card.Text>*/}
                                    {/*<Button variant="primary" href=''>Edit</Button>*/}
                                    <Link to={'/'}>

                                        <HiInformationCircle style={{fontSize:"2em", float: "right"}}/>
                                    </Link>
                                </Card.Body>
                            </Card>
                        </div>
                        
                        <div className="col-lg-3 mb-5">
                            <Card style={{ width: '18rem' }} className="box">
                                <Card.Img variant="top" src={imagePath} style={{height: "180px", width: "100%"}}/>
                                <Card.Body>
                                    <Card.Title>Fruit</Card.Title>
                                    {/*<Card.Text>Lorem Ipsum Telle Amore</Card.Text>*/}
                                    {/*<Button variant="primary" href=''>Edit</Button>*/}
                                    <Link to={'/'}>

                                        <HiInformationCircle style={{fontSize:"2em", float: "right"}}/>
                                    </Link>
                                </Card.Body>
                            </Card>
                        </div>

                        <div className="col-lg-3 mb-5">
                            <Card style={{ width: '18rem' }} className="box">
                                <Card.Img variant="top" src={imagePath} style={{height: "180px", width: "100%"}}/>
                                <Card.Body>
                                    <Card.Title>Fruit</Card.Title>
                                    {/*<Card.Text>Lorem Ipsum Telle Amore</Card.Text>*/}
                                    {/*<Button variant="primary" href=''>Edit</Button>*/}
                                    <Link to={'/'}>

                                        <HiInformationCircle style={{fontSize:"2em", float: "right"}}/>
                                    </Link>
                                </Card.Body>
                            </Card>
                        </div>

                        <div className="col-lg-3 mb-5">
                            <Card style={{ width: '18rem' }} className="box">
                                <Card.Img variant="top" src={imagePath} style={{height: "180px", width: "100%"}}/>
                                <Card.Body>
                                    <Card.Title>Fruit</Card.Title>
                                    {/*<Card.Text>Lorem Ipsum Telle Amore</Card.Text>*/}
                                    {/*<Button variant="primary" href=''>Edit</Button>*/}
                                    <Link to={'/'}>

                                        <HiInformationCircle style={{fontSize:"2em", float: "right"}}/>
                                    </Link>
                                </Card.Body>
                            </Card>
                        </div>

                        <div className="col-lg-3 mb-5">
                            <Card style={{ width: '18rem' }} className="box">
                                <Card.Img variant="top" src={imagePath} style={{height: "180px", width: "100%"}}/>
                                <Card.Body>
                                    <Card.Title>Fruit</Card.Title>
                                    {/*<Card.Text>Lorem Ipsum Telle Amore</Card.Text>*/}
                                    {/*<Button variant="primary" href=''>Edit</Button>*/}
                                    <Link to={'/'}>

                                        <HiInformationCircle style={{fontSize:"2em", float: "right"}}/>
                                    </Link>
                                </Card.Body>
                            </Card>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

export default SiteHome;