var CONST = {
  environment: 'uat',
  domain: 'https://www.fribble186.cn/daily/',
};
if (CONST.environment === 'dev') {
  CONST.domain = 'http://0.0.0.0:8000/daily/';
}
export default CONST;
