
export default {
    orderForm: {
        name: {
            elementLabel: "Name",
            elementType: "input",
            elementConfig: {
                type: "text",
                placeholder: "Enter Name",
                value: ""
            },
            validationRules: {
                required: true,
                valid: false
            },
            touched: false
        },
        email: {
            elementLabel: "Name",
            elementType: "input",
            elementConfig: {
                type: "email",
                placeholder: "Enter Email",
                value: ""
            },
            validationRules: {
                required: true,
                valid: false
            },
            touched: false
        },
        country: {
            elementLabel: "Country",
            elementType: "input",
            elementConfig: {
                type: "text",
                placeholder: "Enter Country",
                value: ""
            },
            validationRules: {
                required: true,
                valid: false
            },
            touched: false
        },
        street: {
            elementLabel: "Street",
            elementType: "input",
            elementConfig: {
                type: "text",
                placeholder: "Enter Street",
                value: ""
            },
            validationRules: {
                required: true,
                valid: false
            },
            touched: false
        },
        zipcode: {
            elementLabel: "Zipcode",
            elementType: "input",
            elementConfig: {
                type: "text",
                placeholder: "Enter Zipcode",
                value: ""
            },
            validationRules: {
                required: true,
                maxLength: 5,
                minLength: 5,
                number: true,
                valid: false
            },
            touched: false
        },
        deliveryMethod: {
            elementLabel: "Delivery Method",
            elementType: "select",
            elementConfig: {
                options: [
                    {value: "fastest", displayValue: "Fastest"},
                    {value: "cheapest", displayValue: "Cheapest"}
                ],
                value: "- Select Delivery Method -"
            },
            validationRules: {
                required: true,
                valid: false
            },
            touched: false
        }
    }
};