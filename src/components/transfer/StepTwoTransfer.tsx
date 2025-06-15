
import React from "react";

type ReceiverDetails = {
  firstName: string;
  lastName: string;
  phoneNumber: string;
  department: string;
  commune: string;
  email?: string;
};

type Props = {
  receiverDetails: ReceiverDetails;
  onDetailsChange: (details: ReceiverDetails) => void;
};

const StepTwoTransfer: React.FC<Props> = ({ receiverDetails, onDetailsChange }) => {
  const handleChange = (key: keyof ReceiverDetails) => (e: React.ChangeEvent<HTMLInputElement>) =>
    onDetailsChange({ ...receiverDetails, [key]: e.target.value });

  return (
    <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
      <input
        value={receiverDetails.firstName}
        onChange={handleChange("firstName")}
        placeholder="First Name"
      />
      <input
        value={receiverDetails.lastName}
        onChange={handleChange("lastName")}
        placeholder="Last Name"
      />
      <input
        value={receiverDetails.phoneNumber}
        onChange={handleChange("phoneNumber")}
        placeholder="Phone"
      />
      <input
        value={receiverDetails.department}
        onChange={handleChange("department")}
        placeholder="Department"
      />
      <input
        value={receiverDetails.commune}
        onChange={handleChange("commune")}
        placeholder="Commune"
      />
      <input
        value={receiverDetails.email || ""}
        onChange={handleChange("email")}
        placeholder="Email (optional)"
      />
    </div>
  );
};

export default StepTwoTransfer;
