
import {BrowserRouter as Router, Route, Switch} from "react-router-dom";
import './App.css';
import React,{Component} from "react";
import Home from './Home'
import ProductList from "./ProductList";
import ProductEdit from "./ProductEdit";
import Login from "./Login/Login";
import Register from "./Login/Register";
import '../node_modules/bootstrap/dist/css/bootstrap.min.css';



class App extends Component {
    state = {
        products: []
    };

    async componentDidMount() {
        const response = await fetch('/products');
        const body = await response.json();
        this.setState({products: body});
    }

    // render() {
    //     const {products} = this.state
    //     return (
    //         <div className="App">
    //             <header className="App-header">
    //                 <img src={logo} className="App-logo" alt="logo"/>
    //                 <div className="App-intro">
    //                     <h2>Products</h2>
    //                     {products.map(product =>
    //                         <div key={product.id}>
    //                             {product.name}
    //                         </div>
    //                     )}
    //                 </div>
    //             </header>
    //         </div>
    //     );
    // }

    render() {
        return (
            <Router>
                <Switch>
                    <Route path='/' exact={true}><Home/></Route>
                    <Route path='/products' exact={true}><ProductList/></Route>
                    <Route path='/products/:id'><ProductEdit/></Route>
                    <Route path='/login'><Login/></Route>
                    <Route path = '/register'><Register/></Route>
                </Switch>
            </Router>
        )
    }
}

export default App;