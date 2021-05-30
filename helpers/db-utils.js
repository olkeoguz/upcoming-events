import { MongoClient } from 'mongodb';

export const connectDB = async () => {
  const client = await MongoClient.connect(
    'mongodb+srv://olkeoguz:d7OjFmRRQyR5QzOp@cluster0.e2kfq.mongodb.net/events?retryWrites=true&w=majority'
  );
  return client;
};

export const insertDocument = async (client, collection, document) => {
  const db = client.db();

  const result = await db.collection(collection).insertOne(document);

  return result;
};

export async function getAllDocuments(client, collection, sort, filter = {}) {
  const db = client.db();

  const documents = await db
    .collection(collection)
    .find()
    .sort(sort)
    .filter(filter)
    .toArray();

  return documents;
}
