import React, { Fragment } from "react";

import Dropdown from "react-bootstrap/Dropdown";

import { faAngleDown } from "@fortawesome/free-solid-svg-icons";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

import "react-toastify/dist/ReactToastify.css";

import avatar1 from "../../../assets/images/avatars/0.png";

function UserBox(props) {
    return (
        <Fragment>
            <div className="header-btn-lg pe-0">
                <div className="widget-content p-0">
                    <div className="widget-content-wrapper">
                        <div className="widget-content-left">
                            <Dropdown>
                                <Dropdown.Toggle color="link" className="p-0">
                                    <img
                                        width={42}
                                        className="rounded-circle"
                                        src={avatar1}
                                        alt=""
                                    />
                                    <FontAwesomeIcon
                                        className="ms-2 opacity-8"
                                        icon={faAngleDown}
                                    />
                                </Dropdown.Toggle>
                                <Dropdown.Menu className="dropdown-menu-lg">
                                    <Dropdown.Item>Account</Dropdown.Item>
                                    <Dropdown.Item>Settings</Dropdown.Item>
                                </Dropdown.Menu>
                            </Dropdown>
                        </div>
                        <div className="widget-content-left  ms-3 header-user-info">
                            <div className="widget-heading">Họ và Tên</div>
                            <div className="widget-subheading">
                                Chức vụ (Role)
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </Fragment>
    );
}

export default UserBox;
