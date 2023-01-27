interface ItemListProp {
  itemName: string;
  id: number;
}

export interface DataProp {
  itemIcon: string;
  itemName: string;
  currentStock: number;
  maximumStock: number;
  itemList: Array<ItemListProp>;
  // { itemName: 'Pickle', id: 1234 },
  // { itemName: 'Maize', id: 1235 },
  // { itemName: 'Potato', id: 1236 },
  // { itemName: 'Rice', id: 1237 },
  // { itemName: 'Soybean', id: 1238 },
  // { itemName: 'Sweet potato', id: 1239 },
  // { itemName: 'Wheat', id: 1240 },
  // { itemName: 'Yam', id: 1241 },
}
