import React from 'react';
import { connect } from 'react-redux';
import { RootState } from '../../modules';
import { setUser } from '../../modules/user';
import { setChallList } from '../../modules/chall';
import { check } from '../../lib/api/auth';
import { getChallList } from '../../lib/api/chall';
import { getSolves } from '../../lib/api/user';

const mapStateToProps = (state: RootState) => ({
  user: state.user.user,
});
const mapDispatchToProps = {
  setUser,
  setChallList,
};

interface OwnProps {}
type StateProps = ReturnType<typeof mapStateToProps>;
type DispatchProps = typeof mapDispatchToProps;
type CoreProps = OwnProps & StateProps & DispatchProps;

const Core = React.memo<CoreProps>(({ setUser, setChallList }) => {
  check()
    .then(response => {
      const { id, email, username } = response.data;
      setUser({ id, email, username });
      return Promise.all([getChallList(), getSolves()]);
    })
    .then(([{ data: challData }, { data: solveData }]) => {
      setChallList(
        challData.map(chall => ({
          ...chall,
          solved: solveData.includes(chall.id),
        })),
      );
    })
    .catch(() => {
      setUser(null);
    });

  return null;
});

export default connect<StateProps, DispatchProps, OwnProps, RootState>(
  mapStateToProps,
  mapDispatchToProps,
)(Core);
