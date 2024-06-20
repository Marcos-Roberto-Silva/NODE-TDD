import {EmailValidator} from "../../../../../protocols";

export class EmailValidatorStub implements EmailValidator {
    isValid (email: string): boolean {
        return true;
    }
}