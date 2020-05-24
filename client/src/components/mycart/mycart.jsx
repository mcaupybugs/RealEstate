import React from 'react';
import { connect } from 'react-redux';
import { getMyCart, RemoveFromMyCart } from '../../actions/index'
import { PayMyPrice } from '../../actions';
import Header from '../Header'
import './mycart.style.scss';
class MyCart extends React.Component {
  an = 0;
  constructor() {
    super();
    this.state = {
      ans: 0
    }
  }
  async componentDidMount() {
    await this.props.getMyCart(this.props.isSignedIn);
    if (this.props.MyCart != undefined) {
      console.log('mndksnfkndfknfkn ')
      this.props.MyCart.map((value) => {
        this.setState({
          ans: this.state.ans + value.Price
        })
      })
    }
  }
  render() {

    return (<div>
      <div>
        <Header />
      </div>
      <div className='bigOne'>
        {this.props.isLoading == false ?
          <div className='main1'>

            {
              this.props.MyCart ? this.props.MyCart.map((item) => <div className="card col-sm-3 ml-2 my-auto">
                <img className="card-img-top" src={item.ImageUrl} alt="Card image cap" />
                <div className="card-body">

                  <h5 className="card-title">Current Price :{item.Price}</h5>
                  <h4 className='card title'> Owned by :{item.OwnedBy}</h4>
                  <h4> Available till : {item.AvailableTill ? item.AvailableTill : 'be the first one to purchase'}</h4>
                  <button onClick={() => this.props.RemoveFromMyCart(this.props.isSignedIn, item._id)} className='btn btn-danger'>Remove</button>

                </div>  
              </div>

              ) : null
            }

          </div>
          : null}
        <div className="footer">
          <p className='text-active'>
            Total Price :{this.props.totalPrice}
          </p>
          <button className='btn btn-primary' onClick={() => this.props.PayMyPrice(this.props.isSignedIn, this.props.MyCart)} >

            Pay Now
            </button>
        </div>
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
    totalPrice: state.cart.totalPrice
  }
}
const mapDispatchToProps = dispatch => ({
  PayMyPrice: (id, item) => dispatch(PayMyPrice(id, item)),
  getMyCart: (id) => dispatch(getMyCart(id)),
  RemoveFromMyCart: (id, id1) => dispatch(RemoveFromMyCart(id, id1))
})

export default connect(mapStateToProps, mapDispatchToProps)(MyCart);