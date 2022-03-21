import { useEffect, useState, useContext } from "react"
import styles from "./List.module.scss"
import Navbar from "./components/Navbar/Navbar"
import AddLink from "./components/AddLink/AddLink"
import Card from "./components/Card/Card"
import { useLocation } from "react-router-dom"
import AuthBtn from "./components/AuthBtn/AuthBtn"
import AuthMenu from "./components/AuthMenu/AuthMenu"
import { SessionContext, ISessionContext } from "./SessionContext"

export interface IItem {
  tokenId: string
  contract: string
  _id?: string
}

export interface ISession {
  status: boolean
  list_id: string | null
}

export const hardcodedItems = [
  {
    contract: "loading",
    tokenId: "1111",
  },
]

const List = () => {
  const [items, setItems] = useState<IItem[]>(hardcodedItems)
  const [locked, setLocked] = useState<boolean>(false)
  const { setLocalSession } = useContext<ISessionContext>(SessionContext)

  const [showAuthMenu, setShowAuthMenu] = useState<boolean>(false)

  const location = useLocation()
  const listId = location.pathname.split("/")[2]

  useEffect(() => {
    const fetchItems = async () => {
      let url = `/api/list/${listId}`

      const res = await fetch(url)
      const list = await res.json()
      console.log(list)
      setLocked(list.password)
      setItems(list.items)
      setLocalSession(list.authed, list._id)
    }
    fetchItems()
  }, [listId])

  return (
    <div className={styles.container}>
      <nav>
        <Navbar code={listId} />
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

        <div
          className={
            showAuthMenu
              ? [styles.authMenuWrapper, styles.show].join(" ")
              : styles.authMenuWrapper
          }
        >
          <AuthMenu
            locked={locked}
            listId={listId}
            setLocked={setLocked}
            setShowAuthMenu={setShowAuthMenu}
          />
        </div>

        <div
          className={styles.authBtnWrapper}
          onClick={() => setShowAuthMenu(!showAuthMenu)}
        >
          <AuthBtn locked={locked} />
        </div>
      </main>
    </div>
  )
}

export default List
