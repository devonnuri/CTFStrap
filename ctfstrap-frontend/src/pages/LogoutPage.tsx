import React from 'react';
import { RouteComponentProps } from 'react-router-dom';
import { connect } from 'react-redux';
import { RootState } from '../modules';
import { setUser } from '../modules/user';
import { logout } from '../lib/api/auth';

const mapStateToProps = () => ({});
const mapDispatchToProps = {
  setUser,
};

interface OwnProps extends RouteComponentProps {}
type StateProps = ReturnType<typeof mapStateToProps>;
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
  mapStateToProps,
  mapDispatchToProps,
)(LogoutPage);
