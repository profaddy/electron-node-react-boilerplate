import React, { useState } from 'react';
import { Form, Field } from "react-final-form";
import { Divider, Button, withStyles } from "@material-ui/core";
import styles from "./styles";
import SelectComponent from "../../components/SelectComponent/SelectComponent";
import InputField from "../../components/InputField/InputField";
import ToggleComponent from "../../components/ToggleComponent/ToggleComponent";
// import get from "lodash/get";
// import omit from "lodash/omit";
// import moment from "moment";
// import Tooltip from "@material-ui/core/Tooltip/Tooltip";
// import { validator } from "./validator";

let quantitiesList = [];
for (let i = 0; i < 100; i++) {
    quantitiesList.push({ name: i, value: i })
}
const EntryForm = ({ classes, onCancel }) => {
    const [initialValues, setCount] = useState({
        entry_type: "taken"
    });

    return (
        <>
            <div className={classes.container}>
                <div className={classes.flex1}>
                    <Form
                        onSubmit={(values) => {
                            console.log(values)
                            // if (values.omnisci.installation.licenseOption !== "new") {
                            //     values.omnisci.installation.licenseId = values.omnisci.installation.licenseOption;
                            // }
                            // this.props.onCreate(omit(values, [
                            //     "omnisci.installation.licenseOption"
                            // ]));
                        }}
                        initialValues={initialValues}
                        // validate={validator}
                        render={({ handleSubmit, pristine, invalid, values }) => (
                            <form id="add-new-entry" autoComplete="off" onSubmit={handleSubmit}>
                                {/* <FormSpy onChange={state => this.updateDetails(state.values)} /> */}
                                <div className={classes.formContainer}>
                                    <div className={classes.flex3}>
                                        <div style={{ width: 200 }}>
                                            <Field
                                                name={"user"}
                                                options={[
                                                    {
                                                        name: "U1",
                                                        value: "u1"
                                                    }, {
                                                        name: "U2",
                                                        value: "u2"
                                                    }, {
                                                        name: "U3",
                                                        value: "u3"
                                                    }
                                                ]}
                                                labelfor={"user"}
                                                labelname={"Select User"}
                                                component={SelectComponent}
                                                fullWidth={true}
                                                labelwidth={120}
                                                helperText={(
                                                    <span style={{ paddingBottom: 10 }}>

                                                    </span>
                                                )} />
                                        </div>
                                        <div style={{ width: 200 }}>
                                            <Field
                                                name={"inventory"}
                                                options={[
                                                    {
                                                        name: "I1",
                                                        value: "i1"
                                                    }, {
                                                        name: "I2",
                                                        value: "i2"
                                                    }, {
                                                        name: "I3",
                                                        value: "i3"
                                                    }
                                                ]}
                                                labelfor={"inventory"}
                                                labelname={"Select Inventory"}
                                                component={SelectComponent}
                                                fullWidth={true}
                                                labelwidth={120}
                                                helperText={(
                                                    <span style={{ paddingBottom: 10 }}>

                                                    </span>
                                                )} />
                                        </div>
                                        <div style={{ width: 200 }}>
                                            <Field
                                                type={"text"}
                                                label={"Select Quantity"}
                                                name={"entry_value"}
                                                component={InputField}
                                                fullWidth={false}
                                            />
                                        </div>
                                        {/* <div style={{ width: 200 }}>
                                            <Field
                                                name={"entry_value"}
                                                options={quantitiesList}
                                                labelfor={"entry_value"}
                                                labelname={"Select Quantity"}
                                                component={SelectComponent}
                                                fullWidth={true}
                                                labelwidth={120}
                                                helperText={(
                                                    <span style={{ paddingBottom: 10 }}>

                                                    </span>
                                                )} /> */}
                                    {/* </div> */}
                                    <div className={classes.installTypeFieldWrap}>
                                        <div className={classes.label}>
                                            Entry Type
                                            </div>
                                        <Field
                                            name="entry_type"
                                            options={[
                                                {
                                                    name: "Taken",
                                                    value: "taken"
                                                }, {
                                                    name: "Consumed",
                                                    value: "consumed"
                                                }, {
                                                    name: "Returned",
                                                    value: "returned"
                                                }
                                            ]}
                                            width={150}
                                            component={ToggleComponent}
                                        />
                                    </div>
                                    <div>
                                    </div>
                                </div>
                                <div className={classes.flex1}></div>
                                </div>
                            </form>
                )}
            />
                </div>
                <div>
                    <Divider />
                    <div className={classes.modalBodyBottomToolbar}>
                        <Button variant="outlined" onClick={onCancel} className={classes.button}>
                            Cancel
                    </Button>
                        <Button
                            form="add-new-entry"
                            variant="contained"
                            type={"submit"}
                            color="primary"
                            className={classes.button}
                        >
                            Create
                    </Button>
                    </div>
                </div>
            </div>
        </>
    );
};

export default withStyles(styles)(EntryForm);