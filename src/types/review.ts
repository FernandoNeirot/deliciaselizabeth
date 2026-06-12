export interface Review {
  id: string;
  deliveryId: string;
  productId: string;
  clientName: string;
  rating: number; // 1-5
  comment: string;
  createdAt: string; // ISO date
}

export interface DeliveryLink {
  id: string;
  productId: string;
  clientName: string;
  createdAt: string;
  used: boolean;
}
