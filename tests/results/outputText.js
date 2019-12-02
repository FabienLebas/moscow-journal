const fs = require('fs');

function outputText(batchAnnotateOutput){
  const output = JSON.parse(batchAnnotateOutput);
  console.log(output.responses[0].fullTextAnnotation.text);
}

const test = fs.readFileSync('./results_output-1-to-1.json');
outputText(test);
