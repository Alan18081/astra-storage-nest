const astraStorage = require('./dist');

const app = async () => {
    try {
        const project = await astraStorage.initProject('x0gc7sb0a1', 'l3bxxnximo');
        const account = await project.login('alanmorgan@gmail.com', '12345');
        // const storage = await project.getPublicStorage('mark');
    } catch (e) {
        console.log(e);
    }

};
app();
