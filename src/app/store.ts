import { configureStore, ThunkAction, Action } from '@reduxjs/toolkit';
import counterReducer from '../slices/counterSlice';
import { firebaseReducer } from 'react-redux-firebase'
import { createFirestoreInstance, firestoreReducer } from 'redux-firestore'
import firebase from './firebase'


const rrfConfig = {
  userProfile: 'users',
  useFirestoreForProfile: true
}


export const store = configureStore({
  reducer: {
    counter: counterReducer,
    firestore: firestoreReducer,
    firebase:firebaseReducer
  },
});



export const rrfProps = {
  firebase,
  config: rrfConfig,
  dispatch: store.dispatch,
  createFirestoreInstance
}

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;
export type AppThunk<ReturnType = void> = ThunkAction<
ReturnType,
RootState,
unknown,
Action<string>
>;
