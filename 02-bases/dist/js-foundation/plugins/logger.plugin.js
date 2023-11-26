"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.buildLogger = exports.logger = void 0;
const winston_1 = __importDefault(require("winston"));
const { combine, timestamp, json } = winston_1.default.format;
exports.logger = winston_1.default.createLogger({
    level: 'info',
    format: combine(// Con un formato que combine
    timestamp(), // los tiempos en que se ejecuto
    json()),
    //defaultMeta: { service: 'user-service' },     // metadatos en todos los registros
    transports: [
        new winston_1.default.transports.File({ filename: 'error.log', level: 'error' }),
        new winston_1.default.transports.File({ filename: 'combined.log' }), // Transport de nivel info en archivo llamando combined.log
    ],
});
exports.logger.add(new winston_1.default.transports.Console({
    format: winston_1.default.format.simple()
}));
// Patron adaptador de winston
const buildLogger = (service) => {
    return {
        log: (message) => {
            exports.logger.log('info', { message, service }); // Este mensaje tendrá el lvl, el formato y servicio (app) que se escribirá en los logs
        },
        error: (message) => {
            exports.logger.error('error', { message, service });
        }
    };
};
exports.buildLogger = buildLogger;
