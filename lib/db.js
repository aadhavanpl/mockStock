import mysql from 'mysql2/promise'

export async function query({ query, values = [] }) {
	const dbconnection = await mysql.createConnection({
		multipleStatements: true,
		host: process.env.NEXT_PUBLIC_DB_HOST,
		user: process.env.NEXT_PUBLIC_DB_USER,
		password: process.env.NEXT_PUBLIC_DB_PASSWORD,
		database: process.env.NEXT_PUBLIC_DB_DATABASE,
		port: 3306,
		ssl: {
			rejectUnauthorized: false
		},
	})

	try {
		const [results] = await dbconnection.execute(query, values)
		dbconnection.end()
		return results
	} catch (error) {
		throw Error(error.message)
	}
}