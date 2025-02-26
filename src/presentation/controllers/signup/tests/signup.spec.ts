import {SignUpController} from '../signUp';
import {EmailValidatorStub} from "./interfaces/helpers/email-validator-stub";
import {SutTypes} from "./interfaces/sut-types";
import {ServerError, InvalidParamError, MissingParamError} from "../../../errors";
import {AddAccountStub} from "./interfaces/helpers/add-account-stub";

const makeSut = (): SutTypes => {
    const emailValidatorStub = new EmailValidatorStub();
    const addAccountStub = new AddAccountStub();
    const sut = new SignUpController(emailValidatorStub,addAccountStub );

    return {
        sut,
        emailValidatorStub,
        addAccountStub
    }
}


describe('SignUp Controller', () => {
    it('should return 400 if no name is provided', async () => {
        const {sut} = makeSut();
        const httpRequest = {
           body: {
               email: 'any_name@email.com',
               password: 'any_password',
               passwordConfirmation: 'any_password',
           }
        }
        const httpResponse = await sut.handle(httpRequest);
        expect(httpResponse.statusCode).toBe(400);
        expect(httpResponse.body).toEqual(new MissingParamError("name"));
    });

    it('should return 400 if no email is provided', async () => {
        const {sut} = makeSut();
        const httpRequest = {
            body: {
                name: 'any_name',
                password: 'any_password',
                passwordConfirmation: 'any_password',
            }
        }
        const httpResponse = await sut.handle(httpRequest);
        expect(httpResponse.statusCode).toBe(400);
        expect(httpResponse.body).toEqual(new MissingParamError("email"));
    });

    it('should return 400 if no password is provided', async () => {
        const {sut} = makeSut();
        const httpRequest = {
            body: {
                name: 'any_name',
                email: 'any_name@email.com',
            }
        }
        const httpResponse = await sut.handle(httpRequest);
        expect(httpResponse.statusCode).toBe(400);
        expect(httpResponse.body).toEqual(new MissingParamError("password"));
    });

    it('should return 400 if no password_confirmation is provided', async () => {
        const {sut} = makeSut();
        const httpRequest = {
            body: {
                name: 'any_name',
                email: 'any_name@email.com',
                password: 'any_password',
            }
        }
        const httpResponse = await sut.handle(httpRequest);
        expect(httpResponse.statusCode).toBe(400);
        expect(httpResponse.body).toEqual(new MissingParamError("passwordConfirmation"));
    });

    it('should return 400 if an invalid email is provided', async () => {
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
        const httpResponse = await sut.handle(httpRequest);
        expect(httpResponse.statusCode).toBe(400);
        expect(httpResponse.body).toEqual(new InvalidParamError("email"));
    });

    it('should return 400 if passwordConfirmation fails', async () => {
        const {sut, emailValidatorStub} = makeSut();

        jest.spyOn(emailValidatorStub, 'isValid').mockReturnValue(false);

        const httpRequest = {
            body: {
                name: 'any_name',
                email: 'invalid_name@email.com',
                password: 'any_password',
                passwordConfirmation: 'invalid_password',
            }
        }
        const httpResponse = await sut.handle(httpRequest);
        expect(httpResponse.statusCode).toBe(400);
        expect(httpResponse.body).toEqual(new InvalidParamError("passwordConfirmation"));
    });

    it('should call emailValidator with correct email', async () => {
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
        await sut.handle(httpRequest);
        expect(isValidSpy).toHaveBeenCalledWith('any_name@email.com');
    });

    it('should return 500 if emailValidator throws', async () => {
        const {sut, emailValidatorStub,} = makeSut();

        jest.spyOn(emailValidatorStub, 'isValid').mockImplementationOnce(() => {
            throw new Error();
        });

        const httpRequest = {
            body: {
                name: 'any_name',
                email: 'any_name@email.com',
                password: 'any_password',
                passwordConfirmation: 'any_password',
            }
        }
        const httpResponse = await sut.handle(httpRequest);
        expect(httpResponse.statusCode).toBe(500);
        expect(httpResponse.body).toEqual(new ServerError('Internal Server Error'));
    });

    it('should call AddAccount with correct values', async () => {
        const {sut, addAccountStub} = makeSut();
        const addSpy = jest.spyOn(addAccountStub, 'add');

        const httpRequest = {
            body: {
                name: 'any_name',
                email: 'any_name@email.com',
                password: 'any_password',
                passwordConfirmation: 'any_password',
            }
        }

        await sut.handle(httpRequest);
        expect(addSpy).toHaveBeenCalledWith({
            name: 'any_name',
            email: 'any_name@email.com',
            password: 'any_password',
        });
    });

    it('should return 500 if addAccount throws', async () => {
        const {sut, addAccountStub,} = makeSut();

        jest.spyOn(addAccountStub, 'add').mockImplementationOnce(() => {
           return new Promise((resolve, reject) => reject(new Error()));
        });

        const httpRequest = {
            body: {
                name: 'any_name',
                email: 'any_name@email.com',
                password: 'any_password',
                passwordConfirmation: 'any_password',
            }
        }
        const httpResponse = await sut.handle(httpRequest);
        expect(httpResponse.statusCode).toBe(500);
        expect(httpResponse.body).toEqual(new ServerError('Internal Server Error'));
    });

    it('should return 200 if valid data is provided', async () => {
        const {sut} = makeSut();

        const httpRequest = {
            body: {
                name: 'valid_name',
                email: 'valid_name@email.com',
                password: 'valid_password',
                passwordConfirmation: 'valid_password',
            }
        }
        const httpResponse = await sut.handle(httpRequest);
        expect(httpResponse.statusCode).toBe(200);
        expect(httpResponse.body).toEqual({
            id: 'valid_id',
            name: 'valid_name',
            email: 'valid_email@email.com',
            password: 'valid_password'});
    });

    it('should call AddAccount with correct values', async () => {
        const {sut, addAccountStub } = makeSut();
        const addSpy = jest.spyOn(addAccountStub, 'add');
        const httpRequest = {
            body: {
                name: 'any_name',
                email: 'any_name@email.com',
                password: 'any_password',
                passwordConfirmation: 'any_password',
            }
        }
        await sut.handle(httpRequest);
        expect(addSpy).toHaveBeenCalledWith({
            name: 'any_name',
            email: 'any_name@email.com',
            password: 'any_password',
        });
    });
});
