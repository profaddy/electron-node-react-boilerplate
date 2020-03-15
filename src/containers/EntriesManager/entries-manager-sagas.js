import Actions from "./entries-manager-action-constants";
import moment from "moment";
import { all, put, call, takeEvery } from "redux-saga/effects";
import { fetchEntries, addEntry, fetchEntryInfo, updateEntry } from "./entries-manager-api.js";

function* addEntrySaga(action) {
    try {
        yield call(addEntry, action.data);
        yield put({ type: Actions.ADD_ENTRY_SUCCESS });
    } catch (error) {
        yield put({ type: Actions.ADD_ENTRY_FAILURE });
        console.error("error occured while fetching entries", error);
    }
}

function* updateEntrySaga(action) {
    try {
        yield call(updateEntry, action.data);
        yield put({ type: Actions.UPDATE_ENTRY_SUCCESS });
    } catch (error) {
        yield put({ type: Actions.UPDATE_ENTRY_FAILURE });
        console.error("error occured while fetching entries", error);
    }
}

function* fetchEntriesSaga(action) {
    try {
        const { data } = yield call(fetchEntries);
        const { entries } = data;
        const formattedEntries = entries.reduce((acc, item) => {
            const created_at = moment.utc(item.created_date, "YYYY-MM-DDThh:mm:ss.sssZ").local().format("DD-MM-YYYY hh:mm A")
            const entry = [
                created_at,
                item.product_name,
                item.user_name,
                item.taken,
                item.consumed,
                item.returned,
                item.remaining,
                item._id,
                item._id
            ];
            acc.push(entry);
            return acc;
        }, []);
        yield put({ type: Actions.FETCH_ENTRY_SUCCESS, data: formattedEntries });
    } catch (error) {
        yield put({ type: Actions.FETCH_ENTRY_FAILURE });
        console.error("error occured while fetching entries", error);
    }
}

function* fetchEntryInfoSaga(action) {
    try {
        const { id } = action;
        const { data } = yield call(fetchEntryInfo, id);
        const { entry } = data;
        yield put({ type: Actions.FETCH_ENTRY_INFO_SUCCESS, data: entry });
        yield put({ type: Actions.OPEN_ADD_ENTRY_MODAL });
    } catch{
        console.error("error");
        yield put({ type: Actions.FETCH_ENTRY_INFO_FAILURE });
    }
}

export default function* entriesMnaagerSagas() {
    yield all([
        takeEvery(Actions.ADD_ENTRY_REQUEST, addEntrySaga),
        takeEvery(Actions.UPDATE_ENTRY_REQUEST, updateEntrySaga),
        takeEvery(Actions.FETCH_ENTRY_REQUEST, fetchEntriesSaga),
        takeEvery(Actions.FETCH_ENTRY_INFO_REQUEST, fetchEntryInfoSaga)
    ]);
}
