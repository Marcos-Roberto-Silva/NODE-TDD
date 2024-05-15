import {SignUpController} from '../signUp';
import {MissingParamError} from "../../errors/missing-param-error";
import {InvalidParamError} from "../../errors/invalid-param-error";
import {EmailValidatorStub} from "./helpers/email-validator-stub";
import {SutType} from "./interfaces/sut-types";

const makeSut = (): SutType => {
    const emailValidatorStub = new EmailValidatorStub();
    const sut = new SignUpController(emailValidatorStub);

    return {
        sut,
        emailValidatorStub,
    }
}
describe('SignUp Controller', () => {
    it('should return 400 if no name is provided', () => {
        const {sut} = makeSut();
        const httpRequest = {
           body: {
               email: 'any_name@email.com',
               password: 'any_password',
               passwordConfirmation: 'any_password',
           }
        }
        const httpResponse = sut.handle(httpRequest);
        expect(httpResponse.statusCode).toBe(400);
        expect(httpResponse.body).toEqual(new MissingParamError("name"));
    });

    it('should return 400 if no email is provided', () => {
        const {sut} = makeSut();
        const httpRequest = {
            body: {
                name: 'any_name',
                password: 'any_password',
                passwordConfirmation: 'any_password',
            }
        }
        const httpResponse = sut.handle(httpRequest);
        expect(httpResponse.statusCode).toBe(400);
        expect(httpResponse.body).toEqual(new MissingParamError("email"));
    });

    it('should return 400 if no password is provided', () => {
        const {sut} = makeSut();
        const httpRequest = {
            body: {
                name: 'any_name',
                email: 'any_name@email.com',
            }
        }
        const httpResponse = sut.handle(httpRequest);
        expect(httpResponse.statusCode).toBe(400);
        expect(httpResponse.body).toEqual(new MissingParamError("password"));
    });

    it('should return 400 if no password_confirmation is provided', () => {
        const {sut} = makeSut();
        const httpRequest = {
            body: {
                name: 'any_name',
                email: 'any_name@email.com',
                password: 'any_password',
            }
        }
        const httpResponse = sut.handle(httpRequest);
        expect(httpResponse.statusCode).toBe(400);
        expect(httpResponse.body).toEqual(new MissingParamError("passwordConfirmation"));
    });

    it('should return 400 if an invalid email is provided', () => {
        const {sut, emailValidatorStub} = makeSut();

        jest.spyOn(emailValidatorStub, 'isValid').mockReturnValue(false);

        const httpRequest = {
            body: {
                name: 'any_name',
                email: 'invalid_name@email.com',
                password: 'any_password',
                passwordConfirmation: 'any_password',
            }
        }
        const httpResponse = sut.handle(httpRequest);
        expect(httpResponse.statusCode).toBe(400);
        expect(httpResponse.body).toEqual(new InvalidParamError("email"));
    });

    it('should call emailValidator with correct email', () => {
        const {sut, emailValidatorStub} = makeSut();

        const isValidSpy = jest.spyOn(emailValidatorStub, 'isValid');

        const httpRequest = {
            body: {
                name: 'any_name',
                email: 'any_name@email.com',
                password: 'any_password',
                passwordConfirmation: 'any_password',
            }
        }
        sut.handle(httpRequest);
        expect(isValidSpy).toHaveBeenCalledWith('any_name@email.com');
    });
});