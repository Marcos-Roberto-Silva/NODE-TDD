import {badRequest, ok, serverError} from "../../helpers/http-helper";
import {EmailValidator, Controller, HttpRequest, HttpResponse, AddAccount} from "./signup-protocols";
import {InvalidParamError, MissingParamError} from "../../errors";

export class SignUpController implements Controller {
    private readonly emailValidator: EmailValidator;
    private readonly addAccount: AddAccount;

    constructor(emailValidator: EmailValidator, addAccount: AddAccount) {
        this.emailValidator = emailValidator;
        this.addAccount = addAccount;
    }

    async handle (httpRequest: HttpRequest): Promise<HttpResponse>  {

        const {name, email, password, passwordConfirmation} = httpRequest.body

        try {
            const fields = ['name', 'email', 'password', 'passwordConfirmation'];

            for (const field of fields) {
                if (!httpRequest.body[field]) {
                    return badRequest(new MissingParamError(field));
                }
            }

            if (password !== passwordConfirmation) {
                return badRequest(new InvalidParamError("passwordConfirmation"));
            }

            const isValid =  this.emailValidator.isValid(httpRequest.body.email);
            if (!isValid) {
                return badRequest(new InvalidParamError('email'));
            }

           const account = await this.addAccount.add({
                name,
                email,
                password
            });

            return ok(account);
        } catch (error) {
            return serverError(error);
        }
    }
}
