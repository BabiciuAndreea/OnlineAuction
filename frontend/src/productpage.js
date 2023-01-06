import React,{Component} from "react";
import {Link, withRouter} from 'react-router-dom';
import {Button, Container, Form, FormGroup, Input, Label} from 'reactstrap';
import "./AppNavbar";
import AppNavbar from "./AppNavbar";
import "./product_page.css";
import img from "./image/bg.jpg";




class Productpage extends Component{
    emptyItem = {
        name: '',
        price:'',
        details:'',
        finale_date:''
    };

    constructor(props) {
        super(props);
        this.state = {
            item: this.emptyItem
        }
        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    async componentDidMount() {

        const product = await (await fetch(`/products_page/${this.props.match.params.id}`)).json();
        this.setState({item: product});

    }

    handleChange(event) {
        const target = event.target;
        const value = target.value;
        const name = target.name;
        const details = target.destails;
        const price = target.price;
        const image = target.image;
        const final_date = target.finale_date;
        let item = {...this.state.item};
        item[name] = value;
        this.setState({item});
    }

    async handleSubmit(event) {
        event.preventDefault();
        const {item} = this.state;

        await fetch('/products' + (item.id ? '/' + item.id : ''), {
            method: (item.id) ? 'PUT' : 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(item),
        });

    }


    render() {
        const {item} = this.state;


        return (
            <html>
            <head>
                <meta charSet="utf-8"/>
                <meta http-equiv="X-UA-Compatible" content="IE=edge"/>
                <title>Product Card/Page</title>
                <meta name="viewport" content="width=device-width, initial-scale=1"/>
                <link rel="stylesheet" href="style.css"/>
                <link rel="stylesheet"
                      href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/5.15.1/css/all.min.css"
                      integrity="sha512-+4zCK9k+qNFUR5X+cKL9EIR+ZOhtIloNl9GIKS57V1MyNsYpYcUrUeQc9vNfzsWfV28IaLL3i96P9sdNyeRssA=="
                      crossOrigin="anonymous"/>
            </head>
            <body>

            <AppNavbar/>
            <div className="card-wrapper">
                <div className="card">

                    <div className="product-imgs">
                        <div className="img-display">
                            <div className="img-showcase">
                                <img src={img} alt="image"/>
                            </div>
                        </div>
                    </div>

                    <div className="product-content">
                        <h2 className="product-title">{item.name}</h2>

                        <div className="product-date">
                            <h2>The auction start: </h2>
                            <p>{item.final_date}</p>

                        </div>


                        <div className="product-price">
                            <p className="new-price">Price: <span>{item.price}</span></p>
                        </div>

                        <div className="product-detail">
                            <h2>about this item: </h2>
                            <p>{item.details}</p>

                        </div>

                        <Form onSubmit={this.handleSubmit}>
                            <FormGroup>

                                <Input type="text" name="price" id="price" value={item.price}
                                       onChange={this.handleChange} autoComplete="price"/>
                            </FormGroup>
                            <FormGroup>
                                <Button color="primary" type="submit">Place a bid</Button>

                            </FormGroup>
                        </Form>


                    </div>
                </div>
            </div>

            </body>
            </html>

        )
    }

}
export default withRouter(Productpage);