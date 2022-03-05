import { FilterQuery, QueryOptions, UpdateQuery } from "mongoose"
import ItemModel, { ItemInput } from "../models/item.model"
import ListModel, { ListDocument } from "../models/list.model"

export async function createItem(
  query: FilterQuery<ListDocument>,
  input: ItemInput
) {
  try {
    const list = await ListModel.findOne(query)
    if (!list) throw new Error("Invalid list")

    const item = new ItemModel(input)
    list.items?.push(item)
    await list.save()
    return item
  } catch (e: any) {
    throw new Error(e)
  }
}

export async function deleteItem(
  query: FilterQuery<ListDocument>,
  itemId: string
) {
  try {
    const list = await ListModel.findOne(query)
    if (!list) throw new Error("Invalid list")

    const item = list.items?.id(itemId)
    if (!item) throw new Error("Invalid item")

    item.remove()
    await list.save()
    return
  } catch (e: any) {
    throw new Error(e)
  }
}
