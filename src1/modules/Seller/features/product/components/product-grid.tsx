import { ISellerProduct } from "../../../models/product";
import { SellerProductCard } from "./product-card";
export function ProductGrid({
  products,
}: Readonly<{ products: ISellerProduct[] | [] }>) {
  return (
    <div className="grid grid-cols-4 gap-4">
      {products &&
        products.map((product) => <SellerProductCard {...product} />)}
    </div>
  );
}
