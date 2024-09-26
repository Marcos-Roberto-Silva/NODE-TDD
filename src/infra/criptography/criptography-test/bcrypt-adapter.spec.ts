import bcrypt from 'bcrypt';
import {BcryptAdapter} from '../bcrypt-adapter';
import {rejects} from "node:assert";

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

    it('should throw if bcrypt hash throws an error', async () => {
        const sut = makeSut();
        jest.spyOn(bcrypt, 'hash').mockImplementationOnce(() => {
            return new Promise((resolve, reject) => {
                reject(new Error());
            });
        });
        await expect(sut.encrypt('any_value')).rejects.toThrow();
    });
});
