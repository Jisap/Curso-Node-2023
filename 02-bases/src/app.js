
//const { emailTemplate } = require('./js-foundation/01-template.js');
//require ('./js-foundation/02-destructuring.js');
const { getUserById } = require('./js-foundation/03-callbacks');

//console.log(emailTemplate);

const id = 1

getUserById(1, function( error, user){
    
    if(error){
        throw new Error( error );
    }

    console.log(user);
});