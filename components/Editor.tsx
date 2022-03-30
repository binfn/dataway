/** @jsx h */
/** @jsxFrag  Fragment */

// deno-lint-ignore-file no-explicit-any
import {
  Fragment,
  FunctionComponent,
  h,
  IS_BROWSER,
  useEffect,
  useIsomorphicLayoutEffect,
  useRef,
  useState,
} from "../client_deps.ts";
import { getTheme, onDidChangeTheme } from "../utils/theme.ts";

// src/modes
import { default as CodeMirror } from "https://esm.sh/codemirror@5.x.x/src/modes";

//import { createRequire } from "https://deno.land/std@0.130.0/node/module.ts";
//const require = createRequire(import.meta.url);
//require("https://esm.sh/codemirror@5.x.x/mode/htmlmixed/htmlmixed");
//require("https://esm.sh/codemirror@5.x.x/mode/javascript/javascript");
// import "https://esm.sh/codemirror@5.x.x/mode/htmlmixed/htmlmixed";
// import "https://esm.sh/codemirror@5.x.x/mode/javascript/javascript";
if (IS_BROWSER) {
  console.log("----import()-------");
  //import ("https://esm.sh/codemirror@5.x.x/src/addon/runmode/runmode.node")
  //import("https://esm.sh/codemirror@5.x.x/mode/htmlmixed/htmlmixed");
  //import("https://esm.sh/codemirror@5.x.x/mode/javascript/javascript");
  //import ("https://esm.sh/codemirror@5.x.x/src/addon/runmode/runmode-standalone")
}

const docToMode = {
  html: "htmlmixed",
  css: "text/typescript", //or "application/typescript"
};

const modeToDoc: any = {
  htmlmixed: "html",
  javascript: "css",
};

export const Editor: FunctionComponent<{
  initialContent: {
    id: string;
    html: string;
    css: string;
  };
  onChange: (document: any, content: any) => void;
  activeTab: "html" | "css";
  editorRef: (ref: { getValue: (doc: "html" | "css") => string }) => void;
}> = ({
  initialContent,
  onChange,
  activeTab,
  editorRef,
}) => {
  const ref = useRef<any>();
  const cmRef = useRef<any>(); //useRef<CodeMirror.Editor>()
  const content = useRef(initialContent);
  const history = useRef<any>({});
  const [i, setI] = useState(0);
  const skipNextOnChange = useRef(true);
  const initial = useRef(true);
  useEffect(() => {
    console.log("-------useEffect----------");
    cmRef.current = CodeMirror(ref.current, {
      value: initialContent[activeTab],
      //mode: docToMode[activeTab],
      lineNumbers: true,
      viewportMargin: Infinity,
      // matchBrackets: true,
      tabSize: 2,
      theme: getTheme(),
      addModeClass: true,
    });
    editorRef({
      getValue(doc: "html" | "css") {
        return content.current[doc];
      },
    });
  }, []);

  useEffect(() => {
    if (initial.current) {
      initial.current = false;
      return;
    }
    content.current = initialContent;
    history.current = {};
    cmRef.current?.setValue(initialContent[activeTab]);
    cmRef.current?.clearHistory();
  }, [initialContent]);

  useEffect(() => {
    function handleChange() {
      content.current[activeTab] = cmRef.current?.getValue() ?? "";
      if (skipNextOnChange.current) {
        skipNextOnChange.current = false;
      } else {
        onChange(activeTab, content.current);
      }
    }
    cmRef.current?.on("change", handleChange);
    return () => {
      cmRef.current?.off("change", handleChange);
    };
  }, [activeTab, onChange]);

  useEffect(() => {
    history.current[
      modeToDoc[cmRef.current?.getOption("mode") as string ?? ""]
    ] = cmRef.current?.getHistory();

    skipNextOnChange.current = true;
    cmRef.current?.setValue(content.current[activeTab]);
    cmRef.current?.setOption("mode", docToMode[activeTab]);
    if (history.current[activeTab]) {
      cmRef.current?.setHistory(history.current[activeTab]);
    } else {
      cmRef.current?.clearHistory();
    }
    setI((i) => i + 1);
  }, [activeTab]);

  useIsomorphicLayoutEffect(() => {
    if (!cmRef.current) return;
    cmRef.current.refresh();
    cmRef.current.focus();
  }, [i]);

  useEffect(() => {
    function handleThemeChange(theme: any) {
      cmRef.current?.setOption("theme", theme);
    }
    const dispose = onDidChangeTheme(handleThemeChange);
    return () => dispose();
  }, []);

  return (
    <div className="relative flex-auto">
      <div ref={ref} className="absolute inset-0 w-full h-full" />
    </div>
  );
};
