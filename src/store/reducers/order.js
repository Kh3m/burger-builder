import * as actionTypes from "../actions/actionTypes";

const initialState = {
    orders: [],
    loading: false,
    purchased: false
};

const reducer = (state=initialState, action) => {
    switch (action.type) {

        case (actionTypes.INIT_PURCHASE): {
            return {
                ...state,
                purchased: false
            }
        }

        case (actionTypes.PURCHASE_BURGER_START): {
            return {
                ...state,
                loading: true
            }
        }

        case (actionTypes.PURCHASE_BURGER_SUCESSS): {
            const newOrder = {
                id: action.orderId,
                ...action.orderData,
            };

            return {
                ...state,
                loading: false,
                orders: state.orders.concat(newOrder),
                purchased: true
            }
        }

        case (actionTypes.PURCHASE_BURGER_FAIL): {
            return {
                ...state,
                loading: false
            }
        }

        case (actionTypes.FETCH_ORDERS_START): {
            return {
                ...state,
                loading: true
            }
        }

        case (actionTypes.FETCH_ORDERS_SUCCESS): {
            return {
                ...state,
                orders: action.orders,
                loading: false
            }
        }

        case (actionTypes.FETCH_ORDERS_FAIL): {
            return {
                ...state,
                loading: false
            }
        }
        default: return state;
    }
}

export default reducer;