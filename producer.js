import { Kafka } from "kafkajs";
import { randomUUID } from "crypto";

async function bootstrap() {
  const kafka = new Kafka({
    clientId: "kafka-example-producer",
    brokers: ["still-jawfish-7398-us1-kafka.upstash.io:9092"],
    sasl: {
      mechanism: "scram-sha-256",
      username:
        "c3RpbGwtamF3ZmlzaC03Mzk4JM-o5u1wOa18acP6PpNKTS4Fq62_uRwjEP79SMU",
      password:
        "uYt9yOTTkvvJ9EKI9o05kB-TlaceqTWIlM33tiM7r2aUyEmy6Itath8bYHb7TbdKr9ZWtg==",
    },
    ssl: true,
  });

  const producer = kafka.producer();

  await producer.connect();

  await producer.send({
    topic: "notifications.send-notification",
    messages: [
      {
        value: JSON.stringify({
          content: "Nova solicitação!",
          category: "social",
          recipientId: randomUUID(),
        }),
      },
    ],
  });

  await producer.disconnect();
}

bootstrap();
