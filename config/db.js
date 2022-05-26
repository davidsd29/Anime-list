// database info
const { MongoClient, ServerApiVersion } = require('mongodb');

 const connectDB = async () => {

	const uri =
		'mongodb+srv://' +
		process.env.DB_USER +
		':' +
		process.env.DB_PASS +
		'@' +
		process.env.DB_HOST +
		'/' +
		process.env.DB_NAME +
		'?retryWrites=true&w=majority';

	const client = new MongoClient(uri, {
		useNewUrlParser: true,
		useUnifiedTopology: true,
		serverApi: ServerApiVersion.v1,
	});

	try {
		await client.connect();
		db = client.db(process.env.DB_NAME);
	} catch (error) {
		throw error;
	}
}

module.exports = connectDB;
