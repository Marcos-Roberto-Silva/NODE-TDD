
import {AddAccount, AddAccountModel} from "../../../domain/usecases/add-account";
import {AccountModel} from "../../../domain/models/account";

export class DbAddAccount implements AddAccount{
    add(account: AddAccountModel): AccountModel {
        return account;
    }
}