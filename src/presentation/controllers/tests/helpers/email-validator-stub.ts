import {EmailValidator} from "../../../protocols";
import {AddAccount, AddAccountModel} from "../../../../domain/usecases/add-account";
import {AccountModel} from "../../../../domain/models/account";

export class EmailValidatorStub implements EmailValidator {
    isValid (email: string): boolean {
        return true;
    }
}