import styles from "./NotFound.module.scss"
import React from "react"

const NotFound = () => {
  return (
    <div className={styles.container}>
      <h1>404 Something went wrong...</h1>

      <p className={styles.description}>
        The list you’re looking for appears to be invalid, please check if
        you’ve typed it correctly.
      </p>

      <p className={styles.alternate}>
        Alternatively, <a href="/">return home. &#8617;</a>
      </p>
    </div>
  )
}

export default NotFound
