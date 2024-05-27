import {EncrypterStub} from "./helpers/encrypter-stub";
import {DbAddAccount} from "./db-add-account";

describe('DbAddAccount Usecase', () => {
    it('should call Encrypter wit correct password', () => {
        const encrypterStub = new EncrypterStub();
        const sut = new DbAddAccount();
        const encryptSpy = jest.spyOn(encrypterStub, 'encrypt');
        const accountData = {
            name: 'John Doe',
            email: 'john@doe.com',
            password: 'valid_password',
        }
        sut.add(accountData);
        expect(encryptSpy).toHaveBeenCalledWith('valid_password');
    });
})