import React from 'react';
import { deleteProperty, fetchProperty } from '../../actions';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import Modal from '../Modal';
import history from '../../history';


class PropertyDelete extends React.Component {
    componentDidMount() {
        this.props.fetchProperty(this.props.match.params.id);
    }

    renderActions() {
        console.log(this.props);
        const id = this.props.match.params.id;
        return (
            <React.Fragment>
                <button onClick={() => this.props.deleteProperty(id)}>Delete</button>
                <Link to='/'>Cancel</Link>
            </React.Fragment>
        )
    }

    renderContent() {
        if (!this.props.property) {
            return 'Are you sure you want to delete this property?';
        }
        return `Are you sure you want to delete this property with detail:${this.props.property.City}${this.props.property.State}`;
    }

    render() {
        return (
            <div>
                <Modal title="delete"
                    content={this.renderContent()}
                    actions={this.renderActions()}
                    onDismiss={() => history.push('/')} />
            </div>
        )
    }
}

const mapStateToProps = (state, ownProps) => {
    //console.log(state);
    return { property: state.property.undefined }
}

export default connect(mapStateToProps, { fetchProperty, deleteProperty })(PropertyDelete);