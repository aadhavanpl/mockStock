import React, { useEffect, useState } from 'react'
import { useRouter } from 'next/router'
import { motion } from 'framer-motion'

import { useGlobalContext } from '../lib/global-context'
import Navbar from '../components/common/Navbar'
import Modal from '../components/common/Modal'
import Loader from '../components/common/Loader'

import getData from '../pages/api/public-api'

import styles from '../components/buy.module.css'

export default function BuyPage() {
	const router = useRouter()
	const { user, getUserInfo, userInfo } = useGlobalContext()

	const [openTab, setopenTab] = useState('')
	const [quantity, setQuantity] = useState('')
	const [dataResponse, setdataResponse] = useState([])
	const [buttonPopupGreen, setButtonPopupGreen] = useState(false)
	const [buttonPopupRed, setButtonPopupRed] = useState(false)
	const [fetched, setFetched] = useState(null)
	const [changed, setChanged] = useState(false)
	const [loader, setLoader] = useState(false)

	useEffect(() => {
		if (!user || !user?.length) return
		getUserInfo({ user_email: user[0].email })
	}, [user])

	useEffect(() => {
		/* gets all the stocks from db */
		async function getFirstData() {
			setLoader(true)
			const apiUrlEndpoint = 'https://mockstock.aadhii.in/api/buy-lib'
			const response = await fetch(apiUrlEndpoint)
			const res = await response.json()
			setdataResponse(res.products)
			setLoader(false)
		}
		getFirstData()
	}, [])

	useEffect(() => {
		async function getApiData() {
			if (!dataResponse || !dataResponse.length) return

			setLoader(true)
			const date = new Date()
			let time = date.getTime()
			const minute = 1000 * 60
			let curr_time = Math.round(time / minute) //minutes
			const last_update_time = dataResponse[0]?.last_update //will be in minutes

			if (curr_time - last_update_time > 15) {
				const temp = await getData()
				setFetched(temp)
			}
			setLoader(false)
		}
		getApiData()
	}, [dataResponse])

	useEffect(() => {
		async function setFetchedData() {
			if (!dataResponse || !dataResponse.length) return

			setLoader(true)
			const date = new Date()
			let time = date.getTime()
			const minute = 1000 * 60
			let curr_time = Math.round(time / minute)
			const yest_time = dataResponse[0]?.yest_time

			/* convert all objects to one array */
			var fetchedData = []
			for (let i = 0; i < fetched?.length; i++) {
				fetchedData.push(Number(fetched[i].close))
				fetchedData.push(curr_time)
				fetchedData.push(fetched[i].symbol)
			}

			/* more than one day */
			if (curr_time - yest_time > 1440) {
				//get curr_price from database
				//put it as yest_price in database
				//update curr_price in database that we get from api
				//set last_update and yest_time as curr_time in database

				const curr_yest_price = []
				for (let i = 0; i < 48; i++) {
					curr_yest_price.push(dataResponse[i]?.curr_price)
					curr_yest_price.push(curr_time)
					curr_yest_price.push(dataResponse[i]?.stock_tag)
				}

				for (let i = 0; i < 51; i += 3) {
					console.log(curr_yest_price[i], curr_yest_price[i + 1], curr_yest_price[i + 2])
					const currApiYestUpdate = 'https://mockstock.aadhii.in/api/update-yest-lib'
					const currResponseYestResult = await fetch(currApiYestUpdate, {
						method: 'POST',
						body: JSON.stringify({
							data: [curr_yest_price[i], curr_yest_price[i + 1], curr_yest_price[i + 2]],
						}),
						headers: {
							'Content-Type': 'application/json',
							'Access-Control-Allow-Origin': 'https://mockstock.aadhii.in/'
						},
					})
					await currResponseYestResult.json()
				}

				for (let i = 51; i < 102; i += 3) {
					console.log(curr_yest_price[i], curr_yest_price[i + 1], curr_yest_price[i + 2])
					const currApiYestUpdate = 'https://mockstock.aadhii.in/api/update-yest-lib'
					const currResponseYestResult = await fetch(currApiYestUpdate, {
						method: 'POST',
						body: JSON.stringify({
							data: [curr_yest_price[i], curr_yest_price[i + 1], curr_yest_price[i + 2]],
						}),
						headers: {
							'Content-Type': 'application/json',
							'Access-Control-Allow-Origin': 'https://mockstock.aadhii.in/'
						},
					})
					await currResponseYestResult.json()
				}

				for (let i = 102; i < 144; i += 3) {
					// console.log(curr_yest_price[i], curr_yest_price[i + 1], curr_yest_price[i + 2])
					const currApiYestUpdate = 'https://mockstock.aadhii.in/api/update-yest-lib'
					const currResponseYestResult = await fetch(currApiYestUpdate, {
						method: 'POST',
						body: JSON.stringify({
							data: [curr_yest_price[i], curr_yest_price[i + 1], curr_yest_price[i + 2]],
						}),
						headers: {
							'Content-Type': 'application/json',
							'Access-Control-Allow-Origin': 'https://mockstock.aadhii.in/'
						},
					})
					await currResponseYestResult.json()
				}
			}

			for (let i = 0; i < 51; i += 3) {
				// console.log(fetchedData[i], fetchedData[i + 1], fetchedData[i + 2])
				const currApiResultUpdate = 'https://mockstock.aadhii.in/api/update-curr-lib'
				const currResponseResult = await fetch(currApiResultUpdate, {
					method: 'POST',
					body: JSON.stringify({ data: [fetchedData[i], fetchedData[i + 1], fetchedData[i + 2]] }),
					headers: {
						'Content-Type': 'application/json',
						'Access-Control-Allow-Origin': 'https://mockstock.aadhii.in/'
					},
				})
				await currResponseResult.json()
			}

			for (let i = 51; i < 102; i += 3) {
				// console.log(fetchedData[i], fetchedData[i + 1], fetchedData[i + 2])
				const currApiResultUpdate = 'https://mockstock.aadhii.in/api/update-curr-lib'
				const currResponseResult = await fetch(currApiResultUpdate, {
					method: 'POST',
					body: JSON.stringify({ data: [fetchedData[i], fetchedData[i + 1], fetchedData[i + 2]] }),
					headers: {
						'Content-Type': 'application/json',
						'Access-Control-Allow-Origin': 'https://mockstock.aadhii.in/'
					},
				})
				await currResponseResult.json()
			}

			for (let i = 102; i < 147; i += 3) {
				// console.log(fetchedData[i], fetchedData[i + 1], fetchedData[i + 2])
				const currApiResultUpdate = 'https://mockstock.aadhii.in/api/update-curr-lib'
				const currResponseResult = await fetch(currApiResultUpdate, {
					method: 'POST',
					body: JSON.stringify({ data: [fetchedData[i], fetchedData[i + 1], fetchedData[i + 2]] }),
					headers: {
						'Content-Type': 'application/json',
						'Access-Control-Allow-Origin': 'https://mockstock.aadhii.in/'
					},
				})
				await currResponseResult.json()
			}

			const apiUrlPercentage = 'https://mockstock.aadhii.in/api/update-percentage-lib'
			const responsePercentage = await fetch(apiUrlPercentage)
			const resPercentage = await responsePercentage.json()
			setLoader(false)
		}
		setChanged(true)
		setFetchedData()
	}, [fetched])

	useEffect(() => {
		async function getFirstData() {
			setLoader(true)
			const apiUrlEndpoint = 'https://mockstock.aadhii.in/api/buy-lib'
			const response = await fetch(apiUrlEndpoint)
			const res = await response.json()
			setdataResponse(res.products)
			setLoader(false)
		}
		getFirstData()
	}, [changed])

	const buyStocks = async (data) => {
		const apiUrlEndpoint = 'https://mockstock.aadhii.in/api/buy-lib'
		const response = await fetch(apiUrlEndpoint, {
			method: 'POST',
			body: JSON.stringify({ data }),
			headers: {
				'Content-Type': 'application/json',
				'Access-Control-Allow-Origin': 'https://mockstock.aadhii.in/'
			},
		})
		await response.json()
		const apiUpdateBalance = 'https://mockstock.aadhii.in/api/update-balance-lib'
		const responseBalance = await fetch(apiUpdateBalance)
		const resBalance = await responseBalance.json()
		getUserInfo({ user_email: user[0].email })
	}

	function calcInc(item) {
		if (item.yest_price > item.curr_price) return 0
		return 1
	}

	return (
		<div className={styles['container']}>

			<Navbar>
				<div className={styles['balance-container']}>
					<div className={styles['balance-wrapper']}>
						Your Balance
						<div className={styles['money-wrapper']}>
							${userInfo?.balance}
							<img src='/arrow-right.svg' className={styles['navbar-arrow']} />
						</div>
					</div>
				</div>
				<div className={styles['stock-container']}>
					<div className={styles['stock-heading-wrapper']}>
						<div className={styles['stock-name-wrapper']}>Stock</div>
						<div className={styles['stock-value']}>Price</div>
						<div className={styles['stock-percentage-wrapper']}>% Change</div>
						<div className={styles['stock-market-cap']}>Market cap</div>
						<div className={styles['stock-more']}>More</div>
					</div>
					{dataResponse?.map((item) => (
						<div className={styles['stock-wrapper']} key={item.stock_tag}>
							<div
								className={`${styles['stock-top-wrapper']}  ${openTab == item.stock_tag ? styles['show'] : ''
									}`}
								onClick={() => {
									if (openTab == item.stock_tag) setopenTab('')
									else setopenTab(item.stock_tag)
								}}
							>
								<div className={styles['stock-name-wrapper']}>
									<div className={styles['stock-name']}>{item.stock_name}</div>
									<span>{item.stock_tag}</span>
								</div>
								<div className={styles['stock-value']}>${item.curr_price}</div>
								{item.percentage_change >= 0 && (
									<div className={styles['stock-percentage-wrapper']}>
										<img src='/green-arrow.svg' />
										<span className={styles['stock-percentage-inc']}>
											%{item.percentage_change}
										</span>
									</div>
								)}
								{item.percentage_change < 0 && (
									<div className={styles['stock-percentage-wrapper']}>
										<img src='/red-arrow.svg' />
										<span className={styles['stock-percentage-dec']}>
											%{item.percentage_change * -1}
										</span>
									</div>
								)}
								<div className={styles['stock-market-cap']}>${item.market_cap}</div>
								<div className={styles['stock-more']}>
									<img src='/arrow-down.svg' />
								</div>
							</div>

							<motion.div
								className={styles['stock-bottom-wrapper']}
								initial={{
									opacity: 0,
									height: 0,
								}}
								animate={{
									opacity: openTab == item.stock_tag ? 1 : 0,
									height: openTab == item.stock_tag ? 'auto' : 0,
								}}
							>
								<div className={styles['input-container']}>
									<div className={styles['input-wrapper']}>
										<label>Quantity</label>
										<input
											id={item.stock_tag}
											value={quantity}
											onChange={(e) => setQuantity(e.target.value)}
											placeholder='Enter number of shares'
											type='number'
											min={0}
										/>
									</div>
								</div>
								<div className={styles['total-wrapper']}>
									Total
									<span>${parseFloat(quantity * item.curr_price).toFixed(3)}</span>
								</div>
								<div
									className={styles['buy-btn']}
									onClick={() => {
										if (quantity * item.curr_price > userInfo?.balance || quantity <= 0) {
											setButtonPopupRed(true)
										} else {
											buyStocks({
												user_email: user?.length && user[0]?.email,
												stock_tag: item.stock_tag,
												shares_transacted: parseInt(quantity),
												curr_price: item.curr_price,
											})
											setButtonPopupGreen(true)
										}
										setTimeout(() => {
											router.reload(window.location.pathname)
										}, 2500)
									}}
								>
									<span>Buy</span>
									<img src='/arrow-right.svg' className={styles['arrow']} />
								</div>
							</motion.div>
						</div>
					))}
				</div>
			</Navbar>
			<Modal
				trigger={buttonPopupGreen}
				setTrigger={setButtonPopupGreen}
				heading='Payment Successful'
				info='Shares have been added to your portfolio.'
				color='green'
			/>
			<Modal
				trigger={buttonPopupRed}
				setTrigger={setButtonPopupRed}
				heading='Payment Failed'
				info='Error! Insufficient funds. Try again later.'
				color='red'
			/>
			<Loader show={loader} content={true} />
		</div>
	)
}
