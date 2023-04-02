import React, { Fragment, useState } from "react";
import cx from "classnames";
import { faSearch } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

function SearchBox(props) {
    const [active, setActive] = useState(false);

    return (
        <Fragment>
            <div className={cx("search-wrapper", { active: active })}>
                <div className="input-holder">
                    <input type="text" className="search-input" />
                    <button
                        onClick={() => setActive(!active)}
                        className="search-icon"
                    >
                        <FontAwesomeIcon icon={faSearch}/>
                    </button>
                </div>
            </div>
        </Fragment>
    );
}

export default SearchBox;
