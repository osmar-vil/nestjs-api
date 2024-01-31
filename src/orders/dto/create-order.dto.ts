export class CreateOrderDto {
  items: CreateOrderItemDto[];
  card_hash: string;
}

export class CreateOrderItemDto {
  quantity: number;
  product_id: string;
}
