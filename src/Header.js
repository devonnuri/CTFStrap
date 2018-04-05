import React, { Component } from 'react'

class Header extends Component {
    render() {
        return (
            <div className="header">
                <ul className="header-nav">
                    <li><a href="#" id="logo">StrapCTF</a></li>
                    <li><a href="#">Challenge</a></li>
                    <li><a href="#">Rank</a></li>
                </ul>
            </div>
        )
    }
}

export default Header
