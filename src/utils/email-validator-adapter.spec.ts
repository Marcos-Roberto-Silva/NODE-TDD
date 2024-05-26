import {EmailValidatorAdapter} from "./email-vaidator";
import validator from "validator";
import {isBooleanObject} from "node:util/types";

jest.mock('validator', () => ({
    isEmail(): boolean {
        return true;
    }
}));

describe('EmailValidator Adapter', () => {
    it('should return false if validator returns false', () => {
        const sut = new EmailValidatorAdapter();
        jest.spyOn(validator, 'isEmail').mockImplementationOnce(() => {
            return false;
        });
        const isValid = sut.isValid('invalid_email@mil.com');
        expect(isValid).toBe(false);
    });

    it('should return true if validator returns true', () => {
        const sut = new EmailValidatorAdapter();
        const isValid = sut.isValid('valid_email@mil.com');
        expect(isValid).toBe(true);
    });

    it('should call validator with correct email', () => {
        const sut = new EmailValidatorAdapter();
        const isEmailSpy = jest.spyOn(validator, 'isEmail');
        sut.isValid('any_email@mail.com');
        expect(isEmailSpy).toHaveBeenCalledWith('any_email@mail.com');
    });
});