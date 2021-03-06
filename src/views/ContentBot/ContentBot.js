import React, {Component} from "react";
import {Bar, Line} from "react-chartjs-2";
import {
    Badge,
    Row,
    Col,
    Progress,
    Dropdown,
    DropdownToggle,
    DropdownMenu,
    DropdownItem,
    Card,
    CardHeader,
    CardBody,
    CardFooter,
    CardTitle,
    Collapse,
    Button,
    ButtonToolbar,
    ButtonGroup,
    ButtonDropdown,
    Label,
    Input,
    Table,
    Form,
    FormGroup,
    Modal,
    ModalHeader,
    ModalBody,
    ModalFooter,
    InputGroup,
    InputGroupAddon,
    InputGroupText,
    Alert,
    ListGroup,
    ListGroupItem
} from "reactstrap";
import "react-table/react-table.css";
import {FilePond, registerPlugin} from "react-filepond";
import "filepond/dist/filepond.min.css";
import axios from "axios";
import axiosCookieJarSupport from "axios-cookiejar-support";
import tough from "tough-cookie";
import {Redirect} from "react-router-dom";
import ReactExport from "react-data-export";
import {CSVLink} from "react-csv";
import moment from "moment";
import "bootstrap/dist/css/bootstrap.css";
import "bootstrap-daterangepicker/daterangepicker.css";
import "react-big-calendar/lib/css/react-big-calendar.css";
import BigCalendar from "react-big-calendar";

import FilePondPluginImagePreview from 'filepond-plugin-image-preview';
import 'filepond-plugin-image-preview/dist/filepond-plugin-image-preview.min.css';

registerPlugin(FilePondPluginImagePreview);

const cookieJar = new tough.CookieJar();

var http = axios.create({
    jar: cookieJar,
    withCredentials: true
})

axiosCookieJarSupport(http);

class ContentBot extends Component {
    constructor(props) {
        super(props);

        this.state = {};

        this.hello = this.hello.bind(this);
    }


    hello() {
        console.log('Hello world')
    }

    render() {

        return (
            <div className="animated fadeIn">
                <Card>
                    <CardHeader>

                    </CardHeader>
                    <CardBody>
                        <Row>
                            <Col xs="12" sm="12" lg="12">
                                <p className="App-intro">
                                    Upload picture.
                                </p>
                                <FilePond name="image" server="http://137.74.165.25:4902/upload"/>
                            </Col>
                        </Row>
                    </CardBody>
                </Card>
            </div>
        )
    }
}

export default ContentBot;
