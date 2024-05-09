export class SignUpController {
    handle (httpRequest: any): any {

        const fields = ['name', 'email', 'password', 'password_confirmation'];

        for (const field of fields) {
            if (!httpRequest.body[field]) {
                return {
                    statusCode: 400,
                    body: new Error(`Missing param: ${field}`),
                }
            }
        }
    }
}