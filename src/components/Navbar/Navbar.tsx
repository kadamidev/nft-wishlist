import React, { useState } from "react"
import { useNavigate } from "react-router-dom"
import logo from "../../img/logo.svg"
import styles from "./Navbar.module.scss"
import copy from "copy-to-clipboard"

interface Props {
  code: string
}

const Navbar: React.FC<Props> = ({ code }) => {
  const navigate = useNavigate()

  const [copiedCode, setCopiedCode] = useState<boolean>(false)
  const [copiedLink, setCopiedLink] = useState<boolean>(false)

  function handleCopyCode() {
    copy(code)
    setCopiedCode(true)
    setTimeout(() => {
      setCopiedCode(false)
    }, 2000)
  }

  function handleCopyLink() {
    copy(window.location.href)
    setCopiedLink(true)
    setTimeout(() => {
      setCopiedLink(false)
    }, 2000)
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
