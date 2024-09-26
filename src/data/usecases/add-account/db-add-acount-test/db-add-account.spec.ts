import {EncrypterStub} from "../helpers/encrypter-stub";
import {DbAddAccount} from "../db-add-account";
import {AddRepositoryStub} from "../helpers/add-repository-stub";

interface SutTypes {
    sut: DbAddAccount;
    encrypterStub: EncrypterStub
    addAccountRepositoryStub: AddRepositoryStub
}

const makeSut = (): SutTypes => {
    const encrypterStub = new EncrypterStub();
    const addAccountRepositoryStub = new AddRepositoryStub();
    const sut =  new DbAddAccount(encrypterStub, addAccountRepositoryStub);

    return {
        sut, encrypterStub, addAccountRepositoryStub
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

    it('should call AddAccountRepository with correct values', async () => {
        const {sut, addAccountRepositoryStub} = makeSut();
        const addSpy = jest.spyOn(addAccountRepositoryStub, 'add')
        const accountData = {
            name: 'John Doe',
            email: 'john@doe.com',
            password: 'valid_password',
        }
        await sut.add(accountData);
        expect(addSpy).toHaveBeenCalledWith({
            name: 'John Doe',
            email: 'john@doe.com',
            password: 'hashed_password',
        });
    });

    it('should should throws if AddAccountRepository throws', async () => {
        const {sut, addAccountRepositoryStub} = makeSut();
        jest.spyOn(addAccountRepositoryStub, 'add').mockReturnValue(new Promise((resolve, reject) => reject(new Error())));
        const accountData = {
            name: 'John Doe',
            email: 'john@doe.com',
            password: 'hashed_password',
        }
        const promise = sut.add(accountData);
        await expect(promise).rejects.toThrow();
    });

    it('should return an account on success', async () => {
        const resultData = {
            id: 'valid_id',
            name: 'John Doe',
            email: 'john@doe.com',
            password: 'hashed_password',
        }
        const {sut, addAccountRepositoryStub} = makeSut();
        const accountData = {
            name: 'John Doe',
            email: 'john@doe.com',
            password: 'valid_password',
        }
        const account = await sut.add(accountData);
        expect(account).toEqual(resultData);
    });
})
