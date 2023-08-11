import React, { useEffect, useState } from 'react'
import { useRouter } from 'next/router'
import Image from 'next/image'
import Link from 'next/link'

import { userAccessToken } from '../../lib/utils/fetchUserDetails'
import { useGlobalContext } from '../../lib/global-context'
import logo from '../../public/new-logo.svg'

import styles from './navbar.module.css'

export default function Navbar({ children }) {
	const { user, signOut } = useGlobalContext()
	const router = useRouter()

	var [date, setDate] = useState(new Date())
	const [market, setMarket] = useState('')

	useEffect(() => {
		const accessToken = userAccessToken()
		if (!accessToken)
			router.push('/')
	}, [])

	useEffect(() => {
		var timer = setInterval(() => setDate(new Date()), 1000)
		return function cleanup() {
			clearInterval(timer)
		}
	})

	useEffect(() => {
		const nyTime = date.toLocaleTimeString('en-US', { hour12: false, timeZone: 'America/New_York' });
		const day = date.getDay();
		if (day == 0 || day == 6 || nyTime < '09:30:00' || nyTime > '16:00:00') setMarket('Closed')
		else setMarket('Open')
	}, [])

	return (
		<div className={styles['container']}>
			<div className={styles['left-wrapper']}>
				<Link href='/'>
					<div className={styles['left-heading-wrapper']}>
						<Image src={logo} height={51} width={51} />
						<span>mockStock</span>
					</div>
				</Link>
				<div className={styles['left-link-wrapper']}>
					{user?.length && (
						<>
							<Link href='/buy'>
								<div className={router.route === '/buy' ? styles['left-link-active'] : styles['left-link']}>
									<img src='/new-buy.svg' />
									<span>Buy</span>
								</div>
							</Link>
							<Link href='/sell'>
								<div className={router.route === '/sell' ? styles['left-link-active'] : styles['left-link']}>
									<img src='/new-sell.svg' />
									<span>Sell</span>
								</div>
							</Link>
							<Link href='/portfolio'>
								<div className={router.route === '/portfolio' ? styles['left-link-active'] : styles['left-link']}>
									<img src='/new-portfolio.svg' />
									<span>Portfolio</span>
								</div>
							</Link>
							<Link href='/transactions' >
								<div className={router.route === '/transactions' ? styles['left-link-active'] : styles['left-link']}>
									<img src='/new-transactions.svg' />
									<span>Transactions</span>
								</div>
							</Link>
							<Link href='/leaderboard' >
								<div className={router.route === '/leaderboard' ? styles['left-link-active'] : styles['left-link']}>
									<img src='/new-leaderboard.svg' />
									<span>Leaderboard</span>
								</div>
							</Link>
						</>
					)}
					<div className={styles['left-link']} style={{ marginTop: 'auto' }} onClick={signOut}>
						<img src='/new-logout.svg' />
						<span>Log out</span>
					</div>
				</div>
			</div>
			<div className={styles['right-wrapper']}>
				<div className={styles['right-top-wrapper']}>
					<div className={styles['right-top-date-wrapper']}>
						<div suppressHydrationWarning className={styles['right-top-date']}><span>Date:</span> {date.toLocaleDateString()}</div>
						<div suppressHydrationWarning className={styles['right-top-date']}><span>Time:</span> {date.toLocaleTimeString('en-US', { hour12: false })}</div>
						<div className={`${styles['market-status']} ${styles[market]}`}>
							<div className={styles['status']}>
								<span>Market: </span>
								{market}
							</div>
							{market === 'Open' ? <img src='/new-open.svg' /> : <img src='/new-closed.svg' />}
						</div>
					</div>
					<div className={styles['right-top-user']}>
						<div className={styles['right-top-text-wrapper']}>
							{user?.length && user[0]?.displayName}
							<span>{user?.length && user[0]?.email}</span>
						</div>
						<Link href='/portfolio'>
							<img src={user?.length && user[0]?.photoURL} />
						</Link>
					</div>
				</div>
				{children}
			</div>
		</div >
	)
}
