import React from 'react';
import { Link } from 'react-router-dom';

export default () => {
    return (
        <div>
            <ul>
                <li><Link to="/">get&del</Link></li>
                <li><Link to="/page1">post</Link></li>
                <li><Link to="/page2">put</Link></li>
                <li><Link to="/counter">Counter</Link></li>
                <li><Link to="/User">User</Link></li>
            </ul>
        </div>
    )
}