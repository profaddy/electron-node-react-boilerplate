import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import EntriesManager from "./entries-manager";
import Actions from "./entries-manager-actions";

const mapStateToProps = (state) => {
  return {
    entries:state.EntriesManager.entries,
    addEntryModalShowing:state.EntriesManager.addEntryModalShowing,
  };
};

const mapDispatchToProps = (dispatch) => {
  return{
    _fetchEntries: bindActionCreators(Actions._fetchEntries, dispatch),
    _addEntry:bindActionCreators(Actions._addEntry, dispatch),
    _openAddEntryModal:bindActionCreators(Actions._openAddEntryModal,dispatch),
    _closeAddEntryModal:bindActionCreators(Actions._closeAddEntryModal,dispatch),

  }};
//   sagaMiddleware.run(entriesMnaagerSagas)
export default connect(
  mapStateToProps,
//   null,
  mapDispatchToProps,
)(EntriesManager);
