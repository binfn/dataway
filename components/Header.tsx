/** @jsx  h */
/** @jsxFrag  Fragment */

import { Logo } from "./Logo.tsx";
import { HeaderButton } from "./HeaderButton.tsx";
import { Fragment, FunctionComponent, h, tw } from "../client_deps.ts";
export const Header: FunctionComponent<{
  layout: "vertical" | "preview" | "horizontal";
  onChangeLayout: (layout: "vertical" | "preview" | "horizontal") => void;
  responsiveDesignMode: boolean;
  onToggleResponsiveDesignMode: () => void;
  onToggleTheme: () => void;
}> = ({
  layout,
  onChangeLayout,
  onToggleTheme,
  responsiveDesignMode,
  onToggleResponsiveDesignMode,
  children,
}) => (
  <header
    className={tw
      `relative z-20 flex-none py-3 pl-5 pr-3 sm:pl-6 sm:pr-4 md:pr-3.5 lg:px-6 flex items-center space-x-4 antialiased`}
    style={{ fontFeatureSettings: '"cv02", "cv03", "cv04", "cv11"' }}
  >
    <div className={tw`flex-auto flex items-center min-w-0 space-x-6`}>
      <Logo className={`flex-none text-black dark:text-white`} />
      {children}
    </div>
    <div className={tw`flex items-center`}>
      <div
        className={tw
          `hidden lg:flex items-center ml-6 rounded-md ring-1 ring-gray-900/5 shadow-sm dark:ring-0 dark:bg-gray-800 dark:shadow-highlight/4`}
      >
        <HeaderButton
          isActive={layout === "vertical"}
          label="Switch to vertical split layout"
          onClick={() => onChangeLayout("vertical")}
        >
          <path d="M12 3h9a2 2 0 0 1 2 2v12a2 2 0 0 1-2 2h-9" fill="none" />
          <path d="M3 17V5a2 2 0 0 1 2-2h7a1 1 0 0 1 1 1v14a1 1 0 0 1-1 1H5a2 2 0 0 1-2-2Z" />
        </HeaderButton>
        <HeaderButton
          isActive={layout === "horizontal"}
          label="Switch to horizontal split layout"
          onClick={() => onChangeLayout("horizontal")}
        >
          <path d="M23 11V3H3v8h20Z" stroke-width="0" />
          <path
            d="M23 17V5a2 2 0 0 0-2-2H5a2 2 0 0 0-2 2v12a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2ZM22 11H4"
            fill="none"
          />
        </HeaderButton>
        <HeaderButton
          isActive={layout === "preview"}
          label="Switch to preview-only layout"
          onClick={() => onChangeLayout("preview")}
        >
          <path
            d="M23 17V5a2 2 0 0 0-2-2H5a2 2 0 0 0-2 2v12a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2Z"
            fill="none"
          />
        </HeaderButton>
        <HeaderButton
          isActive={responsiveDesignMode}
          label="Toggle responsive design mode"
          onClick={onToggleResponsiveDesignMode}
          className="hidden md:block"
        >
          <path
            d="M15 19h6a2 2 0 0 0 2-2V5a2 2 0 0 0-2-2H4a1 1 0 0 0-1 1"
            fill="none"
          />
          <path d="M12 17V9a2 2 0 0 0-2-2H5a2 2 0 0 0-2 2v8a2 2 0 0 0 2 2h5a2 2 0 0 0 2-2Z" />
        </HeaderButton>
      </div>

      <div
        className={tw
          `hidden sm:block mx-6 lg:mx-4 w-px h-6 bg-gray-200 dark:bg-gray-700`}
      />

      <HeaderButton
        className="ml-4 sm:ml-0 ring-1 ring-gray-900/5 shadow-sm hover:bg-gray-50 dark:ring-0 dark:bg-gray-800 dark:hover:bg-gray-700 dark:shadow-highlight/4"
        naturalWidth={24}
        naturalHeight={24}
        width={36}
        height={36}
        label={
          <>
            <span className={tw`dark:hidden`}>Switch to dark theme</span>
            <span className={tw`hidden dark:inline`}>
              Switch to light theme
            </span>
          </>
        }
        onClick={onToggleTheme}
        iconClassName="stroke-sky-500 fill-sky-100 group-hover:stroke-sky-600 dark:stroke-gray-400 dark:fill-gray-400/20 dark:group-hover:stroke-gray-300"
        ringClassName="focus-visible:ring-sky-500 dark:focus-visible:ring-2 dark:focus-visible:ring-gray-400"
      >
        <g class={tw`dark:opacity-0`}>
          <path d="M15 12a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z"></path>
          <path
            d="M12 4v.01M17.66 6.345l-.007.007M20.005 12.005h-.01M17.66 17.665l-.007-.007M12 20.01V20M6.34 17.665l.007-.007M3.995 12.005h.01M6.34 6.344l.007.007"
            fill="none"
          >
          </path>
        </g>
        <g class={tw`opacity-0 dark:opacity-100`}>
          <path d="M16 12a4 4 0 1 1-8 0 4 4 0 0 1 8 0Z"></path>
          <path
            d="M12 3v1M18.66 5.345l-.828.828M21.005 12.005h-1M18.66 18.665l-.828-.828M12 21.01V20M5.34 18.666l.835-.836M2.995 12.005h1.01M5.34 5.344l.835.836"
            fill="none"
          >
          </path>
        </g>
      </HeaderButton>
    </div>
  </header>
);
