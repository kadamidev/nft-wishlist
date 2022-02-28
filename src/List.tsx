import React, { useState } from "react"
import styles from "./List.module.scss"
import Navbar from "./components/Navbar/Navbar"
import AddLink from "./components/AddLink/AddLink"
import Card from "./components/Card/Card"

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

  return (
    <div className={styles.container}>
      <nav>
        <Navbar code={"12345"} />
      </nav>
      <main>
        <AddLink />

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
