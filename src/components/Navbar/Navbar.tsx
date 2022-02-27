import React from "react"
import { useNavigate } from "react-router-dom"
import logo from "../../img/logo.svg"
import styles from "./Navbar.module.scss"

interface Props {
  code: string
}

const Navbar: React.FC<Props> = ({ code }) => {
  const navigate = useNavigate()
  return (
    <nav className={styles.navContainer}>
      <img
        src={logo}
        alt="NFT Wishlist Logo"
        className={styles.logo}
        onClick={() => navigate("/")}
      />

      <div className={styles.navRight}>
        <button className={styles.code}>{code}</button>
        <button className={styles.share}>SHARE LINK</button>
      </div>
    </nav>
  )
}

export default Navbar
