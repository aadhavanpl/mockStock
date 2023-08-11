import { query } from '../../lib/db'

export default async function handler(req, res) {
	try {
		if (req.method === 'POST') {
			const temp = req.body.data
			const querySql = 'INSERT into users (user_email, user_name) VALUES (?, ?)'
			const valuesParams = Object.values(temp)
			const data = await query({ query: querySql, values: valuesParams })
			res.status(201).json(data)
		} else {
			const querySql = 'SELECT * from users'
			const valuesParams = []
			const data = await query({ query: querySql, values: valuesParams })
			res.status(200).json({ products: data })
		}
	} catch (error) {
		res.status(500).json({ error: error.message })
	}
}
