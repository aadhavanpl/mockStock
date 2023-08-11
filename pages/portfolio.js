import React, { useEffect, useState } from 'react'

import { useGlobalContext } from '../lib/global-context'
import Navbar from '../components/common/Navbar'
import Loader from '../components/common/Loader'

import styles from '../components/buy.module.css'

export default function PortfolioPage() {
	const { user, getUserInfo, userInfo } = useGlobalContext()

	const [openTab, setopenTab] = useState('')
	const [dataResponse, setdataResponse] = useState([])
	const [netTurnover, setNetTurnover] = useState(null)
	const [loader, setLoader] = useState(false)


	useEffect(() => {
		if (!user || !user?.length) return
		getUserInfo({ user_email: user[0].email })
	}, [user])

	useEffect(() => {
		if (!user || !user?.length) return
		async function getPageData() {
			setLoader(true)
			const data = { user_email: user[0]?.email, user_emai: user[0]?.email }
			const apiUrlEndpoint = 'http://localhost:3000/api/portfolio-lib'
			const response = await fetch(apiUrlEndpoint, {
				method: 'POST',
				body: JSON.stringify({ data }),
				headers: {
					'Content-Type': 'application/json',
				},
			})
			const res = await response.json()
			// console.log(res.products)
			setdataResponse(res.products)
			setLoader(false)
		}
		getPageData()
	}, [user])

	useEffect(() => {
		var net = 0
		dataResponse.map((item) => {
			if (item.quantity > 0) {
				net += parseFloat(item.turnover)
			}
		})
		setNetTurnover(net.toFixed(3))
	}, [dataResponse])

	return (
		<div className={styles['container']}>
			<Navbar>
				<div className={styles['balance-container']}>
					<div className={styles['balance-wrapper']}>
						Your Balance
						<div className={styles['money-wrapper']}>
							${userInfo.balance}
							<img src='/arrow-right.svg' className={styles['navbar-arrow']} />
						</div>
					</div>
					{/* <div className={styles['balance-wrapper']}>
						Net Worth
						<div className={styles['money-wrapper']}>
							${userInfo.balance}
							<img src='/arrow-right.svg' />
						</div>
					</div> */}
					{netTurnover < 0 && (
						<div className={styles['balance-wrapper']} style={{ color: 'var(--red)' }}>
							<span style={{ color: "#94252d" }}>Net Turnover</span>
							<div className={styles['money-wrapper']} style={{ color: 'var(--red)' }}>
								-${netTurnover * -1}
								<img src='/arrow-right.svg' className={styles['navbar-arrow']} />
							</div>
						</div>
					)}
					{netTurnover >= 0 && (
						<div className={styles['balance-wrapper']} style={{ color: 'var(--green)' }}>
							<span style={{ color: "#0f9855" }}>Net Turnover</span>
							<div className={styles['money-wrapper']} style={{ color: 'var(--green)' }}>
								+${netTurnover}
								<img src='/arrow-right.svg' className={styles['navbar-arrow']} />
							</div>
						</div>
					)}
				</div>
				<div className={styles['stock-container']}>
					<div className={styles['stock-heading-wrapper']}>
						<div className={styles['stock-name-wrapper']}>Stock</div>
						<div className={styles['stock-shares-owned']}>Shares owned</div>
						{/* <div className={styles['stock-amount-spent']}>Net Debit</div> */}
						<div className={styles['stock-total-worth']}>Curr. value</div>
						<div className={styles['stock-turnover']}>Turnover</div>
					</div>
					{dataResponse?.map((item, index) => (
						<div key={index}>
							{item.quantity > 0 && (
								<div className={styles['stock-wrapper']}>
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
										<div className={styles['stock-shares-owned']}>{item.quantity}</div>
										{/* <div className={styles['stock-amount-spent']}>${item.amount_spent}</div> */}
										<div className={styles['stock-total-worth']}>${item.curr_total_price}</div>
										{item.turnover < 0 ? (
											<div className={styles['stock-turnover']} style={{ color: 'var(--red)' }}>
												-${item.turnover * -1}
											</div>
										) : (
											<div className={styles['stock-turnover']} style={{ color: 'var(--green)' }}>
												+${item.turnover}
											</div>
										)}
									</div>
								</div>
							)}
						</div>
					))}
				</div>
			</Navbar>
			<Loader show={loader} />
		</div>
	)
}
