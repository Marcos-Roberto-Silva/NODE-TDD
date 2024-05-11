import {SignUpController} from "../../signUp";
import {EmailValidator} from "../../../protocols/email-validator";

export interface SutType {
    sut: SignUpController
    emailValidatorStub: EmailValidator
}