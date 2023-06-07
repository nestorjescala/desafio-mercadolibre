import React from 'react';
import './Message.scss';

export default function Message(props){
    return <div className={`message-container ${props.error ? 'error' : ''}`}>
        <h4 className={'message-title'}><i className={`message-icon ${props.error ? 'error' : ''}`}/>Articulo no encontrado!</h4>
        <p className={'message-text'}>{props.message}</p>
    </div>
}