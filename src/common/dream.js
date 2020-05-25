import {GET, POST} from '../utils/requests';
import CONST from '../utils/config';

var get_dreams = data => {
  let url = CONST.domain + 'my_dream/';
  return GET(url, data);
};

var post_dreams = data => {
  let url = CONST.domain + 'my_dream/';
  return POST(url, {content: data});
};

export {get_dreams, post_dreams};
