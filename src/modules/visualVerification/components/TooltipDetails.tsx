interface TooltipDetailsProps {
  showTooltip: boolean;
  finalSizes: string[];
  finalColors: string[];
  tooltipRef: React.RefObject<HTMLDivElement>;
}

const TooltipDetails: React.FC<TooltipDetailsProps> = ({
  showTooltip,
  finalSizes,
  finalColors,
  tooltipRef,
}) =>
  showTooltip && (
    <div
      ref={tooltipRef}
      className="absolute top-20 right-6 bg-white shadow-md border rounded-md p-4 w-64 z-10"
    >
      <div className="mb-4">
        <p className="text-sm font-semibold mb-1">Sizes</p>
        <div className="flex flex-wrap gap-2">
          {finalSizes.map((s, i) => (
            <span
              key={i}
              className="text-xs bg-gray-100 px-2 py-0.5 rounded-full"
            >
              {s}
            </span>
          ))}
        </div>
      </div>
      <div>
        <p className="text-sm font-semibold mb-1">Colors</p>
        <div className="flex gap-2 items-center">
          {finalColors.map((c, i) => (
            <div
              key={i}
              className="w-5 h-5 rounded-full border"
              style={{ backgroundColor: c }}
              title={c}
            ></div>
          ))}
        </div>
      </div>
    </div>
  );

export default TooltipDetails;
