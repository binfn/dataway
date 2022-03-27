/** @jsx h */

import { h, tw } from "../client_deps.ts";
import { Header }  from "../components/Header.tsx";

export default function Home() {
  return (
    <Header
      layout="vertical"
      onChangeLayout={() => {}}
      onToggleTheme={() => {}}
      responsiveDesignMode={false}
      onToggleResponsiveDesignMode={() => {}}
    >
    </Header>
  );
}
