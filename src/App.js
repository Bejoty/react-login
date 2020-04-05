import React from 'react';
import { Router, Route, Switch } from 'react-router-dom';
import { connect } from 'react-redux';

import { PrivateRoute } from './PrivateRoute.js';

import { history } from './helpers';
import { alertActions } from './actions';

import { HomePage } from './components/HomePage';
import LoginPage from './components/LoginPage';
import RegisterPage from './components/RegisterPage';

import AlertBanner from './components/AlertBanner';

export class App extends React.Component {
    constructor(props) {
        super(props);

        const { alertClear } = this.props;
        history.listen((location, action) => {
            alertClear();
        });
    }

    render() {
        return (
              <div className="container">
                  <div className="col-sm-8 col-sm-offset-2">
                      <AlertBanner />
                      <Router history={history}>
                          <Switch>
                              <Route path="/login" component={LoginPage} />
                              <Route path="/register" component={RegisterPage} />
                              <PrivateRoute component={HomePage} />
                          </Switch>
                      </Router>
                  </div>
              </div>
        );
    }
}

function mapDispatchToProps(dispatch) {
    return {
        alertClear: () => dispatch(alertActions.clear()),
    }
}

export default connect(null, mapDispatchToProps)(App);
