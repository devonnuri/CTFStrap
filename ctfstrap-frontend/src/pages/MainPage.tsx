import React from 'react';
import Container from '../components/Container';
import Header from '../components/Header';

interface MainPageProps {}

const MainPage: React.FC<MainPageProps> = () => {
    return (
        <Container>
            <Header/>
        </Container>
    );
};

export default MainPage;