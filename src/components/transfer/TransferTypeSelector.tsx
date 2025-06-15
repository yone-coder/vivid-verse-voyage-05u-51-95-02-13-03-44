
import React from "react";

type Props = {
  transferType: "international" | "national";
  onTransferTypeChange: (type: "international" | "national") => void;
  disableNavigation?: boolean;
};

const TransferTypeSelector: React.FC<Props> = ({
  transferType,
  onTransferTypeChange,
}) => (
  <div style={{ margin: "8px 0", display: "flex", gap: 12 }}>
    <button
      style={{ fontWeight: transferType === "international" ? "bold" : "normal" }}
      onClick={() => onTransferTypeChange("international")}
    >
      International Transfer
    </button>
    <button
      style={{ fontWeight: transferType === "national" ? "bold" : "normal" }}
      onClick={() => onTransferTypeChange("national")}
    >
      National Transfer
    </button>
  </div>
);

export default TransferTypeSelector;
