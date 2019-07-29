import * as React from 'react';
import styled from 'styled-components';
import Container from '../components/base/Container';
import PageTitle from '../components/base/PageTitle';
import Form from '../components/base/Form';
import LabelInput from '../components/common/LabelInput';
import Button from '../components/common/Button';

const ButtonSet = styled.div`
  text-align: center;
`;

interface LoginPageProps {}

const { useState, useCallback } = React;

const LoginPage: React.FC<LoginPageProps> = () => {
  const [name, setName] = useState('');
  const [password, setPassword] = useState('');

  const onChangeName = useCallback(e => {
    setName(e.target.value);
  }, []);

  const onChangePassword = useCallback(e => {
    setPassword(e.target.value);
  }, []);

  return (
    <Container>
      <PageTitle>Login</PageTitle>

      <Form>
        <LabelInput
          name="name"
          label="Username or Email"
          value={name}
          onChange={onChangeName}
        />
        <LabelInput
          type="password"
          name="password"
          label="Password"
          value={password}
          onChange={onChangePassword}
        />
        <ButtonSet>
          <Button size="large">Login</Button>
        </ButtonSet>
      </Form>
    </Container>
  );
};

export default LoginPage;
