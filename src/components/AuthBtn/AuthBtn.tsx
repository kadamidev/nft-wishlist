import React from "react"
import styles from "./AuthBtn.module.scss"
import lockedSvg from "../../assets/lock.svg"
import unlockedSvg from "../../assets/unlock.svg"

interface Props {
  locked: boolean
  setLocked: React.Dispatch<React.SetStateAction<boolean>>
}

const AuthBtn: React.FC<Props> = ({ locked, setLocked }) => {
  return (
    <button className={styles.lockBtn} onClick={() => setLocked(!locked)}>
      <img
        className={styles.lockImg}
        src={locked ? lockedSvg : unlockedSvg}
        alt={locked ? "Locked icon" : "Unlocked icon"}
      />
    </button>
  )
}

export default AuthBtn
