import { query } from '../../lib/db'

export default async function handler(req, res) {
	try {
		const querySql =
			'select users.user_name, users.user_email, ((SUM(transactions.t_qty*stocks.curr_price))+users.balance) as net_worth	from transactions natural join stocks natural join users group by user_email order by net_worth DESC;'
		const valuesParams = []
		const data = await query({ query: querySql, values: valuesParams })
		res.status(200).json({ products: data })
	} catch (error) {
		res.status(500).json({ error: error.message })
	}
}
