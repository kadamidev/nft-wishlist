import { DocumentDefinition } from "mongoose"
import ListModel, { ListDocument, ListInput } from "../models/list.model"

export async function createList(input?: ListInput & { code?: string }) {
  try {
    console.log(input)
    return await ListModel.create(input)
  } catch (e: any) {
    throw new Error(e)
  }
}
