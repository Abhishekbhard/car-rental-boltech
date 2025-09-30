export interface Car {
  id: string;
  brand: string;
  model: string;
  stock: number;
  prices: {
    peak: number;
    mid: number;
    off: number;
  };
}
