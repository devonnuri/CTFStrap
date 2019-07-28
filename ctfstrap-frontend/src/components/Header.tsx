import React from 'react';
import styled from 'styled-components';

const HeaderContainer = styled.header`
    display: flex;
    align-items: center;
    padding: 0.5rem 1rem;
`;

const Navbar = styled.ul`
    display: flex;
    padding: 0;
    margin: 0;
    flex-grow: 1;
`;

const Title = styled.h1`
    display: inline-block;
    vertical-align: middle;
    margin: 1rem 3rem 1rem 0;
`;

const NavbarLeft = styled.div`
    display: flex;
    margin-right: auto;
`;

const NavbarRight = styled.div`
    display: flex;
    margin-left: auto;
`;

const NavbarItem = styled.div`
    display: block;

    padding: 0 1rem;
`;

interface HeaderProps {}

const Header: React.FC<HeaderProps> = () => {
    return (
        <HeaderContainer>
            <Title>CTFStrap</Title>
            <Navbar>
                <NavbarLeft>
                    <NavbarItem>Challenges</NavbarItem>
                    <NavbarItem>Scoreboard</NavbarItem>    
                </NavbarLeft>
                <NavbarRight>
                    <NavbarItem>Login</NavbarItem>
                    <NavbarItem>Register</NavbarItem>
                    <NavbarItem>Logout</NavbarItem>
                </NavbarRight>
            </Navbar>
        </HeaderContainer>
    );
};

export default Header;