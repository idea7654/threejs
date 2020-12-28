import React from 'react';
import { Route, Link } from 'react-router-dom';

const Main = (props) => {
    return (
        <div style={{position: 'fixed', left: '75%', top: '45vh'}}>
            おはようございます！ <br/>
            地球と月の回転を作ってみました！ <br/>
            With React&Three.js
        </div>
    );
}

export default Main;