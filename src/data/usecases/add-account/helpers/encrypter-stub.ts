import {Encrypter} from "../../../protocols/encrypter";

export class EncrypterStub implements Encrypter {
    async encrypt (value: string): Promise<string> {
        return new Promise((resolve) => resolve("hashed_password"));
    }
}