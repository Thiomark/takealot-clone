import React from "react";

const Spinner = ({ className }: { className?: string }) => {
  return <div className={`loader ${className}`}></div>;
};

export default Spinner;
