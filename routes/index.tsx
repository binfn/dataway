/** @jsx h */

import { h, tw } from "../client_deps.ts";
import Pen from "../islands/Pen.tsx";

export default function Home() {
  return (
    <html>
      {/* className={tw`fixed overflow-hidden h-full`} */}
      <script>
        {`try{if(!('theme' in localStorage)){localStorage.theme=window.matchMedia('(prefers-color-scheme:dark)').matches?'dark':'light'}if(localStorage.theme==='dark'){document.querySelector('html').classList.add('dark')}}catch(_){}`}
      </script>
      <body
        className={tw
          `fixed overflow-hidden w-full min-h-full flex text-gray-900 dark:text-white bg-white dark:bg-gray-900`}
      >
        <Pen
          initialContent={{
            id: "1",
            html: `<!DOCTYPE html>
            <html>
            <head> 
            <meta charset="utf-8"> 
            <title>菜鸟教程(runoob.com)</title> 
            </head>
            <body>
            
            <form action="">
            First name: <input type="text" name="firstname"><br>
            Last name: <input type="text" name="lastname">
            </form>
            
            <p><b>注意：</b> 表单本身是不可见的。并且注意一个文本字段的默认宽度是20个字符。</p>
            
            </body>
            </html>`,
            css: "",
          }}
          initialPath="/a"
          initialLayout="vertical"
          initialResponsiveSize={false}
          initialActiveTab={"html"}
        />
      </body>
    </html>
  );
}
