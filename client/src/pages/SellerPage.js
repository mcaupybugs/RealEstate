import React from 'react';
import Header from '../components/Header';
import SellerCreate from '../components/seller/SellerCreate';

class SellerPage extends React.Component {
    render() {
        return (
            <div>
                <Header label="Buyer" link="/buyer" />
                <SellerCreate />
            </div>
        )
    }
}

export default SellerPage;