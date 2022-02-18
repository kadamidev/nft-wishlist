import React, { useState } from "react"
import styles from "./App.module.scss"
import logo from "./img/logo.svg"

function App() {
  const [listId, setListId] = useState<string>("")

  const handleJoin = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    //query api for list id and redirect if successful
  }

  return (
    <div className={styles.container}>
      <img src={logo} alt="NFT Wishlist Logo" className={styles.logo} />

      <div className={styles.menuContainer}>
        <button className={styles.createListBtn}>CREATE NEW LIST</button>

        <div className={styles.recentsContainer}>
          <span>Recently Visited</span>
          <ul>
            <li>12345</li>
            <li>67891</li>
            <li>112134</li>
          </ul>
        </div>
        <form className={styles.joinForm} onSubmit={(e) => handleJoin(e)}>
          <input
            type="text"
            placeholder="enter list id"
            value={listId}
            onChange={(e) => setListId(e.target.value)}
          />
          <button type="submit">JOIN</button>
        </form>
      </div>
    </div>
  )
}

export default App
