const http = require("http");
const commandLineArgs = require("command-line-args");

const optionDefinitions = [
    {name: "port"}
]  

const options = commandLineArgs(optionDefinitions);
console.log("result");
console.log(options.port);

const host = "localhost";
const port = options.port || 8000;
let count = 0;

const requestListener = function (req, res) {
    res.writeHead(200)
    res.end(JSON.stringify({ "message": "Request handled successfully", "requestCount": count }))
    count++
}   

const server = http.createServer(requestListener);

server.listen(port, host, () => {
    console.log(`server start ${port}`)
})