import request from "supertest";
import app from '../../config/app';
import {MongoHelper} from "../../../infra/db/mongodb/helpers/mongo-helper";

describe('SignUp Routes', () => {
    beforeAll(async () => {
        await MongoHelper.connect(process.env.MONGODB_URL = 'mongodb://localhost:27017/myDB');
    });

    afterAll(async () => {
        await MongoHelper.disconnect();
    });

    beforeEach(async () => {
            const accountCollection = await MongoHelper.getCollection('accounts');
            await accountCollection.deleteMany({});
        }
    );

    it('should return an account on success', async () => {
        await request(app)
            .post('/api/signup')
            .send({
                name:'Marcos',
                email:'marcos@email.com',
                password:'123',
                passwordConfirmation:'123'
            })
            .expect(200);
    });
});
