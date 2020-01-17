import React, { Component } from "react";

const asyncComponent = (importedComponent) => {
    return class extends Component {
        state = {
            component: null
        };
        componentDidMount () {
            importedComponent()
            .then( (imp) => {
                this.setState({component: imp.default})
            })
            .catch( (err) => {
                console.log(err);
            })
        }
        render () {
            const C = this.state.component;

            return C ? <C {...this.props} /> : null;
        }
    }
}

export default asyncComponent;