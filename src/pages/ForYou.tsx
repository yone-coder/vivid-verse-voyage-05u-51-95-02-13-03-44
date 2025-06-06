
import React from "react";
import DeviceRouter from "@/components/common/DeviceRouter";
import { ForYouMobile } from "@/components/mobile";
import { ForYouDesktop } from "@/components/desktop";

export default function ForYou() {
  return (
    <DeviceRouter 
      mobileComponent={ForYouMobile} 
      desktopComponent={ForYouDesktop} 
    />
  );
}
