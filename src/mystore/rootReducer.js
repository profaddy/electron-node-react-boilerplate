import { combineReducers } from "redux";
import { connectRouter } from "connected-react-router";
import history from "./history";
// import notification from "notifications/notification-reducer";

// app specific reducers
// import InstallationManager from "pages/installation-manager/installation-manager-reducer";
// import InstallationEditor from "pages/installation-editor/installation-editor-reducer";
// import hostManager from "pages/host-manager/host-manager-reducer";
// import userSettings from "pages/user-settings/user-settings-reducer";
// import userManager from "pages/user-manager/user-manager-reducer";
import EntriesManager from "../containers/EntriesManager/entries-manager-reducer";
import UserManager from "../containers/UserManager/user-manager-reducer";

export default combineReducers({
    // notification: notification,
    router: connectRouter(history),
    UserManager:UserManager,
    EntriesManager:EntriesManager
    // installationManager: InstallationManager,
    // installationEditor: InstallationEditor,
    // hostManager:hostManager,
    // userSettings: userSettings,
    // userManager: userManager,
    // AppManager: AppManger
});
