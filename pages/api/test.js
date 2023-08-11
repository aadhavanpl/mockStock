import { query } from '../../lib/db'

export default async function handler(req, res) {
  try {
    // const temp = req.body.data
    const querySql = 'select * from stocks where stock_tag = "AAPL";\
                      select * from stocks where stock_tag = "AABV";'
    const valuesParams = []
    const data = await query({ query: querySql, values: valuesParams })
    res.status(201).json(data)
  } catch (error) {
    res.status(500).json({ error: error.message })
  }
}
