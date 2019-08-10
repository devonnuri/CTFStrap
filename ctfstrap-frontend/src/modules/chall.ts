import { createStandardAction } from 'typesafe-actions';
import produce from 'immer';
import { createReducer } from '../lib/utils';

export type ChallModal = {
  id: number;
  name: string;
  description: string;
  points: number;
  category: string;
  author: string;
  tags: { name: string }[];
  solved: boolean;
};

const SHOW_CHALL_MODAL = 'chall/SHOW_CHALL_MODAL';
const CLOSE_CHALL_MODAL = 'chall/CLOSE_CHALL_MODAL';
const SET_CHALL_LIST = 'chall/SET_CHALL_LIST';

export const showChallModal = createStandardAction(
  SHOW_CHALL_MODAL,
)<ChallModal | null>();
export const closeChallModal = createStandardAction(CLOSE_CHALL_MODAL)();
export const setChallList = createStandardAction(SET_CHALL_LIST)<
  ChallModal[]
>();

type ShowChallModal = ReturnType<typeof showChallModal>;
type SetChallList = ReturnType<typeof setChallList>;

export type ChallState = {
  modalChall: ChallModal | null;
  challList: ChallModal[];
};

const initialState: ChallState = {
  modalChall: null,
  challList: [],
};

const chall = createReducer<ChallState>(
  {
    [SHOW_CHALL_MODAL]: (state, action: ShowChallModal) =>
      produce(state, draft => {
        draft.modalChall = action.payload;
      }),
    [CLOSE_CHALL_MODAL]: state =>
      produce(state, draft => {
        draft.modalChall = null;
      }),
    [SET_CHALL_LIST]: (state, action: SetChallList) =>
      produce(state, draft => {
        draft.challList = action.payload;
      }),
  },
  initialState,
);

export default chall;
