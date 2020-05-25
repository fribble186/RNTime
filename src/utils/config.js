var CONST = {
  environment: 'uat',
  domain: 'https://www.fribble186.cn/daily/',
};
if (CONST.environment === 'dev') {
  CONST.domain = 'http://192.168.0.197:8000/daily/';
}
export default CONST;
