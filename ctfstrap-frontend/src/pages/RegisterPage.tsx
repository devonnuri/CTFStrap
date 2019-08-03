import React from 'react';
import styled from 'styled-components';
import { RouteComponentProps } from 'react-router';
import Container from '../components/base/Container';
import PageTitle from '../components/base/PageTitle';
import Form from '../components/base/Form';
import LabelInput from '../components/common/LabelInput';
import Button from '../components/common/Button';
import Alert from '../components/common/Alert';
import { setUser } from '../modules/user';
import { register } from '../lib/api/auth';
import { connect } from 'react-redux';
import { RootState } from '../modules';

const { useState } = React;

const ButtonSet = styled.div`
  text-align: center;
`;

const mapStateToProps = () => ({});
const mapDispatchToProps = {
  setUser,
};

interface OwnProps extends RouteComponentProps {}
type StateProps = ReturnType<typeof mapStateToProps>;
type DispatchProps = typeof mapDispatchToProps;
type RegisterPageProps = OwnProps & StateProps & DispatchProps;

const RegisterPage: React.FC<RegisterPageProps> = ({ history, setUser }) => {
  const [form, setValues] = useState({
    email: '',
    username: '',
    password: '',
    passwordConfirm: '',
  });
  const [alert, setAlert] = useState('');

  const updateField = (e: React.ChangeEvent<HTMLInputElement>) => {
    setValues({
      ...form,
      [e.target.name]: e.target.value,
    });
  };

  const onSumbit = (e: React.FormEvent) => {
    if (form.password !== form.passwordConfirm) {
      setAlert('Password and confirm password do not match.');
    } else {
      const { email, username, password } = form;
      register({ email, username, password })
        .then(response => {
          setUser({ id: response.data.id, email, username });
          history.push('/');
        })
        .catch(() => {
          setAlert('Invalid input format.');
        });
    }

    e.preventDefault();
  };

  return (
    <Container>
      <PageTitle>Register</PageTitle>

      <Form onSubmit={onSumbit}>
        {alert && <Alert color="secondary">{alert}</Alert>}
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
          <Button type="submit" size="large">
            Register
          </Button>
        </ButtonSet>
      </Form>
    </Container>
  );
};

export default connect<StateProps, DispatchProps, OwnProps, RootState>(
  mapStateToProps,
  mapDispatchToProps,
)(RegisterPage);
