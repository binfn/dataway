/** @jsx  h */
/** @jsxFrag  Fragment */

import { Logo } from "./Logo.tsx";
import { HeaderButton } from "./HeaderButton.tsx";
import { Fragment, FunctionComponent, h, tw } from "../client_deps.ts";
import {
  Offcanvas,
  OffcanvasProvider,
  Trigger,
} from "../components/Offcanvas/mod.tsx";
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
    style={{'padding-left': '12px', fontFeatureSettings: '"cv02", "cv03", "cv04", "cv11"' }}
  >
    <div
      className={tw`flex-auto flex items-center min-w-0 space-x-6`}
      onClick={() => console.log("onLogoClick")}
    >
      <OffcanvasProvider
        onOpen={() => console.log("open")}
        onClose={() => console.log("onClose")}
      >
        <Trigger styles={{ "outline": "none" }}>
          <svg
            style="width: 36px;height: 26px; margin-top: 4px;"
            className={tw`fill-cyan-500 hover:fill-pink-500`}
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 448 512"
          >
            <path d="M0 96C0 78.33 14.33 64 32 64H416C433.7 64 448 78.33 448 96C448 113.7 433.7 128 416 128H32C14.33 128 0 113.7 0 96zM0 256C0 238.3 14.33 224 32 224H416C433.7 224 448 238.3 448 256C448 273.7 433.7 288 416 288H32C14.33 288 0 273.7 0 256zM416 448H32C14.33 448 0 433.7 0 416C0 398.3 14.33 384 32 384H416C433.7 384 448 398.3 448 416C448 433.7 433.7 448 416 448z" />
          </svg>
        </Trigger>
        <Offcanvas position="left" allowEsc={false} />
      </OffcanvasProvider>
      <a
        id="logo"
        href="/projects"
        style="padding: 0 .5rem;display: flex;align-items: center;margin-left: 8px;margin-right: 8px;"
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="28"
          height="28"
          viewBox="0 0 512 512"
        >
          <title>Deno logo</title>
          <mask id="a">
            <circle fill="white" cx="256" cy="256" r="230"></circle>
          </mask>
          <circle cx="256" cy="256" r="256"></circle>
          <path
            mask="url(#a)"
            stroke="white"
            stroke-width="25"
            stroke-linecap="round"
            d="M71 319l17-63M107.964 161.095l17-63M36.93 221l17-63M125.964 385l17-63M160.372 486.829l17-63M230 456.329l17-63M206.257 92.587l17-63M326.395 173.004l17-63M452.182 304.693l17-63M409.124 221l17-63M299.027 54.558l17-63M400.624 86.058l17-63"
          >
          </path>
          <path
            mask="url(#a)"
            fill="white"
            stroke="black"
            stroke-width="12"
            d="M252.225 344.418c-86.65 2.61-144.576-34.5-144.576-94.363 0-61.494 60.33-111.145 138.351-111.145 37.683 0 69.532 10.65 94.392 30.092 21.882 17.113 37.521 40.526 45.519 66.312 2.574 8.301 22.863 83.767 61.112 227.295l1.295 4.86-159.793 74.443-1.101-8.063c-8.85-64.778-16.546-113.338-23.076-145.634-3.237-16.004-6.178-27.96-8.79-35.794-1.227-3.682-2.355-6.361-3.303-7.952a12.56 12.56 0 00-.03-.05z"
          >
          </path>
          <circle mask="url(#a)" cx="262" cy="203" r="16"></circle>
        </svg>
        <span style="margin-left: 12px;">GitRepo</span>
      </a>
      {/* <span style="margin-left: 0px;margin-right: 4px;opacity: .5;" >/</span> */}
      <span id="project_name" style="margin-left: 0px;">
        <a href="/projects/dataway">/api/index.tsx</a>
      </span>
      {/* <span
        id="project_public"
        class="name-icon"
        title="This playground is public. The code is visible to everyone."
        style="margin-left: 6px;margin-right: 3px;">
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 448 512"
           className={tw`fill-black dark:fill-white`}
           stroke="currentColor"
           style="height: 1rem;width: 1rem;">
             <path d="M439.55 236.05L244 40.45a28.87 28.87 0 0 0-40.81 0l-40.66 40.63 51.52 51.52c27.06-9.14 52.68 16.77 43.39 43.68l49.66 49.66c34.23-11.8 61.18 31 35.47 56.69-26.49 26.49-70.21-2.87-56-37.34L240.22 199v121.85c25.3 12.54 22.26 41.85 9.08 55a34.34 34.34 0 0 1-48.55 0c-17.57-17.6-11.07-46.91 11.25-56v-123c-20.8-8.51-24.6-30.74-18.64-45L142.57 101 8.45 235.14a28.86 28.86 0 0 0 0 40.81l195.61 195.6a28.86 28.86 0 0 0 40.8 0l194.69-194.69a28.86 28.86 0 0 0 0-40.81z"/>
          </svg>
      </span> */}
      <span
        id="project_public"
        class="name-icon"
        title="This playground is public. The code is visible to everyone."
        style="margin-left: 3px;margin-right: 6px;">
        <svg
          class="icon icon-globe"
          xmlns="http://www.w3.org/2000/svg"
          className={tw`dark:fill-black fill-white`}
          viewBox="0 0 24 24"
          stroke="currentColor"
          style="height: 1rem;width: 1rem;">
          <path
            stroke-linecap="round"
            stroke-linejoin="round"
            stroke-width="2"
            d="M21 12a9 9 0 01-9 9m9-9a9 9 0 00-9-9m9 9H3m9 9a9 9 0 01-9-9m9 9c1.657 0 3-4.03 3-9s-1.343-9-3-9m0 18c-1.657 0-3-4.03-3-9s1.343-9 3-9m-9 9a9 9 0 019-9">
          </path>
        </svg>
        
      </span>
      

      {/* <Logo className={`flex-none text-black dark:text-white`} /> */}
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
