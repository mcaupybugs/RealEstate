import React from 'react';
import { connect } from 'react-redux';
import { addProperty } from '../../actions';
import SellerForm from './SellerForm';

class SellerCreate extends React.Component {

    onSubmit = (formValues) => {
        this.props.addProperty(formValues);
    }

    render() {
        return (
            <div>
                <SellerForm onSubmit={this.onSubmit} />

            </div>
        )
    }
}

export default connect(null, { addProperty })(SellerCreate);