/** @jsx  h */
/** @jsxFrag  h */
import { ComponentChild, FunctionComponent, h, tw } from "../client_deps.ts";
export const HeaderButton: FunctionComponent<{
  label: ComponentChild;
  onClick: () => void; // h.JSX.MouseEventHandler<EventTarget>
  isActive?: boolean;
  className?: string;
  width?: number;
  height?: number;
  naturalWidth?: number;
  naturalHeight?: number;
  iconClassName?: string;
  ringClassName?: string;
}> = ({
  isActive = false,
  label,
  onClick,
  width = 42,
  height = 36,
  naturalWidth = 26,
  naturalHeight = 22,
  className,
  children,
  iconClassName,
  ringClassName,
}) => (
  <button
    type="button"
    className={tw
      `${className} group focus:outline-none focus-visible:ring-2 rounded-md ${
        ringClassName ||
        (isActive
          ? "focus-visible:ring-sky-500 dark:focus-visible:ring-sky-400"
          : "focus-visible:ring-gray-400/70 dark:focus-visible:ring-gray-500")
      }`}
    onClick={onClick}
  >
    <span className={tw`sr-only`}>{label}</span>
    <svg
      width={width}
      height={height}
      viewBox={`${(width - naturalWidth) / -2} ${
        (height - naturalHeight) / -2
      } ${width} ${height}`}
      stroke-width="2"
      stroke-linecap="round"
      stroke-linejoin="round"
      className={tw`${iconClassName} ${
        iconClassName ||
        (isActive
          ? "fill-sky-100 stroke-sky-500 dark:fill-sky-400/50 dark:stroke-sky-400"
          : "fill-gray-100 stroke-gray-400/70 hover:fill-gray-200 hover:stroke-gray-400 dark:fill-gray-400/20 dark:stroke-gray-500 dark:hover:fill-gray-400/30 dark:hover:stroke-gray-400")
      }`}
    >
      {children}
    </svg>
  </button>
);
