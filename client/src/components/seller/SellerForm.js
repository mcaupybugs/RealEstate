import React from 'react';
import { Field, reduxForm } from 'redux-form';
import './Seller.css'

class SellerForm extends React.Component {
    constructor(props){
        super(props);
        this.state={
            Image:''
        }

    }
    renderInput = (formProps) => {
        return (
            <div class="md-form mt-3">
                <label>{formProps.label}</label>
                <input type="text" class="form-control" aria-label="Username" aria-describedby="basic-addon1"{...formProps.input} />
            </div>
        )
    }
    renderImageInput = (formProps) => {
        return (
            <div>
                <label>{formProps.label}</label>
                <input type="file" id="img"  accept="image/*" onChange={(event)=>{
                        console.log('ndjnfkdsnk')
                        console.log(event.target.files[0])
                      this.setState({Image:event.target.files[0]});
                    
                }}></input>
            </div>
        )
    }

    onSubmit = (formValues) => {
        this.props.onSubmit(formValues,this.state.Image);
    }

    render() {
        return (
            <div class="me container card">
                <h5 class="me card-header info-color white-text text-center py-4">
                    <strong >Enter the details of Property</strong>
                </h5>
                <form class="ui form" onSubmit={this.props.handleSubmit(this.onSubmit)}>
                    <Field name="HouseNo" component={this.renderInput} label="Enter the address of the house" />
                    <Field name="State" component={this.renderInput} label="Enter the state of the house" />
                    <Field name="City" component={this.renderInput} label="Enter the city" />
                    <Field name="Price" component={this.renderInput} label="Enter the selling price" />
                    <Field  component={this.renderImageInput} label="Enter the image" />
                    <button class="me btn btn-success btn-lg">Submit</button>
                </form>
            </div>
        )
    }
}

export default reduxForm({
    form: 'PropertyCreate'
})(SellerForm);