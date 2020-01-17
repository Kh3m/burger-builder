import React from "react";

import classes from "./SideDrawer.css";
import Logo from "../../Logo/Logo";
import NavigationItems from "../NavigationItems/NavigationItems";
import Backdrop from "../../UI/Backdrop/Backdrop";
import Auxiliary from "../../../hoc/Auxiliary/Auxiliary";

const sideDrawer = ( props ) => {
    const assignedClasses = [classes.SideDrawer, classes.Close];

    if (props.open) {
        assignedClasses.splice(1, 1, classes.Open);
    }
    
    return (
        <Auxiliary>
            <Backdrop show={props.open} 
                clicked={props.closeSidrawerHandler}/>
            <div className={assignedClasses.join(" ")} onClick={props.closeSidrawerHandler}>
                <div className={classes.Logo}>
                    <Logo />
                </div>
                <nav>
                    <NavigationItems />
                </nav>
            </div>
        </Auxiliary>
    );
}

export default sideDrawer;