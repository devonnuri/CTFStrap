import React, { useState } from 'react';
import styled from 'styled-components';
import { RouteComponentProps } from 'react-router-dom';
import { connect } from 'react-redux';
import Container from '../components/base/Container';
import PageTitle from '../components/base/PageTitle';
import LabelInput from '../components/common/LabelInput';
import Button from '../components/common/Button';
import { RootState } from '../modules';
import { setUser } from '../modules/user';
import { login } from '../lib/api/auth';
import Alert from '../components/common/Alert';

const LoginForm = styled.form`
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
type LoginPageProps = OwnProps & StateProps & DispatchProps;

const LoginPage: React.FC<LoginPageProps> = ({ history, setUser }) => {
  const [form, setValues] = useState({
    name: '',
    password: '',
  });
  const [alert, setAlert] = useState('');

  const updateField = (event: React.ChangeEvent<HTMLInputElement>) => {
    setValues({ ...form, [event.target.name]: event.target.value });
  };

  const onSubmit = (event: React.FormEvent) => {
    login(form)
      .then(response => {
        const { id, email, username, admin } = response.data;
        setUser({
          id,
          email,
          username,
          admin,
        });
        history.push('/');
      })
      .catch(() => {
        setValues({ name: '', password: '' });
        setAlert('Invalid Credentials.');
      });

    event.preventDefault();
  };

  return (
    <Container>
      <PageTitle>Login</PageTitle>

      <LoginForm onSubmit={onSubmit}>
        {alert && <Alert color="secondary">{alert}</Alert>}
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
          <Button type="submit" size="large" onClick={onSubmit}>
            Login
          </Button>
        </ButtonSet>
      </LoginForm>
    </Container>
  );
};

export default connect<StateProps, DispatchProps, OwnProps, RootState>(
  mapStateToProps,
  mapDispatchToProps,
)(LoginPage);
