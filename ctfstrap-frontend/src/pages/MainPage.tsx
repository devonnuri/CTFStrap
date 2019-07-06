import React from 'react';
import MainHeader from '../components/main/MainHeader';

interface MainPageProps {}

const MainPage: React.FC<MainPageProps> = () => {
    return (
        <main>
            <MainHeader/>
        </main>
    );
};

export default MainPage;