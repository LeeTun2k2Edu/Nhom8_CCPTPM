import React, { Fragment, useState } from "react";
import { NavLink } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
    faHouse,
    faTable,
    faChartLine,
    faChartPie,
    faInfoCircle,
    faCircleQuestion,
} from "@fortawesome/free-solid-svg-icons";
import cx from "classnames";
import Calendar from "../../components/calendar";

function NavBar(props) {
    const menu = [
        { icon: faHouse, name: "Home", href: "/home/dashboard" },
        { icon: faTable, name: "Data tables", href: "/home/data-tables" },
        { icon: faChartPie, name: "Circle charts", href: "/home/circle-charts"},
        { icon: faChartLine, name: "Line charts", href: "/home/line-charts" },
        { icon: faCircleQuestion, name: "Help", href: "/home/help" },
        { icon: faInfoCircle, name: "About", href: "/home/about" },
    ];

    const [active, setActive] = useState([
        true,
        false,
        false,
        false,
        false,
        false,
    ]);

    return (
        <Fragment>
            <div id="navbar" className="navbar-vertical">
                <div id="logo">
                    <h1>DASHBOARD</h1>
                </div>
                <ul className="navbar-vertical__item">
                    {menu.map((item, index) => {
                        return (
                            <li key={index}>
                                <NavLink
                                    className={cx("navbar-vertical__content", {
                                        active: active[index]
                                    })}
                                    to={item.href}
                                    onClick={() => {
                                        let arr = [false, false, false, false, false, false];
                                        arr[index] = true;
                                        setActive(arr);
                                    }}
                                    style={{ textDecoration: "none" }}
                                >
                                    <FontAwesomeIcon
                                        className="navbar-vertical__content-icon"
                                        icon={item.icon}
                                    />
                                    <h5 className="navbar-vertical__content-name">
                                        {item.name}
                                    </h5>
                                </NavLink>
                            </li>
                        );
                    })}
                </ul>
                <Calendar />
            </div>
        </Fragment>
    );
}

export default NavBar;
