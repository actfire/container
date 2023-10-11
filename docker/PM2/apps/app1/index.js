const http = require('http');
const server = http.createServer(function (req, res) {
    cases = {
        '/': root,
        '/student': student,
        '/admin': admin,
        '/gitlab': gitlab,
        '/jenkins': jenkins,
        '/shutdown': shutdown
    };

    if (Object.keys(cases).includes(req.url)) {
        // Nginx 那邊有設定的話,這邊就不用做了
        // res.setHeader('Access-Control-Allow-Origin', '*');
        // res.setHeader('Access-Control-Request-Method', '*');
        // res.setHeader('Access-Control-Allow-Methods', 'OPTIONS, POST, GET');
        // res.setHeader('Access-Control-Allow-Headers', '*');
        // if (req.method === 'OPTIONS') {
        //     res.writeHead(200);
        //     res.end();
        //     return;
        // }
        cases[req.url](req, res);
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
function gitlab(req, res) {
    let data = []
    req.on('data', (chunk) => {
        data.push(chunk);
    })
    req.on('end', () => {
        const _data = JSON.parse(data);
        console.log('data: ', _data);
    })
    res.writeHead(200, { 'Content-Type': 'application/json' });
    res.end(JSON.stringify({ result: 'ok' }));
}
function jenkins(req, res) {
    let data = '';
    req.on('data', (chunk) => {
        data += chunk;
    })
    req.on('end', () => {
        console.log('data: ', JSON.parse(data));
    })
    res.writeHead(200, { 'Content-Type': 'application/json' });
    res.end(JSON.stringify({ result: 'ok' }));
}

function shutdown(req, res) {
    res.end('goodbye');
    process.exit(1)
}

function enableDestroy(server, closeMsg) {
    var connections = {}

    server.on('connection', function (conn) {
        var key = conn.remoteAddress + ':' + conn.remotePort;
        connections[key] = conn;
        conn.on('close', function () {
            delete connections[key];
        });
    });

    server.destroy = function (cb) {
        server.close(cb);
        console.log(closeMsg);
        for (var key in connections)
            connections[key].destroy();
    };
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
    console.log(`${type}\nsignal received: closing HTTP server`);
    server.destroy();
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