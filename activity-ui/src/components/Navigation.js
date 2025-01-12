import React from 'react';
import { Link } from 'react-router-dom';
import { IoHome } from 'react-icons/io5';
import { FcAddDatabase } from 'react-icons/fc';

function Navigation() {
    return (
        <nav className="App-nav">
            <Link to="/">Home</Link>
            <Link to="/create">Add</Link>
        </nav>
    );
  }
  

export default Navigation;