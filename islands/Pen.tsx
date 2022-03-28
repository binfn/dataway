// deno-lint-ignore-file
/** @jsx h */
/** @jsxFrag Fragment */
import {
  apply,
  css,
  Fragment,
  FunctionComponent,
  h,
  Head,
  PageProps,
  SplitPane,
  tw,
  useCallback,
  useDebounce,
  useEffect,
  useIsomorphicLayoutEffect,
  useMedia,
  useRef,
  useState,
} from "../client_deps.ts";
import { Header } from "../components/Header.tsx";
import { TabBar } from "../components/TabBar.tsx";
import { Preview } from "../components/Preview.tsx";

import { toggleTheme } from "../utils/theme.ts";

const HEADER_HEIGHT = 60 - 1;
const TAB_BAR_HEIGHT = 40;
const RESIZER_SIZE = 1;
const DEFAULT_RESPONSIVE_SIZE = { width: 540, height: 720 };

export const Pen: FunctionComponent<{
  initialContent: {
    id: string;
    html: string;
    css: string;
  };
  initialPath: string;
  initialLayout: "preview" | "horizontal" | "vertical";
  initialResponsiveSize: { width: number; height: number } | false | null;
  initialActiveTab: "html" | "css";
}> = ({
  initialContent,
  initialPath,
  initialLayout,
  initialResponsiveSize,
  initialActiveTab,
}) => {
  const previewRef = useRef<HTMLIFrameElement>(null);
  const worker = useRef<any>();
  const [size, setSize] = useState<{
    percentage: number;
    layout: "preview" | "horizontal" | "vertical";
    current: number;
    min?: number;
    max?: number;
  }>({ percentage: 0.5, layout: initialLayout, current: 0 });

  const [resizing, setResizing] = useState(false);
  const [activeTab, setActiveTab] = useState(initialActiveTab);
  const [activePane, setActivePane] = useState(
    initialLayout === "preview" ? "preview" : "editor",
  );
  const isLg = useMedia("(min-width: 1024px)");
  const [dirty, setDirty] = useState(false);
  const [renderEditor, setRenderEditor] = useState(false);

  const editorRef = useRef();
  const [responsiveDesignMode, setResponsiveDesignMode] = useState(
    initialResponsiveSize ? true : false,
  );
  const [shouldClearOnUpdate, setShouldClearOnUpdate] = useState(true);

  const [responsiveSize, setResponsiveSize] = useState(
    initialResponsiveSize || DEFAULT_RESPONSIVE_SIZE,
  );

  const [jit, setJit] = useState(false);

  useEffect(() => {
    setDirty(true);
  }, [
    activeTab,
    size.layout,
    responsiveSize.width,
    responsiveSize.height,
    responsiveDesignMode,
  ]);

  useEffect(() => {
    if (dirty) {
      function handleUnload(e: WindowEventMap["beforeunload"]) {
        e.preventDefault();
        e.returnValue = "";
      }
      window.addEventListener("beforeunload", handleUnload);
      return () => {
        window.removeEventListener("beforeunload", handleUnload);
      };
    }
  }, [dirty]);

  useEffect(() => {
    setDirty(false);
    if (
      shouldClearOnUpdate &&
      previewRef.current &&
      previewRef.current.contentWindow
    ) {
      previewRef.current.contentWindow.postMessage(
        {
          clear: true,
        },
        "*",
      );
      inject({ html: initialContent.html });
      //   compileNow({
      //     html: initialContent.html,
      //     css: initialContent.css,
      //   })
    }
  }, [initialContent.id]);

  const inject = useCallback((content: any) => {
    previewRef.current?.contentWindow?.postMessage(content, "*");
  }, []);

  const onChange = useCallback(
    (document: any, content: any) => {
      setDirty(true);
    },
    [inject, jit],
  );
  useIsomorphicLayoutEffect(() => {
    function updateSize() {
      setSize((size: any) => {
        const windowSize = size.layout === "horizontal"
          ? document.documentElement.clientHeight - HEADER_HEIGHT
          : document.documentElement.clientWidth;

        if (isLg && size.layout !== "preview") {
          const min = size.layout === "vertical" ? 320 : 320 + TAB_BAR_HEIGHT;
          const max = size.layout === "vertical"
            ? windowSize - min - RESIZER_SIZE
            : windowSize - 320 - RESIZER_SIZE;

          return {
            ...size,
            min,
            max,
            current: Math.max(
              Math.min(Math.round(windowSize * size.percentage), max),
              min,
            ),
          };
        }

        const newSize = (isLg && size.layout !== "preview") ||
            (!isLg && activePane === "editor")
          ? windowSize
          : 0;

        return {
          ...size,
          current: newSize,
          min: newSize,
          max: newSize,
        };
      });
    }
    updateSize();
    window.addEventListener("resize", updateSize);
    return () => {
      window.removeEventListener("resize", updateSize);
    };
  }, [isLg, setSize, size.layout, activePane]);

  useEffect(() => {
    if (isLg) {
      if (size.layout !== "preview") {
        setRenderEditor(true);
      }
    } else if (activePane === "editor") {
      setRenderEditor(true);
    }
  }, [activePane, isLg, size.layout]);

  useEffect(() => {
    if (resizing) {
      document.body.classList.add(
        size.layout === "vertical" ? "cursor-ew-resize" : "cursor-ns-resize",
      );
    } else {
      document.body.classList.remove(
        size.layout === "vertical" ? "cursor-ew-resize" : "cursor-ns-resize",
      );
    }
  }, [resizing]);

  const updateCurrentSize = useCallback((newSize: any) => {
    setSize((size) => {
      const windowSize = size.layout === "vertical"
        ? document.documentElement.clientWidth
        : document.documentElement.clientHeight - HEADER_HEIGHT;
      const percentage = newSize / windowSize;
      return {
        ...size,
        current: newSize,
        percentage: percentage === 1 || percentage === 0
          ? size.percentage
          : percentage,
      };
    });
  }, []);

  // initial state resets
  useEffect(() => {
    setSize((size) => ({ ...size, layout: initialLayout }));
  }, [initialLayout]);
  useEffect(() => {
    setResponsiveDesignMode(Boolean(initialResponsiveSize));
    setResponsiveSize(initialResponsiveSize || DEFAULT_RESPONSIVE_SIZE);
  }, [initialResponsiveSize]);
  useEffect(() => {
    setActiveTab(initialActiveTab);
  }, [initialActiveTab]);
  const styles1 = css`{
     width:100%;
     flex:none;
     display:flex;
     flex-direction:column;
    }`;

  const globalStyles = css({
    "width": "100%",
    "flex": "none",
    "display": "flex",
    "flex-direction": "column",
    ":global": {
      ".Resizer.vertical": {
        "width": "11px",
        "margin": "0 -5px",
        "border-left": "5px solid transparent",
        "border-right": "5px solid transparent",
        "cursor": "ew-resize;",
      },
      ".Resizer.horizontal": {
        "height": "11px",
        "margin": "-5px 0",
        "border-top": "5px solid transparent",
        "border-bottom": "5px solid transparent",
        "cursor": "ns-resize",
        "width": "100%",
      },
      ".dark .Resizer": {
        "background-color": "#1e293b",
      },
      ".Resizer": {
        "background-color": "#e2e8f0",
        "z-index": 1,
        "background-clip": "padding-box",
      },
    },
  });

  return (
    <div className={tw(globalStyles)}>
      {/* style="width:100%;flex:none;display:flex;flex-direction:column;" */}
      <Header
        layout={size.layout}
        onChangeLayout={(layout) => setSize((size) => ({ ...size, layout }))}
        responsiveDesignMode={responsiveDesignMode}
        onToggleResponsiveDesignMode={() =>
          setResponsiveDesignMode(!responsiveDesignMode)}
        onToggleTheme={toggleTheme}
      >
      </Header>
      <main
        className={tw
          `flex-auto relative border-t border-gray-200 dark:border-gray-800`}
      >
        {initialContent && typeof size.current !== "undefined"
          ? (
            <>
              {(!isLg || size.layout !== "preview") && (
                <TabBar
                  width={size.layout === "vertical" && isLg
                    ? size.current
                    : "100%"}
                  isLoading={false}
                  showPreviewTab={!isLg}
                  activeTab={isLg || activePane === "editor"
                    ? activeTab
                    : "preview"}
                  onChange={(tab) => {
                    if (tab === "preview") {
                      setActivePane("preview");
                    } else {
                      setActivePane("editor");
                      setActiveTab(tab);
                    }
                  }}
                />
              )}

              <SplitPane
                split={size.layout === "horizontal" ? "horizontal" : "vertical"}
                minSize={size.min}
                maxSize={size.max}
                size={size.current}
                onChange={updateCurrentSize}
                paneStyle={{ marginTop: -1 }}
                pane1Style={{ display: "flex", flexDirection: "column" }}
                onDragStarted={() => setResizing(true)}
                onDragFinished={() => setResizing(false)}
                allowResize={isLg && size.layout !== "preview"}
                resizerClassName={isLg && size.layout !== "preview"
                  ? "Resizer"
                  : "Resizer-collapsed"}
              >
                <div className="border-t border-gray-200 dark:border-white/10 mt-12 flex-auto flex">
                  {
                    // renderEditor && (
                    //   <Editor
                    //     editorRef={(ref) => (editorRef.current = ref)}
                    //     initialContent={initialContent}
                    //     onChange={onChange}
                    //     worker={worker}
                    //     activeTab={activeTab}
                    //     tailwindVersion={tailwindVersion}
                    //   />
                    // )
                  }
                  {JSON.stringify(responsiveSize)}
                </div>
                <div className="absolute inset-0 w-full h-full">
                  {

                      <Preview
                        ref={previewRef}
                        responsiveDesignMode={isLg && responsiveDesignMode}
                        responsiveSize={responsiveSize}
                        onChangeResponsiveSize={setResponsiveSize}
                        iframeClassName={resizing ? "pointer-events-none" : ""}
                        onLoad={() => {
                          inject({
                            html: initialContent.html,
                            css: "",
                            // ...(initialContent.compiledCss
                            //   ? { css: initialContent.compiledCss }
                            //   : {}),
                          });
                          // compileNow({
                          //   css: initialContent.css,
                          //   html: initialContent.html
                          // })
                        }}
                      />


                    // <ErrorOverlay error={error} />
                  }
                </div>
              </SplitPane>
            </>
          )
          : null}
      </main>
    </div>
  );
};

export default Pen;
