import React from 'react';
import { connect } from 'react-redux';
import { RootState } from '../../modules';
import { setUser, setRank } from '../../modules/user';
import { setChallList } from '../../modules/chall';
import { check } from '../../lib/api/auth';
import { getChallList } from '../../lib/api/chall';
import { getSolves, getRank } from '../../lib/api/user';

const mapStateToProps = (state: RootState) => ({
  user: state.user.user,
});
const mapDispatchToProps = {
  setUser,
  setChallList,
  setRank,
};

interface OwnProps {}
type StateProps = ReturnType<typeof mapStateToProps>;
type DispatchProps = typeof mapDispatchToProps;
type CoreProps = OwnProps & StateProps & DispatchProps;

const Core = React.memo<CoreProps>(
  ({ setUser, setChallList, setRank }) => {
    check()
      .then(response => {
        const { id, email, username, admin } = response.data;
        setUser({ id, email, username, admin });
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

    getRank().then(response => {
      setRank(response.data);
    });

    return null;
  },
  (prevProps, nextProps) => {
    return !!prevProps.user || prevProps.user === nextProps.user;
  },
);

export default connect<StateProps, DispatchProps, OwnProps, RootState>(
  mapStateToProps,
  mapDispatchToProps,
)(Core);
