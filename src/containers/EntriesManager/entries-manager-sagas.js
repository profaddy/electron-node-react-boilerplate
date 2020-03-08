import Actions from "./entries-manager-action-constants";
import { all, put, call, takeEvery } from "redux-saga/effects";
import { fetchEntries } from "./entries-manager-api.js";
import moment from "moment";
function* addEntriesSaga(action) {
    try {
        console.log(action);
        yield put({ type: Actions.ADD_ENTRY_SUCCESS });
    } catch (error) {
        yield put({ type: Actions.ADD_ENTRY_FAILURE });
        console.log("error occured while fetching entries", error);
    }
}

function* fetchEntriesSaga(action) {
    try {
        console.log(action);
        const { data }  = yield call(fetchEntries);
        const { entries }  = data
        const formattedEntries = entries.reduce((acc,item) => {
            const entry = [
                moment(item.created_at).format("MM-DD-YYYY"),
                item.product_name,
                item.user_name,
                item.taken,
                item.consumed,
                item.returned,
                item.remaining,
                {
                    name: "id",
                    value:"test",
                    options: {
                      display: false,
                    }
                  },    
            ]
            for(let i = 0; i<1; i++){
                acc.push(entry);
            }
            
            return acc;
        },[])
        yield put({ type: Actions.FETCH_ENTRY_SUCCESS,data:formattedEntries })
    } catch (error) {
        yield put({ type: Actions.FETCH_ENTRY_FAILURE })
        console.log("error occured while fetching entries", error);
    }
}

export default function* entriesMnaagerSagas() {
    yield all([
        takeEvery(Actions.ADD_ENTRY_REQUEST, addEntriesSaga),
        takeEvery(Actions.FETCH_ENTRY_REQUEST, fetchEntriesSaga)
    ]);
}
