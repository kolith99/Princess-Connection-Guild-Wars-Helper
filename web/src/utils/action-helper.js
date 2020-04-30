/**
 * Created by PengLing on 2019/9/11.
 */
'use strict';

import { Request } from './webapi';
import moment from 'moment';

function httpGet(dispatch, opts) {
    const { url, query, actionTypes, msg } = opts;
    dispatch({ type: actionTypes.REQUESTING });
    let connector = url.indexOf('?') === -1 ? '?' : '&';
    return Request.get(`${url}${connector}_ts_=${moment.now()}`, query)
        .then(data => {
            return dispatch({ type: actionTypes.REQUEST_SUCCESS, payload: { data: data } });
        }, err => errCallback(err, dispatch, actionTypes, msg));
}

function httpPost(dispatch, opts) {
    const { url, data, query, actionTypes, msg, canDataEmpty } = opts;
    dispatch({ type: actionTypes.REQUESTING });
    if (!data || !canDataEmpty && Object.keys(data).length == 0) {
        let action = { type: actionTypes.REQUEST_ERROR, payload: { error: msg.noData } };
        dispatch(action);
        return Promise.resolve(action);
    }
    return Request.post(url, data, query)
        .then(res => {
            return dispatch({
                type: actionTypes.REQUEST_SUCCESS,
                payload: res && res.id ? { id: res.id, message: msg.success } : { message: msg.success }
            });
        }, err => errCallback(err, dispatch, actionTypes, msg));
}

function httpPut(dispatch, opts) {
    const { url, data, actionTypes, msg } = opts;
    dispatch({ type: actionTypes.REQUESTING });
    if (!data || Object.keys(data).length == 0) {
        let action = { type: actionTypes.REQUEST_ERROR, payload: { error: msg.noData } };
        dispatch(action);
        return Promise.resolve(action);
    }
    return Request.put(url, data)
        .then(res => {
            return dispatch({ type: actionTypes.REQUEST_SUCCESS, payload: { message: msg.success } });
        }, err => errCallback(err, dispatch, actionTypes, msg));
}

function httpDel(dispatch, opts) {
    const { url, id, actionTypes, msg, query } = opts;
    dispatch({ type: actionTypes.REQUESTING });
    if (!id) {
        let action = { type: actionTypes.REQUEST_ERROR, payload: { error: msg.noParam } };
        dispatch(action);
        return Promise.resolve(action);
    }
    return Request.delete(url, query)
        .then(res => {
            return dispatch({ type: actionTypes.REQUEST_SUCCESS, payload: { message: msg.success } });
        }, err => errCallback(err, dispatch, actionTypes, msg));
}

function errCallback(err, dispatch, actionTypes, msg) {
    const { body } = err;
    return dispatch({
        type: actionTypes.REQUEST_ERROR,
        payload: { error: (body || {}).message || msg.error }
    });
}

export default {
    httpGet,
    httpPost,
    httpPut,
    httpDel
};
