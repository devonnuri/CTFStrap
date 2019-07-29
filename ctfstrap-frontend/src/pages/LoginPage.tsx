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

const { useState } = React;

const LoginPage: React.FC<LoginPageProps> = () => {
  const [form, setValues] = useState({
    name: '',
    password: '',
  });

  const updateField = (e: React.ChangeEvent<HTMLInputElement>) => {
    setValues({ ...form, [e.target.name]: e.target.value });
  };

  return (
    <Container>
      <PageTitle>Login</PageTitle>

      <Form>
        <LabelInput
          name="name"
          label="Username or Email"
          value={form.name}
          onChange={updateField}
        />
        <LabelInput
          type="password"
          name="password"
          label="Password"
          value={form.password}
          onChange={updateField}
        />
        <ButtonSet>
          <Button size="large">Login</Button>
        </ButtonSet>
      </Form>
    </Container>
  );
};

export default LoginPage;
