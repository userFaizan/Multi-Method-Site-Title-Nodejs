const http = require('http');
const {http: followHttp, https: followHttps} = require('follow-redirects');
const url = require('url');

const PORT = 3009;

function fetchTitle(address, callback) {
    let formattedUrl = address.startsWith('http') ? address : `http://${address}`;
    let client = formattedUrl.startsWith('https') ? followHttps : followHttp;

    client.get(formattedUrl, (res) => {
        let body = '';

        res.on('data', (chunk) => {
            body += chunk;
        });

        res.on('end', () => {
            const titleMatch = body.match(/<title>([^<]*)<\/title>/i);
            if (titleMatch) {
                callback(null, `<li>${address} - "${titleMatch[1]}"</li>`);
            } else {
                callback(null, `<li>${address} - "NO TITLE FOUND"</li>`);
            }
        });
    }).on('error', () => {
        callback(null, `<li>${address} - "NO RESPONSE"</li>`);
    });
}

const server = http.createServer((req, res) => {
    const parsedUrl = url.parse(req.url, true);
    const path = parsedUrl.pathname;

    if (req.method === 'GET' && (path === '/I/want/title' || path === '/I/want/title/')) {
        const query = parsedUrl.query;

        const addresses = query.address;
        if (!addresses) {
            res.writeHead(400, {'Content-Type': 'text/html'});
            return res.end('<h1>No address provided</h1>');
        }

        const addressList = Array.isArray(addresses) ? addresses : [addresses];
        const results = [];
        let completed = 0;

        addressList.forEach((address, index) => {
            fetchTitle(address, (err, result) => {
                results[index] = result;
                completed++;
                if (completed === addressList.length) {
                    res.writeHead(200, {'Content-Type': 'text/html'});
                    res.write('<html><head></head><body>');
                    res.write('<h1> Following are the titles of given websites: </h1>');
                    res.write('<ul>');
                    results.forEach((line) => res.write(line));
                    res.write('</ul></body></html>');
                    res.end();
                }
            });
        });
    } else {
        console.log('404 - Path not found:', path);
        res.writeHead(404, {'Content-Type': 'text/plain'});
        res.end('404 Not Found');
    }
});

server.listen(PORT, () => {
    console.log(`Server running at http://localhost:${PORT}`);
});
