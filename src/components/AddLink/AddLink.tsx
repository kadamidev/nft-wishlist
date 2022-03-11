import React, { useState } from "react"
import { IItem } from "../../List"
import styles from "./AddLink.module.scss"
import leanAsset, { IAsset } from "../../utils/leanAsset"

interface Props {
  listId: string
  items: IItem[]
  setItems: React.Dispatch<React.SetStateAction<IItem[]>>
}

const AddLink = ({ listId, items, setItems }: Props) => {
  const [link, setLink] = useState<string>("")
  const [placeholder, setPlaceholder] = useState<string>("enter nft link")

  async function handleAddItem(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault()
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
      setTimeout(() => setPlaceholder("enter nft link"), 3000)
      return
    }

    //add
    setPlaceholder("successfully added")
    setTimeout(() => setPlaceholder("enter nft link"), 3000)
    cacheAsset(asset, contract, tokenId)
    const optimisticItem = optimisticAddItem(contract, tokenId)
    const dbId = await persistItem(contract, tokenId)

    //update items id
    setItems([...items, { ...optimisticItem, _id: dbId }])
  }

  async function fetchAsset(contract: string, tokenId: string) {
    const res = await fetch(
      `https://api.opensea.io/api/v1/asset/${contract}/${tokenId}/?include_orders=true`
    )
    return await res.json()
  }

  function optimisticAddItem(contract: string, tokenId: string) {
    const newItem = {
      contract: contract,
      tokenId: tokenId,
      _id: Date.now().toString(),
    }
    setItems([...items, newItem])
    return newItem
  }

  async function cacheAsset(asset: IAsset, contract: string, tokenId: string) {
    const leanedAsset = leanAsset(asset)

    window.localStorage.setItem(
      `${contract}/${tokenId}`,
      JSON.stringify(leanedAsset)
    )
  }

  async function persistItem(contract: string, tokenId: string) {
    let url = `/api/list/${listId}/item`

    const body = {
      contract: contract,
      tokenId: tokenId,
    }

    const res = await fetch(url, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(body),
    })
    const item = await res.json()
    return item._id
  }

  return (
    <form
      onSubmit={(e) => handleAddItem(e)}
      className={styles.linkInputContainer}
    >
      <input
        type="text"
        placeholder={placeholder}
        value={link}
        onChange={(e) => setLink(e.target.value)}
      />
      <button type="submit">+</button>
    </form>
  )
}

export default AddLink
