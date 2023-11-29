import React, {Component} from "react";
import axios from "axios";
import {Card, Carousel} from "react-bootstrap";
import {Link} from "react-router-dom";
import {HiInformationCircle} from "react-icons/hi";
import base_url from "../../Api/apiUrl";

class SiteProductSearch extends Component{
    constructor(props) {
        super(props);
    }

    state = {
        result: [],
        loading: true,
    }

    async componentDidMount() {
        const resp = await axios.get(`${base_url}product/search/`+window.location.pathname.split("/").pop());
        //console.log(resp.data[0][0]);
        if (resp.status === 200) {
            this.setState({
                result: resp.data,
                loading: false,
            })
        }
        console.log(this.state.result);
    }

    check = () => {
        alert("dsdsd");
    }

    render() {
        var resultTable;

        if(this.state.loading){
            resultTable = <h1>Loading...</h1>
        }
        else {
            resultTable = this.state.result.map((item) => {
                return(
                    <div className="col-lg-3 mb-5">
                        <Card style={{ width: '18rem' }} className="box">
                            <Card.Img variant="top" src={"data:image/png;base64,"+item[5]} style={{height: "180px", width: "100%"}}/>
                            <Card.Body>
                                <Card.Title>{item.productName}</Card.Title>
                                {/*<Card.Text>Lorem Ipsum Telle Amore</Card.Text>*/}
                                {/*<Button variant="primary" href=''>Edit</Button>*/}
                                <Link to={`/product/productDetails/`+item.productId}>

                                    <HiInformationCircle style={{fontSize:"2em", float: "right"}}/>
                                </Link>
                            </Card.Body>
                        </Card>
                    </div>
                )
            })

            /*resultTable = this.state.result.map((item: any) => {
                return item.map((data: any)=>{
                    return(
                        /!*<div className="col-lg-3 mb-5">
                            <Card style={{ width: '18rem' }} className="box">
                                <Card.Img variant="top" src={"data:image/png;base64,"+item.thumbnail} style={{height: "180px", width: "100%"}}/>
                                <Card.Body>
                                    <Card.Title>{data[0]}</Card.Title>
                                    <Card.Text>Lorem Ipsum Telle Amore</Card.Text>
                                        {/!*<Link to={`/product/productDetails/`+item.productId}>

                                        <HiInformationCircle style={{fontSize:"2em", float: "right"}}/>
                                        </Link>*!/}
                                </Card.Body>
                            </Card>
                        </div>*!/
                        <div>
                            <h1>ds</h1>
                        </div>
                    )
                })
            })*/
            //this.check;
        }
        return(
            <div>
                <div className="container">

                </div>
                <br/>
                <div className="container">
                    <div className="row justify-content-lg-start">
                        {resultTable}
                    </div>
                </div>
            </div>
        )
    }
}

export default SiteProductSearch;