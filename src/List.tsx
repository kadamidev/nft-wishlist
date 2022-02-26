import React from "react"
import styles from "./List.module.scss"
import logo from "./img/logo.svg"
import Navbar from "./components/Navbar/Navbar"

const List = () => {
  return (
    <div className={styles.container}>
      <nav>
        <Navbar />
      </nav>
    </div>
  )
}

export default List
