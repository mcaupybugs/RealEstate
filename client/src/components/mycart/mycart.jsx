import React from 'react';
import { connect } from 'react-redux';
import { getMyCart } from '../../actions/index'
import 'react-bootstrap'
import 'bootstrap/dist/css/bootstrap.min.css';
class MyCart extends React.Component {


  componentDidMount() {
    this.props.getMyCart(this.props.isSignedIn);
    console.log('my cart is ', this.props.MyCart)
  }
  render() {

    return (<div>
      <nav
      className="text-center text-primary navbar navbar-light bg-light">
   <h1>   Your Cart</h1>
  </nav>
      <div>
      </div>
      {this.props.isLoading == false ?
        <div className='row my-3'>

          {
            this.props.MyCart ? this.props.MyCart.map((item) => <div className="card col-sm-3 ml-2 my-auto">
              <img className="card-img-top" src={item.Property ? item.Property.ImageUrl : "..."} alt="Card image cap" />
              <div className="card-body">

                <h5 className="card-title">Current Price :{item.Property ? item.Property.Price:'0'}</h5>
              <h4 className='card title'> Owned by :</h4>
              <h4> Available till :</h4>
                <button clasName='btn btn-danger'>Remove</button>

              </div>
            </div>

            ) : null
          }
        </div>
        : null}
        <div className="row d-flex justify-content-center">
            <button className='btn btn-primary' style={{
            
              width:'5%',
              height:'100%'
            }}>
              Pay Now
            </button>
        </div>
    </div>
    )
  }
}

const mapStateToProps = (state) => {

  return {
    isSignedIn: state.auth.userId,
    MyCart: state.cart.MyCart,
    isLoading: state.cart.isLoading,
  }
}

export default connect(mapStateToProps, { getMyCart })(MyCart);