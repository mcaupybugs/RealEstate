import React from 'react';
import { Router, Route, Switch } from 'react-router-dom';
import history from '../history'
import HomePage from '../pages/HomePage';
import BuyerPage from '../pages/BuyerPage';
import SellerPage from '../pages/SellerPage';
import SellerEdit from './seller/SellerEdit';
import SellerDelete from './seller/SellerDelete';


class App extends React.Component {


    render() {
        return (
            <div>
                <Router history={history}>
                    <div>
                        <Switch>
                            <Route path="/" exact component={HomePage} />
                            <Route path="/buyer" exact component={BuyerPage} />
                            <Route path="/seller" exact component={SellerPage} />
                            <Route path="/seller/edit/:id" exact component={SellerEdit} />
                            <Route path="/seller/delete/:id" exact component={SellerDelete} />
                        </Switch>
                    </div>
                </Router>
            </div>
        )
    }
}

export default App;