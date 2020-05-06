import React from 'react';
import {Link} from 'react-router-dom';
import { Navbar, Nav } from 'react-bootstrap';
import GoogleAuth from './GoogleAuth';
import {connect} from 'react-redux'
import MyCart from './mycart/mycart'
class Header extends React.Component {
    render() {
        return (
            <Navbar collapseOnSelect expand="lg" bg="light" variant="light">
                <Navbar.Brand style={{ fontSize: 20 }} href="/">Home Seva</Navbar.Brand>
                <Navbar.Toggle aria-controls="responsive-navbar-nav" />
                <Navbar.Collapse id="responsive-navbar-nav">
                    <Nav className="mr-auto">
                        <Nav.Link style={{ fontSize: 20 }} className="button" href={this.props.link}>{this.props.label}</Nav.Link>
                    </Nav>
                    <Nav>

                    </Nav>
                </Navbar.Collapse>
            {
                this.props.isSignedIn?<Link to='/mycart' className='btn btn-primary'>My Cart</Link>:null
            }
                <GoogleAuth />
            
            </Navbar>

        )
    }
}

const MapStateToProps=(state)=>({
    isSignedIn: state.auth.isSignedIn
})
export default connect(MapStateToProps)(Header);