/**
 * Created by liu.xinyi
 * on 2016/3/30.
 */
'use strict';

import request from 'superagent';
import jsonp from 'superagent-jsonp';

const rootUrl = '_api';

export const buildUrl = url => {
    const apiurl = `/${rootUrl}${url}`;
    const user = JSON.parse(sessionStorage.getItem('user'));
    if (user == null) {
        return apiurl;
    }
    let connector = url.indexOf('?') === -1 ? '?' : '&';
    return `${apiurl}${connector}token=${user.token}`;
};

const resultHandler =
    (resolve, reject) =>
        (err, res) => {
            if (err) {
                    reject({
                        status: err.status || 0,
                        body: err.response ? err.response.body : err.message
                    });
            } else {
                resolve(res.body);
            }
        };

export class Request {
    static get = (url, query) => new Promise((resolve, reject) => {
        request.get(buildUrl(url)).query(query).end(resultHandler(resolve, reject));
    });

    static getJsonp = (url) => new Promise((resolve, reject) => {
        request.get(url).use(jsonp).end(resultHandler(resolve, reject));
    });

    static post = (url, data, query) => new Promise((resolve, reject) => {
        request.post(buildUrl(url)).query(query).send(data).end(resultHandler(resolve, reject));
    });

    static put = (url, data) => new Promise((resolve, reject) => {
        request.put(buildUrl(url)).send(data).end(resultHandler(resolve, reject));
    });

    static delete = (url, query) => new Promise((resolve, reject) => {
        request.delete(buildUrl(url)).query(query).send({}).end(resultHandler(resolve, reject));
    });
}

export const APITable = {
    login: '/login',
    logout: '/logout',

    getHouseowners: '/houseowners',
    posHouseowner: '/houseowners',
    putHouseowner: '/houseowners/:id',
    delHouseowner: '/houseowners/:id',

    getAccessCards: '/access-cards',
    posAccessCard: '/access-cards',
    putAccessCard: '/access-cards/:id',
    delAccessCard: '/access-cards/:id',

    getCarports: '/carports',
    posCarport: '/carports',
    putCarport: '/carports/:id',
    delCarport: '/carports/:id',

    getStations: '/platform/stations',

    getAlarms: '/platform/alarms',

    getAQIDivisionsLatestData: '/platform/aqi/divisions/data/latest',
    getWQDivisionsLatestData: '/platform/wq/divisions/data/latest',

    getStationsData: '/platform/stations/data',

    getIPCs: '/platform/ipcs',

    getWeather: '/weather',

    getHeatspots: '/platform/heatspots',
}
