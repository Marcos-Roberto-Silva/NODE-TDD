import {MongoClient} from "mongodb";

export const MongoHelper = {
    client: null,
    db: null,

    async connect (uri: string): Promise<void> {
       this.client = await MongoClient.connect(uri);
       this.db = await this.client.db();
    },

    async disconnect () {
        await this.client.close();
    },

    getCollection (name: string) {
        return this.db.collection(name);
    },
}
