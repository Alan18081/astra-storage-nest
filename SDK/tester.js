const astraStorage = require('./dist');

const app = async () => {
  try {
    const project = await astraStorage.initProject('lu17xt757h', 'i0ukcdh536j');
    // const account = await project.login('alanmorgan@gmail.com', '12345');
    // console.log(await account.getProfile());
    const storage = await project.getPublicStorage('mark');
      await storage.removeById('5c48d39466ce1c692f75f511');
      const foundRecord = await storage.findMany({});
      console.log(foundRecord);
      // console.log('Found record', foundRecord);
      // const record  = await storage.updateById(foundRecord.id, { markus: 'fddf' });
    // const record = await storage.createOne({ name: 'Mark', age: 20 });
    // console.log(record);
  } catch (e) {
    console.log(e.message);
  }
};
app();
