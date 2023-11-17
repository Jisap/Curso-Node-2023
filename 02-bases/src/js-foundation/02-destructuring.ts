

//console.log(process.env);

const { USERDOMAIN, USERNAME, npm_lifecycle_script}  = process.env;

//console.table({USERDOMAIN, USERNAME, npm_lifecycle_script})

export const characters = ['Flash', 'Superman', 'Green Lantern', 'Batman'];

const [, , ,batman] = characters;