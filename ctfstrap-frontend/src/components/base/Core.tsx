import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import { RootState } from '../../modules';
import { setUser } from '../../modules/user';
import { check } from '../../lib/api/auth';

const mapStateToProps = (state: RootState) => ({
  user: state.user.user,
});
const mapDispatchToProps = {
  setUser,
};

interface OwnProps {}
type StateProps = ReturnType<typeof mapStateToProps>;
type DispatchProps = typeof mapDispatchToProps;
type CoreProps = OwnProps & StateProps & DispatchProps;

const Core: React.FC<CoreProps> = ({ setUser }) => {
  useEffect(() => {
    check()
      .then(response => {
        const { id, email, username, admin } = response.data;
        setUser({
          id,
          email,
          username,
          admin,
        });
      })
      .catch(() => {
        setUser(null);
      });
  }, [setUser]);

  return null;
};

export default connect<StateProps, DispatchProps, OwnProps, RootState>(
  mapStateToProps,
  mapDispatchToProps,
)(Core);
