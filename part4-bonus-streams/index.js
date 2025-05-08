const http = require('http');
const url = require('url');
const request = require('request');
const Bacon = require('baconjs');

function fetchTitle(address) {
    return Bacon.fromCallback(callback => {
        const fullUrl = address.startsWith('http') ? address : 'http://' + address;
        request(fullUrl, (error, response, body) => {
            if (error || response.statusCode !== 200) {
                callback({address, title: 'NO RESPONSE'});
            } else {
                const match = body.match(/<title>(.*?)<\/title>/i);
                const title = match ? match[1] : 'No Title';
                callback({address, title});
            }
        });
    });
}

function generateHtml(results) {
    const listItems = results
        .map(item => `<li>${item.address} - "${item.title}"</li>`)
        .join('\n');

    return `
<html>
  <head></head>
  <body>
    <h1> Following are the titles of given websites: </h1>
    <ul>
      ${listItems}
    </ul>
  </body>
</html>
    `;
}

const server = http.createServer((req, res) => {
    const parsedUrl = url.parse(req.url, true);
    const path = parsedUrl.pathname;
    const query = parsedUrl.query;

    if (path === '/I/want/title') {
        let addresses = query.address;

        if (!addresses) {
            res.writeHead(400, {'Content-Type': 'text/plain'});
            res.end('No address query provided');
            return;
        }

        if (!Array.isArray(addresses)) {
            addresses = [addresses];
        }

        Bacon.fromArray(addresses)
            .flatMap(fetchTitle)
            .fold([], (acc, val) => [...acc, val])
            .onValue(results => {
                const html = generateHtml(results);
                res.writeHead(200, {'Content-Type': 'text/html'});
                res.end(html);
            });

    } else {
        res.writeHead(404, {'Content-Type': 'text/plain'});
        res.end('404 Not Found');
    }
});

const PORT = 3012;
server.listen(PORT, () => {
    console.log(`Server running at http://localhost:${PORT}`);
});
