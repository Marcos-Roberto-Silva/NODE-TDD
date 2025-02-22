import {LogControllerDecorator} from "../log";
import {ControllerStub} from "./helpers/controller-stub";
import {SutTypes} from "./helpers/sut-types";

describe('LogController Decorator', () => {
    const makeSut = (): SutTypes => {
        const controllerStub = new ControllerStub();
        const sut = new LogControllerDecorator(controllerStub);
        return {
            sut, controllerStub
        }
    }
    it('should call controller handle', async () => {
        const {sut, controllerStub} = makeSut();
        const handleSpy = jest.spyOn(controllerStub, 'handle')

        const httpRequest = {
            body: {
                email: 'test@test.com',
                name: 'any_name',
                password: 'any_password',
                password2: 'any_password'
            }
        }
        await sut.handle(httpRequest);
        expect(handleSpy).toHaveBeenCalledWith(httpRequest);
    });

    it('should  return the same result of controller', async () => {
        const {sut} = makeSut();

        const httpRequest = {
            body: {
                email: 'test@test.com',
                name: 'any_name',
                password: 'any_password',
                password2: 'any_password'
            }
        }
       const httpResponse =  await sut.handle(httpRequest);
        expect(httpResponse).toEqual({
            statusCode: 200,
            body: {
                name: 'John Doe',
            }
        });
    });
});
