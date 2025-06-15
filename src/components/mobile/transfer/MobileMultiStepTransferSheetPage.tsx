import React from "react";
import MultiStepTransferSheet from "@/components/transfer/MultiStepTransferSheet";
import { TransferData } from '@/components/transfer/MultiStepTransferSheet';

/**
 * Mobile-specific multi-step transfer page.
 */
const MobileMultiStepTransferSheetPage: React.FC = () => (
  <MultiStepTransferSheet 
    variant="sheet"
  />
);

export default MobileMultiStepTransferSheetPage;
