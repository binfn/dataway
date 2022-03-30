/** @jsx  h */
/** @jsxFrag  Fragment */

import { Fragment, FunctionComponent, h, tw } from "../client_deps.ts";
export const TabBar: FunctionComponent<{
  activeTab: "html" | "preview" | "css";
  width: string | number;
  isLoading: boolean;
  showPreviewTab: boolean;
  onChange: (tab: "preview" | "html" | "css") => void;
}> = ({
  activeTab,
  width,
  isLoading = false,
  showPreviewTab,
  onChange,
}) => (
  <div
    className={tw
      `flex items-center flex-none pl-5 pr-4 sm:pl-6 absolute z-10 top-0 left-0 -mb-px antialiased`}
    style={{
      width,
      fontFeatureSettings: '"cv02", "cv03", "cv04", "cv11"',
    }}
  >
    <div className={tw`flex space-x-5`}>
      <TabButton
        isActive={activeTab === "html"}
        onClick={() => onChange("html")}
      >
        HTML1
      </TabButton>
      <TabButton
        isActive={activeTab === "css"}
        onClick={() => onChange("css")}
      >
        CSS
      </TabButton>
      {showPreviewTab && (
        <TabButton
          isActive={activeTab === "preview"}
          onClick={() => onChange("preview")}
        >
          Preview
        </TabButton>
      )}
    </div>
    {isLoading && (
      <p className={tw`ml-auto`}>
        <span className={tw`sr-only`}>Loading</span>
        <svg
          fill="none"
          viewBox="0 0 24 24"
          className={tw`w-4 h-4 animate-spin`}
        >
          <circle
            className={tw`opacity-25`}
            cx="12"
            cy="12"
            r="10"
            stroke="currentColor"
            strokeWidth="4"
          />
          <path
            className={tw`opacity-75`}
            fill="currentColor"
            d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
          />
        </svg>
      </p>
    )}
  </div>
);

export const TabButton: FunctionComponent<
  { isActive: boolean; onClick: () => void }
> = ({ isActive, onClick, children }) => (
  <button
    type="button"
    class={tw(
      {
        "relative flex py-3 text-sm leading-6 font-semibold focus:outline-none":
          true,
        "text-sky-500": isActive,
        "text-gray-700 hover:text-gray-900 focus:text-gray-900 dark:text-gray-300 dark:hover:text-white":
          !isActive,
      },
    )}
    onClick={onClick}
  >
    <span
      className={tw(
        "absolute bottom-0 inset-x-0 bg-sky-500 h-0.5 rounded-full transition-opacity duration-150",
        [{ "opacity-0": !isActive }],
      )}
    />
    {children}
  </button>
);
