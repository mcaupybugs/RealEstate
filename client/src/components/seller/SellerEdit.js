import React from 'react';
import _ from 'lodash';
import { connect } from 'react-redux';
import { fetchProperty, editProperty } from '../../actions';
import SellerForm from './SellerForm';

class PropertyEdit extends React.Component {
    componentDidMount() {
        this.props.fetchProperty(this.props.match.params.id);
    }

    onSubmit = formValues => {
        console.log(formValues);
        this.props.editProperty(this.props.match.params.id, formValues);
    }

    render() {
        console.log(this.props);
        if (!this.props.property) {
            return <div>...Loading</div>
        }

        return (
            <div>
                <h3>Edit Property</h3>
                <SellerForm initialValues={_.pick(this.props.property, 'HouseNo', 'State', 'City', 'Price')} onSubmit={this.onSubmit} />
            </div>
        )
    }
}

const mapStateToProps = (state, ownProps) => {
    return { property: state.property.undefined };
}

export default connect(mapStateToProps, { fetchProperty, editProperty })(PropertyEdit);