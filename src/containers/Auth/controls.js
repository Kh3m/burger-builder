export const controls = {
    email: {
        elementLabel: "Email",
        elementType: "input",
        elementConfig: {
            type: "email",
            placeholder: "Enter Mail",
            value: ""
        },
        validationRules: {
            required: true,
            valid: null
        },
        touched: false
    },

    password: {
        elementLabel: "Password",
        elementType: "input",
        elementConfig: {
            type: "password",
            placeholder: "Enter Password",
            value: ""
        },
        validationRules: {
            required: true,
            maxLength: 6,
            isPassword: true,
            valid: false
        },
        touched: false
    }
}