// const { getUUID } = require('./plugins/get-id.plugin');
// const { getAge } = require('./plugins/get-age.plugin.js');

// const { getAge, getUUID } = require ('./plugins');

// const obj = { name: 'john', birdthdate: '1985-10-21'}

interface BuildMakerPersonOptions {
    getUUID: () => string;
    getAge: (birthdate: string) => number;
}

interface PersonOptions {
    name: string;
    birthdate: string;
}

export const buildMakePerson = ({ getUUID, getAge }: BuildMakerPersonOptions) => {

    return ({ name, birthdate}: PersonOptions) => {
        
        return {
            id: getUUID(),
            name: name,
            birthdate: birthdate,
            age: getAge(birthdate),
        }
    }
}



// const john = buildPerson( obj );

// console.log(john);

