/** @jsx h */
import { h, SplitPane, tw } from "../client_deps.ts";
import Counter from "../islands/Counter.tsx";
export default function Home() {
  return (
    <div>
      <svg
        width="42"
        height="36"
        viewBox="-8 -7 42 36"
        stroke-width="2"
        stroke-linecap="round"
        stroke-linejoin="round"
        class={tw
          `ring-1 ring-gray-900/5  stroke-sky-500 dark:fill-sky-400/50 dark:stroke-sky-400`}
      >
        <path d="M12 3h9a2 2 0 0 1 2 2v12a2 2 0 0 1-2 2h-9" fill="none"></path>
        <path d="M3 17V5a2 2 0 0 1 2-2h7a1 1 0 0 1 1 1v14a1 1 0 0 1-1 1H5a2 2 0 0 1-2-2Z">
        </path>
      </svg>

      <svg
        width="36"
        height="36"
        viewBox="-6 -6 36 36"
        stroke-width="2"
        stroke-linecap="round"
        stroke-linejoin="round"
        class={tw
          `stroke-sky-500 fill-sky-100 group-hover:stroke-sky-600 dark:stroke-gray-400 dark:fill-gray-400/20 dark:group-hover:stroke-gray-300`}
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
      </svg>

      <p>
        Welcome to `fresh`. Try update this message in the ./routes/index.tsx
        file, and refresh.
      </p>

      <button
        type="button"
        class={tw
          `text-white bg-gradient-to-br from-purple-600 to-blue-500 hover:bg-gradient-to-bl focus:ring-4 focus:outline-none focus:ring-blue-300 dark:focus:ring-blue-800 font-medium rounded-lg text-sm px-5 py-2.5 text-center mr-2 mb-2`}
      >
        Purple to Blue
      </button>
      <button
        type="button"
        class={tw
          `text-white bg-gradient-to-r from-cyan-500 to-blue-500 hover:bg-gradient-to-bl focus:ring-4 focus:outline-none focus:ring-cyan-300 dark:focus:ring-cyan-800 font-medium rounded-lg text-sm px-5 py-2.5 text-center mr-2 mb-2`}
      >
        Cyan to Blue
      </button>
      <button
        type="button"
        class={tw
          `text-white bg-gradient-to-br from-green-400 to-blue-600 hover:bg-gradient-to-bl focus:ring-4 focus:outline-none focus:ring-green-200 dark:focus:ring-green-800 font-medium rounded-lg text-sm px-5 py-2.5 text-center mr-2 mb-2`}
      >
        Green to Blue
      </button>
      <button
        type="button"
        class={tw
          `text-white bg-gradient-to-r from-purple-500 to-pink-500 hover:bg-gradient-to-l focus:ring-4 focus:outline-none focus:ring-purple-200 dark:focus:ring-purple-800 font-medium rounded-lg text-sm px-5 py-2.5 text-center mr-2 mb-2`}
      >
        Purple to Pink
      </button>
      <button
        type="button"
        class={tw
          `text-white bg-gradient-to-br from-pink-500 to-orange-400 hover:bg-gradient-to-bl focus:ring-4 focus:outline-none focus:ring-pink-200 dark:focus:ring-pink-800 font-medium rounded-lg text-sm px-5 py-2.5 text-center mr-2 mb-2`}
      >
        Pink to Orange
      </button>
      <button
        type="button"
        class={tw
          `text-gray-900 bg-gradient-to-r from-teal-200 to-lime-200 hover:bg-gradient-to-l hover:from-teal-200 hover:to-lime-200 focus:ring-4 focus:outline-none focus:ring-lime-200 dark:focus:ring-teal-700 font-medium rounded-lg text-sm px-5 py-2.5 text-center mr-2 mb-2`}
      >
        Teal to Lime
      </button>
      <button
        type="button"
        class={tw
          `text-gray-900 bg-gradient-to-r from-red-200 via-red-300 to-yellow-200 hover:bg-gradient-to-bl focus:ring-4 focus:outline-none focus:ring-red-100 dark:focus:ring-red-400 font-medium rounded-lg text-sm px-5 py-2.5 text-center mr-2 mb-2`}
      >
        Red to Yellow
      </button>
      <Counter start={3} />

      {
        /* <SplitPane
        split={"vertical"}
        minSize={50}
        resizerClassName={"Resizer"}
      >
        <div className={tw`bg-green-500`}>1</div>
        <div className={tw`bg-blue-500`}>2</div>
      </SplitPane> */
      }
    </div>
  );
}
