const fs = require('fs');

function extractDataStructures(code) {
    const regex = /struct\s+([a-zA-Z_][a-zA-Z0-9_]*)\s*\{[^}]*\}\s*;/g;
    let match;
    const dataStructures = [];
    while ((match = regex.exec(code)) !== null) {
        dataStructures.push(match[1]);
    }
    return dataStructures;
}

function extractArrays(code) {
    const arrayRegex = /([a-zA-Z_][a-zA-Z0-9_]*)\s+([a-zA-Z_][a-zA-Z0-9_]*)\s*\[\s*\d*\s*\]/g;
    const arrayRegex2 = /(?P<type>\bint|float|char|double\b)\s+(?P<name>\w+)\s*=\s*\[(?P<values>.*?)\]/;
    let match;
    const arrays = [];
    while ((match = arrayRegex.exec(code)) !== null || (match = arrayRegex2.exec(code) !== null)){
        arrays.push(match[2]);
    }
    arraytype(code,arrays);
    return arrays;
}

function arraytype(code,arrays) {
    arrays.forEach(element => {
        console.log(element);
});

}

// Read the C code file
fs.readFile('test.c', 'utf8', (err, data) => {
    if (err) {
        console.error(err);
        return;
    }
    console.log()
    const dataStructures = extractDataStructures(data);
    console.log('Data Structures used in the C code:', dataStructures);
    const dataarrays = extractArrays(data);
    console.log('Arrays used in the C code:', dataarrays);
});

