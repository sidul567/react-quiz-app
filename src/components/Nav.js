import React from 'react'
import classes from '../styles/Nav.module.css'
import logo from '../assets/images/LogoMakr-7tgoWl.png'
import Account from './Account'
import { Link } from 'react-router-dom'
function Nav() {
    return (
        <>
        <nav className={classes.nav}>
            <ul>
                <li>
                    <Link to="/" className={classes.brand}>
                        <img src={logo} alt=""/>
                        <h3>Sidul Islam Moon</h3>
                    </Link>
                </li>
            </ul>
            <Account/>
        </nav>   
        </>
    )
}

export default Nav
