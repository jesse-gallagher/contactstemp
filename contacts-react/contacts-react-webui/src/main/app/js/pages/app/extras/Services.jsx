/* 
 * (c) Copyright Darwino Inc. 2014-2017.
 */
import React from "react";
import { withRouter } from 'react-router'
import { connect } from 'react-redux'
import { Field, reduxForm } from 'redux-form';
import { Tabs, Tab, Button, ButtonToolbar, ControlLabel } from 'react-bootstrap';
import { FormattedMessage, injectIntl } from 'react-intl';

import { JstoreCursor, Jsql } from '@darwino/darwino';
import { DocumentForm, Dialog, Messages, renderText, ListPicker } from '@darwino/darwino-react-bootstrap';

import Constants from "../Constants.jsx";

import ServicesMicro from "./ServicesMicro.jsx";
import ServicesRest from "./ServicesRest.jsx";

const FORM_NAME = "services";

//
// Demo page showing how to call services
//
class Services extends DocumentForm {

    constructor(props,context) {
        super(props,context)
    }

    render() {
        return (
            <div>
                {this.createMessages()}
                <form>
                    <FormattedMessage id='services.title' tagName='h2'/>
                    <Tabs defaultActiveKey={1} id="doctab">
                        <Tab eventKey={1} title={this.props.intl.formatMessage({id:"services.micro"})}>
                            <ServicesMicro mainForm={this}/>
                        </Tab>
                        <Tab eventKey={2} title={this.props.intl.formatMessage({id:"services.rest"})}>
                            <ServicesRest mainForm={this}/>
                        </Tab>
                    </Tabs>
                    {/*Uncomment to display the current JSON content*/}
                    {/* <JsonDebug form={this.props.form}/>   */}
                </form>
            </div>
        );
    }
}

const form = reduxForm({
    form: FORM_NAME,
    validate: DocumentForm.validateForm,
    onChange: DocumentForm.onChange
});

export default injectIntl(withRouter(
    connect(null,DocumentForm.mapDispatchToProps)
        (form(Services)))
)
