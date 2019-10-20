import { combineReducers } from 'redux';
import chall, { ChallState } from './chall';
import user, { UserState } from './user';

export type RootState = {
  chall: ChallState;
  user: UserState;
};

export default combineReducers({
  chall,
  user,
});
