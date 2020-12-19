import React, { Component } from 'react';
import PropTypes from 'prop-types';


class Counter extends Component {
    render() {
        return (
            <div>
                현재 카운트: {this.props.count}
                <button onClick={() => this.props.onAdd()}>
                    카운트 증가
                </button>
            </div>
        );
    }
}

export default Counter;
