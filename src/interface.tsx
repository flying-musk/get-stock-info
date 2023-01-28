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
  actualStock: Array<number>;
  projectedStock: Array<number>;
  demand: Array<number>;
  projectedDemand: Array<number>;
  todayStock: Array<number>;
  labels: Array<string>;
}
