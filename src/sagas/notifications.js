import { put, fork, takeLatest, select } from 'redux-saga/effects';
import { getNotesInTrash } from '../selectors';
import { notesMovedToTrashMessage, notesDeletedMessage } from '../messages';

import {
  MOVE_NOTES_TO_TRASH,
  NOTIFICATION_INFO,
  DELETE_NOTES,
} from '../constants/types';

import {
  showNotification,
  restoreNotesFromTrash,
  deleteNotes,
} from '../actions';


const notifyMovedToTrash = function* (action) {
  const { ids } = action.payload;
  const notesCount = ids.size ? ids.size : ids.length;

  yield put(showNotification(
    NOTIFICATION_INFO,
    notesMovedToTrashMessage.format({ notesCount }),
    // FIXME: get rid of store.dispatch
    // () => store.dispatch(
    //   restoreNotesFromTrash(action.payload.ids)
    // )
  ));
};

const notifyNotesDeleted = function* (action) {
  const { ids } = action.payload;
  const notesCount = ids.size ? ids.size : ids.length;

  yield put(showNotification(
    NOTIFICATION_INFO,
    notesDeletedMessage.format({ notesCount })
  ));
};


export const watchMoveNotesToTrash = function* () {
  yield takeLatest(MOVE_NOTES_TO_TRASH, notifyMovedToTrash);
};

export const watchDeleteNotes = function* () {
  yield takeLatest(DELETE_NOTES, notifyNotesDeleted);
};


const forked = [
  fork(watchMoveNotesToTrash),
  fork(watchDeleteNotes),
];

export default forked;
