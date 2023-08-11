import { query } from '../../lib/db'

export default async function handler(req, res) {
	try {
		if (req.method === 'POST') {
			const temp = req.body.data
			const querySql =
				'INSERT INTO transactions (user_email,stock_tag,t_qty,share_price,trans_date,trans_time) VALUES (?,?,?,?,CURDATE(),CURTIME());'
			const valuesParams = Object.values(temp) //converting from object to array with only values
			const data = await query({ query: querySql, values: valuesParams })
			res.status(201).json(data)
		} else {
			const querySql = 'SELECT * FROM stocks'
			const valuesParams = []
			const data = await query({ query: querySql, values: valuesParams })
			res.status(200).json({ products: data })
		}
	} catch (error) {
		res.status(500).json({ error: error.message })
	}
}