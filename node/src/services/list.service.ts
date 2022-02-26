import { FilterQuery, QueryOptions, UpdateQuery } from "mongoose"
import ListModel, { ListInput, ListDocument } from "../models/list.model"

export async function createList(input?: ListInput) {
  try {
    const newList = await ListModel.create(input)
    return newList
  } catch (e: any) {
    throw new Error(e)
  }
}

export async function findList(
  query: FilterQuery<ListDocument>,
  options: QueryOptions = { lean: true }
) {
  try {
    return await ListModel.findOne(query, {}, options).lean()
  } catch (e) {
    throw e
  }
}

export async function findAndUpdateList(
  query: FilterQuery<ListDocument>,
  update: UpdateQuery<ListDocument>,
  options: QueryOptions
) {
  try {
    return ListModel.findOneAndUpdate(query, update, options).lean()
  } catch (e) {}
}

export async function deleteList(query: FilterQuery<ListDocument>) {
  try {
    return ListModel.deleteOne(query)
  } catch (e) {
    throw e
  }
}
