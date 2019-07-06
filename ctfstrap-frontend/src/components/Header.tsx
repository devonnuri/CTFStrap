import React from 'react';
import styled from 'styled-components';

const Title = styled.h1`
    display: inline-block;
    vertical-align: middle;
    margin: 1rem 3rem 1rem 0;
`;

const Navbar = styled.ul`
    display: inline-block;
    vertical-align: middle;
    padding: 0;
    margin: 0;
    li {
        display: inline;
        padding: 0 1rem;
    }
`;

interface HeaderProps {}

const Header: React.FC<HeaderProps> = () => {
    return (
        <header>
            <Title>CTFStrap</Title>
            <Navbar>
                <li>Challenges</li>
                <li>Scoreboard</li>
                <li>Login</li>
                <li>Register</li>
                <li>Logout</li>
            </Navbar>
        </header>
    );
};

export default Header;