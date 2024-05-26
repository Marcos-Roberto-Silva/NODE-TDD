import {badRequest, serverError} from "../helpers/http-helper";
import {EmailValidator, Controller, HttpRequest, HttpResponse} from "../protocols";
import {InvalidParamError, MissingParamError} from "../errors";

export class SignUpController implements Controller {
    private readonly emailValidator: EmailValidator;

    constructor(emailValidator: EmailValidator) {
        this.emailValidator = emailValidator;
    }

    handle (httpRequest: HttpRequest): HttpResponse  {

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
        } catch (error) {
            console.error(error);
            return serverError();
        }
    }
}