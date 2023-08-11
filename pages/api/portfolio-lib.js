import { query } from '../../lib/db'

//portfolio table from transactions
export default async function handler(req, res) {
	try {
		const temp = req.body.data
		const querySql =
			'select transactions.user_email,stocks.stock_tag,stocks.stock_name,SUM(transactions.t_qty) quantity,(select TRUNCATE(SUM(transactions.t_qty*transactions.share_price),2) from transactions where transactions.t_qty>0 and transactions.user_email=?) as amount_spent,TRUNCATE(SUM(transactions.t_qty*stocks.curr_price),2) as curr_total_price,TRUNCATE((-SUM(transactions.t_qty*transactions.share_price)+SUM(transactions.t_qty*stocks.curr_price)),2) as turnover from transactions natural join stocks where user_email=? and stocks.stock_tag!="SHL" group by stocks.stock_tag,user_email order by turnover desc;'
		const valuesParams = Object.values(temp)
		const data = await query({ query: querySql, values: valuesParams })
		res.status(200).json({ products: data })
	} catch (error) {
		res.status(500).json({ error: error.message })
	}
}
