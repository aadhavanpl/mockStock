import { AnimatePresence, motion } from 'framer-motion'
import { GlobalContextWrapper } from '../lib/global-context'

import '../styles/variables.css'
import '../styles/globals.css'

import '../assets/fonts/IBMPlexSans/stylesheet.css'

import '../firebase-config'

import { useRouter } from 'next/router'
import Head from 'next/head'

function MyApp({ Component, pageProps }) {
	const router = useRouter()

	return (
		<>
			<Head>
				<title>mockStock</title>
				<meta name='Mock stock' content="Mock Stock is a real-time stock market simulator." />
				<link rel='icon' href='/favicon.ico' type="image/x-icon" />
			</Head>
			<GlobalContextWrapper>
				<AnimatePresence>
					<motion.div key={router.pathname} initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
						<Component {...pageProps} />
					</motion.div>
				</AnimatePresence>
			</GlobalContextWrapper>
		</>
	)
}

export default MyApp
