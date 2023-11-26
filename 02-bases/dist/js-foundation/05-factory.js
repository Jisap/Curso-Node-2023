"use strict";
// const { getUUID } = require('./plugins/get-id.plugin');
// const { getAge } = require('./plugins/get-age.plugin.js');
Object.defineProperty(exports, "__esModule", { value: true });
exports.buildMakePerson = void 0;
const buildMakePerson = ({ getUUID, getAge }) => {
    return ({ name, birthdate }) => {
        return {
            id: getUUID(),
            name: name,
            birthdate: birthdate,
            age: getAge(birthdate),
        };
    };
};
exports.buildMakePerson = buildMakePerson;
// const john = buildPerson( obj );
// console.log(john);
