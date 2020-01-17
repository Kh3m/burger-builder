import React, { Component } from "react";
import Auxiliary from "../Auxiliary/Auxiliary";
import classes from "./Layout.css";
import Toolbar from "../../components/Navigation/Toolbar/Toolbar";
import SideDrawer from "../../components/Navigation/SideDrawer/SideDrawer";
import { connect } from "react-redux";

class Layout extends Component {

    state = {
        show: false
    }

    sidrawerToggleHandler = () => {
        this.setState((nextState) => {
            return { show: !nextState.show }
        });
    }

    closeSidrawerHandler = () => {
        this.setState({ show: false });
    }

    render () {

        return (
            <Auxiliary>
                <Toolbar 
                    sidrawerToggleHandler={this.sidrawerToggleHandler}
                    isAuthenticated={this.props.isAuthenticated}/>
                <SideDrawer 
                    open={this.state.show}
                    closeSidrawerHandler={this.closeSidrawerHandler}
                    isAuthenticated={this.props.isAuthenticated}/>
                <main className={classes.Content}>
                    {this.props.children}
                </main>
            </Auxiliary>
        );

    }
}

const mapStateToProps = state => {
    return {
        isAuthenticated: state.auth.idToken !== null
    }
}

export default connect(mapStateToProps)(Layout);