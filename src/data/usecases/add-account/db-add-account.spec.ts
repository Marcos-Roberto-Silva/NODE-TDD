import {EncrypterStub} from "./helpers/encrypter-stub";
import {DbAddAccount} from "./db-add-account";

interface SutTypes {
    sut: DbAddAccount;
    encrypterStub: EncrypterStub;
}

const makeSut = (): SutTypes => {
    const encrypterStub = new EncrypterStub();
    const sut =  new DbAddAccount(encrypterStub);

    return {
        sut, encrypterStub
    }
}

describe('DbAddAccount Usecase', () => {
    it('should call Encrypter wit correct password', async () => {
        const {sut, encrypterStub} = makeSut();
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

    it('should should throws if encrypter throws', async () => {
        const {sut, encrypterStub} = makeSut();
        jest.spyOn(encrypterStub, 'encrypt').mockReturnValue(new Promise((resolve, reject) => reject(new Error())));
        const accountData = {
            id: '234',
            name: 'John Doe',
            email: 'john@doe.com',
            password: 'valid_password',
        }
        const promise = sut.add(accountData);
        await expect(promise).rejects.toThrow();
    });
})