/* 
 * (c) Copyright Darwino Inc. 2014-2017.
 */
import React, {Component} from "react";

import { Field } from 'redux-form';
import { Jsql, JstoreCursor } from '@darwino/darwino';
import {  _t } from '@darwino/darwino';
import { renderSelect } from '@darwino/darwino-react-bootstrap';

import Constants from "../Constants";

class AllFieldsSelect extends Component {

    render() {
        const {mainForm} = this.props;
        const readOnly = mainForm.isReadOnly();
        const disabled = mainForm.isDisabled();
        return (
            <fieldset>
                <div className="col-md-12 col-sm-12">
                    <Field name="select1" component={renderSelect} label={_t("afselect.staticnolbl","Select With Static Values - No Label")} disabled={disabled} readOnly={readOnly}
                        options={["M","F"]}
                    />
                </div>
                <div className="col-md-12 col-sm-12">
                    <Field name="select11" component={renderSelect} label={_t("afselect.static","Select With Static Values")} disabled={disabled} readOnly={readOnly}
                        options={[
                            { value: "M", label: _t("afselect.male","Male")},
                            { value: "F", label: _t("afselect.female","Female")}
                        ]}
                    />
                </div>
                <div className="col-md-12 col-sm-12">
                    <Field name="select2" component={renderSelect} label={_t("afselect.staticempty","Select With Static Values and an Empty row")} disabled={disabled} readOnly={readOnly}
                        emptyOption={_t("afselect.empty","<empty>")}
                        options={[
                            { value: "M", label: _t("afselect.male","Male")},
                            { value: "F", label: _t("afselect.female","Female")}
                        ]}
                    />
                </div>
                <div className="col-md-12 col-sm-12">
                    <Field name="select3" component={renderSelect} label={_t("afselect.compquery","Read Companies With Database Query")} disabled={disabled} readOnly={readOnly}
                        emptyOption={_t("afselect.empty","<empty>")}
                        options={() => {
                            return new JstoreCursor()
                                .database(Constants.DATABASE)
                                .store("_default")
                                .extract("{value:'name'}")
                                .queryParams({name:"AllCompanies"})
                                .fetch();
                            }}
                        />
                    </div>
                <div className="col-md-12 col-sm-12">
                    <Field name="select4" component={renderSelect} label={_t("afselect.compjsql","Read Companies With a JSQL Query")} disabled={disabled} readOnly={readOnly}
                        emptyOption={_t("afselect.empty","<empty>")}
                        options={() => {
                            return new Jsql()
                                .database(Constants.DATABASE)
                                .query("SELECT $.name name FROM companies WHERE $.form='Company' ORDER BY name")
                                .format('value')
                                .fetch();
                        }}
                    />
                </div>
            </fieldset>
        );
    }
}

export default AllFieldsSelect