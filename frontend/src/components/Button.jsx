export default function Button({ children, variant = "primary", ...props }) {
  return (
    <button
      className={variant === "outline" ? "btn outline" : "btn"}
      {...props}
    >
      {children}
    </button>
  );
}
