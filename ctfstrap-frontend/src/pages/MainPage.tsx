import * as React from 'react';
import Container from '../components/base/Container';

interface MainPageProps {}

const MainPage: React.FC<MainPageProps> = () => {
  return (
    <Container>
      <h1>Welcome!!</h1>
    </Container>
  );
};

export default MainPage;
