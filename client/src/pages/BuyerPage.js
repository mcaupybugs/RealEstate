import React from 'react';
import Header from '../components/Header';
import PropertyList from '../components/property/propertyList';

class BuyerPage extends React.Component {
    render() {
        return (
            <div>
                <Header label="Seller" link="/seller" />
                <PropertyList />
            </div>
        )
    }
}

export default BuyerPage;