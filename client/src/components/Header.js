import React from 'react';
import {Link} from 'react-router-dom';
import { Navbar, Nav } from 'react-bootstrap';
import GoogleAuth from './GoogleAuth';
import {connect} from 'react-redux'
import MyCart from './mycart/mycart'
class Header extends React.Component {
    constructor(){
        super();

    }
    
    render() {
        console.log('nsdjsak',this.props)
        return (
            <nav style={{fontSize:'25px',padding:'2%',color:'silver'}} className="navbar navbar-expand-lg navbar-dark bg-dark">
           <img src='./property.png' width={50} />
                <Link style={{color:'white',marginLeft:'1%'}}>Home Seva</Link>
                    <div className="ml-auto navbar-nav">
                        <Link className={`nav-item nav-link ${this.props.link=='/seller'?'active':''}`}to="/buyer">Buy</Link>
                        <Link className={`nav-item nav-link ${this.props.link=='/buyer'?'active':''}`} to="/seller">Sell</Link>
                        {
                            this.props.isSignedIn ? <Link to='/mycart' className={`nav-item nav-link ${!this.props.link?'active':''}`}>My Cart</Link> : null
                        }
                        <GoogleAuth />

                    </div>
               
            </nav>

        )
    }
}

const MapStateToProps=(state)=>({
    isSignedIn: state.auth.isSignedIn
})
export default connect(MapStateToProps)(Header);