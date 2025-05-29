import { ISellerProduct } from "../../models/product";

export function transformSellerProduct(productdata: any): ISellerProduct[] | [] {
  const products = productdata?.products;
 
  if(products.length === 0) return []
  return products.map((product: any, index: any) => {
    return {
      id: product._id,
      model: product.model,
      brand: product.brand,
      color: product.color,
      price: product.price,
      description: product.description,
      size: product.size,
      stock_status: product.stock_status,
      images: product.images,
      seller_img:product.images[0]??"/sneaker.png"
    };
  });
}
