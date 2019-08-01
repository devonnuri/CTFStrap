import { createStandardAction } from 'typesafe-actions';
import produce from 'immer';
import { createReducer } from '../lib/utils';

type CurrentUser = {
  id: number;
  email: string;
  username: string;
};

export type ChallModal = {
  title: string;
  points: number;
  description: string;
  category: string;
  author: string;
  tags: string[];
  solved: boolean;
};

const SET_USER = 'core/SET_USER';
const SHOW_CHALL_MODAL = 'core/SHOW_CHALL_MODAL';
const CLOSE_CHALL_MODAL = 'core/CLOSE_CHALL_MODAL';

export const setUser = createStandardAction(SET_USER)<CurrentUser | null>();
export const showChallModal = createStandardAction(
  SHOW_CHALL_MODAL,
)<ChallModal | null>();
export const closeChallModal = createStandardAction(CLOSE_CHALL_MODAL)();

type SetUser = ReturnType<typeof setUser>;
type ShowChallModal = ReturnType<typeof showChallModal>;

export type CoreState = {
  user: CurrentUser | null;
  modalChall: ChallModal | null;
};

const initialState: CoreState = {
  user: null,
  modalChall: null,
};

const core = createReducer<CoreState>(
  {
    [SET_USER]: (state, { payload: user }: SetUser) => {
      return { ...state, user };
    },
    [SHOW_CHALL_MODAL]: (state, action: ShowChallModal) =>
      produce(state, draft => {
        draft.modalChall = action.payload;
      }),
    [CLOSE_CHALL_MODAL]: state =>
      produce(state, draft => {
        draft.modalChall = null;
      }),
  },
  initialState,
);

export default core;
