export default async function getData() {
	let stocks = []

	const urls = [
		'https://api.twelvedata.com/time_series?symbol=JNJ,GOOG,JPM,NVDA,CVX,V,PG&interval=1min&apikey=' + process.env.NEXT_PUBLIC_API_1,
		'https://api.twelvedata.com/time_series?symbol=HD,LLY,MA,PFE,ABBV,BAC,MRK&interval=1min&apikey=' + process.env.NEXT_PUBLIC_API_2,
		'https://api.twelvedata.com/time_series?symbol=AAPL,MSFT,AMZN,TSLA,UNH,GOOGL,XOM&interval=1min&apikey=' + process.env.NEXT_PUBLIC_API_3,
		'https://api.twelvedata.com/time_series?symbol=PEP,KO,COST,META,MCD,WMT,TMO&interval=1min&apikey=' + process.env.NEXT_PUBLIC_API_4,
		'https://api.twelvedata.com/time_series?symbol=CSCO,DIS,AVGO,WFC,COP,ABT,BMY&interval=1min&apikey=' + process.env.NEXT_PUBLIC_API_5,
		'https://api.twelvedata.com/time_series?symbol=ACN,DHR,VZ,NEE,LIN,CRM,TXN&interval=1min&apikey=' + process.env.NEXT_PUBLIC_API_6,
		'https://api.twelvedata.com/time_series?symbol=AMGN,RTX,HON,PM,ADBE,CMCSA,T&interval=1min&apikey=' + process.env.NEXT_PUBLIC_API_7,
	]

	let temp
	for (let i = 0; i < urls.length; i++) {
		temp = await fetch(urls[i])
		temp = await temp.json()
		stocks.push(temp)
	}
	return processData(stocks)
}

const companies = ['JNJ', 'GOOG', 'JPM', 'NVDA', 'CVX', 'V', 'PG', 'HD', 'LLY', 'MA', 'PFE', 'ABBV', 'BAC', 'MRK', 'AAPL', 'MSFT', 'AMZN', 'TSLA', 'UNH', 'GOOGL', 'XOM', 'PEP', 'KO', 'COST', 'META', 'MCD', 'WMT', 'TMO', 'CSCO', 'DIS', 'AVGO', 'WFC', 'COP', 'ABT', 'BMY', 'ACN', 'DHR', 'VZ', 'NEE', 'LIN', 'CRM', 'TXN', 'AMGN', 'RTX', 'HON', 'PM', 'ADBE', 'CMCSA', 'T']

export function processData(stocks) {
	var result = []

	for (let i = 0; i < 7; i++) {
		var batch = stocks[i]
		for (let j = 0; j < 7; j++) {
			var stock = Object.keys(batch)[j]
			if (companies.includes(stock)) {
				var data = {
					symbol: '',
					close: '',
				}
				data['symbol'] = batch[stock]['meta']['symbol']
				data['close'] = batch[stock]['values'][0]['close']
				result.push(data)
			}
		}
	}

	return result
}
