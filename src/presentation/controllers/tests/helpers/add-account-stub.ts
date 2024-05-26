import {AddAccount, AddAccountModel} from "../../../../domain/usecases/add-account";
import {AccountModel} from "../../../../domain/models/account";

export class AddAccountStub implements AddAccount {
    add(account: AddAccountModel): AccountModel {
        return {
            id: 'valid_id',
            name: 'valid_name',
            email: 'valid_email@email.com',
            password: 'valid_password',
        };
    }
}