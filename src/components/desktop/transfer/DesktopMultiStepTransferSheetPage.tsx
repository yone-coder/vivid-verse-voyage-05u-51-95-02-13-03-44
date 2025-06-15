
import React from "react";
import MultiStepTransferSheet from "@/components/transfer/MultiStepTransferSheet";

/**
 * Desktop version of the MultiStepTransferSheetPage.
 * This layout centers a large card on bigger screens for optimal desktop experience.
 */
const DesktopMultiStepTransferSheetPage: React.FC = () => {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50">
      <div className="w-full max-w-2xl rounded-2xl shadow-2xl bg-white border px-0 py-8">
        <MultiStepTransferSheet 
          onClose={() => {}} 
          variant="page"
        />
      </div>
    </div>
  );
};

export default DesktopMultiStepTransferSheetPage;
