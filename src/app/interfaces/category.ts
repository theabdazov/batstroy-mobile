export interface Category {
  id: number;
  name: string;
  imageUrl: string;
  orderNumber: number;
}

export interface CategoryNode extends Category {
  children: CategoryNode[];
}

export interface CategoryWithParent extends Category {
  parentId: number;
}
