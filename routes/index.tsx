/** @jsx h */

import { h, tw ,PageProps} from "../client_deps.ts";
import Pen from "../islands/Pen.tsx";
import { Handlers } from "../server_deps.ts";

import {
  DataNode
} from "https://raw.githubusercontents.com/binfn/preact_component/main/tree/interface.tsx";
import { walk } from "https://deno.land/std/fs/walk.ts";
import {
  extname,
  join,
  resolve,
  toFileUrl,
} from "https://deno.land/std/path/mod.ts";
export const handler: Handlers<DataNode[]|null> = {
  async GET(_, ctx) {
    console.log(Deno.cwd())
    console.log(import.meta.url)
    
    //import.meta.url
    const treeData:DataNode[]=[]
    // TODO(lucacasonato): remove the extranious Deno.readDir when
    // https://github.com/denoland/deno_std/issues/1310 is fixed.
    // for await (const _ of Deno.readDir(new URL('../routes', import.meta.url))) {
    //   // do nothing
    // }
    // const routesFolder = walk(new URL('../routes', import.meta.url).href, {
    //   includeDirs: false,
    //   includeFiles: true,
    //   exts: ["tsx", "jsx", "ts", "js"],
    // });
    // for await (const entry of routesFolder) {
    //   if (entry.isFile) {
    //     console.log('name:'+entry.name+'  path:'+entry.path);
    //     // treeData.push({
    //     //   key:"./routes/[name].tsx",
    //     //   title:entry.name
    //     // })
    //     // const file = toFileUrl(entry.path).href.substring(
    //     //   routesUrl.href.length,
    //     // );
    //     // routes.push(file);
    //   }
    // }

    for await (const dirEntry of Deno.readDir(new URL('../routes', import.meta.url))) {
      console.log('routes:'+dirEntry.name);
    }
    for await (const dirEntry of Deno.readDir(new URL('../islands', import.meta.url))) {
      console.log('islands:'+dirEntry.name);
    }
    return ctx.render(null);
  },
};


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
