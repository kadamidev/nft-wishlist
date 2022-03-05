export interface ICollection {
  name: string
}

export interface IAsset {
  name?: string
  collection: ICollection
  image_url: string
}

//strips OS api returned asset of unnecessary data
export default function leanAsset(asset: any): IAsset {
  return {
    name: asset.name,
    image_url: asset.image_url,
    collection: { name: asset.collection.name },
  }
}
