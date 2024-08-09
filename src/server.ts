import http from 'http';
import express, { Express } from 'express';
import morgan from 'morgan';
import routes from './routes/index';

const router: Express = express();

// Logging
router.use(morgan('dev'));
// Parsing requests
router.use(express.urlencoded({ extended: false }));
// Takes care of JSON Data
router.use(express.json());

// API Rules
router.use((req, res, next) => {
	res.header('Access-Control-Allow-Origin', '*');
	res.header(
		'Access-Control-Allow-Headers',
		'origin, X-Requested-With,Content-Type,Accept, Authorization',
	);

	if (req.method === 'OPTIONS') {
		res.header('Access-Control-Allow-Methods', 'GET PATCH DELETE POST PUT');
		return res.status(200).json({});
	}

	next();
});

// Inject routes
router.use('/', routes);

// Error Handling
router.use((req, res, next) => {
	const error = new Error('not found');
	return res.status(404).json({ message: error.message });
});

const httpServer = http.createServer(router);
const PORT = 3000;
httpServer.listen(PORT, () =>
	console.log(`The server is running on port ${PORT}`),
);
