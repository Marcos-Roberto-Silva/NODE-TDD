import {LogControllerDecorator} from "../../log";
import {Controller} from "../../../../presentation/protocols";

export interface SutTypes {
    sut: LogControllerDecorator,
    controllerStub: Controller
}
