import { createStandardAction } from 'typesafe-actions';
import { createReducer } from '../lib/utils';

type CurrentUser = {
  id: number;
  email: string;
  username: string;
  admin: boolean;
};

const SET_USER = 'user/SET_USER';

export const setUser = createStandardAction(SET_USER)<CurrentUser | null>();

type SetUser = ReturnType<typeof setUser>;

export type UserState = {
  user: CurrentUser | null;
};

const initialState: UserState = {
  user: null,
};

export default createReducer<UserState>(
  {
    [SET_USER]: (state, { payload: user }: SetUser) => ({ ...state, user }),
  },
  initialState,
);
