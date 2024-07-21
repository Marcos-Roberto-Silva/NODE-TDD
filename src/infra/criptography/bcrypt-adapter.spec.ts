import bcrypt from 'bcrypt';
import {BcryptAdapter} from './bcrypt-adapter';

const salt = 12;
const makeSut = (): BcryptAdapter => {
    return new BcryptAdapter(salt);
}

describe('Bcrypt Adapter', () => {
    it('should call bcrypt with correct values', async () => {
        const sut = makeSut();
        const hashSpy = jest.spyOn(bcrypt, 'hash')
        await sut.encrypt('any_value');
        expect(hashSpy).toHaveBeenCalledWith('any_value', salt);
    });

    it('should return a hash on success', async () => {
        jest.spyOn(bcrypt, 'hash').mockImplementationOnce(() => {
            return Promise.resolve('hash');
        });
        const sut =  makeSut();
        const hash = await sut.encrypt('any_value');
        expect(hash).toBe('hash');
    });
});
