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
});
