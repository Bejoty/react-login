import React from 'react';
import { connect } from "react-redux";
import {alertActions} from "../actions";

const AlertBanner = ({ alert, alertClear }) => {
    return (
        <div className={`alert ${alert.type}`} hidden={!alert.type}>
            {alert.message}
            <button className="close" onClick={alertClear}>
                <span>&times;</span>
            </button>
        </div>
    );
};

function mapStateToProps(state) {
    const { alert } = state;
    return {
        alert
    };
}

function mapDispatchToProps(dispatch) {
    return {
        alertClear: () => dispatch(alertActions.clear()),
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(AlertBanner);
