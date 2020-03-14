import { all } from "redux-saga/effects";
import userManagerSagas from "../containers/UserManager/user-manager-sagas";
import entriesManagerSagas from "../containers/EntriesManager/entries-manager-sagas";
import inventoryrManagerSagas from "../containers/InventoryManager/inventory-manager-sagas";

export default function* rootSaga() {
    yield all([
        userManagerSagas(),
        entriesManagerSagas(),
        inventoryrManagerSagas()
    ])
  }