import React, { Fragment } from "react";
import Header from "../../layouts/header";
import Footer from "../../layouts/footer";
import NavBar from "../../layouts/nav";
import Main from "../../layouts/main";


function Admin(props) {
    return (
        <Fragment>
            <Header />
            <NavBar />

            <Main/> {/*Children route here! => /home/* */}

            <Footer />
        </Fragment>
    );
}

export default Admin;
