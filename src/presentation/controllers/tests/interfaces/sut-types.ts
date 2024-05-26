import {SignUpController} from "../../signUp";
import {EmailValidator} from "../../../protocols";
import {AddAccount} from "../../../../domain/usecases/add-account";

export interface SutTypes {
    sut: SignUpController
    emailValidatorStub: EmailValidator,
    addAccountStub: AddAccount
}