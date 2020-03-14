import Actions from "./inventory-manager-action-constants";
import { all, put, takeEvery, call } from "redux-saga/effects";
import { fetchInventories } from "./inventory-manager-api.js";
import sagaMiddleware from "../../mystore/sagamiddleware";

export function* fetchInventoriesSaga(action) {
    try {
        const { data } = yield call(fetchInventories);
        const inventories  = data.products;
        const inventoriesList = inventories.reduce((acc, item) => {
            const inventory = { name: item.name, value: item._id }
            acc.push(inventory);
            return acc;
        }, [])
        yield put({ type: Actions.FETCH_INVENTORIES_SUCCESS, data: inventoriesList })
    } catch (error) {
        console.error(error)
        yield put({ type: Actions.FETCH_INVENTORIES_FAILURE })
    }
}


export default function* inventoryrManagerSagas() {
    yield all([
        takeEvery(Actions.FETCH_INVENTORIES_REQUEST, fetchInventoriesSaga)
    ]);
}

