import {AccountModel, AddAccount, AddAccountModel} from "../../../signup-protocols";

export class AddAccountStub implements AddAccount {
   async add(account: AddAccountModel): Promise<AccountModel> {
        const fakeAccount = {
            id: 'valid_id',
            name: 'valid_name',
            email: 'valid_email@email.com',
            password: 'valid_password',
        };

        return new Promise(resolve => resolve(fakeAccount));
    }
}