import React, { useState } from "react"
import { Item } from "../../List"
import styles from "./AddLink.module.scss"
import leanAsset, { IAsset } from "../../utils/leanAsset"

interface Props {
  listId: string
  items: Item[]
  setItems: React.Dispatch<React.SetStateAction<Item[]>>
}

const AddLink = ({ listId, items, setItems }: Props) => {
  const [link, setLink] = useState<string>("")
  const [placeholder, setPlaceholder] = useState<string>("enter nft link")

  async function handleAddItem() {
    if (!link) return
    setLink("")
    setPlaceholder("Adding item...")

    const splitLink = link.split("/")
    const contract = splitLink[4]
    const tokenId = splitLink[5]

    //fetch from opensea and check validity
    const asset = await fetchAsset(contract, tokenId)
    if (!asset.id) {
      setPlaceholder("invalid link")
      return
    }

    setPlaceholder("successfully added")
    setTimeout(() => setPlaceholder("enter nft link"), 3000)
    cacheAsset(asset, contract, tokenId)
    optimisticAddItem(contract, tokenId)
    persistItem(contract, tokenId)
  }

  async function fetchAsset(contract: string, tokenId: string) {
    const res = await fetch(
      `https://api.opensea.io/api/v1/asset/${contract}/${tokenId}/?include_orders=true`
    )
    return await res.json()
  }

  function optimisticAddItem(contract: string, tokenId: string) {
    setItems([...items, { contract: contract, tokenId: parseInt(tokenId) }])
  }

  async function cacheAsset(asset: IAsset, contract: string, tokenId: string) {
    const leanedAsset = leanAsset(asset)

    window.localStorage.setItem(
      `${contract}/${tokenId}`,
      JSON.stringify(leanedAsset)
    )
  }

  async function persistItem(contract: string, tokenId: string) {
    let domain = window.location.origin.split(":")[1]
    let port = 3001
    let url = `http://${domain}:${port}/api/list/${listId}/item`

    const body = {
      contract: contract,
      tokenId: parseInt(tokenId),
    }

    const res = await fetch(url, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(body),
    })
  }

  return (
    <div className={styles.linkInputContainer}>
      <input
        type="text"
        placeholder={placeholder}
        value={link}
        onChange={(e) => setLink(e.target.value)}
      />
      <button onClick={handleAddItem}>+</button>
    </div>
  )
}

export default AddLink
