import { Consumer, KafkaClient } from "kafka-node";
import { UserBuilder } from "./notificationService/builder/userBuilder";

const client = new KafkaClient({ kafkaHost: "kafka:9092" });
const consumer = new Consumer(client, [{ topic: "web-events-topic" }], {
  autoCommit: true,
  fetchMaxWaitMs: 1000,
  fetchMaxBytes: 1024 * 1024,
  encoding: "buffer",
});

consumer.on("message", function (message) {
  console.log("MICROSERVICE GOT MESSAGE:");
  const buf = Buffer.from(message.value);
  const decodedMessage = JSON.parse(buf.toString());
  console.log(decodedMessage);
  const getUsers = new UserBuilder();
  getUsers.getUsersByNotification(decodedMessage);
});

consumer.on("error", function (err) {
  console.log("Kafka consumer error", err);
});