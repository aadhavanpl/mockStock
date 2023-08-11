import { query } from '../../lib/db'

export default async function handler(req, res) {
	try {
		const querySql =
			'UPDATE users AS u INNER JOIN (SELECT user_email, SUM(t_qty * share_price) AS balance FROM transactions GROUP BY user_email) AS t ON t.user_email = u.user_email SET u.balance = 10000 - t.balance;'
		const valuesParams = []
		const data = await query({ query: querySql, values: valuesParams })
		res.status(200).json(data)
	} catch (error) {
		res.status(500).json({ error: error.message })
	}
}
