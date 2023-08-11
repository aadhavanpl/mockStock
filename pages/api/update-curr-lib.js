import { query } from '../../lib/db'

export default async function handler(req, res) {
	try {
		const temp = req.body.data
		const querySql = 'UPDATE stocks SET curr_price = ?, last_update = ? WHERE stock_tag = ?;'
		const valuesParams = temp
		const data = await query({ query: querySql, values: valuesParams })
		res.status(201).json(data)
	} catch (error) {
		res.status(500).json({ error: error.message })
	}
}
