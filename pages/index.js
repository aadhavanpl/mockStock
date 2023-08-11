import { useEffect } from 'react'
import { useRouter } from 'next/router'
import { useGlobalContext } from '../lib/global-context'
import styles from '../components/home.module.css'

export default function HomePage() {
	const { signIn, user } = useGlobalContext()
	const router = useRouter()

	useEffect(() => {
		if (!user || !user?.length) return
		router.push('/buy')
	}, [user])

	return (
		<div className={styles['container']}>
			<div className={styles['header']}>
				<div className={styles['navs']}>
					<span>About</span>
					<span>Contact</span>
				</div>
				<img src='/home-logo.svg' className={styles['logo']} />
				<div className={styles['button-wrapper']}>
					<button className={styles['signin']} onClick={signIn}>
						Sign In
					</button>
				</div>
			</div>
			<div className={styles['main']}>
				<h1>Trade without fear.</h1>
				<span>
					New to trading? You&apos;ve come to the right place. Mock Stock is a real-time stock
					market simulator.
				</span>
				<div className={styles['buttons']}>
					<button className={styles['get-started']} onClick={signIn}>Get Started</button>
					<button className={styles['arrow-wrapper']}>
						<img src='/home-arrow.svg' className={styles['arrow']} />
					</button>
				</div>
			</div>
			<img src='/home-footer.svg' className={styles['footer']} />
		</div>
	)
}
