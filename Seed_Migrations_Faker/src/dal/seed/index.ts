import * as helpers from "./helpers";
import UserFactory from "./userFactory";

import { createConnection } from "typeorm";

createConnection().then(async (connection) => {
  await connection.manager.transaction(async (transactionalEntityManager) => {
   /*  await helpers.createMany(transactionalEntityManager, UserFactory, 5); */
  });
});
