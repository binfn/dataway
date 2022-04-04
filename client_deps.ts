/// <reference types="https://deno.land/x/xuybin_fresh@v0.0.4/types.d.ts" />
export * from "https://deno.land/x/xuybin_fresh@v0.0.5/runtime.ts";
export { apply, setup, tw } from "https://esm.sh/twind@0.16.16";
export { css } from "https://esm.sh/twind@0.16.16/css";
export {
  useDebounce,
  useIsomorphicLayoutEffect,
  useLocalStorageState,
  useMedia,
} from "https://deno.land/x/preact_ahooks@v0.0.6/mod.ts";
export * from "https://deno.land/x/preact_split_pane@v0.1.1/mod.ts";

// https://github.com/preactjs/preact/issues/1521
export { forwardRef,unmountComponentAtNode,render,findDOMNode } from "https://esm.sh/preact@10.x.x/compat";

import { IS_BROWSER } from "https://deno.land/x/xuybin_fresh@v0.0.5/runtime.ts";
import { cssomSheet, setup, ThemeResolver } from "https://esm.sh/twind@0.16.16";

import * as colors from "https://esm.sh/twind@0.16.16/colors";

export function setupTheme() {
  return {
    fill: (theme: ThemeResolver) => theme("colors"),
    stroke: (theme: ThemeResolver) => theme("colors"),
    // fontFamily: {
    //   sans: ['Inter var', ...defaultTheme.fontFamily.sans],
    // },
    extend: {
      colors: {
        ...colors,
        // renamed to 'sky' in v2.2
        sky: colors.lightBlue,
        //  renamed to 'stone' in v3.0
        stone: colors.warmGray,
        // renamed to 'neutral' in v3.0
        neutral: colors.trueGray,
        // renamed to 'slate' in v3.0
        slate: colors.blueGray,
        // renamed to 'gray' in v3.0
        // gray:colors.coolGray,
        //gray from 'play.tailwindcss.com'
        gray: colors.blueGray,
        "white/10": "rgb(255 255 255/.1)",
        "gray-400/20": "rgb(148 163 184/.2)",
        "gray-400/30": "rgb(148 163 184/.3)",
        "sky-400/50": "rgb(56 189 248/.5)",
        "gray-900/5": "rgb(15 23 42/0.05)",
        "gray-400/70": "rgb(148 163 184/.7)",
      },

      // fill: {
      //   "gray-400/20": "rgb(148 163 184/.2)",
      //   "gray-400/30": "rgb(148 163 184/.3)",
      //   "sky-400/50": "rgb(56 189 248/.5)",
      // },
      // ringColor: {
      //   "gray-900/5": "rgb(15 23 42/0.05)",
      //   "gray-400/70": "rgb(148 163 184/.7)",
      // },
      // stroke: {
      //   "gray-400/70": "rgb(148 163 184/.7)",
      // },
      boxShadow: (theme: ThemeResolver) => ({
        "highlight/4": "inset 0 1px 0 0 rgb(255 255 255 / 0.04)",
        "highlight/20": "inset 0 1px 0 0 rgb(255 255 255 / 0.2)",
        copied: `0 0 0 1px ${theme("colors.sky.500")}, inset 0 0 0 1px ${
          theme(
            "colors.sky.500",
          )
        }`,
      }),
    },
  };
}
if (IS_BROWSER) {
  //setup({});
  setup({
    darkMode: "class",
    sheet: cssomSheet({ target: new CSSStyleSheet() }),
    theme: setupTheme(),
  });
}
