interface ButtonProps {
  primary?: boolean;
  backgroundColor?: string;
  size?: "small" | "medium" | "large";
  label: string;
  onClick?: () => void;
}

const Button: React.FC<ButtonProps> = ({
  primary = false,
  size = "medium",
  backgroundColor,
  label,
  ...props
}) => {
  const baseButton = "font-bold";
  const sizeMode =
    size === "small"
      ? "py-1.5 px-4 text-xs"
      : size === "medium"
      ? "py-2 px-5 text-sm"
      : size === "large"
      ? "py-3 px-6 text-base"
      : "";

  return primary ? (
    <div>
      <button
        type="button"
        className={`bg-primary text-white rounded-lg ${baseButton} ${sizeMode}`}
        {...props}
      >
        {label}
      </button>
    </div>
  ) : (
    <button
      type="button"
      className={`text-gray-600 bg-transparent shadow-inner ${baseButton} ${sizeMode}`}
      style={{ backgroundColor }}
      {...props}
    >
      {label}
    </button>
  );
};

export default Button;

// export default function Button({ text, type, size, shape, option, event }) {
//   return (
//     <button
//       type={type}
//       className={`btn btn-primary border-0 hover:shadow px-8 rounded-xl ${shape} btn-${size} ${option} `}
//       onClick={event}
//     >
//       {text}
//     </button>
//   );
// }
