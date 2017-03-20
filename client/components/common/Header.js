import React from 'react';
import {Link, IndexLink} from 'react-router';

const Header = () => {
  return (
        <nav className="pink darken-3">
            <div className="nav-wrapper">
                <div className="container">
                    <Link to="/" className="brand-logo">Doc Management</Link>
                </div>
                <ul id="nav-mobile" className="right hide-on-med-and-down">
                    <li>
                        <IndexLink to="/" activeClassName="active">Home</IndexLink>
                    </li>
                    <li>
                        <a href="badges.html">Components</a>
                    </li>
                    <li>
                        <a href="collapsible.html">JavaScript</a>
                    </li>
                </ul>

            </div>
        </nav>
  );
};
export default Header;
