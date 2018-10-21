import React, {Component} from 'react';
import PropTypes from 'prop-types';
import {
  Nav,
  NavbarBrand,
  NavbarToggler,
  NavItem,
  NavLink,
  Badge
} from 'reactstrap';
import HeaderDropdown from './HeaderDropdown';
import {EventEmitter} from  "fbemitter";

class Header extends Component {

  constructor(props) {
    super(props);
    this.state = {
      basket: JSON.parse(sessionStorage.getItem('articlebasket')) && JSON.parse(sessionStorage.getItem('articlebasket')).length || 0
    };

    var token = this.props.emitter.addListener('ARTICLE_BASKET_UPDATE', (...args) => {
      this.setState({
        basket: JSON.parse(sessionStorage.getItem('articlebasket')) && JSON.parse(sessionStorage.getItem('articlebasket')).length || 0
      })
    });
  }

  sidebarToggle(e) {
    e.preventDefault();
    document.body.classList.toggle('sidebar-hidden');
  }

  sidebarMinimize(e) {
    e.preventDefault();
    document.body.classList.toggle('sidebar-minimized');
  }

  mobileSidebarToggle(e) {
    e.preventDefault();
    document.body.classList.toggle('sidebar-mobile-show');
  }

  asideToggle(e) {
    e.preventDefault();
    document.body.classList.toggle('aside-menu-hidden');
  }

  render() {
    return (
      <header className="app-header navbar">
        <NavbarToggler className="d-lg-none" onClick={this.mobileSidebarToggle}>
          <span className="navbar-toggler-icon"></span>
        </NavbarToggler>
        <NavbarBrand href="#"></NavbarBrand>
        <NavbarToggler className="d-md-down-none" onClick={this.sidebarToggle}>
          <span className="navbar-toggler-icon"></span>
        </NavbarToggler>
        <Nav className="ml-auto" navbar>
          <HeaderDropdown/>
        </Nav>
      </header>
    );
  }
}

export default Header;
