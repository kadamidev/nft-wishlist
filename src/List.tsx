import React, { useEffect, useState } from "react"
import styles from "./List.module.scss"
import Navbar from "./components/Navbar/Navbar"
import AddLink from "./components/AddLink/AddLink"
import Card from "./components/Card/Card"
import { useLocation } from "react-router-dom"

export interface IItem {
  tokenId: string
  contract: string
  _id?: string
}

export const hardcodedItems = [
  {
    contract: "loading",
    tokenId: "1111",
  },
]

const List = () => {
  const [items, setItems] = useState<IItem[]>(hardcodedItems)
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
          {items.map((item, index) => {
            return (
              <Card
                key={item.contract + item.tokenId + index}
                item={item}
                listId={listId}
                items={items}
                setItems={setItems}
              />
            )
          })}
        </ul>
      </main>
    </div>
  )
}

export default List
