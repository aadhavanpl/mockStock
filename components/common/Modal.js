import { useEffect } from 'react'

import styles from './modal.module.css'

export default function Modal({ trigger, setTrigger, heading, info, color }) {
	return (
		<>
			{trigger && (
				<div
					className={styles['container']}
				// onClick={() => setTrigger(false)}
				>
					<div className={styles['wrapper']}>
						{color == 'green' && (
							<div className={`${styles['svg']} ${styles[color]}`}>
								<img src='/tick.svg' />
							</div>
						)}
						{color == 'red' && (
							<div className={`${styles['svg']} ${styles[color]}`}>
								<img src='/x.svg' />
							</div>
						)}
						<div className={`${styles['color-line']} ${styles[color]}`}></div>
						<h1>{heading}</h1>
						<h3>{info}</h3>
						<span>You will be redirected shortly</span>
					</div>
				</div>
			)}
		</>
	)
}
