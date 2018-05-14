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
            <div>
                <Navbar  className="NavBar" color="transparent" light expand="md">
                    <NavbarBrand href="/">
                        <img className="logo" src="/nerdwarelogo.png" alt="logo"/>
                    </NavbarBrand>
                    <NavbarToggler onClick={this.toggle} />
                    <Collapse isOpen={this.state.isOpen} navbar>
                        <Nav className="ml-auto" navbar>
                            <NavItem>
                                <NavLink href="/">Kalender</NavLink>
                            </NavItem>
                            <NavItem>
                                <NavLink href="/clients">Kliendid</NavLink>
                            </NavItem>
                        </Nav>
                    </Collapse>
                </Navbar>
            </div>
        );
    }
}
