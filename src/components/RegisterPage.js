import React from 'react';
import { Component } from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';

import { userActions } from '../actions';
import LoadingButton from "./LoadingButton";

export class RegisterPage extends Component {
    constructor(props) {
        super(props);

        this.state = {
            user: {
                username: '',
                password: ''
            },
            submitted: false
        };

        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    handleChange(event) {
        const {name, value} = event.target;

        this.setState((prevState) => {
            const user = prevState.user;
            user[name] = value;
            return {user};
        });
    }

    handleSubmit(event) {
        event.preventDefault();

        const { register } = this.props;
        const { user } = this.state;

        this.setState({submitted: true});

        if (user.username && user.password) {
            register(user);
        }
    }

    render() {
        const { user, submitted } = this.state;
        const { registration } = this.props;
        return (
            <div className="col-md-6 col-md-offset-3">
                <h2>Register</h2>
                <form name="form" onSubmit={this.handleSubmit}>
                    <div className={'form-group' + (submitted && !user.username ? ' has-error' : '')}>
                        <label htmlFor="username">Username</label>
                        <input
                            type="text"
                            className="form-control username"
                            name="username"
                            onChange={this.handleChange}
                        />
                        {submitted && !user.username &&
                            <div className="help-block">Username is required</div>
                        }
                    </div>
                    <div className={'form-group' + (submitted && !user.password ? ' has-error' : '')}>
                        <label htmlFor="password">Password</label>
                        <input
                            type="password"
                            className="form-control password"
                            name="password"
                            onChange={this.handleChange}
                        />
                        {submitted && !user.password &&
                            <div className="help-block">Password is required</div>
                        }
                    </div>
                    <div className="form-group">
                        <LoadingButton text="Register" isLoading={registration && registration.registering} />
                        <Link to="/login" className="btn btn-link">Cancel</Link>
                    </div>
                </form>
            </div>
        );
    }
}

// complete the below function
function mapStateToProps(state) {
    const { registration } = state;
    return {
        registration,
    }
}

function mapDispatchToProps(dispatch) {
    return {
        register: (user) => dispatch(userActions.register(user)),
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(RegisterPage);

export { RegisterPage as TestRegisterPage };
