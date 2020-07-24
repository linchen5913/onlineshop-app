//here, we should put any actions that could lead to side-effects/api calls
//thus, we're moving the FETCH_COLLECTION_START actions to here

import { takeEvery, call, put,all } from 'redux-saga/effects';

import ShopActionTypes from './shop.types';
import { firestore, convertCollectionsSnapshotToMap } from '../../firebase/firebase.utils';

import {
    fetchCollectionsSuccess,
    fetchCollectionsFailure
} from './shop.actions';

export function* fetchCollectionAsync() {
    try {
        const collectionRef = firestore.collection('collections')
        const snapshot = yield collectionRef.get();
        const collectionsMap = yield call(convertCollectionsSnapshotToMap, snapshot);
        yield put(fetchCollectionsSuccess(collectionsMap))
    } catch (err) {
        yield put(fetchCollectionsFailure(err.message))
    }
}

export function* fetchCollectionsStart() {
    //the first parameter is a usual redux action
    //the second parameter of takeEvery is where we could trigger more actions to run
    //usually, we'll pass in another generators to corporate with the redux action
    yield takeEvery(ShopActionTypes.FETCH_COLLECTIONS_START, fetchCollectionAsync)
};

export function* shopSagas() {
    yield all([call(fetchCollectionsStart)])
}