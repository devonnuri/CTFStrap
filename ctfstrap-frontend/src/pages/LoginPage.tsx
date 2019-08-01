import * as React from 'react';
import styled from 'styled-components';
import { RouteComponentProps } from 'react-router';
import { connect } from 'react-redux';
import Container from '../components/base/Container';
import PageTitle from '../components/base/PageTitle';
import Form from '../components/base/Form';
import LabelInput from '../components/common/LabelInput';
import Button from '../components/common/Button';
import { RootState } from '../modules';
import { setUser } from '../modules/user';
import { login } from '../lib/api/auth';
import Alert from '../components/common/Alert';

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
type LoginPageProps = OwnProps & StateProps & DispatchProps;

const LoginPage: React.FC<LoginPageProps> = ({ history, setUser }) => {
  const [form, setValues] = useState({
    name: '',
    password: '',
  });
  const [alert, setAlert] = useState('');

  const updateField = (e: React.ChangeEvent<HTMLInputElement>) => {
    setValues({ ...form, [e.target.name]: e.target.value });
  };

  const onSubmit = (e: React.FormEvent) => {
    login(form)
      .then(response => {
        const { id, email, username } = response.data;
        setUser({ id, email, username });
        history.push('/');
      })
      .catch(() => {
        setValues({ name: '', password: '' });
        setAlert('Invalid Credentials.');
      });

    e.preventDefault();
  };

  return (
    <Container>
      <PageTitle>Login</PageTitle>

      <Form onSubmit={onSubmit}>
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
      </Form>
    </Container>
  );
};

export default connect<StateProps, DispatchProps, OwnProps, RootState>(
  mapStateToProps,
  mapDispatchToProps,
)(LoginPage);
