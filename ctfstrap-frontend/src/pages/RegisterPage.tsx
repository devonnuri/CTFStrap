import React, { useState } from 'react';
import styled from 'styled-components';
import { RouteComponentProps } from 'react-router-dom';
import { connect } from 'react-redux';
import Container from '../components/base/Container';
import PageTitle from '../components/base/PageTitle';
import LabelInput from '../components/common/LabelInput';
import Button from '../components/common/Button';
import Alert from '../components/common/Alert';
import { setUser } from '../modules/user';
import { register } from '../lib/api/auth';
import { RootState } from '../modules';

const RegisterForm = styled.form`
  margin: 5rem 0;
  padding: 0 15vw;
`;

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

  const updateField = (event: React.ChangeEvent<HTMLInputElement>) => {
    setValues({
      ...form,
      [event.target.name]: event.target.value,
    });
  };

  const onSumbit = (e: React.FormEvent) => {
    if (form.password !== form.passwordConfirm) {
      setAlert('Password and confirm password do not match.');
    } else {
      const { email, username, password } = form;
      register({ email, username, password })
        .then(response => {
          setUser({
            id: response.data.id,
            email,
            username,
            admin: false,
          });
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

      <RegisterForm onSubmit={onSumbit}>
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
      </RegisterForm>
    </Container>
  );
};

export default connect<StateProps, DispatchProps, OwnProps, RootState>(
  mapStateToProps,
  mapDispatchToProps,
)(RegisterPage);
