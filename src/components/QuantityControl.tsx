export function QuantityControl({
  value,
  onChange,
  min = 1,
}: {
  value: number;
  onChange: (value: number) => void;
  min?: number;
}) {
  return (
    <div className="quantity-control" aria-label="Quantity selector">
      <button aria-label="Decrease quantity" onClick={() => onChange(Math.max(min, value - 1))}>−</button>
      <span>{value}</span>
      <button aria-label="Increase quantity" onClick={() => onChange(value + 1)}>+</button>
    </div>
  );
}
