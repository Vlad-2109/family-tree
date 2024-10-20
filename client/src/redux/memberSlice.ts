import { createAction, createSlice, PayloadAction } from '@reduxjs/toolkit';
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
    // setToken: (state, action: PayloadAction<string>) => {
    //   state.token = action.payload;
    // },
    // logout: (state) => {
    //   state._id = '';
    //   state.name = '';
    //   state.email = '';
    //   state.profile_pic = '';
    //   state.token = '';
    //   state.socketConnection = null;
    // },
    // setOnlineUser: (state, action: PayloadAction<string[]>) => {
    //   state.onlineUser = action.payload;
    // },
    // setSocketConnection: (state, action) => {
    //   state.socketConnection = action.payload;
    // },
  },
});

export const GET_MEMBERS = 'members/getMembers';
export const getMembers = createAction(GET_MEMBERS);

export const { getMembersSuccess } = memberSlice.actions;

export default memberSlice.reducer;
