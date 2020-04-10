import React from 'react';
import PropTypes from 'prop-types';

const LoadingButton = ({ text, isLoading }) => {
    return (
        <button
            className={`btn btn-${isLoading ? 'secondary' : 'primary'}`}
            disabled={isLoading}
        >
            {isLoading ? 'Loading...' : text}
        </button>
    )
};

LoadingButton.propTypes = {
    text: PropTypes.string.isRequired,
    isLoading: PropTypes.bool,
};

export default LoadingButton;
