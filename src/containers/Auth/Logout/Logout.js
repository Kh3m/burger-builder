import React, { Component } from "react";
import { Redirect } from "react-router-dom";
import { connect } from "react-redux";
import * as actions from "../../../store/actions/index";

class Logout extends Component {

    render () {
        return <Redirect to={{pathname: "/"}}/>
    }

    componentDidMount () {
        this.props.onLogout();
    }

}

const mapDispatchToProps = dispatch => {
    return {
        onLogout: () => dispatch(actions.logout())
    }
}
export default connect(null, mapDispatchToProps)(Logout);