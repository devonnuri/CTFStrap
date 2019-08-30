import { createStandardAction } from 'typesafe-actions';
import { createReducer } from '../lib/utils';
import produce from 'immer';

type CurrentUser = {
  id: number;
  email: string;
  username: string;
  admin: boolean;
};

type RankUser = {
  username: string;
  points: number;
  lastSolve: Date;
};

const SET_USER = 'user/SET_USER';
const SET_RANK = 'user/SET_RANK';

export const setUser = createStandardAction(SET_USER)<CurrentUser | null>();
export const setRank = createStandardAction(SET_RANK)<RankUser[]>();

type SetUser = ReturnType<typeof setUser>;
type SetRank = ReturnType<typeof setRank>;

export type UserState = {
  user: CurrentUser | null;
  rank: RankUser[];
};

const initialState: UserState = {
  user: null,
  rank: [],
};

const user = createReducer<UserState>(
  {
    [SET_USER]: (state, { payload: user }: SetUser) => {
      return { ...state, user };
    },
    [SET_RANK]: (state, action: SetRank) =>
      produce(state, draft => {
        draft.rank = action.payload;
      }),
  },
  initialState,
);

export default user;
