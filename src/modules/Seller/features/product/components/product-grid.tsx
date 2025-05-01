import { ISellerProduct } from "../../../models/product";
import { SellerProductCard } from "./product-card";
export function ProductGrid({
  products,
}: Readonly<{ products: ISellerProduct[] | [] }>) {
  return (
    <div className="grid grid-cols-2  lg:grid-cols-2 xl:grid-cols-4 gap-4">
      {products &&
        products.map((product) => <SellerProductCard {...product} />)}
    </div>
  );
}
