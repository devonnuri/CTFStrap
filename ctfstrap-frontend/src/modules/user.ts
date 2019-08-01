import { createStandardAction } from 'typesafe-actions';
import { createReducer } from '../lib/utils';

type CurrentUser = {
  id: number;
  email: string;
  username: string;
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

const user = createReducer<UserState>(
  {
    [SET_USER]: (state, { payload: user }: SetUser) => {
      return { ...state, user };
    },
  },
  initialState,
);

export default user;
