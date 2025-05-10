// components/Callout.tsx
type Props = {
  type: "tip" | "warning" | "danger";
  children: React.ReactNode;
};

const baseStyle = "p-4 border-l-4 rounded-md my-6";
const variant = {
  tip: "flex bg-blue-50 border-blue-400 text-blue-800",
  warning: "bg-yellow-50 border-yellow-400 text-yellow-800",
  danger: "bg-red-50 border-red-400 text-red-800",
};

export default function Callout({ type, children }: Props) {
  return <div className={`${baseStyle} ${variant[type]}`}>{children}</div>;
}
