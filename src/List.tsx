import { useEffect, useState, useContext } from "react"
import styles from "./List.module.scss"
import Navbar from "./components/Navbar/Navbar"
import AddLink from "./components/AddLink/AddLink"
import Card from "./components/Card/Card"
import { useLocation } from "react-router-dom"
import AuthBtn from "./components/AuthBtn/AuthBtn"
import AuthMenu from "./components/AuthMenu/AuthMenu"
import { SessionContext, ISessionContext } from "./SessionContext"
import NotFound from "./components/NotFound/NotFound"

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
  const [showAuthMenu, setShowAuthMenu] = useState<boolean>(false)
  const [show404, setShow404] = useState<boolean>(false)

  const { setLocalSession, session } =
    useContext<ISessionContext>(SessionContext)

  const location = useLocation()
  const listId = location.pathname.split("/")[2]

  useEffect(() => {
    const fetchItems = async () => {
      let url = `/api/list/${listId}`

      const res = await fetch(url)
      if (!res.ok) {
        setShow404(true)
        return
      }
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
        {((locked && session.status) || (!locked && !show404)) && (
          <AddLink listId={listId} items={items} setItems={setItems} />
        )}

        <ul className={styles.cardsGrid}>
          {items.map((item, index) => {
            return (
              <Card
                reactKey={item.contract + item.tokenId + index}
                key={item.contract + item.tokenId + index}
                item={item}
                listId={listId}
                items={items}
                setItems={setItems}
                locked={locked}
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

        {!show404 && (
          <div
            className={styles.authBtnWrapper}
            onClick={() => setShowAuthMenu(!showAuthMenu)}
          >
            <AuthBtn locked={locked} />
          </div>
        )}

        {show404 && (
          <div className={[styles.authMenuWrapper, styles.show].join(" ")}>
            <NotFound />
          </div>
        )}
      </main>
    </div>
  )
}

export default List
