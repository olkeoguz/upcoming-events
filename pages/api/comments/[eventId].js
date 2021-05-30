import {
  connectDB,
  insertDocument,
  getAllDocuments,
} from '../../../helpers/db-utils';

const handler = async (req, res) => {
  const eventId = req.query.eventId;

  let client;

  try {
    client = await connectDB();
  } catch (error) {
    return res
      .status(500)
      .json({ message: 'Connecting to the database failed! ' });
  }

  if (req.method === 'POST') {
    const { email, name, text } = req.body;
    if (
      !email.includes('@') ||
      !name ||
      name.trim() === '' ||
      !text ||
      text.trim() === ''
    ) {
      await client.close();
      return res.status(422).json({ message: 'Invalid input.' });
    }

    const newComment = {
      //Mongodb automatically creates a unique id for this
      email,
      name,
      text,
      eventId,
    };

    let result;
    try {
      result = await insertDocument(client, 'comments', newComment);
      return res
        .status(201)
        .json({ message: 'Added comment.', comment: newComment });
    } catch (error) {
      res.status(500).json({ message: 'Inserting comment failed !' });
    }

    newComment._id = result.insertedId; // insertedId = returned with result
  }

  if ((req.method = 'GET')) {
    try {
      const documents = await getAllDocuments(
        client,
        'comments',
        { _id: -1 },
        { eventId }
      );
      return res.status(200).json({
        comments: documents,
      });
    } catch (error) {
      res.status(500).json({ message: 'Getting comments failed!' });
    }
  }

  await client.close();
};

export default handler;
