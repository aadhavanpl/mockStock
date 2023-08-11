import React from 'react'

import styles from './loader.module.css'

export default function Loader({ show, content }) {
  return (
    <>
      {show && (
        <div className={styles['loader']}>
          <span></span>
          {content && <>This might take a minute...</>}
        </div>
      )}
    </>
  )
}
