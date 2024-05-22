import {EmailValidatorAdapter} from "./email-vaidator";

describe('EmailValidator Adapter', () => {
    it('should return false if validator returns false', () => {
        const sut = new EmailValidatorAdapter();
        sut.isValid = sut.isValid('invalid_email@mil.com');
        expect(sut.isValid).toBe(false);
    });
});