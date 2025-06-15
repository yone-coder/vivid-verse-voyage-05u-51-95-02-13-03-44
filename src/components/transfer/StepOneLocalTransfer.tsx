
import React from "react";

type Props = {
  amount: string;
  onAmountChange: (amount: string) => void;
};

const StepOneLocalTransfer: React.FC<Props> = ({ amount, onAmountChange }) => (
  <div>
    <input
      type="number"
      value={amount}
      onChange={e => onAmountChange(e.target.value)}
      placeholder="Enter amount (HTG)"
      style={{ width: "100%", padding: 8, borderRadius: 6, border: "1px solid #ececec" }}
    />
  </div>
);

export default StepOneLocalTransfer;
