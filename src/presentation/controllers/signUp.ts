import {badRequest, serverError} from "../helpers/http-helper";
import {EmailValidator, Controller, HttpRequest, HttpResponse} from "../protocols";
import {InvalidParamError, MissingParamError} from "../errors";
import {AddAccount} from "../../domain/usecases/add-account";
import {name} from "ts-jest/dist/transformers/hoist-jest";

export class SignUpController implements Controller {
    private readonly emailValidator: EmailValidator;
    private readonly addAccount: AddAccount;

    constructor(emailValidator: EmailValidator, addAccount: AddAccount) {
        this.emailValidator = emailValidator;
        this.addAccount = addAccount;
    }

    handle (httpRequest: HttpRequest): HttpResponse  {

        const {name, email, password} = httpRequest.body

        try {
            const fields = ['name', 'email', 'password', 'passwordConfirmation'];

            for (const field of fields) {
                if (!httpRequest.body[field]) {
                    return badRequest(new MissingParamError(field));
                }
            }

            const isValid =  this.emailValidator.isValid(httpRequest.body.email);
            if (!isValid) {
                return badRequest(new InvalidParamError('email'));
            }

            this.addAccount.add({
                name,
                email,
                password
            })
        } catch (error) {
            console.error(error);
            return serverError();
        }
    }
}