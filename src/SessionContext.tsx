import React, { createContext, useState } from "react"
import { ISession } from "./List"

export interface ISessionContext {
  session: ISession
  setSession: React.Dispatch<React.SetStateAction<ISession>>
}

const defaultSession = {
  status: false,
  list_id: null,
}

const SessionContext = createContext<ISessionContext | null>(null)

export const SessionProvider: React.FC<React.ReactNode> = ({ children }) => {
  const [session, setSession] = useState<ISession>(defaultSession)
  return (
    <SessionContext.Provider value={{ session, setSession }}>
      {children}
    </SessionContext.Provider>
  )
}

export { SessionContext }
