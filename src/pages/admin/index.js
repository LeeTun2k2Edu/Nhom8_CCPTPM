import React, { Fragment, useEffect, useState } from "react";
import Header from "../../layouts/header";
import Footer from "../../layouts/footer";
import NavBar from "../../layouts/nav";
import Main from "../../layouts/main";
import Context from "../../components/context";
import Cookies from "js-cookie";
import { Navigate } from "react-router-dom";

function Admin(props) {
    const [user, setUser] = useState({ full_name: "guest", role: "guest" });

    const userJSON = Cookies.get("user");
    console.log(userJSON);
    useEffect(() => {
        if (userJSON) {
            setUser(JSON.parse(userJSON));
        }
    }, [userJSON]);

    return (
        <Fragment>
            {!userJSON && <Navigate to="/login" />}
            <Context.Provider value={{ user, setUser }}>
                <Header />
                <NavBar />
                <Main /> {/*Children route here! => /home/* */}
                <Footer />
            </Context.Provider>
        </Fragment>
    );
}

export default Admin;
