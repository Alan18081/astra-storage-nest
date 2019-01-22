const astraStorage = require('./dist');

console.log(astraStorage);

astraStorage.initProject('x0gc7sb0a1', 'l3bxxnximo').then(project => {
  console.log(project);
});