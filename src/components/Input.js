import React, { Component } from 'react';
import PropTypes from 'prop-types';

class Input extends Component {
    handleChange = (e) => {
        const {name, onChange} = this.props;
        if(onChange){
            onChange(name, e.target.value);
        }
    };

    componentDidMount = () => {
        if(this.props.autoFocus){
            this.refs.focus();
        }
    };

    componentDidUpdate = () => {
        if(this.props.autoFocus){
            this.refs.focus();
        }
    };
    
    setRef = (ref) => {
        this.ref = ref;
    };

    render() {
        const {errorMessage, label, name, value, type, onFocus} = this.props;
        return (
            <div>
                <label>
                    {label}
                    <input id={`input_${name}`} ref={this.Ref} onChange={onFocus} value={value} type={type} />
                    {errorMessage && <span className="error">{errorMessage}</span> }
                </label>
            </div>
        );
    }
}

export default Input;
