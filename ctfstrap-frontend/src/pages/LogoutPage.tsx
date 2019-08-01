import * as React from 'react';
import { RouteComponentProps } from 'react-router';
import { connect } from 'react-redux';
import { RootState } from '../modules';
import { setUser } from '../modules/user';
import { logout } from '../lib/api/auth';

const mapDispatchToProps = {
  setUser,
};

interface OwnProps extends RouteComponentProps {}
interface StateProps {}
type DispatchProps = typeof mapDispatchToProps;
type LogoutPageProps = OwnProps & StateProps & DispatchProps;

const LogoutPage: React.FC<LogoutPageProps> = ({ history, setUser }) => {
  logout().then(() => {
    setUser(null);
    history.push('/');
  });

  return null;
};

export default connect<StateProps, DispatchProps, OwnProps, RootState>(
  () => ({}),
  mapDispatchToProps,
)(LogoutPage);
