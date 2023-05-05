import React from 'react';
import { IconType } from 'react-icons/lib';

interface ButtonProps {
  label: string;
  disabled?: boolean;
  outline?: boolean;
  small?: boolean;
  icon?: IconType;
  onClick: (e: React.MouseEvent<HTMLButtonElement>) => void;
}
const Button: React.FC<ButtonProps> = ({
  label,
  disabled,
  outline,
  small,
  icon,
  onClick,
}) => {
  return <button>{label}</button>;
};

export default Button;
