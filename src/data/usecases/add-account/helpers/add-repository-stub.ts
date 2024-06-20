import {AddAccountModel, AccountModel} from "../db-add-accounts-protocols";
import {AddAccountRepository} from "../db-add-accounts-protocols";

export class AddRepositoryStub implements AddAccountRepository {
    async add (accountData: AddAccountModel): Promise<AccountModel> {
        const fakeAccount = {
            id: 'valid_id',
            name: 'John Doe',
            email: 'john@doe.com',
            password: 'hashed_password',
        }
        return new Promise((resolve) => resolve(fakeAccount));
    }
}