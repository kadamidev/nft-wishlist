import React, { useEffect, useState } from "react"
import styles from "./App.module.scss"
import logo from "./img/logo.svg"
import { useNavigate } from "react-router-dom"
import useLocalStorage from "./utils/useLocalStorage"

function App() {
  const [listId, setListId] = useState<string>("")
  const [listInputPlaceholder, setListInputPlaceholder] =
    useState<string>("enter list id")
  const [recentsList, setRecentsList] = useLocalStorage<string[]>("recents", [])
  const navigate = useNavigate()

  function addToRecents(id: string) {
    const newRecents = [...recentsList]
    const existsIdx = recentsList.findIndex((el) => el === id)
    if (existsIdx !== -1) newRecents.splice(existsIdx, 1)

    newRecents.unshift(id)
    setRecentsList(newRecents)
    console.log(recentsList)
  }

  const handleJoin = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()

    let url = `/api/list/${listId}`

    const res = await fetch(url)
    if (res.ok) {
      const list = await res.json()
      addToRecents(list.listId)
      setListId("")
      navigate(`/list/${list.listId}`)
    } else {
      setListInputPlaceholder("invalid list id")
      setListId("")
    }
  }

  const handleNewList = async () => {
    let url = `/api/list`

    const res = await fetch(url, {
      method: "POST",
    })
    const newList = await res.json()
    addToRecents(newList.listId)
    navigate(`/list/${newList.listId}`)
  }

  return (
    <div className={styles.container}>
      <img src={logo} alt="NFT Wishlist Logo" className={styles.logo} />

      <div className={styles.menuContainer}>
        <button className={styles.createListBtn} onClick={handleNewList}>
          CREATE NEW LIST
        </button>

        <div className={styles.recentsContainer}>
          <div className={styles.recentsHeaders}>
            <span>Recently Visited</span>
            <span className={styles.clear} onClick={() => setRecentsList([])}>
              Clear
            </span>
          </div>
          <ul>
            {recentsList.map((id) => (
              <li onClick={() => navigate(`/list/${id}`)}>{id}</li>
            ))}
          </ul>
        </div>
        <form className={styles.joinForm} onSubmit={(e) => handleJoin(e)}>
          <input
            type="text"
            placeholder={listInputPlaceholder}
            value={listId}
            onChange={(e) => setListId(e.target.value)}
            onClick={() => {
              setListInputPlaceholder("enter list id")
            }}
          />
          <button type="submit">JOIN</button>
        </form>
      </div>
    </div>
  )
}

export default App
