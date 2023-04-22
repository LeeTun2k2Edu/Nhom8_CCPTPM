import React, { Fragment, useState } from 'react';

import Dropdown from 'react-bootstrap/Dropdown';

import { faAngleDown } from '@fortawesome/free-solid-svg-icons';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import 'react-toastify/dist/ReactToastify.css';

import avatar1 from '../../../assets/images/avatars/0.png';

function UserBox(props) {
    const [user, setUser] = useState({"name": "a", "role": "a"});
    const handleLogin = () => {
        if (!localStorage.getItem('token')) {
            // Nếu chưa đăng nhập, chuyển hướng sang trang đăng nhập
            window.location.href = '/login';
            setUser({"name": "b", "role": "b"})
        } else {
            // Nếu đã đăng nhập, chuyển hướng sang trang Account
            window.location.href = '/home/account';
        }
    };

    return (
        <Fragment>
            <div className="header-btn-lg pe-0">
                <div className="widget-content p-0">
                    <div className="widget-content-wrapper">
                        <div className="widget-content-left">
                            <Dropdown>
                                <Dropdown.Toggle color="link" className="p-0">
                                    <img width={42} className="rounded-circle" src={avatar1} alt="" />
                                    <FontAwesomeIcon className="ms-2 opacity-8" icon={faAngleDown} />
                                </Dropdown.Toggle>
                                <Dropdown.Menu className="dropdown-menu-lg">
                                    <Dropdown.Item onClick={handleLogin}>Accout</Dropdown.Item>
                                    <Dropdown.Item>Settings</Dropdown.Item>
                                </Dropdown.Menu>
                            </Dropdown>
                        </div>
                        <div className="widget-content-left  ms-3 header-user-info">
                            <div className="widget-heading">{user.name}</div>
                            <div className="widget-subheading">{user.role}</div>
                        </div>
                    </div>
                </div>
            </div>
        </Fragment>
    );
}

export default UserBox;
