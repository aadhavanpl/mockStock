import React, { useEffect, useState } from 'react'

import { useGlobalContext } from '../lib/global-context'
import Navbar from '../components/common/Navbar'
import Loader from '../components/common/Loader'

import styles from '../components/buy.module.css'

export default function LeaderboardPage() {
	const { user, getUserInfo, userInfo } = useGlobalContext()

	const [dataResponse, setdataResponse] = useState([])
	const [loader, setLoader] = useState(false)

	useEffect(() => {
		if (!user || !user?.length) return
		getUserInfo({ user_email: user[0].email })
	}, [user])

	useEffect(() => {
		async function getPageData() {
			setLoader(true)
			const apiUrlEndpoint = 'https://www.mockstock.live/api/leaderboard-lib'
			const response = await fetch(apiUrlEndpoint)
			const res = await response.json()
			// console.log(res)
			setdataResponse(res.products)
			setLoader(false)
		}
		getPageData()
	}, [])

	return (
		<div className={styles['container']}>
			<Navbar>
				<div className={styles['balance-container']}>
					<div className={styles['balance-wrapper']}>
						Total Participants
						<div className={styles['money-wrapper']}>
							{dataResponse.length}
							<img src='/arrow-right.svg' className={styles['navbar-arrow']} />
						</div>
					</div>
				</div>
				<div className={styles['stock-container']}>
					<div className={styles['stock-heading-wrapper']}>
						<div className={styles['stock-rank']}>Rank</div>
						<div className={styles['stock-user-name']}>Name</div>
						<div className={styles['stock-user-email']}>Email</div>
						<div className={styles['stock-portfolio-worth']}>Net worth</div>
						{/* <div className={styles['stock-turnover']}>Turnover</div> */}
					</div>
					{dataResponse?.map((item, index) => (
						<div key={index}>
							{userInfo?.user_name == item?.user_name ?
								<div className={styles['stock-top-wrapper-highlight']} >
									<div className={styles['stock-rank']}>{index + 1}</div>
									<div className={styles['stock-user-name']}>{item?.user_name}</div>
									<div className={styles['stock-user-email']}>{item?.user_email}</div>
									<div className={styles['stock-portfolio-worth']}>${item?.net_worth}</div>
								</div> :
								<div className={styles['stock-top-wrapper']} >
									<div className={styles['stock-rank']}>{index + 1}</div>
									<div className={styles['stock-user-name']}>{item?.user_name}</div>
									<div className={styles['stock-user-email']}>{item?.user_email}</div>
									<div className={styles['stock-portfolio-worth']}>${item?.net_worth}</div>
								</div>}

						</div>
					))}
				</div>
			</Navbar>
			<Loader show={loader} />
		</div>
	)
}
