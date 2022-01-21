import {Component} from 'react'
import {CgPlayList} from 'react-icons/cg'
import {Link} from 'react-router-dom'

import './index.css'

const Tab = {home: 'home', about: 'about'}

class Header extends Component {
  state = {activeTab: Tab.home}

  changeActiveTabAbout = () => {
    this.setState({activeTab: Tab.about})
  }

  changeActiveTabHome = () => {
    this.setState({activeTab: Tab.home})
  }

  render() {
    const {activeTab} = this.state
    return (
      <nav className="navbar navbar-expand-lg navbar-dark covid19-header">
        <li>
          <Link
            onClick={this.changeActiveTabHome}
            to="/"
            className="navbar-brand header-logo"
          >
            <span className="header-logo-1">COVID19</span>
            <span className="header-logo-2">INDIA</span>
          </Link>
        </li>
        <button
          className="navbar-toggler border-0 bg-transparent"
          type="button"
          data-toggle="collapse"
          data-target="#navbarNav"
          aria-controls="navbarNav"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <CgPlayList className="hamberger-icon" />
        </button>
        <div className="collapse navbar-collapse" id="navbarNav">
          <ul className="navbar-nav">
            <li className={`nav-item ${activeTab === 'home' && 'active'}`}>
              <Link
                onClick={this.changeActiveTabHome}
                to="/"
                className="nav-link"
              >
                Home
              </Link>
            </li>
            <li className={`nav-item ${activeTab === 'about' && 'active'}`}>
              <Link
                onClick={this.changeActiveTabAbout}
                value={Tab.about}
                to="/about"
                className="nav-link"
              >
                About
              </Link>
            </li>
          </ul>
        </div>
      </nav>
    )
  }
}

export default Header
