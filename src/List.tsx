import React from "react"
import styles from "./List.module.scss"
import logo from "./img/logo.svg"
import Navbar from "./components/Navbar/Navbar"
import AddLink from "./components/AddLink/AddLink"

const List = () => {
  return (
    <div className={styles.container}>
      <nav>
        <Navbar code={"12345"} />
      </nav>
      <main>
        <AddLink />
      </main>
    </div>
  )
}

export default List
