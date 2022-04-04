/** @jsx h */
/** @jsxFrag Fragment */

import {
  Fragment,
  FunctionComponent,
  VNode,
  unmountComponentAtNode,
  findDOMNode,
  useEffect,
  createRef,
  useRef,
  h,
  css,
  Head,
  render,
  tw,
  useState,
} from "../client_deps.ts";
import Tree, {
  TreeNode,
} from "https://raw.githubusercontents.com/binfn/preact_component/main/tree/index.ts";
import {
  AllowDropOptions,
} from "https://raw.githubusercontents.com/binfn/preact_component/main/tree/Tree.tsx";
import {
  NodeDragEventParams,
} from "https://raw.githubusercontents.com/binfn/preact_component/main/tree/contextTypes.ts";
import {
  default as Tooltip,
} from "https://raw.githubusercontents.com/binfn/preact_component/main/tooltip/Tooltip.tsx";

import {
  DataNode,
  EventDataNode,
  Key,
} from "https://raw.githubusercontents.com/binfn/preact_component/main/tree/interface.tsx";

const treeData = [
  {
    key: "0-0",
    title: "parent 1",
    children: [
      {
        key: "0-0-0",
        title: "parent 1-1",
        children: [{ key: "0-0-0-0", title: "parent 1-1-0" }],
      },
      {
        key: "0-0-1",
        title: "parent 1-2",
        children: [
          { key: "0-0-1-0", title: "parent 1-2-0", disableCheckbox: true },
          { key: "0-0-1-1", title: "parent 1-2-1" },
          { key: "0-0-1-2", title: "parent 1-2-2" },
          { key: "0-0-1-3", title: "parent 1-2-3" },
          { key: "0-0-1-4", title: "parent 1-2-4" },
          { key: "0-0-1-5", title: "parent 1-2-5" },
          { key: "0-0-1-6", title: "parent 1-2-6" },
          { key: "0-0-1-7", title: "parent 1-2-7" },
          { key: "0-0-1-8", title: "parent 1-2-8" },
          { key: "0-0-1-9", title: "parent 1-2-9" },
          { key: 1128, title: 1128 },
        ],
      },
    ],
  },
];

const FileTree: FunctionComponent<any> = (props) => {
  const [state, setState] = useState<{
    selectedKeys: Key[];
    gData: DataNode[];
  }>({
    selectedKeys: ["0-1-1"],
    gData: treeData,
  });
  const onRightClick = (info: any) => {
    // 右键菜单 打开,重命名、删除,当前位置后新建文件,新建文件夹
    console.log("right click", info);
    setState({ ...state, selectedKeys: [info.node.props.eventKey] });
    renderCm(info);
  };

  let cmContainer = useRef<HTMLDivElement|null>(null);
  const getContainer = () => {
    console.log("getContainer toolTip1"+toolTip.current +' cmContainer:'+cmContainer.current)
    if (!cmContainer.current) {
      console.log("getContainer toolTip2"+toolTip.current +' cmContainer:'+cmContainer.current)
      cmContainer.current = document.createElement("div");
      document.body.appendChild(cmContainer.current);
    }
    console.log("getContainer toolTip3"+toolTip.current +' cmContainer:'+cmContainer.current)
    return cmContainer;
  };
  

  let toolTip = useRef<VNode|null>(null);

  const globalStyles = css({
    ":global": {
      ".rc-tree-contextmenu":{
        'position': 'absolute',
        'left': '-9999px',
        'top': '-9999px',
        'z-index': '1070',
        'display': 'block',
        'background-color': '#fff',
        '&-hidden': {
          display: 'none'
        },
        '&-inner':{
          border: '1px solid #ddd',
          padding: '10px 20px'
        }
      }
    },
  });
  function contains(root:any, n:any) {
    let node = n;
    while (node) {
      if (node === root) {
        return true;
      }
      node = node.parentNode;
    }
    return false;
  }
  let myRef = useRef<any>();
  useEffect(() => {
    console.log("Here, useEffect act as componentDidMount1");
    getContainer();
    // console.log(ReactDOM.findDOMNode(this), this.cmContainer);
    // console.log(contains(findDOMNode(myRef.current), cmContainer));
    console.log("Here, useEffect act as componentDidMount2");
    return () => {
        if (cmContainer.current) {
          unmountComponentAtNode(cmContainer.current);
          document.body.removeChild(cmContainer.current);
          cmContainer.current = null;
        }
         console.log("Here, you can add clean up code - componentWillUnmount");
       };
   }, [])

  const renderCm = (info: any) => {
    console.log("renderCm toolTip1:"+toolTip.current +' cmContainer:'+cmContainer.current)
    if (toolTip.current!=null) {
      console.log("renderCm toolTip2:"+toolTip.current +' cmContainer:'+cmContainer.current)
      unmountComponentAtNode(cmContainer.current!);
      toolTip.current = null;
    }
    console.log("renderCm toolTip3:"+toolTip.current +' cmContainer:'+cmContainer.current)
    toolTip.current = (
      <Tooltip
        trigger="click"
        placement="bottomRight"
        prefixCls="rc-tree-contextmenu"
        defaultVisible
        overlay={<h4>{info.node.props.title}</h4>}
      >
        <span />
      </Tooltip>
    );
    console.log("renderCm toolTip4:"+toolTip.current +' cmContainer:'+cmContainer.current)
    const container = getContainer();
    Object.assign(cmContainer.current!.style, {
      position: 'absolute',
      left: `${info.event.pageX}px`,
      top: `${info.event.pageY}px`,
    });
    console.log("renderCm toolTip5:"+toolTip.current +' cmContainer:'+cmContainer.current)
    render(toolTip.current, container.current!);
  };

  const onSelect = (selectedKeys: Key[], info: {
    event: "select";
    selected: boolean;
    node: EventDataNode;
    selectedNodes: DataNode[];
    nativeEvent: MouseEvent;
  }) => {
    console.log("onSelect", selectedKeys);
    setState({ ...state, selectedKeys });
  };

  const allowDrop = (
    options: AllowDropOptions,
  ) => {
    if (!options.dropNode.children) {
      if (options.dropPosition === 0) return false;
    }
    return true;
  };

  const onDrop = (
    info: NodeDragEventParams & {
      dragNode: EventDataNode;
      dragNodesKeys: Key[];
      dropPosition: number;
      dropToGap: boolean;
    },
  ) => {
    console.log("drop", info);
    const dropKey = info.node.key;
    const dragKey = info.dragNode.key;
    const dropPos = info.node.pos.split("-");
    const dropPosition = info.dropPosition -
      Number(dropPos[dropPos.length - 1]);

    const loop = (
      data: DataNode[],
      key: string | number,
      callback: (item: DataNode, index: number, arr: DataNode[]) => void,
    ) => {
      data.forEach((item, index, arr) => {
        if (item.key === key) {
          callback(item, index, arr);
          return;
        }
        if (item.children) {
          loop(item.children, key, callback);
        }
      });
    };
    const data = [...state.gData];

    // Find dragObject
    let dragObj: DataNode;
    loop(data, dragKey, (item, index, arr) => {
      arr.splice(index, 1);
      dragObj = item;
    });

    if (dropPosition === 0) {
      // Drop on the content
      loop(data, dropKey, (item) => {
        // eslint-disable-next-line no-param-reassign
        item.children = item.children || [];
        // where to insert 示例添加到尾部，可以是随意位置
        item.children.unshift(dragObj);
      });
    } else {
      // Drop on the gap (insert before or insert after)
      let ar: DataNode[] = [];
      let i = -1;
      loop(data, dropKey, (item, index, arr) => {
        ar = arr;
        i = index;
      });
      if (dropPosition === -1) {
        // @ts-ignore dragObj!=undefined
        ar.splice(i, 0, dragObj);
      } else {
        // @ts-ignore dragObj!=undefined
        ar.splice(i + 1, 0, dragObj);
      }
    }

    setState({
      ...state,
      gData: data,
    });
  };
  const onDoubleClick = (
    e: MouseEvent,
    node: EventDataNode,
  ) => {
    console.log("双击打开" + node.key);
  };
  return (
    <>
      <Head >
        <title>fresh docs</title>
        <link rel="stylesheet" href="/rc-tree.css" />

      </Head>
      <Tree
        ref={myRef}
        draggable
        allowDrop={allowDrop}
        onDrop={onDrop}
        onRightClick={onRightClick}
        onDoubleClick={onDoubleClick}
        className={tw(globalStyles)}
        //className="myCls"
        defaultExpandAll
        treeData={state.gData}
        onSelect={onSelect}
      />
    </>
  );
};

export default FileTree;
