export function getTheme() {
  console.log("---getTheme---");
  return document.querySelector("html")?.classList.contains("dark")
    ? "dark"
    : "light";
}

export function changeTheme() {
  const root = document.querySelector("html");
  if (root) {
    root.classList.add("disable-transitions");
    if (root.classList.contains("dark")) {
      root.classList.remove("dark");
    } else {
      root.classList.add("dark");
    }
    // deno-lint-ignore no-window-prefix
    window.setTimeout(() => {
      root.classList.remove("disable-transitions");
    }, 0);
  }
}
