const {v4: uuidv4 } = require('uuid');
const getAge = require('get-age');

const obj = { name: 'john', birdthdate: '1985-10-21'}

const buildPersons = ({ name, birdthdate}) => {
    
    return {
        id: uuidv4(),
        name: name,
        birdthdate: birdthdate,
        age: getAge(birdthdate),
    }
}


const john = buildPersons( obj );

console.log(john);