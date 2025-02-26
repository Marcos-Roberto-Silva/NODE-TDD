import {MongoHelper} from "../infra/db/mongodb/helpers/mongo-helper";
import env from './config/env';

MongoHelper.connect(env.mongoUri).then(
  async () => {
       const app = (await import("./config/app")).default;
        app.listen(env.port, () => console.log(`Server started on http://localhost:${ env.port }`));
    }
).catch(console.error);
