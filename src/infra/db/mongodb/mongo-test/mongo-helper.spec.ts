import {MongoHelper as sut} from "../helpers/mongo-helper";

describe('Mongo Helper', () => {
    const MONGODB_URI = 'mongodb://localhost:27017/myDB'
    beforeAll(async () => {
        await sut.connect(MONGODB_URI);
    });

    afterAll(async () => {
        await sut.disconnect();
    });

    it('should reconnect if MongoDb is down', async () => {

       let accountCollection = await sut.getCollection('accounts');
       expect(accountCollection).toBeTruthy();

       await sut.disconnect();

        accountCollection = await sut.getCollection('accounts');
        expect(accountCollection).toBeTruthy();
    });
});
