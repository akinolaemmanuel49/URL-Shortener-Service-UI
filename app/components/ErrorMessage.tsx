import React, { ReactNode } from "react";
import { RiAlertFill } from "react-icons/ri";

interface ErrorMessageProps {
  children: ReactNode;
}

const ErrorMessage: React.FC<ErrorMessageProps> = ({ children }) => (
  <div style={{ color: "red", display: "flex", alignItems: "center" }}>
    <RiAlertFill style={{ marginRight: "8px" }} />
    {children}
  </div>
);

export default ErrorMessage;
