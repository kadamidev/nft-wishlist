import React, { useState } from "react"
import { useNavigate } from "react-router-dom"
import logo from "../../img/logo.svg"
import styles from "./Navbar.module.scss"

interface Props {
  code: string
}

const Navbar: React.FC<Props> = ({ code }) => {
  const navigate = useNavigate()

  const [copiedCode, setCopiedCode] = useState<boolean>(false)
  const [copiedLink, setCopiedLink] = useState<boolean>(false)

  function handleCopyCode() {
    navigator.clipboard.writeText(code)
    setCopiedCode(true)
    setTimeout(() => {
      setCopiedCode(false)
    }, 3000)
  }

  function handleCopyLink() {
    navigator.clipboard.writeText(window.location.href)
    setCopiedLink(true)
    setTimeout(() => {
      setCopiedLink(false)
    }, 3000)
  }

  return (
    <nav className={styles.navContainer}>
      <img
        src={logo}
        alt="NFT Wishlist Logo"
        className={styles.logo}
        onClick={() => navigate("/")}
      />

      <div className={styles.navRight}>
        <button
          className={
            copiedCode ? [styles.code, styles.copied].join(" ") : styles.code
          }
          onClick={handleCopyCode}
        >
          {copiedCode ? "copied!" : code}
        </button>
        <button className={styles.share} onClick={handleCopyLink}>
          {copiedLink ? "copied!" : "SHARE LINK"}
        </button>
      </div>
    </nav>
  )
}

export default Navbar
