import React, { useEffect, useState } from 'react'
import { motion } from 'framer-motion'

import { useGlobalContext } from '../lib/global-context'
import Navbar from '../components/common/Navbar'
import Loader from '../components/common/Loader'

import styles from '../components/buy.module.css'

export default function TansactionsPage() {
	const { user, getUserInfo, userInfo } = useGlobalContext()

	const [openTab, setopenTab] = useState('')
	const [dataResponse, setdataResponse] = useState([])
	const [loader, setLoader] = useState(false)

	useEffect(() => {
		if (!user || !user?.length) return
		getUserInfo({ user_email: user[0].email })
	}, [user])

	useEffect(() => {
		if (!user || !user?.length) return
		async function getPageData() {
			setLoader(true)
			const data = { user_email: user[0]?.email }
			const apiUrlEndpoint = 'https://mockstock.aadhii.in/api/transactions-lib'
			const response = await fetch(apiUrlEndpoint, {
				method: 'POST',
				body: JSON.stringify({ data }),
				headers: {
					'Content-Type': 'application/json',
				},
			})
			const res = await response.json()
			setdataResponse(res.products)
			setLoader(false)
		}
		getPageData()
	}, [user])

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
				</div>
				<div className={styles['stock-container']}>
					<div className={styles['stock-heading-wrapper']}>
						<div className={styles['stock-trans-number']}>T No.</div>
						<div className={styles['stock-name-wrapper']}>Stock</div>
						<div className={styles['stock-value']}>Share price</div>
						<div className={styles['stock-shares-owned']}>Quantity</div>
						<div className={styles['stock-amount-spent']}>Trans price</div>
						<div className={styles['stock-more']}>More</div>
					</div>
					{dataResponse?.map((item, index) => (
						<div className={styles['stock-wrapper']} key={index + 1}>
							<div
								className={`${styles['stock-top-wrapper']}  ${openTab == item.stock_tag ? styles['show'] : ''
									} ${item.t_qty > 0 ? styles['buy'] : styles['sell']}`}
								onClick={() => {
									if (openTab == item.stock_tag) setopenTab('')
									else setopenTab(item.stock_tag)
								}}
							>
								<div className={`${styles['stock-trans-number']}`}>{index + 1}</div>
								<div className={styles['stock-name-wrapper']}>
									<div className={styles['stock-name']}>{item.stock_name}</div>
									<span>{item.stock_tag}</span>
								</div>
								<div className={styles['stock-value']}>{item.share_price}</div>
								{item.t_qty >= 0 && (
									<div className={styles['stock-shares-owned']}>{item.t_qty}</div>
								)}
								{item.t_qty < 0 && (
									<div className={styles['stock-shares-owned']}>{item.t_qty * -1}</div>
								)}
								{item.total_price >= 0 && (
									<div className={styles['stock-amount-spent']}>-${item.total_price}</div>
								)}
								{item.total_price < 0 && (
									<div className={styles['stock-amount-spent']}>+${item.total_price * -1}</div>
								)}

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
								<div className={styles['trans-wrapper']}>
									Transaction date
									<span className={styles['trans-date']}>{item.trans_date.slice(0, 10)}</span>
									{/* <span>{item.total_available}</span> */}
								</div>
								<div className={styles['trans-wrapper']}>
									Transaction time
									<span className={styles['trans-date']}>{item.trans_time}</span>
									{/* <span>{item.total_available}</span> */}
								</div>
							</motion.div>
						</div>
					))}
				</div>
			</Navbar>
			<Loader show={loader} />
		</div>
	)
}
