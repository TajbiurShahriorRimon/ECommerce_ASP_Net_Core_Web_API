//import logo from './logo.svg';
//import './App.css';
//import { Link } from 'react-router-dom';

// function App() {
//   return (
//     <div className="App">
//       <header className="App-header">
//         <img src={logo} className="App-logo" alt="logo" />
//         <p>
//           Edit <code>src/App.js</code> and save to reload.
//         </p>
//         <a
//           className="App-link"
//           href="https://reactjs.org"
//           target="_blank"
//           rel="noopener noreferrer"
//         >
//           Learn React
//         </a>
//       </header>
//     </div>
//   );
// }

// function App(){
//   return(
//     <div>
//       Hello World in App.js
//       <Link to="/Page/HomePage">
//         Hello
//         {/* <button>Hello</button> */}
//       </Link>
      
//     </div>
//   );
// }

import {BrowserRouter as Router, Link, Route, Switch, Routes} from 'react-router-dom';
//import { Link, withRouter } from 'react-router-dom';
import HomePage from "../src/components/Page/HomePage";
import Login from "./components/Page/Login";
import HomePage1 from "./Page/HomePage";
import UserRegistration from './components/Page/UserRegistrationPage';
import CategoryAddPage from './components/Page/CategoryAddPage';
import VendorRegistrationPage from './components/Page/VendorRegistrationPage';
import ProductAddPage from './components/Page/ProductAddPage';
import ProductAddBody from './components/Body/ProductCreateBody';
import ProductDetailsPage from './components/Page/ProductDetailsPage';
import TestBody from './components/Body/TestBody';
//import ProductSearchPage12 from './components/Page/ProductSearchPage';
import ProductSearchBodyTest from "./components/Body/ProductSearchBodyTest"


function App() {
  return (
    <div>
      <Router>
        <Routes>
          <Route path='/' element={<HomePage/>}/>
          <Route path='/login' element={<Login/>}/>
          <Route path='/index' element={<HomePage1/>}/>
          <Route path='/user/registration' element={<UserRegistration/>}/>
          <Route path='/category/add' element={<CategoryAddPage/>}/>
          <Route path='/vendor/registration' element={<VendorRegistrationPage/>}/>

          {/* Product */}
          <Route path='/product/add' element={<ProductAddPage/>}/>
          <Route path='/product/details/:id' element={<ProductDetailsPage/>}/>
          <Route path="/product/search/:key" element={<ProductSearchBodyTest/>}/>


        </Routes>
      </Router>
    </div>
  );
}


export default App;
