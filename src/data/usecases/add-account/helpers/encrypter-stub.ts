export class EncrypterStub {
    async encrypt(value: string): Promise<string> {
        return new Promise((resolve) => resolve("hashed_password"));
    }
}