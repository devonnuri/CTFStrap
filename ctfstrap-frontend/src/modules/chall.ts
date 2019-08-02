import { createStandardAction } from 'typesafe-actions';
import produce from 'immer';
import { createReducer } from '../lib/utils';

export type ChallModal = {
  name: string;
  description: string;
  points: number;
  category: string;
  author: string;
  tags: string[];
  solved: boolean;
};

const SHOW_CHALL_MODAL = 'chall/SHOW_CHALL_MODAL';
const CLOSE_CHALL_MODAL = 'chall/CLOSE_CHALL_MODAL';

export const showChallModal = createStandardAction(
  SHOW_CHALL_MODAL,
)<ChallModal | null>();
export const closeChallModal = createStandardAction(CLOSE_CHALL_MODAL)();

type ShowChallModal = ReturnType<typeof showChallModal>;

export type ChallState = {
  modalChall: ChallModal | null;
};

const initialState: ChallState = {
  modalChall: null,
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
  },
  initialState,
);

export default chall;
