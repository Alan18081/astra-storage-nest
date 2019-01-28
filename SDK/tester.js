const astraStorage = require('./dist');
const { map } = require('rxjs/operators');

const app = async () => {
    try {
        const project = await astraStorage.initProject('x0gc7sb0a1', 'l3bxxnximo');
        project.subscribeToStorageChanges('alex')
          .pipe(map(data => {
              console.log(data);
          }));
    } catch (e) {
        console.log(e);
    }

};
app();
