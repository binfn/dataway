/** @jsx h */
import { h,tw, IS_BROWSER, useState,FunctionComponent } from "../client_deps.ts";
import { HeaderButton } from "../components/HeaderButton.tsx";

interface CounterProps {
  start: number;
}

const Counter: FunctionComponent<CounterProps> = (props) => {
  const [count, setCount] = useState(props.start);
  return (
    <div>
      <p>{count}</p>
      <button onClick={() => setCount(count - 1)} disabled={!IS_BROWSER} type="button" class={tw`inline-block px-6 py-2.5 bg-blue-600 text-white font-medium text-xs leading-tight uppercase rounded shadow-md hover:bg-blue-700 hover:shadow-lg focus:bg-blue-700 focus:shadow-lg focus:outline-none focus:ring-0 active:bg-blue-800 active:shadow-lg transition duration-150 ease-in-out`}>
      -1
      </button>
      <button onClick={() => setCount(count + 1)} disabled={!IS_BROWSER} type="button" class={tw`inline-block px-6 py-2.5 bg-blue-600 text-white font-medium text-xs leading-tight uppercase rounded shadow-md hover:bg-blue-700 hover:shadow-lg focus:bg-blue-700 focus:shadow-lg focus:outline-none focus:ring-0 active:bg-blue-800 active:shadow-lg transition duration-150 ease-in-out`}>
      +1
      </button>

      <HeaderButton
          className="ml-4 sm:ml-0 ring-1 ring-gray-900/5 shadow-sm hover:bg-gray-50 dark:ring-0 dark:bg-gray-800 dark:hover:bg-gray-700 dark:shadow-highlight/4"
          naturalWidth={24}
          naturalHeight={24}
          width={36}
          height={36}
          label={
            <div>
              <span className={tw`dark:hidden`}>Switch to dark theme</span>
              <span className={tw`hidden dark:inline`}>
                Switch to light theme
              </span>
            </div>
          }
          onClick={() => {
            setCount(count + 2)
          }}
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
  );
}

export default Counter;