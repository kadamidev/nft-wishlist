import React, { useEffect, useState } from "react"
import styles from "./Card.module.scss"
import trashSvg from "../../assets/trash.svg"
import osSvg from "../../assets/os.svg"
import { IItem } from "../../List"
import leanAsset, { IAsset } from "../../utils/leanAsset"

interface Props {
  item: IItem
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
    } else if (item.contract != "loading") {
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
  return (
    <li
      className={styles.cardContainer}
      style={asset.image_url === "loading" ? { display: "none" } : undefined}
    >
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
