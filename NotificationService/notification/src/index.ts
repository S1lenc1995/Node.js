import { createConnection } from "typeorm";
import { AppDataSource } from "./appDataSource";

AppDataSource.initialize().then(() => {
  require("./kafkaConsumer");
  require("./server");
});