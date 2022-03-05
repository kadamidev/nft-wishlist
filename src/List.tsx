import React, { useEffect, useState } from "react"
import styles from "./List.module.scss"
import Navbar from "./components/Navbar/Navbar"
import AddLink from "./components/AddLink/AddLink"
import Card from "./components/Card/Card"
import { useLocation } from "react-router-dom"

export interface Item {
  tokenId: number
  contract: string
}

export const hardcodedItems = [
  {
    contract: "loading",
    tokenId: 1111,
  },
]

const List = () => {
  const [items, setItems] = useState<Item[]>(hardcodedItems)
  const location = useLocation()
  const listId = location.pathname.split("/")[2]

  useEffect(() => {
    const fetchItems = async () => {
      let domain = window.location.origin.split(":")[1]
      let port = 3001
      let url = `http://${domain}:${port}/api/list/${listId}`

      const res = await fetch(url)
      const list = await res.json()
      console.log(list)
      setItems(list.items)
    }
    fetchItems()
  }, [])

  return (
    <div className={styles.container}>
      <nav>
        <Navbar code={"12345"} />
      </nav>
      <main>
        <AddLink listId={listId} items={items} setItems={setItems} />

        <ul className={styles.cardsGrid}>
          {items.map((item) => {
            return <Card key={item.contract + item.tokenId} item={item} />
          })}
        </ul>
      </main>
    </div>
  )
}

export default List
