import React, { Component } from 'react'
import User from 'react-icons/lib/fa/user'

class Header extends Component {
    render() {
        return (
            <div className="header">
                <ul className="header-nav">
                    <li><a href="#" id="logo">StrapCTF</a></li>
                    <li><a href="#">Challenge</a></li>
                    <li><a href="#">Rank</a></li>
                    <li><a href="#" className="header-right"><User size={16} />Account</a></li>
                </ul>
            </div>
        )
    }
}

export default Header
