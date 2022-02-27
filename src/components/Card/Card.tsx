import React from "react"
import { IList } from "../../models"
import styles from "./Card.module.scss"

interface Props {
  // list: IList
  cardId: string
}

const Card: React.FC<Props> = ({ cardId }) => {
  return <div>Card</div>
}

export default Card
