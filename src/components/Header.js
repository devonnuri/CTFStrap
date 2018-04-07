import React, { Component } from 'react'

import User from 'react-icons/lib/fa/user'
import File from 'react-icons/lib/go/file-text'
import Chart from 'react-icons/lib/fa/line-chart'
import CaretDown from 'react-icons/lib/fa/caret-down'

import config from '../ctfstrap.config'

class Header extends Component {
  render() {
    let iconSize = 16

    return (
      <div className="header">
        <ul className="header-nav">
          <div className="container">
            <li><a href="#" id="logo">{config.ctfName}</a></li>
            <li><a href="#"><File size={iconSize+2} /> Challenge</a></li>
            <li><a href="#"><Chart size={iconSize} /> Rank</a></li>
            <li className="dropdown header-right">
              <a href="#"><User size={iconSize} />Account <CaretDown size={iconSize} /></a>
              <ul className="dropdown-content">
                <li><a href="#">DUMMY</a></li>
                <li><a href="#">DUMMY</a></li>
                <li><a href="#">DUMMY</a></li>
                <li><a href="#">DUMMY</a></li>
              </ul>
            </li>
          </div>
        </ul>
      </div>
    )
  }
}

export default Header