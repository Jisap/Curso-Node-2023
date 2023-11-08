// const { getUUID } = require('./plugins/get-id.plugin');
// const { getAge } = require('./plugins/get-age.plugin.js');

// const { getAge, getUUID } = require ('./plugins');

// const obj = { name: 'john', birdthdate: '1985-10-21'}

const buildMakePerson = ({ getUUID, getAge }) => {

    return ({ name, birdthdate}) => {
        
        return {
            id: getUUID(),
            name: name,
            birdthdate: birdthdate,
            age: getAge(birdthdate),
        }
    }
}



// const john = buildPerson( obj );

// console.log(john);

module.exports = { buildMakePerson }