import { ISellerProduct } from "../../../models/product";

export function SellerProductCard({
  seller_img,
  brand,
  model,
  price,
  size,
  stock_status,
  description,
  store_name,
  images,
}: ISellerProduct) {
  const bgImg = images ? images[0] : "/sneaker.png";
  return (
    <div
      className=" rounded-md px-6  pb-4 bg-no-repeat min-h-[300px] bg-cover flex flex-col justify-end   text-white font-OpenSans"
      style={{
        backgroundImage: `url(${bgImg}), linear-gradient(180deg, rgba(0,0,0,0) 0%, rgba(0,0,0,0.9) 100%)`,
        backgroundBlendMode: "overlay",
      }}
    >
      <div className="flex items-center">
        <div
          className="h-14 w-14 rounded-full"
          style={{
            background: `url(${seller_img})`,
            backgroundRepeat: "no-repeat",
            backgroundSize: "cover",
          }}
        ></div>
        <h4 className="text-white text-2xl font-Montserrat ml-5 font-semibold   ">
          {store_name}
        </h4>
      </div>
      <h3 className="font-OpenSans text-2xl font-bold text-white my-6">
        {brand}
      </h3>
      <div className="flex justify-between mb-8 max-w-full">
        <h4 className="text-2xl font-semibold">{price} NGN</h4>
        <div className="flex flex-wrap items-center gap-2">
          <img src="/Star.svg" width={15} />
          <div className="text-lg font-semibold">4.5</div>
        </div>
      </div>
    </div>
  );
}
