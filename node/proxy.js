//����
const http = require('http');
const request = require('request');

const hostIp = '127.0.0.1';
const apiPort = 8070;
const imgPort = 8071;

//���� API ��������
const apiServer = http.createServer((req, res) => {
    console.log('[apiServer]req.url='+req.url);
    const url = 'http://api.xikeqiche.com/' + req.url;
    console.log('[apiServer]url='+url);
    const options = {
        url: url
    };

    function callback(error, response, body) {
        if (!error && response.statusCode === 200) {
            //��������
            res.setHeader('Content-Type', 'text/plain;charset=UTF-8');
            //��������
            res.setHeader('Access-Control-Allow-Origin', '*');
            //���ش�������
            res.end(body);
        }
    }

    request.get(options, callback);
});

apiServer.listen(apiPort, hostIp, () => {
    console.log('�����ӿڣ������� http://' + hostIp + ':' + apiPort + '/');
});

const imgServer = http.createServer((req, res) => {
    const url = 'https://pic2.zhimg.com/' +req.url.split('/img/')[1];
    console.log('[imgServer]url=' + url);
    const options = {
        url: url,
        encoding: null
    };

    function callback(error, response, body) {
        if (!error && response.statusCode === 200) {
            const contentType = response.headers['content-type'];
            res.setHeader('Content-Type', contentType);
            res.setHeader('Access-Control-Allow-Origin', '*');
            res.end(body);
        }
    }

    request.get(options, callback);


});

//����ͼƬ�˿�
imgServer.listen(imgPort, hostIp, () => {
    console.log('����ͼƬ�������� http://' + hostIp + ':' + imgPort + '/')
});
