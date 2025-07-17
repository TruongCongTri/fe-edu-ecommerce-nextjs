import React from "react";

const LayoutWrapper: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  return <div className="container mx-auto">{children}</div>;
};

export default LayoutWrapper;
