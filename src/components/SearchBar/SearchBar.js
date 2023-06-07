import React, {useState} from 'react';
import {Link} from 'react-router-dom';
import logo from '../../assets/logo_ml.png';
import './SearchBar.scss';

export function SearchBar(props) {

    const [searchVal, setSearchVal] = useState('');

    const handleSubmit = (event) => {
        event.preventDefault();
        props.onSubmit(searchVal);
    };

    return <div className="background-banner">
        <form className="search-bar-container" onSubmit={(event) => handleSubmit(event)}>
            <Link to={'/'}>
                <img src={logo} style={{ 'height':'34px' }} alt="Logo" />
            </Link>
            <input className="search-bar-input" type="text" placeholder="Nunca dejes de buscar"
                onKeyUp={(e) => setSearchVal(e.target.value)}/>
            <button type="submit" className="search-bar-btn" data-testid="search-bar-icon"/>
        </form>
    </div>;

}