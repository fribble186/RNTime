import {save, load, remove} from '../utils/storage';

var getToken = async () => {
  let token;
  try {
    token = await load('token');
    console.log('get token', token);
  } catch (e) {
    token = null;
    console.log('token wrong', e);
  }
  return token;
};

var request = async (method, url, data) => {
  let token = await getToken();
  if (method === 'GET') {
    let params = '';
    for (let k in data) {
      params += k.toString() + '=' + data[k].toString() + '&';
    }
    url = data ? url + '?' + params.slice(0, params.length - 1) : url;
    console.log('GET', url, data);
    return fetch(url, {
      method: 'GET',
      headers: token
        ? {
            Accept: 'application/json',
            'Content-Type': 'application/json',
            AUTH: 'Token ' + token,
          }
        : {
            Accept: 'application/json',
            'Content-Type': 'application/json',
          },
    });
  } else if (method === 'POST') {
    let data_str = '';
    if (data.constructor !== 'string') {
      for (let key in data) {
        data_str = data_str + key + '=' + data[key] + '&';
      }
    } else {
      data_str = data + '&';
    }
    console.log('POST', url, data_str.slice(0, data_str.length - 1));
    return fetch(url, {
      method: 'POST',
      headers: token
        ? {
            'Content-Type': 'application/x-www-form-urlencoded',
            AUTH: 'Token ' + token,
          }
        : {
            'Content-Type': 'application/x-www-form-urlencoded',
          },
      body: data_str.slice(0, data_str.length - 1),
    });
  }
};

var GET = (url, data) => request('GET', url, data);

var POST = (url, data) => request('POST', url, data);

export {GET, POST};
