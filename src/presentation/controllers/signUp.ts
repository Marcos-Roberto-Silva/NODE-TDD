import  {HttpResponse, HttpRequest} from '../protocols/http'
import {MissingParamError} from "../errors/missing-param-error";

export class SignUpController {
    handle (httpRequest: HttpRequest): HttpResponse  {

        const fields = ['name', 'email', 'password', 'password_confirmation'];

        for (const field of fields) {
            if (!httpRequest.body[field]) {
                return {
                    statusCode: 400,
                    body: new MissingParamError(field),
                }
            }
        }
    }
}