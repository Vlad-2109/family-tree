import { configureStore } from '@reduxjs/toolkit';
import createSagaMiddleware from 'redux-saga';
import { takeEvery } from 'redux-saga/effects';
import memberReducer, { GET_MEMBERS, getMembersSaga } from './memberSlice';

const sagaMiddleware = createSagaMiddleware();

function* sagas() {
  yield takeEvery(GET_MEMBERS, getMembersSaga);
}

export const store = configureStore({
  devTools: true,
  reducer: {
    member: memberReducer,
  },
  middleware: (getDefaultMiddleware) => 
    getDefaultMiddleware({thunk: false}).concat(sagaMiddleware),
});

sagaMiddleware.run(sagas)

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>;
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch;
