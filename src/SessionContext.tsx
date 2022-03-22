import React, { createContext, useState, useEffect } from "react"
import { ISession } from "./List"

export interface ISessionContext {
  session: ISession
  setLocalSession: (authed: boolean, list_id?: ISession["list_id"]) => void
}

const defaultSession = {
  status: false,
  list_id: null,
}

const SessionContext = createContext<ISessionContext>({} as ISessionContext)

export const SessionProvider: React.FC<React.ReactNode> = ({ children }) => {
  const [session, setSession] = useState<ISession>(defaultSession)

  const setLocalSession = (authed: boolean, list_id?: ISession["list_id"]) => {
    const newListId = list_id ? list_id : session.list_id
    setSession({ status: authed, list_id: newListId })
  }
  return (
    <SessionContext.Provider value={{ session, setLocalSession }}>
      {children}
    </SessionContext.Provider>
  )
}

export { SessionContext }
