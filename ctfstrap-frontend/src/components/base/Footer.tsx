import React from 'react';
import styled from 'styled-components';
import Container from './Container';

const FooterContainer = styled.div`
  text-align: center;
  padding: 1rem;
`;

interface FooterProps {}

const Footer: React.FC<FooterProps> = () => (
  <Container>
    <FooterContainer>Powered by CTFStrap</FooterContainer>
  </Container>
);

export default Footer;
