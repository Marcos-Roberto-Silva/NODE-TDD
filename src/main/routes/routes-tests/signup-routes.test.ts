import request from "supertest";
import app from '../../config/app';

describe('SignUp Routes', () => {
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

    it('should ', () => {
        const a = 1;
        const b = 2;
        const result = a * b;

        expect(result).toBe(2);
    });
});
