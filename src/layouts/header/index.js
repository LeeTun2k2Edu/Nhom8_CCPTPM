import React, { Fragment } from "react";
import UserBox from "./userBox";

function Header(props) {
    return (
        <Fragment>
            <header id="header">
                <div>.</div>
                <UserBox />
            </header>
        </Fragment>
    );
}

export default Header;
