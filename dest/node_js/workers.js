"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const cluster_1 = __importDefault(require("cluster"));
const http_1 = __importDefault(require("http"));
const os_1 = __importDefault(require("os"));
const process_1 = __importDefault(require("process"));
const numCPUs = os_1.default.cpus().length;
if (cluster_1.default.isMaster) {
    console.log(`Primary ${process_1.default.pid} is running`);
    // Fork workers.
    for (let i = 0; i < numCPUs; i++) {
        cluster_1.default.fork();
    }
    cluster_1.default.on("exit", (worker, code, signal) => {
        console.log(`worker ${worker.process.pid} died`);
    });
}
else {
    // Workers can share any TCP connection
    // In this case it is an HTTP server
    http_1.default
        .createServer((req, res) => {
        res.writeHead(200);
        res.end("hello world\n");
    })
        .listen(8000);
    console.log(`Worker ${process_1.default.pid} started`);
}
