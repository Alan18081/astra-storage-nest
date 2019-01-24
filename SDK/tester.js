const astraStorage = require('./dist');

const app = async () => {
    try {
        const project = await astraStorage.initProject('x0gc7sb0a1', 'l3bxxnximo');
        const account = await project.login('alanmorgan@gmail.com', '12345');
        const storage = await project.getProtectedStorage('alan', account);
        // const record = await storage.createOne({ type: 'User', build: 'alan' });
        const record = await storage.updateById('5c49c2426c36574cb5c035ff', { emily: 'wonem' });
        console.log(record);
    } catch (e) {
        console.log(e);
    }

};
app();
