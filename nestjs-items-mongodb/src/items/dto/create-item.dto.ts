export class CreateItemDto {
  constructor(name: string, description: string, qty: number) {
    this.name = name;
    this.description = description;
    this.qty = qty;
  }

  name: string;
  description: string;
  qty: number;
}
