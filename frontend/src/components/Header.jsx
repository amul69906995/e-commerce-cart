import React, { useContext } from 'react';
import { NavLink, Link } from 'react-router-dom';
import { BsMinecart } from 'react-icons/bs';
import './header.css';
import logo from '../assets/logo.png';
import { cartItemContext } from '../context/CartContext';

const Header = () => {
  const {cart}=useContext(cartItemContext)
  return (
    <>
    <div style={{position: 'fixed', width: '100%',top:'0',zIndex:10}}>
      <nav className='header'>
        <Link to='/'><img src={logo} alt='Logo' className='logo' /></Link>
        <ul className='nav-links'>
          <li>
            <NavLink to='/'>Home</NavLink>
          </li>
          <li>
            <NavLink to='/cart'  className='cart-link '>
              <BsMinecart />
              <span className='cart-count'>{cart.length}</span>
            </NavLink>
          </li>
        </ul>
      </nav>
      </div>
    </>
  );
}

export default Header;


//1297
