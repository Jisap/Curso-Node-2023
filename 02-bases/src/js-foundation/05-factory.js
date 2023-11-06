// const { getUUID } = require('./plugins/get-id.plugin');
// const { getAge } = require('./plugins/get-age.plugin.js');

const { getAge, getUUID } = require ('./plugins');

const obj = { name: 'john', birdthdate: '1985-10-21'}

const buildPersons = ({ name, birdthdate}) => {
    
    return {
        id: getUUID(),
        name: name,
        birdthdate: birdthdate,
        age: getAge(birdthdate),
    }
}


const john = buildPersons( obj );

console.log(john);