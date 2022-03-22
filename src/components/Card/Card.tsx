import React, { useEffect, useState, useContext } from "react"
import styles from "./Card.module.scss"
import trashSvg from "../../assets/trash.svg"
import osSvg from "../../assets/os.svg"
import { IItem } from "../../List"
import leanAsset, { IAsset } from "../../utils/leanAsset"
import { SessionContext, ISessionContext } from "../../SessionContext"

interface Props {
  item: IItem
  listId: string
  items: IItem[]
  setItems: React.Dispatch<React.SetStateAction<IItem[]>>
  reactKey: string
  locked: boolean
}

const Card: React.FC<Props> = ({
  item,
  listId,
  items,
  setItems,
  reactKey,
  locked,
}) => {
  const [asset, setAsset] = useState<IAsset>({
    name: "loading",
    collection: { name: "loading" },
    image_url: "loading",
  })

  const { session } = useContext<ISessionContext>(SessionContext)

  //load asset from cache if exists else fetch
  useEffect(() => {
    const cached = window.localStorage.getItem(
      `${item.contract}/${item.tokenId}`
    )

    if (cached) {
      setAsset(JSON.parse(cached))
    } else if (item.contract !== "loading") {
      fetchAndCacheAsset()
    }
  }, [])

  async function fetchAndCacheAsset() {
    const res = await fetch(
      `https://api.opensea.io/api/v1/asset/${item.contract}/${item.tokenId}/?include_orders=true`
    )
    const asset = await res.json()
    const lean = leanAsset(asset)

    window.localStorage.setItem(
      `${item.contract}/${item.tokenId}`,
      JSON.stringify(lean)
    )
    setAsset(lean)
  }

  async function deleteItem() {
    let url = `/api/list/${listId}/item/${item._id}`

    await fetch(url, { method: "DELETE" })
    setItems(items.filter((el) => el._id !== item._id))
  }

  return (
    <li
      className={styles.cardContainer}
      style={asset.image_url === "loading" ? { display: "none" } : undefined}
      key={reactKey}
    >
      <img src={asset.image_url} className={styles.image}></img>

      <section className={styles.info}>
        <div className={styles.textInfo}>
          <span className={styles.name}>
            {asset.name ? asset.name : `#${item.tokenId}`}
          </span>
          <span className={styles.collectionName}>{asset.collection.name}</span>
        </div>

        <div className={styles.bottomButtons}>
          {((locked && session.status) || !locked) && (
            <img
              className={styles.trashIcon}
              src={trashSvg}
              alt="Delete icon"
              onClick={deleteItem}
            />
          )}
          <a
            target="_blank"
            rel="noreferrer"
            href={`https://opensea.io/assets/${item.contract}/${item.tokenId}`}
          >
            <img className={styles.osIcon} src={osSvg} alt="Opensea icon" />
          </a>
        </div>
      </section>
    </li>
  )
}

export default Card
