const astraStorage = require('./dist');
const { map } = require('rxjs/operators');

const app = async () => {
    try {
        const project = await astraStorage.initProject('lu17xt757h', 'i0ukcdh536j');
        project.subscribeToStorageChanges('alex')
          .subscribe(data => {
              console.log(data);
          });
        const storage = await project.getPublicStorage('alan');
        await storage.createOne({
            name: 'Alex',
        })
    } catch (e) {
        console.log(e);
    }

};
app();
