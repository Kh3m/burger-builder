import React from "react";

import classes from "./NavigationItems.css";
import Navigationitem from "./NavigationItem/Navigationitem";

const navigationItems = ( props ) => {
    return (
        <ul className={classes.NavigationItems}>
            <Navigationitem exact link="/">Burger Builder</Navigationitem>
            { 
                props.isAuthenticated ?<Navigationitem link="/orders">Orders</Navigationitem>
                : null
            }
            { 
                props.isAuthenticated ? <Navigationitem link="/logout">Logout</Navigationitem>
                : <Navigationitem link="/auth">Authenticate</Navigationitem>
            }
        </ul>
    );
}

export default navigationItems;