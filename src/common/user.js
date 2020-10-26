import {GET, POST} from '../utils/requests';
import CONST from '../utils/config';

var login = data => {
  let url = CONST.domain + 'user/login';
  return POST(url, data);
};

var get_sms = phone => {
  let url = CONST.domain + 'user/get_sms';
  return POST(url, {phone});
};

var change_account = (name, pw) => {
  let url = CONST.domain + 'user/change_account';
  return POST(url, {name, pw});
};

var get_friend = () => {
  let url = CONST.domain + 'friend/';
  return GET(url);
};

var add_friend = nick_name => {
  let url = CONST.domain + 'friend/';
  return POST(url, {nick_name});
};

var get_sparklers = obj => {
  let url = CONST.domain + 'sparklers/';
  return GET(url, obj);
};

var send_sparklers = (receiver_id, message) => {
  let url = CONST.domain + 'sparklers/';
  return POST(url, {receiver_id, message});
};

var get_strangers = () => {
  let url = CONST.domain + 'stranger/';
  return GET(url);
};

export {
  login,
  get_sms,
  change_account,
  get_friend,
  add_friend,
  get_sparklers,
  send_sparklers,
  get_strangers,
};
