import React from "react"
import styles from "./AddLink.module.scss"

const AddLink = () => {
  return (
    <div className={styles.linkInputContainer}>
      <input type="text" placeholder="enter nft link" />
      <button>+</button>
    </div>
  )
}

export default AddLink
