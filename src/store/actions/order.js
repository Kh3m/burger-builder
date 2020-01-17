import * as actionTypes from "./actionTypes";
import orderAxiosInstance from "../../axios/order";

export const purchaseBurgerSuccess = (id, orderData) => {
    return {
        type: actionTypes.PURCHASE_BURGER_SUCESSS,
        orderId: id,
        orderData
    }
}

export const purchaseBurgerFail = (error) => {
    return {
        type: actionTypes.PURCHASE_BURGER_FAIL,
        error
    }
}

export const purchaseBurgerStart = () => {
    return {
        type: actionTypes.PURCHASE_BURGER_START
    }
}

export const initPurchase = () => {
    return {
        type: actionTypes.INIT_PURCHASE
    }
}

export const purchaseBurger = (orderData, idToken) => {
    return dispatch => {
        dispatch(purchaseBurgerStart());
        orderAxiosInstance.post("orders.json?auth=" + idToken, orderData)
        .then( response => {
            dispatch(purchaseBurgerSuccess(response.data.name, orderData));
        })
        .catch( error => {
            dispatch(purchaseBurgerFail(error));
        });
    }
}

const fetchOrdersStart = () => {
    return {
        type: actionTypes.FETCH_ORDERS_START
    }
}

const fetchOrdersSuccess = ( orders ) => {
    return {
        type: actionTypes.FETCH_ORDERS_SUCCESS,
        orders
    }
}

const fetchOrdersFail = ( error ) => {
    return {
        type: actionTypes.FETCH_ORDERS_FAIL,
        error
    }
}

export const fetchOrders = (idToken, userId) => {
    return dispatch => {
        dispatch(fetchOrdersStart());
        const fetchedOrders = [];
        const queryParam = '?auth=' + idToken + '&orderBy="userId"&equalTo="' + userId + '"'; 
        orderAxiosInstance.get("orders.json" + queryParam)
        .then (res => {
            for (let key in res.data) {
                fetchedOrders.push({
                    id: key,
                    ...res.data[key]
                });
            }
            dispatch(fetchOrdersSuccess(fetchedOrders));
        })
        .catch ( err => {
            console.log(err);
            dispatch(fetchOrdersFail(err));
        });
    }
}