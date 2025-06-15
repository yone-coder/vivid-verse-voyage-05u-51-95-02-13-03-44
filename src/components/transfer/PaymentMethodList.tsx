
import React from "react";

type Props = {
  onSelect: (method: string) => void;
  selected: string;
  methods: { id: string; label: string }[];
};

const PaymentMethodList: React.FC<Props> = ({ onSelect, selected, methods }) => (
  <div>
    {methods.map(m => (
      <button
        key={m.id}
        style={{ fontWeight: m.id === selected ? "bold" : "normal", margin: "4px" }}
        onClick={() => onSelect(m.id)}
      >
        {m.label}
      </button>
    ))}
  </div>
);

export default PaymentMethodList;
