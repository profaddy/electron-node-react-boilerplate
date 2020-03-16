import React, { Component } from "react";
import MUIDataTable from "mui-datatables";
import Button from "@material-ui/core/Button";
import EditIcon from "@material-ui/icons/Edit";
import withStyles from "@material-ui/core/styles/withStyles";
import ModalWrapper from "../../components/ModalWrapper/ModalWrapper";
import EntryForm from "../../components/EntryForm/EntryForm";
import { options } from "./helpers";
import styles from "./styles";

class EntriesManager extends Component {
    constructor(props) {
        super(props);
        this.state = {
            addEntryModalShowing: false,
            savedEntries: [],
            entryMode: "add"
        };
    }
    componentDidMount() {
        this.props._fetchEntries();
        this.props._fetchUsers();
        this.props._fetchInventories();
    }
    openAddEntryModal = () => {
        this.props._openAddEntryModal();
    }
    closeAddEntryModal = () => {
        this.props._closeAddEntryModal();
        this.setState({ entryMode: "add" });
    }

    columns = [
        {
            name: "created_at"
        }, {
            name: "Inventory"
        }, {
            name: "Username"
        }, {
            name: "Taken"
        }, {
            name: "Consumed"
        }, {
            name: "Returned"
        }, {
            name: "Remaining"
        }, {
            name: "id",
            value: "test",
            options: {
                display: false
            }
        }, {
            name: "Actions",
            options: {
                customBodyRender: (value, tableMeta, updateValue) => {
                    return (
                        <Button onClick={() => {
                            this.props._fetchEntryInfo(value);
                            this.setState({ entryMode: "edit" });
                        }}>
                            {" "}
                            <EditIcon color="primary" />
                        </Button>
                    );
                }
            }
        }
    ]

    render() {
        const { entries, addEntryModalShowing, classes } = this.props;
        return (
            <div>
                <div className={classes.AddEntryButton}>
                    <Button color="primary" onClick={this.openAddEntryModal}>
                        Add Entry
                    </Button>
                </div>
                <MUIDataTable
                    title={"Switch On Services Employee List"}
                    data={entries}
                    columns={this.columns}
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
                >
                    <EntryForm
                        onCancel={this.closeAddEntryModal}
                        addEntry={this.props._addEntry}
                        users={this.props.users}
                        inventories={this.props.inventories}
                        selectedEntry={this.props.selectedEntry}
                        entryMode={this.state.entryMode}
                        updateEntry={this.props._updateEntry}
                    />
                </ModalWrapper>
            </div>
        );
    }
}

export default withStyles(styles)(EntriesManager);
