import { connectDB, insertDocument } from '../../helpers/db-utils';

const handler = async (req, res) => {
  if (req.method === 'POST') {
    const userEmail = req.body.email;

    if (!userEmail || !userEmail.includes('@')) {
      return res.status(422).json({ message: 'Invalid email address' });
    }

    let client;

    try {
      client = await connectDB();
    } catch (error) {
      return res
        .status(500)
        .json({ message: 'Connecting to the database failed!' });
    }

    try {
      await insertDocument(client, 'newsletter', { email: userEmail });
      client.close(); //disconnect
    } catch (error) {
      return res.status(500).json({ message: 'Inserting data failed!' });
    }

    return res.status(201).json({ message: 'Signed Up!' });
  }
};

export default handler;
