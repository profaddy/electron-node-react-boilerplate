import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import EntriesManager from "./entries-manager";
import Actions from "./entries-manager-actions";
import userActions from "../UserManager/user-actions";
import inventoryActions from "../InventoryManager/inventory-manager-actions";

const mapStateToProps = (state) => {
  return {
    entries: state.EntriesManager.entries,
    addEntryModalShowing: state.EntriesManager.addEntryModalShowing,
    users: state.UserManager.users,
    inventories: state.InventoryManager.inventories,
    selectedEntry: state.EntriesManager.selectedEntry
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    _fetchEntries: bindActionCreators(Actions._fetchEntries, dispatch),
    _fetchEntryInfo: bindActionCreators(Actions._fetchEntryInfo, dispatch),
    _fetchInventories: bindActionCreators(inventoryActions._fetchInventories, dispatch),
    _fetchUsers: bindActionCreators(userActions._fetchUsers, dispatch),
    _addEntry: bindActionCreators(Actions._addEntry, dispatch),
    _updateEntry: bindActionCreators(Actions._updateEntry, dispatch),
    _openAddEntryModal: bindActionCreators(Actions._openAddEntryModal, dispatch),
    _closeAddEntryModal: bindActionCreators(Actions._closeAddEntryModal, dispatch)

  };
};
export default connect(
  mapStateToProps,
  mapDispatchToProps
)(EntriesManager);
