import { query } from '../../lib/db'

export default async function handler(req, res) {
	try {
		const temp = req.body.data
		const querySql =
			'select transactions.user_email,stocks.stock_tag,stocks.stock_name,transactions.share_price,t_qty, transactions.t_qty*transactions.share_price as total_price, transactions.trans_date,transactions.trans_time from transactions natural join stocks	where transactions.user_email=?	order by (transactions.t_sl_no) desc;'
		const valuesParams = Object.values(temp)
		const data = await query({ query: querySql, values: valuesParams })
		res.status(200).json({ products: data })
	} catch (error) {
		res.status(500).json({ error: error.message })
	}
}
