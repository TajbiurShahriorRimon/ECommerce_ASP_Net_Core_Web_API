import React, {Component, useState, useEffect} from "react";
import  "./CSS/home.css";
import {Card, Carousel} from "react-bootstrap";
import {Link} from "react-router-dom";
import {HiInformationCircle} from "react-icons/hi";
import base_url from "../../Api/apiUrl";

const HomeBody = () => {
    //const [data, setData]
    const [data, setData] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchData = async () => {
            try{
                //api call
                const response = await fetch(base_url+"product");
                const result = await response.json(); //the json data is assigned
                console.log(result);
                setData(result);
                setLoading(false);
            } catch(ex){
                console.log(ex);
                setLoading(false);
            }                
        };

        fetchData();
    }, []);

    var imagePath = "https://www.w3schools.com/html/img_girl.jpg";
    var resultTable = data.map((item) => {
        return (
            <div className="col-lg-3 mb-5" key={item.productId}>
                <Card style={{ width: '18rem' }} className="box">
                    <Card.Img variant="top" src={"https://localhost:44352/Photos/Product/f8659c4e-da65-4259-9986-791edc6c7233.png"} style={{height: "180px", width: "100%"}}/>
                    <Card.Body>
                        <Card.Title>{item.productName}</Card.Title>
                        {/*<Card.Text>Lorem Ipsum Telle Amore</Card.Text>*/}
                        {/*<Button variant="primary" href=''>Edit</Button>*/}
                        <Link to={`/product/details/`+item.productId}>

                            <HiInformationCircle style={{fontSize:"2em", float: "right"}}/>
                        </Link>
                    </Card.Body>
                </Card>
            </div>
        )
    })        
        return (
            <div>
                    <div className="container">
                        <section id="header" className="jumbotron text-left text-white">
                        </section> <br/>
                        <div className="row justify-content-lg-start">
                            {resultTable}
                        </div>
                    </div>     
            </div>
        );

        // return(
        //     <div>
        //         {loading ? (
        //             <p>Loading...</p>
        //         ) : (
        //             <table>
        //             <thead>
        //                 <tr>
        //                 <th>ID</th>
        //                 <th>Name</th>
        //                 </tr>
        //             </thead>
        //             <tbody>
        //                 {data.map((item) => (
        //                 <tr key={item.id}>
        //                     <td>{item.productId}</td>
        //                     <td>{item.productName}</td>
        //                     {/* Add additional cells based on your data structure */}
        //                 </tr>
        //                 ))}
        //             </tbody>
        //             </table>
        //         )}
        //         </div>
        // )
}

// class SiteHome extends Component{
//     constructor(props) {
//         super(props);
//     }

//     state = {
//         result: [],
//         loading: true,
//     }

//     render() {
//         var imagePath = "https://www.w3schools.com/html/img_girl.jpg";
//         return (
//             <div>
//                 <div className="container">
//                     <section id="header" className="jumbotron text-left text-white">
                        
//                     </section> <br/>
//                     <div className="row justify-content-lg-start">
//                         <div className="col-lg-3 mb-5">
//                             <Card style={{ width: '18rem' }} className="box">
//                                 <Card.Img variant="top" src={imagePath} style={{height: "180px", width: "100%"}}/>
//                                 <Card.Body>
//                                     <Card.Title>Fruit</Card.Title>
//                                     {/*<Card.Text>Lorem Ipsum Telle Amore</Card.Text>*/}
//                                     {/*<Button variant="primary" href=''>Edit</Button>*/}
//                                     <Link to={'/'}>

//                                         <HiInformationCircle style={{fontSize:"2em", float: "right"}}/>
//                                     </Link>
//                                 </Card.Body>
//                             </Card>
//                         </div>
                        
//                         <div className="col-lg-3 mb-5">
//                             <Card style={{ width: '18rem' }} className="box">
//                                 <Card.Img variant="top" src={imagePath} style={{height: "180px", width: "100%"}}/>
//                                 <Card.Body>
//                                     <Card.Title>Fruit</Card.Title>
//                                     {/*<Card.Text>Lorem Ipsum Telle Amore</Card.Text>*/}
//                                     {/*<Button variant="primary" href=''>Edit</Button>*/}
//                                     <Link to={'/'}>

//                                         <HiInformationCircle style={{fontSize:"2em", float: "right"}}/>
//                                     </Link>
//                                 </Card.Body>
//                             </Card>
//                         </div>

//                         <div className="col-lg-3 mb-5">
//                             <Card style={{ width: '18rem' }} className="box">
//                                 <Card.Img variant="top" src={imagePath} style={{height: "180px", width: "100%"}}/>
//                                 <Card.Body>
//                                     <Card.Title>Fruit</Card.Title>
//                                     {/*<Card.Text>Lorem Ipsum Telle Amore</Card.Text>*/}
//                                     {/*<Button variant="primary" href=''>Edit</Button>*/}
//                                     <Link to={'/'}>

//                                         <HiInformationCircle style={{fontSize:"2em", float: "right"}}/>
//                                     </Link>
//                                 </Card.Body>
//                             </Card>
//                         </div>

//                         <div className="col-lg-3 mb-5">
//                             <Card style={{ width: '18rem' }} className="box">
//                                 <Card.Img variant="top" src={imagePath} style={{height: "180px", width: "100%"}}/>
//                                 <Card.Body>
//                                     <Card.Title>Fruit</Card.Title>
//                                     {/*<Card.Text>Lorem Ipsum Telle Amore</Card.Text>*/}
//                                     {/*<Button variant="primary" href=''>Edit</Button>*/}
//                                     <Link to={'/'}>

//                                         <HiInformationCircle style={{fontSize:"2em", float: "right"}}/>
//                                     </Link>
//                                 </Card.Body>
//                             </Card>
//                         </div>

//                         <div className="col-lg-3 mb-5">
//                             <Card style={{ width: '18rem' }} className="box">
//                                 <Card.Img variant="top" src={imagePath} style={{height: "180px", width: "100%"}}/>
//                                 <Card.Body>
//                                     <Card.Title>Fruit</Card.Title>
//                                     {/*<Card.Text>Lorem Ipsum Telle Amore</Card.Text>*/}
//                                     {/*<Button variant="primary" href=''>Edit</Button>*/}
//                                     <Link to={'/'}>

//                                         <HiInformationCircle style={{fontSize:"2em", float: "right"}}/>
//                                     </Link>
//                                 </Card.Body>
//                             </Card>
//                         </div>
//                     </div>
//                 </div>
//             </div>
//         );
//     }
// }

export default HomeBody;