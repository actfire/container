const http = require('http');
const server = http.createServer(function (req, res) {
    cases = {
        '/': root,
        '/student': student,
        '/admin': admin
    };

    if (Object.keys(cases).includes(req.url)) {
        res.setHeader('Access-Control-Allow-Origin', '*');
        res.setHeader('Access-Control-Request-Method', '*');
        res.setHeader('Access-Control-Allow-Methods', 'OPTIONS, GET');
        res.setHeader('Access-Control-Allow-Headers', '*');
        if (req.method === 'OPTIONS') {
            res.writeHead(200);
            res.end();
            return;
        }
        cases[req.url.split('?')[0]](req, res);
    } else {
        res.end('Invalid Request!');
    }

});

function root(req, res) {
    // console.log('req:', req);
    res.writeHead(200, { 'Content-Type': 'application/json' });
    const data = [
        { start: '2023-08-24 10:01:10', end: '2023-08-24 10:30:13', resourceId: 1, title: 'Hello World', color: '#FE6B64' }
    ];
    res.end(JSON.stringify(data));
    // res.end('[]');
}
function student(req, res) {
    res.writeHead(200, { 'Content-Type': 'text/html' });
    res.write('<html><body>This is student Page.</body></html>');
    res.end();
}
function admin(req, res) {
    res.writeHead(200, { 'Content-Type': 'text/html' });
    res.write('<html><body>This is admin Page.</body></html>');
    res.end();
}

// 停機訊號
process.on('SIGINT', function () {
    turnOff('SIGINT');
});
process.on('SIGTERM', function () {
    turnOff('SIGTERM');
});
process.on('SIGBREAK', function () {
    turnOff('SIGBREAK');
});
process.on('message', (msg) => {
    if (msg == 'shutdown') {
        turnOff(msg);
    }
})

function turnOff(type) {
    console.log('要停機了!!!!!!!!!!!!!!!!!!!!!!!!!!!!');
    console.log(type + ' signal received: closing HTTP server');
    server.destroy();
}

function enableDestroy(svr, closeMsg) {
    var connections = {}

    svr.on('connection', function (conn) {
        var key = conn.remoteAddress + ':' + conn.remotePort;
        connections[key] = conn;
        conn.on('close', function () {
            delete connections[key];
        });
    });

    svr.destroy = function (cb) {
        svr.close(cb);
        console.log(closeMsg);
        for (var key in connections)
            connections[key].destroy();
    };
}

const port = process.env.PORT || 5000;
server.listen(port, '0.0.0.0', function (err) {
    if (err) {
        console.error("Unable to listen on port", port, error);
        return;
    }
    console.log('server listen at: ', port);
});

enableDestroy(server, 'HTTP server closed');