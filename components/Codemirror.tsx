/** @jsx h */
/** @jsxFrag  Fragment */

// deno-lint-ignore-file no-explicit-any
import {
  Fragment,
  FunctionComponent,
  h,
  tw,
  useEffect,
  useRef,
  useState,
} from "../client_deps.ts";

import {
  basicSetup,
  EditorState,
  EditorView,
} from "https://raw.githubusercontents.com/binfn/codemirror.king/main/basic-setup/src/basic-setup.ts";
import {
  EditorSelection,
  Extension,
  StateEffect,
} from "https://raw.githubusercontents.com/binfn/codemirror.king/main/state/src/index.ts";

import {
  keymap,
} from "https://raw.githubusercontents.com/binfn/codemirror.king/main/view/src/keymap.ts";

import {
  indentWithTab,
} from "https://raw.githubusercontents.com/binfn/codemirror.king/main/commands/src/commands.ts";

import {
  placeholder,
} from "https://raw.githubusercontents.com/binfn/codemirror.king/main/view/src/placeholder.ts";

import {
  ViewUpdate,
} from "https://raw.githubusercontents.com/binfn/codemirror.king/main/view/src/extension.ts";

import { oneDark } from "https://raw.githubusercontents.com/binfn/codemirror.king/main/theme-one-dark/src/one-dark.ts";

export const CodeMirror: FunctionComponent<{
  value: string;
  onChange: (value: string, vu: ViewUpdate) => void;
  onUpdate?: (update: ViewUpdate) => void;
  height?: string;
  width?: string;
  selection?: EditorSelection | { anchor: number; head?: number };
  extensions?: Extension;
  editable?: boolean;
  theme?: "dark" | "light" | Extension;
  placeholderStr?: string;
  defaultIndentWithTab?: boolean;
  defaultBasicSetup?: boolean;
  autoFocus?: boolean;
}> = ({
  value,
  onChange,
  onUpdate,
  height = "100%",
  width = "100%",
  selection = undefined,
  extensions = [],
  editable = true,
  theme = "light",
  placeholderStr = "",
  defaultIndentWithTab = true,
  defaultBasicSetup = true,
  autoFocus = true,
}) => {
  const [state, setState] = useState<EditorState>();
  const [view, setView] = useState<EditorView>();
  const ref = useRef<any>();
  const defaultThemeOption = EditorView.theme({
    "&": {
      height: "100%",
      width: "100%",
    },
  });

  const oneLight = EditorView.theme(
    {
      "&": {
        backgroundColor: "#fff",
      },
    },
    {
      dark: false,
    },
  );

  const updateListener = EditorView.updateListener.of((vu: ViewUpdate) => {
    if (vu.docChanged && typeof onChange === "function") {
      const doc = vu.state.doc;
      const value = doc.toString();
      onChange(value, vu);
    }
  });
  let getExtensions = [updateListener, defaultThemeOption];
  if (defaultIndentWithTab) {
    getExtensions.unshift(keymap.of([indentWithTab]));
  }
  if (defaultBasicSetup) {
    getExtensions.unshift(basicSetup);
  }

  if (placeholderStr) {
    getExtensions.unshift(placeholder(placeholderStr));
  }

  switch (theme) {
    case "light":
      getExtensions.push(oneLight);
      break;
    case "dark":
      getExtensions.push(oneDark);
      break;
    default:
      getExtensions.push(theme);
      break;
  }

  if (editable === false) {
    getExtensions.push(EditorView.editable.of(false));
  }

  if (onUpdate && typeof onUpdate === "function") {
    getExtensions.push(EditorView.updateListener.of(onUpdate));
  }
  getExtensions = getExtensions.concat(extensions);

  useEffect(() => {
    if (ref.current && !state) {
      const stateCurrent = EditorState.create({
        doc: value,
        selection,
        extensions: getExtensions,
      });
      setState(stateCurrent);
      if (!view) {
        const viewCurrent = new EditorView({
          state: stateCurrent,
          parent: ref.current,
        });
        setView(viewCurrent);
      }
    }
    return () => {
      if (view) {
        setView(undefined);
      }
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [ref.current, state]);

  useEffect(() => {
    if (autoFocus && view) {
      view.focus();
    }
  }, [autoFocus, view]);

  useEffect(() => {
    const currentValue = view ? view.state.doc.toString() : "";
    if (view && value !== currentValue) {
      view.dispatch({
        changes: { from: 0, to: currentValue.length, insert: value || "" },
      });
    }
  }, [value, view]);

  useEffect(() => {
    if (view) {
      view.dispatch({ effects: StateEffect.reconfigure.of(getExtensions) });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [
    theme,
    extensions,
    height,
    width,
    placeholderStr,
    editable,
    defaultIndentWithTab,
    defaultBasicSetup,
  ]);

  return (
    <div className={tw`relative flex-auto`}>
      <div ref={ref} className={tw`absolute inset-0 w-full h-full`} />
    </div>
  );
};
