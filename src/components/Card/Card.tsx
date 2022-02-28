import React, { useEffect, useState } from "react"
// import { IList } from "../../models"
import styles from "./Card.module.scss"
import trashSvg from "../../assets/trash.svg"
import osSvg from "../../assets/os.svg"
import { Item } from "../../List"

interface Props {
  item: Item
}

interface ICollection {
  name: string
}

interface IAsset {
  name?: string
  collection: ICollection
  image_url: string
}

const Card: React.FC<Props> = ({ item }) => {
  const [asset, setAsset] = useState<IAsset>({
    name: "loading",
    collection: { name: "loading" },
    image_url: "loading",
  })

  //load asset from cache if exists else fetch
  useEffect(() => {
    const cached = window.localStorage.getItem(
      `${item.contract}/${item.tokenId}`
    )

    if (cached) {
      setAsset(JSON.parse(cached))
    } else {
      fetchSetCacheAsset()
    }
  }, [])

  async function fetchSetCacheAsset() {
    const res = await fetch(
      `https://api.opensea.io/api/v1/asset/${item.contract}/${item.tokenId}/?include_orders=true`
    )
    const asset = await res.json()
    const cleaned: IAsset = {
      name: asset.name,
      image_url: asset.image_url,
      collection: { name: asset.collection.name },
    }
    window.localStorage.setItem(
      `${item.contract}/${item.tokenId}`,
      JSON.stringify(cleaned)
    )
    setAsset(cleaned)
  }
  return (
    <li className={styles.cardContainer}>
      <img src={asset.image_url} className={styles.image}></img>

      <section className={styles.info}>
        <span className={styles.name}>
          {asset.name ? asset.name : `#${item.tokenId}`}
        </span>
        <span className={styles.collectionName}>{asset.collection.name}</span>

        <div className={styles.bottomButtons}>
          <img className={styles.trashIcon} src={trashSvg} alt="Delete icon" />
          <img className={styles.osIcon} src={osSvg} alt="Opensea icon" />
        </div>
      </section>
    </li>
  )
}

export default Card
