import React from "react"
import { useNavigate } from "react-router-dom"
import logo from "../../img/logo.svg"
import styles from "./Navbar.module.scss"

const Navbar = () => {
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
        <button className={styles.code}>123456</button>
        <button className={styles.share}>SHARE LINK</button>
      </div>
    </nav>
  )
}

export default Navbar
