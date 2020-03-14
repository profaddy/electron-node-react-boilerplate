import React, { Component } from 'react';
import MUIDataTable from "mui-datatables";
import Button from "@material-ui/core/Button";
import EditIcon from '@material-ui/icons/Edit';
import withStyles from "@material-ui/core/styles/withStyles";
import ModalWrapper from "../../components/ModalWrapper/ModalWrapper";
import EntryForm from "../../components/EntryForm/EntryForm";
import styles from "./styles";

class EntriesManager extends Component {
    constructor(props) {
        super(props);
        this.state = {
            addEntryModalShowing: false,
            savedEntries:[],
            entryMode:"add"
        }
    }
    componentDidMount() {
        this.props._fetchEntries();
        this.props._fetchUsers();
        this.props._fetchInventories();
    }
    // componentDidUpdate = (prevProps,prevState) => {
    //     if(this.props.entries !== prevProps.entries){
    //         this.setState({savedEntries:this.props.entries});
    //     }
    // }
    openAddEntryModal = () => {
        this.props._openAddEntryModal();
    }
    closeAddEntryModal = () => {
        this.props._closeAddEntryModal();
        this.setState({entryMode:"edit"});
    }
    render() {
        const { entries,addEntryModalShowing, classes } = this.props;
        const options = {
            filterType: "dropdown",
            responsive: "scroll",
            rowsPerPage: 50,
            selectableRowsHeader:false,
            selectableRows:false,
            rowsPerPageOptions:[10,30,50,100],
            fixedHeader:true
        };
const columns = [{
    name:"created_at"
},{
    name:"Inventory"
},{
    name:"Username"
},{
    name:"taken"
},{
    name:"consumed"
},{
    name:"returned"
},{
    name:"remaining"
},{
    name:"id",
    value:"test",
    options:{
        display:false
    }
},{
    name:"edit",
    options:{
    customBodyRender: (value, tableMeta, updateValue) => {
        return (
           <Button onClick={() => {
            this.props._fetchEntryInfo(value);
            this.setState({entryMode:"edit"});
            }}> <EditIcon color="primary"  /></Button>
        );
      }}
}]
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
                    addEntry={this.props._addEntry}
                    users={this.props.users}
                    inventories={this.props.inventories}
                    selectedEntry={this.props.selectedEntry}
                    entryMode={this.state.entryMode}
                    updateEntry={this.props._updateEntry}
                /></ModalWrapper>
            </div>
        );
    }
}

export default withStyles(styles)(EntriesManager);