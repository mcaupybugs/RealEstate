import React from 'react';
import { connect } from 'react-redux';
import { fetchProperties, AddToMyCart } from '../../actions';
import { Link } from 'react-router-dom';
import './propertyList.style.scss'

import ReactSearchBox from 'react-search-box'
class PropertyList extends React.Component {
    constructor(){
        super();
        this.state={
            property:[]
        }
    }
    async componentDidMount() {
        await this.props.fetchProperties();
        this.setState({
            property:this.props.property
        })
    }

    renderAdmin(propert) {
        if (propert.userId === this.props.currentUserId) {
            return (
                <div className="extra content mt-3">
                    <Link className="ui button primary " to={`seller/edit/${propert._id}`}>Edit</Link>
                    <Link className="ui button negative" to={`seller/delete/${propert._id}`}>Delete</Link>
                </div>
            )
        }
    }

    renderList() {
        return this.state.property.map(propert => {
            return (
                <div className="card" key={propert._id}>
                    <img src={`${propert.ImageUrl}`}></img>
                    <Link className="header" to={`/property/${propert._id}`}>
                        Go For The House
                        </Link>
                    <li className='list-group-item  list-group-item-primary'>City : {propert.City}</li>
                    <li className='list-group-item  list-group-item-light'>state : {propert.State}</li>
                    <li className='list-group-item list-group-item-dark'>Owner : {propert.OwnedBy}</li>
                    <li className='list-group-item  list-group-item-danger'>Price : {propert.Price}$/-</li>
                    <li className='list-group-item  list-group-item-success'>Avilable For :{'Not Yet Bidded'}</li>


                    {this.renderAdmin(propert)}
                    <button className='btn btn-primary' onClick={() => this.props.AddToMyCart(this.props.currentUserId, propert)}> Add To Cart</button>
                </div>
            )
        })
    }
    MysearchBar(e){
       let arr= this.props.property.filter((value)=>{
            if(e.target.value.length==0){
                return true;
            }
            if(value.City.search(e.target.value)!=-1){
                return true;
            }
            else if(value.State.search(e.target.value)!=-1){
                return true;
            }
        })
        this.setState({
            property:arr
        })
    }

    render() {
        return (
            <div className="main">
                <h2 className='text'>Property</h2>
                   
        <input name='name' className='control'placeholder="Search Your City or State..." onChange={this.MysearchBar.bind(this)}  />
                <div className="linkcards">{this.renderList()}</div>
            </div>
        )
    }
}

const mapStateToProps = (state) => {
    return {
        property: Object.values(state.property),
        currentUserId: state.auth.userId,
        isSignedIn: state.auth.isSignedIn
    }
}
const MapDispatchToProps = dispatch => ({
    AddToMyCart: (id, item) => dispatch(AddToMyCart(id, item)),
    fetchProperties: () => dispatch(fetchProperties())
})

export default connect(mapStateToProps, MapDispatchToProps)(PropertyList)