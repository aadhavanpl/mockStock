import { query } from '../../lib/db'

export default async function handler(req, res) {
	try {
		const querySql = 'update stocks set percentage_change=((curr_price-yest_price)/100);'
		const valuesParams = []
		const data = await query({ query: querySql, values: valuesParams })
		res.status(200).json(data)
	} catch (error) {
		res.status(500).json({ error: error.message })
	}
}
