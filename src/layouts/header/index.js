import React, { Fragment } from "react";
import SearchBox from "./searchBox";
import UserBox from "./userBox";

function Header(props) {
    return (
        <Fragment>
            <header id="header">
                <SearchBox />
                <UserBox />
            </header>
        </Fragment>
    );
}

export default Header;
