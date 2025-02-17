import {MongoClient} from "mongodb";

export const MongoHelper = {
    client: null as MongoClient,
    db: null,
    uri: null as string,

    async connect (uri: string): Promise<void> {
       this.uri = uri;
       this.client = await MongoClient.connect(uri);
       this.db = await this.client.db();
    },

    async disconnect (): Promise<void> {
        await this.client.close();
        this.client = null;
    },

    async getCollection(name: string): Promise<any> {
        if (!this.client?.topology.isConnected()) {
            await this.connect(this.uri);
        }
        return this.db.collection(name);
    }
}
