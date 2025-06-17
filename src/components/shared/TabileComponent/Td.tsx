import React, { ReactNode, FC } from "react";

interface TdProps extends React.HTMLAttributes<HTMLTableCellElement> {
  children: ReactNode;
  className?: string;
}

const Td: FC<TdProps> = ({ children, className = "", ...props }) => (
  <td className={`xxl:px-1 px-1 py-2 text-white1 ${className}`} {...props}>
    {children}
  </td>
);

export default Td;
