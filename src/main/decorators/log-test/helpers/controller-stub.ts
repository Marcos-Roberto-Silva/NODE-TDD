import {Controller, HttpRequest, HttpResponse} from "../../../../presentation/protocols";

export class ControllerStub implements Controller {
    async handle (httpRequest: HttpRequest): Promise<HttpResponse> {
        const httpResponse: HttpResponse = {
            statusCode: 200,
            body: {
                name: "John Doe",
            }
        }
        return new Promise(resolve => resolve(httpResponse));
    }
}
