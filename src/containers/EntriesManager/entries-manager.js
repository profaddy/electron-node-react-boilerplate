import React, { Component } from 'react';
import MUIDataTable from "mui-datatables";
import Button from "@material-ui/core/Button";
import withStyles from "@material-ui/core/styles/withStyles";
import ModalWrapper from "../../components/ModalWrapper/ModalWrapper";
import EntryForm from "../../components/EntryForm/EntryForm";
import styles from "./styles";

class EntriesManager extends Component {
    constructor(props) {
        super(props);
        this.state = {
            addEntryModalShowing: false
        }
    }
    componentDidMount() {
        this.props._fetchEntries();
        console.log(this.props.entries);
    }
    openAddEntryModal = () => {
        this.props._openAddEntryModal();
    }
    closeAddEntryModal = () => {
        this.props._closeAddEntryModal();
    }
    render() {
        const { entries,addEntryModalShowing, classes } = this.props;
        const options = {
            filterType: "dropdown",
            responsive: "scroll",
            // selectableRows:false,
            // onRowClick: (rowData,rowState) => {console.log(rowData, rowState)}
            // customToolbarSelect: (selectedRows) => {console.log(selectedRows,"selectedRows")}
        };
        const columns = ["created_at", "Inventory", "Username", "taken", "consumed", "returned", "remaining"];

        return (
            <div>
                <div className={classes.AddEntryButton}>
                    <Button color="primary" onClick={this.openAddEntryModal}>Add Entry</Button>
                </div>
                <MUIDataTable
                    title={"ACME Employee list"}
                    data={entries}
                    columns={columns}
                    options={options}
                />
                <ModalWrapper
                    title={"Add Entry"}
                    isOpen={addEntryModalShowing}
                    minWidth={720}
                    showBottomToolbar={false}
                    showCloseIcon={true}
                    onClose={this.closeAddEntryModal}
                    showResizeOptions={false}
                ><EntryForm 
                    onCancel={this.closeAddEntryModal}
                /></ModalWrapper>
            </div>
        );
    }
}

export default withStyles(styles)(EntriesManager);