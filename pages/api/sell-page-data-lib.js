import { query } from '../../lib/db'

export default async function handler(req, res) {
	try {
		const temp = req.body.data
		const querySql =
			'select stocks.stock_tag,stocks.stock_name,stocks.curr_price, SUM(transactions.t_qty) as quantity,TRUNCATE((-SUM(transactions.t_qty*transactions.share_price)+SUM(transactions.t_qty*stocks.curr_price)),2) as turnover from transactions natural join stocks where user_email= ? group by stocks.stock_tag,user_email;'
		const valuesParams = Object.values(temp)
		const data = await query({ query: querySql, values: valuesParams })
		res.status(200).json({ products: data })
	} catch (error) {
		res.status(500).json({ error: error.message })
	}
}
