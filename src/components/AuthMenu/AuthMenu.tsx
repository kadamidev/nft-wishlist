import React, { useState } from "react"
import styles from "./AuthMenu.module.scss"
import lockedSvg from "../../assets/lock.svg"
import unlockedSvg from "../../assets/unlock.svg"
import { ISession } from "../../List"

interface Props {
  locked: boolean
  session: ISession
}

const AuthMenu: React.FC<Props> = ({ locked, session }) => {
  const [passwordPlaceholder, setPasswordPlaceholder] =
    useState<string>("password")
  const [passwordField, setPasswordField] = useState<string>("")

  return (
    <div className={styles.authMenuContainer}>
      <img
        className={styles.lockImg}
        src={locked ? lockedSvg : unlockedSvg}
        alt={locked ? "Locked icon" : "Unlocked icon"}
      />

      <p className={styles.description}>
        {locked && !session.status
          ? "This wishlist is locked with a password, only users with authorization can modify it."
          : "This wishlist is unlocked, anybody with it’s code can modify its contents, set a password to prevent unauthorized modification."}
      </p>

      {!session.status && (
        <form className={styles.passwordInput}>
          <input
            type="password"
            placeholder={passwordPlaceholder}
            value={passwordField}
            onChange={(e) => setPasswordField(e.target.value)}
            onClick={() => {
              setPasswordPlaceholder("password")
            }}
          />
          <button type="submit">{locked ? "AUTH" : "LOCK"}</button>
        </form>
      )}

      {session.status === true && (
        <div className={styles.authedBtns}>
          <button className={styles.authedBtnOption}>UNAUTHORIZE</button>
          <button className={styles.authedBtnOption}>UNLOCK</button>
          <button className={styles.authedBtnOption}>DELETE LIST</button>
        </div>
      )}
    </div>
  )
}

export default AuthMenu
