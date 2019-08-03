import React from 'react';
import { connect } from 'react-redux';
import { RootState } from '../../modules';
import { setUser } from '../../modules/user';
import { check } from '../../lib/api/auth';

const mapStateToProps = () => ({});
const mapDispatchToProps = {
  setUser,
};

interface OwnProps {}
type StateProps = ReturnType<typeof mapStateToProps>;
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
  mapStateToProps,
  mapDispatchToProps,
)(Core);
