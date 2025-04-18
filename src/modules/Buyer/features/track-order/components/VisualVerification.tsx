// import { useEffect, useState } from "react";
// import { fetchVerificationImages } from "../../../lib/track-order/api";

// interface SneakerImage {
//   id: string;
//   imageUrl: string;
//   sneakerName: string;
//   size: string;
//   color: string;
//   verificationDate: string;
// }

// interface VisualVerificationProps {
//   orderId: string;
// }

// const VisualVerification: React.FC<VisualVerificationProps> = ({ orderId }) => {
//   const [images, setImages] = useState<SneakerImage[]>([]);
//   const [error, setError] = useState("");

//   useEffect(() => {
//     const getImages = async () => {
//       try {
//         const data = await fetchVerificationImages(orderId);

//         // Map VerificationImage[] to SneakerImage[]
//         const transformed = data.images.map((img, index) => ({
//           id: `${data.verificationId}-${index}`,
//           imageUrl: img.imageUrl,
//           sneakerName: img.sneakerName || "Sneaker", // fallback if blank
//           size: img.size || "N/A",
//           color: img.color || "N/A",
//           verificationDate: img.verifiedDate || "",
//         }));

//         setImages(transformed);
//       } catch (err) {
//         setError("Failed to load images");
//       }
//     };

//     getImages();
//   }, [orderId]);

//   if (error) return <p className="text-red-500">{error}</p>;

//   return (
//     <div className="flex flex-col gap-4">
//       <h3 className="text-lg font-semibold">Verified Sneaker Images</h3>
//       <div className="flex gap-4 overflow-x-auto">
//         {images.slice(0, 5).map((img) => (
//           <div key={img.id} className="flex-shrink-0">
//             <img
//               src={img.imageUrl}
//               alt={img.sneakerName}
//               className="w-24 h-24 object-cover rounded-md"
//             />
//             <p className="text-xs text-gray-700">{img.sneakerName}</p>
//             <p className="text-xs text-gray-500">
//               {img.size} | {img.color}
//             </p>
//             <p className="text-xs text-gray-500">{img.verificationDate}</p>
//           </div>
//         ))}
//       </div>
//     </div>
//   );
// };

// export default VisualVerification;
