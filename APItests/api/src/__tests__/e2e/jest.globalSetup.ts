import { createConnection, getConnection } from "typeorm";
import { clearDB } from "./helpers";
import { UserEntity } from "../../dal/entity/user";
import { PostEntity } from "../../dal/entity/post";
import { DataSource } from "typeorm"

const test_db_name = "newDB";

function globalSetupEnvs() {
  process.env.DB_NAME = test_db_name;
  console.log("global set up envs");
}

async function globalSetupDB() {
  const AppDataSource = new DataSource({
    type: "postgres",
    host: "localhost",
    port: 5432,
    username: "postgres",
    password: "underwater",
    database: test_db_name,
    entities: [UserEntity, PostEntity],
    synchronize: true,
  });
  await AppDataSource.initialize()

  await createConnection();

  const connection = getConnection();

  if (connection.isConnected) {
    console.log("Connection to the database established");
  } else {
    console.log("Failed to establish connection to the database");
    return; // or handle the error
  }

  global.DB_CONNECTION = getConnection();

  //clearDB(global.DB_CONNECTION);
  console.log("global set up db");
}

module.exports = async () => {
  globalSetupEnvs();
  await globalSetupDB();
};