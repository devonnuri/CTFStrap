import * as React from 'react';
import { connect } from 'react-redux';
import { RootState } from '../../modules';
import { setUser } from '../../modules/user';
import { check } from '../../lib/api/auth';

const mapDispatchToProps = {
  setUser,
};

interface OwnProps {}
interface StateProps {}
type DispatchProps = typeof mapDispatchToProps;
type CoreProps = OwnProps & StateProps & DispatchProps;

const Core: React.FC<CoreProps> = ({ setUser }) => {
  check()
    .then(response => {
      const { id, email, username } = response.data;
      setUser({ id, email, username });
    })
    .catch(() => {
      setUser(null);
    });

  return null;
};

export default connect<StateProps, DispatchProps, OwnProps, RootState>(
  () => ({}),
  mapDispatchToProps,
)(Core);