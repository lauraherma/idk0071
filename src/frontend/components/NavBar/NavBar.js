import React from 'react';
import './NavBar.css';
import {Collapse, Nav, Navbar, NavbarBrand, NavbarToggler, NavItem, NavLink} from "reactstrap";

export class NavBar extends React.Component {
    state = {
        isOpen: false
    };

    toggle() {
        this.setState({
            isOpen: !this.state.isOpen
        });
    }
    render() {
        return (
            <Navbar  className="NavBar" light expand="md">
                <div className="container">
                    <NavbarBrand href="/">
                        <Collapse isOpen={this.state.isOpen} navbar>
                            <img className="logo" src="/nerdwarelogo.png" alt="logo"/>
                            <Nav className="ml-auto" navbar>
                                <NavItem>
                                    <NavLink href="/">Kalender</NavLink>
                                </NavItem>
                                <NavItem>
                                    <NavLink href="/clients">Kliendid</NavLink>
                                </NavItem>
                            </Nav>
                        </Collapse>
                    </NavbarBrand>
                </div>

                <NavbarToggler onClick={this.toggle} />
            </Navbar>
        );
    }
}
