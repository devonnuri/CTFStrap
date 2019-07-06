import React from 'react';
import styled from 'styled-components';
import Header from '../components/Header';

const MainContainer = styled.main`
    @media (min-width: 1281px) {
        padding: 0 15rem;
    }
`;

interface MainPageProps {}

const MainPage: React.FC<MainPageProps> = () => {
    return (
        <MainContainer>
            <Header/>
        </MainContainer>
    );
};

export default MainPage;