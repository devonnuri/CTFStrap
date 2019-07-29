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

interface RegisterPageProps {}

const { useState } = React;

const RegisterPage: React.FC<RegisterPageProps> = () => {
  const [form, setValues] = useState({
    email: '',
    username: '',
    password: '',
    passwordConfirm: '',
  });

  const updateField = (e: React.ChangeEvent<HTMLInputElement>) => {
    setValues({
      ...form,
      [e.target.name]: e.target.value,
    });
  };

  return (
    <Container>
      <PageTitle>Register</PageTitle>

      <Form>
        <LabelInput
          type="email"
          name="email"
          label="Email"
          value={form.email}
          onChange={updateField}
        />
        <LabelInput
          name="username"
          label="Username"
          value={form.username}
          onChange={updateField}
        />
        <LabelInput
          type="password"
          name="password"
          label="Password"
          value={form.password}
          onChange={updateField}
        />
        <LabelInput
          type="password"
          name="passwordConfirm"
          label="Confirm Password"
          value={form.passwordConfirm}
          onChange={updateField}
        />
        <ButtonSet>
          <Button size="large">Register</Button>
        </ButtonSet>
      </Form>
    </Container>
  );
};

export default RegisterPage;
