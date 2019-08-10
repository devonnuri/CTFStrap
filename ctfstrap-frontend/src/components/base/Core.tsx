import React from 'react';
import { connect } from 'react-redux';
import { RootState } from '../../modules';
import { setUser } from '../../modules/user';
import { setChallList } from '../../modules/chall';
import { check } from '../../lib/api/auth';
import { getChallList } from '../../lib/api/chall';

const mapStateToProps = () => ({});
const mapDispatchToProps = {
  setUser,
  setChallList,
};

interface OwnProps {}
type StateProps = ReturnType<typeof mapStateToProps>;
type DispatchProps = typeof mapDispatchToProps;
type CoreProps = OwnProps & StateProps & DispatchProps;

const Core: React.FC<CoreProps> = ({ setUser, setChallList }) => {
  check()
    .then(response => {
      const { id, email, username } = response.data;
      setUser({ id, email, username });
      return getChallList();
    })
    .then(response => {
      setChallList(response.data);
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
