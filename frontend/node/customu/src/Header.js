import React from 'react';
import { Link } from 'react-router-dom';

export const Header = () => {
    return(
        <div>
            <Link to='/'>Top</Link>
            <ul>
                <li><Link to='/daily'>日報</Link></li>
            </ul>
        </div>
    )
}