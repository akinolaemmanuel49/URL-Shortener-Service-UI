import React from "react";
import { RiAlertFill } from "react-icons/ri";

import { ErrorMessageProps } from "@/app/types/error";

export default function ErrorMessage({ children }: ErrorMessageProps) {
  return (
    <div style={{ color: "red", display: "flex", alignItems: "center" }}>
      <RiAlertFill style={{ marginRight: "8px" }} />
      {children}
    </div>
  );
}
