const { getUUID } = require('../plugins/get-id.plugin.js')
const { getAge } = require('../plugins/get-age.plugin.js')
const { http } = require('../plugins/http-client.plugin')

module.exports = {
    getAge,
    getUUID,
    http,
}