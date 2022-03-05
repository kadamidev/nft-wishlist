import React from "react"
import styles from "./AddLink.module.scss"

interface Props {
  listId: string
}

const AddLink = ({ listId }: Props) => {
  async function handleAddItem() {
    //extract contract and token id from link
    //fetch from opensea and check validity
    //update optimistically if valid
    //persist to db
  }

  return (
    <div className={styles.linkInputContainer}>
      <input type="text" placeholder="enter nft link" />
      <button>+</button>
    </div>
  )
}

export default AddLink
