/* eslint-disable jsx-a11y/click-events-have-key-events */
/* eslint-disable jsx-a11y/no-noninteractive-element-interactions */

import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import './sidebar.scss';

function Sidebar() {
  const [sidebar, setSidebar] = useState(false);
  const showSidebar = () => setSidebar(!sidebar);
  return (
    <nav className={sidebar ? 'sidebar active' : 'sidebar'}>
      <button className="hamburger" type="button" onClick={showSidebar}>
        <div />
      </button>

      <ul onClick={showSidebar}>
        <li><Link to="/">Home</Link></li>
        <li><Link to="/contact">Contact</Link></li>
      </ul>
    </nav>
  );
}

export default Sidebar;
