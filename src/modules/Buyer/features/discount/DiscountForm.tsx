import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "@/store/store";
import {
  applyDiscountCode,
  clearDiscount,
} from "@/modules/Buyer/features/discount/discountSlice";
import { Button } from "@/ui/Button";

const DiscountForm = () => {
  const dispatch = useDispatch<AppDispatch>();
  const [code, setCode] = useState("");
  const { data, error } = useSelector(
    (state: RootState) => state.buyer.discount,
  );

  const handleApply = () => {
    if (!code.trim()) return;
    dispatch(applyDiscountCode(code));
  };

  const handleRemove = () => {
    dispatch(clearDiscount());
    setCode("");
  };

  return (
    <div className="space-y-3 border p-4 rounded max-w-md">
      <h3 className="text-lg font-medium">Apply Discount Code</h3>

      <div className="flex w-full gap-4">
      <input
        type="text"
        value={code}
        onChange={(e) => setCode(e.target.value)}
        placeholder="Enter discount code"
        className="border p-2 w-full rounded"
        disabled={!!data}
      />
      {/* <Button className="w-full" variant="default">
              Pay Now
            </Button> */}
      {!data ? (
        <Button
          onClick={handleApply}
          className="w-1/3" variant="default"
          // className="bg-blue-600 text-white px-4 py-2 rounded w-full hover:bg-blue-700"
        >
          Apply
        </Button>
      ) : (
        <Button
          onClick={handleRemove}
         className="w-1/3" variant="default"
          // className="bg-gray-500 text-white px-4 py-2 rounded w-full hover:bg-gray-600"
        >
          Remove Discount
        </Button>
      )}
      </div>

      {data && (
        <p className="text-green-600 font-medium">
          ✅ Code <strong>{data.code}</strong> applied (
          {data.type === "percentage" ? `${data.value}%` : `₦${data.value}`}{" "}
          off)
        </p>
      )}

      {error && (
        <p className="text-red-600 font-medium">
          ❌{" "}
          {error === "Code already used"
            ? "You have already used this discount code."
            : error}
        </p>
      )}
    </div>
  );
};

export default DiscountForm;
