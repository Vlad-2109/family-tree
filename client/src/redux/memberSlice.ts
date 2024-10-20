import { createAction, createSlice } from '@reduxjs/toolkit';
import { put } from 'redux-saga/effects';
import { MemberService } from '../services/member.service';
import { IMember } from '../types/types';

interface IMemberState {
  members: IMember[];
}

const initialState: IMemberState = {
  members: [],
};

export function* getMembersSaga(): any {
  const payload = yield MemberService.getAllMembers();

  yield put(getMembersSuccess(payload));
}

export const memberSlice = createSlice({
  name: 'member',
  initialState,
  reducers: {
    getMembersSuccess: (state, action) => {
      state.members = action.payload;
    },
  },
});

export const GET_MEMBERS = 'members/getMembers';
export const getMembers = createAction(GET_MEMBERS);

export const { getMembersSuccess } =
  memberSlice.actions;

export default memberSlice.reducer;
