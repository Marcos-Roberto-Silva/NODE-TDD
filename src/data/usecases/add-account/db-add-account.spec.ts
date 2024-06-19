import {EncrypterStub} from "./helpers/encrypter-stub";
import {DbAddAccount} from "./db-add-account";

describe('DbAddAccount Usecase', () => {
    it('should call Encrypter wit correct password', async () => {
        const encrypterStub = new EncrypterStub();
        const sut =  new DbAddAccount(encrypterStub);
        const encryptSpy = jest.spyOn(encrypterStub, 'encrypt');
        const accountData = {
            id: '234',
            name: 'John Doe',
            email: 'john@doe.com',
            password: 'valid_password',
        }
        await sut.add(accountData);
        expect(encryptSpy).toHaveBeenCalledWith('valid_password');
    });
})