import React, { Component } from "react";
import { controls } from "./controls";
import Input from "../../components/UI/Input/Input";
import Button from "../../components/UI/Button/Button";
import * as actions from "../../store/actions/index";
import { connect } from "react-redux";
import Loader from "../../components/UI/Loader/Loader";

import classes from "./Auth.css";
import Redirect from "react-router-dom/Redirect";

class Auth extends Component {
    state = {
        controls: null,
        formValidity: true,
        isSignup: true
    }

    inputChangedHandler = (event, inputIdentifier) => {

        const controlsUpdate = {
            ...this.state.controls,
            [inputIdentifier]: {
                ...this.state.controls[inputIdentifier],
                validationRules: {
                    ...this.state.controls[inputIdentifier].validationRules,
                    valid: this.checkValidity(event.target.value, this.state.controls[inputIdentifier].validationRules)
                },
                elementConfig: {
                    ...this.state.controls[inputIdentifier].elementConfig,
                    value: event.target.value
                },
                touched: true
            }
        };

        this.setState({controls: controlsUpdate});
    } 

    checkValidity (value, rules) {
        let isValid = true;

        if (rules.required) {
            isValid = value === "- Select Delivery Method -" ? 
            (value.trim() !== "" && isValid) && value !== "- Select Delivery Method -" :
            (value.trim() !== "" && isValid);
        }

        if (rules.isNumber) {
            const pattern = new RegExp("^[0-9]$");
            isValid = pattern.test(value) && isValid;
        }

        if (rules.maxLength) {
            isValid = rules.maxLength <= value.length && isValid;
        }

        if (rules.minLength) {
            isValid = rules.minLength >= value.length && isValid;
        }

        if (rules.isPassword) {
        const pattern = /(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[@#$&!.]).{6,}/;
            isValid = pattern.test(value) && isValid;
        }

        return isValid;
    }

    submitHandler = ( event ) => {
        event.preventDefault();
        this.props.onAuth(this.state.controls.email.elementConfig.value,
                            this.state.controls.password.elementConfig.value,
                            this.state.isSignup);
                            
    }

    switchAuthModeHandler = () => {
        this.setState((prevState) => {
            return {
                isSignup: !prevState.isSignup
            }
        });
    }

    render () {
        let inputElements = null;
        let form = null;
        let errorMessage = null;

        if (this.props.error) {
            errorMessage = <p>{this.props.error.split("_").join(" ")}</p>
        }

        if (this.state.controls) {
            const controls = Object.entries(this.state.controls);
            inputElements = controls.map( (ie) => {
                // ie = ['name', {}]
                return <Input 
                            key={ie[0]} 
                            elementtype={ie[1].elementType}
                            {...ie[1].elementConfig}
                            changed={(event) => this.inputChangedHandler(event, ie[0])} 
                            invalid={!ie[1].validationRules.valid}
                            touched={ie[1].touched}/>;
            });

            form = (
                <form onSubmit={this.submitHandler}>
                    {inputElements}
                    <Button 
                        btnType="Success"
                        disabled={!this.state.formValidity}>SUBMIT</Button>
                </form>
            );
        }

        let authRedirect = null;

        if (this.props.isAuthenticated) {
            authRedirect = <Redirect to={{pathname: this.props.authRedirectPath}}/>
        }

        return (
            <div className={classes.Auth}>
                {authRedirect}
                <h3> {this.state.isSignup ? "SINGUP" : "SIGNIN"} </h3>
                {errorMessage}
                {this.props.loading ? <Loader /> : form}
                <Button 
                    btnType="Danger"
                    clicked={this.switchAuthModeHandler}>
                        SWITCH TO {this.state.isSignup ? "SIGNIN" : "SINGUP"}
                    </Button>
            </div>
        )
    }

    componentDidMount () {
        this.setState({controls});
        if (!this.props.buildingBurger && this.props.authRedirectPath !== "/") {
            this.props.onSetAuthRedirectPath();
        }
    }
}

const mapStateToProps = state => {
    return {
        loading: state.auth.loading,
        error: state.auth.error,
        isAuthenticated: state.auth.idToken !== null,
        buildingBurger: state.burgerBuilder.building,
        authRedirectPath: state.auth.authRedirectPath
    }
}

const mapDispatchToState = dispatch => {
    return {
        onAuth: (name, email, isSignup) => dispatch(actions.auth(name, email, isSignup)),
        onSetAuthRedirectPath: () => dispatch(actions.setAuthRedirectPath("/"))
    }
}

export default connect(mapStateToProps, mapDispatchToState)(Auth);