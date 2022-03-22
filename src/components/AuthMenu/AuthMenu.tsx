import React, { useState, useContext } from "react"
import styles from "./AuthMenu.module.scss"
import lockedSvg from "../../assets/lock.svg"
import unlockedSvg from "../../assets/unlock.svg"
import { SessionContext, ISessionContext } from "../../SessionContext"

interface Props {
  locked: boolean
  setLocked: React.Dispatch<React.SetStateAction<boolean>>
  listId: string
  setShowAuthMenu: React.Dispatch<React.SetStateAction<boolean>>
}

const AuthMenu: React.FC<Props> = ({
  locked,
  setLocked,
  listId,
  setShowAuthMenu,
}) => {
  const [passwordPlaceholder, setPasswordPlaceholder] =
    useState<string>("password")
  const [passwordField, setPasswordField] = useState<string>("")

  const { session, setLocalSession } =
    useContext<ISessionContext>(SessionContext)

  const handleLock = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    const url = `/api/list/${listId}/`
    const res = await fetch(url, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ password: passwordField }),
    })
    setPasswordField("")
    setPasswordPlaceholder("locking...")
    if (res.ok) {
      setLocked(true)
      setLocalSession(true)
      setPasswordPlaceholder("password")
    }
  }

  const handleAuth = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    console.log(session.list_id)
    const url = `/api/sessions/`
    const res = await fetch(url, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        _id: session.list_id,
        password: passwordField,
      }),
    })
    setPasswordField("")
    setPasswordPlaceholder("authenticating...")
    if (res.ok) {
      setLocalSession(true)
      setPasswordPlaceholder("password")

      return
    }
    setPasswordPlaceholder("invalid pw")
  }

  const handleUnauthorize = (
    e: React.MouseEvent<HTMLButtonElement, MouseEvent>
  ) => {
    e.preventDefault()
    setLocalSession(false)
    const url = `/api/sessions/`
    fetch(url, {
      method: "DELETE",
    })
  }

  const handleDeleteList = (
    e: React.MouseEvent<HTMLButtonElement, MouseEvent>
  ) => {
    e.preventDefault()
    const url = `/api/list/${listId}/`
    fetch(url, {
      method: "DELETE",
    })
    //redirect to home
  }

  const handleUnlock = (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
    e.preventDefault()
    setLocked(false)
    setLocalSession(false)
    const url = `/api/list/${listId}/`
    fetch(url, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ password: null }),
    })
  }

  return (
    <div className={styles.authMenuContainer}>
      <span className={styles.closeBtn} onClick={() => setShowAuthMenu(false)}>
        X
      </span>
      <img
        className={styles.lockImg}
        src={locked ? lockedSvg : unlockedSvg}
        alt={locked ? "Locked icon" : "Unlocked icon"}
      />

      {}
      <p className={styles.description}>
        {!locked &&
          "This wishlist is unlocked, anybody with it’s code can modify its contents, set a password to prevent unauthorized modification."}
        {locked &&
          session.status &&
          "This wishlock is locked and you’re authorized to modify it."}
        {locked &&
          !session.status &&
          "This wishlist is locked with a password, only users with authorization can modify it."}
      </p>

      {!session.status && (
        <form
          className={styles.passwordInput}
          onSubmit={(e) => (locked ? handleAuth(e) : handleLock(e))}
        >
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
          <button
            className={styles.authedBtnOption}
            onClick={(e) => handleUnauthorize(e)}
          >
            UNAUTHORIZE
          </button>
          <button
            className={styles.authedBtnOption}
            onClick={(e) => handleUnlock(e)}
          >
            UNLOCK
          </button>
          <button
            className={styles.authedBtnOption}
            onClick={(e) => handleDeleteList(e)}
          >
            DELETE LIST
          </button>
        </div>
      )}
    </div>
  )
}

export default AuthMenu
