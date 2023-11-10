const winston = require('winston');
const { combine, timestamp, json } = winston.format;

const logger = winston.createLogger({               // Objeto logger
    level: 'info',                                  // nivel de importancia para los mensajes tipo "info"
    format: combine(                                // Con un formato que combine
        timestamp(),                                // los tiempos en que se ejecuto
        json(),                                     // y los mensajes json()   
    ),                  
    //defaultMeta: { service: 'user-service' },     // metadatos en todos los registros
    transports: [                                   // Los transports son los destinos de los registros     
        //
        // - Write all logs with importance level of `error` or less to `error.log`
        // - Write all logs with importance level of `info` or less to `combined.log`
        //
        new winston.transports.File({ filename: 'error.log', level: 'error' }), // Transport de nivel error en archivo llamado error.log
        new winston.transports.File({ filename: 'combined.log' }),              // Transport de nivel info en archivo llamando combined.log
    ],
});

logger.add(new winston.transports.Console({ // console.log tradicional
    format: winston.format.simple()
}));

// Patron adaptador de winston
module.exports = function buildLogger( service ){ // buildLogger llama al servicio (app) al que pertenece el registro
    return {
        log: ( message ) => {                        // retornará un método log que recibirá el mensaje que queremos registrar en logs
            logger.log( 'info', {message, service} ) // Este mensaje tendrá el lvl, el formato y servicio (app) que se escribirá en los logs
        },
        error: (message) => {
            logger.error('error', {message, service})
        }
    }
}