# mockStock

## What?

mockStock is a live stock market simulator.

1. Buy/Sell: Strategically strengthen your investment portfolio with a plethora of companies to choose from.
2. Portfolio: Managing stocks from our simple and intuitive portfolio management interface has never been easier.
3. Transactions: Keep track of your investments and check your balances as you grow your investment holdings.
4. Leaderboards: Compare your progress with other fellow amateur investors on their investment journey.

## Why?

The idea of the website is simple: Help people learn about the stock market in a safe environment without any loss of money. 

## Who?

The website is targeted towards anyone who is trying to get into the idea of investing into individual stocks, but is reluctant to do so in the real world. 

## How?

When a 'player' signs up,  they are given a fixed amount of in-game capital ($10,000) which they can utilise for transactions of stocks(Buy/Sell). The website has the top 49 stocks from the S&P 500 which the players will be able to buy/sell. The prices of the stocks are taken from an API ([twelvedata](https://twelvedata.com/)).

### Updating the stock prices

The project is currently running on the free-tier of twelvedata API, and they have a restriction on the number of API calls that can be done from one account per day. So we are utilising 7 API keys for fetching the latest prices of the stock. 

Due to the same API restrictions, we are unable to show the live stock data. We are able to fetch from the API every 15 minutes. 

## Future improvement

1. Optimization in SQL queries: Currently an obscene amount of connections are made every single time we fetch from the API as we are also sending that to the backend, to prevent multiple people from fetching the same data.
2. Responsive design: This is also an important part that has to be worked on since majority of the users will be accessing through a mobile phone.
3. Cloud hosting: Due to the backend and time issues, hosting was something we skipped out on for this prototype.

## Preview

![Home](https://github.com/aadhavanpl/mockStock/assets/73419501/57b650a0-cf32-4b44-bf02-cc250de9de4c)

![Buy](https://github.com/aadhavanpl/mockStock/assets/73419501/1be8fc25-7c1c-4b09-b5da-eb5a0aace981)

![Sell](https://github.com/aadhavanpl/mockStock/assets/73419501/29330aa5-b0cc-4825-802a-e059418868df)

## Contribution

Contribution of any kind is welcome and appreciated. 
