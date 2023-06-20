import { createConnection } from "typeorm";
import { UserBuilder } from "./notificationService/builder/userBuilder";
import { AppDataSource } from "./appDataSource";
import { Container } from "typedi";
import NotificationService from "./notificationService/notificationService";
import { UserEntity } from "./entity/user";
import { Consumer, KafkaClient } from "kafka-node";






AppDataSource.initialize().then(() => {
  console.log('1111')
  const client = new KafkaClient({ kafkaHost: "kafka:9092" });
  const consumer = new Consumer(client, [{ topic: "web-events-topic" }], {
    autoCommit: true,
    fetchMaxWaitMs: 1000,
    fetchMaxBytes: 1024 * 1024,
    encoding: "buffer",
  });


  consumer.on("message", function (message) {
    const buf = Buffer.from(message.value);
    const decodedMessage = JSON.parse(buf.toString());
    console.log("MICROSERVICE GOT MESSAGE:");
    console.log(decodedMessage);
    const notification = new NotificationService
    notification.sendNotification(decodedMessage)
  });

  consumer.on("error", function (err) {
    console.log("Kafka consumer error", err);
  });
})






