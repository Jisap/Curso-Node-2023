const fs = require('fs')

//Con expresión regular
const content = fs.readFileSync('readme.md', 'utf8');
const reactWordCount2 = content.match(/react/gi).length;
console.log('Nº de palabras react con expresión regular', reactWordCount2)


//Sin expresión regular
const reactWordCount = (content, palabra) => {

    const words = content.split(' ');

    const reactWordCount = words.filter(
        (word) => word.toLowerCase().includes(palabra)    
    ).length;

    console.log('Nº palabras React sin exp regular', reactWordCount)
}

reactWordCount(content, 'react')

