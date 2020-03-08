import ActionConstants from "./entries-manager-action-constants";

const Actions = {
    _addEntry: (entry) => {
        console.log(entry)
        return {
            type: ActionConstants.ADD_ENTRY_REQUEST,
            entry
        };
    },
    _fetchEntries:() => {
        return {
            type:ActionConstants.FETCH_ENTRY_REQUEST
        }
    },
    _openAddEntryModal:() => {
        return{
            type:ActionConstants.OPEN_ADD_ENTRY_MODAL
        }
    },
    _closeAddEntryModal:() => {
        return{
            type:ActionConstants.CLOSE_ADD_ENTRY_MODAL
        }
    }
};

export default Actions;
