import React from 'react'

export default function about() {
  return (
    <div className={styles['learn-more']} id='learn-more'>
      <div className={styles['learn-more-heading-wrapper']}>
        <div className={styles['learn-more-heading']}>
          <img src='/trending-up.svg' />
          <h2>About Mock Stock</h2>
          <img src='/trending-down.svg' />
        </div>
        <div className={styles['learn-more-line']}></div>
      </div>
      <div className={styles['learn-more-content-wrapper']}>
        <div className={styles['learn-more-card']}>
          <img src='/shopping-cart.svg' />
          <span>Buy/Sell</span>Strategically strengthen your investment portfolio with a
          plethora of companies to choose from.{' '}
        </div>
        <div className={styles['learn-more-card']}>
          <img src='/file-text.svg' />
          <span>Portfolio</span>Managing stocks from our simple and intuitive portfolio
          management interface has never been easier.{' '}
        </div>
        <div className={styles['learn-more-card']}>
          <img src='/dollar-sign.svg' />
          <span>Transactions</span>Keep track of your investments and check your balances as you
          grow your investment holdings.{' '}
        </div>
        <div className={styles['learn-more-card']}>
          <img src='/users.svg' />
          <span>Leaderboards</span>Compare your progress with other fellow amateur investors on
          their investment journey.{' '}
        </div>
      </div>
    </div>
  )
}
