// Async Handler function to wrap each route with try/catch block.
'use strict';

function asyncHandler(cb) {
	return async (req, res, next) => {
		try {
			await cb(req, res, next);
		} catch (error) {
			if (
				error.name === 'SequelizeValidationError' ||
				error.name === 'SequelizeUniqueConstraintError'
			) {
				const errors = error.errors.map((err) => err.message);
				res.status(400).json({ 'Sequelize validation error': errors });
			}
			// Forward error to the global error handler
			else next(error);
		}
	};
}
