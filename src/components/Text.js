import React from 'react';

const Text = (selObj) => {
    console.log(selObj);
    return (
        <div style={{position: 'fixed', left: '75%', top: '45vh'}}>
            おはようございます！ <br/>
            地球と月の回転を作ってみました！ <br/>
            With React&Three.js
        </div>
    );
}

export default Text;
