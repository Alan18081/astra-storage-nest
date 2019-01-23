const astraStorage = require('./dist');

const app = async () => {
  try {
    const project = await astraStorage.initProject('x0gc7sb0a1', 'l3bxxnximo');
    const account = await project.login('alanmorgan@gmail.com', '12345');
    console.log(await account.getProfile());
    const storage = await project.getPublicStorage('fdfd');
    console.log(storage);
  } catch (e) {
    console.log(e.message);
  }
};
app();
