/** @jsx h */
/** @jsxFrag  Fragment */

import {
  apply,
  css,
  Fragment,
  h,
  tw,
  useCallback,
  useContext,
  useEffect,
} from "../../client_deps.ts";

import { AppContext } from "./provider.tsx";
import { OffcanvasProps } from "./types.ts";

export function Offcanvas({
  title = "Offcanvas Title",
  position = "right",
  backdrop = true,
  allowClickAway = true,
  allowEsc = true,
  allowScroll = true,
  className = "",
  styles = {},
  children,
}: OffcanvasProps) {
  const { handleClose, isOpen, randomId } = useContext(AppContext);

  const onClickOutside = useCallback(() => {
    if (!allowClickAway) return;

    if (isOpen) {
      if (handleClose) handleClose();
    }
  }, [allowClickAway, isOpen, handleClose]);

  const onEscKey = useCallback(
    (event: KeyboardEvent) => {
      if (!allowEsc) return;

      if (event.key === "Escape") {
        if (isOpen) {
          if (handleClose) handleClose();
        }
      }
    },
    [allowEsc, isOpen, handleClose],
  );

  useEffect(() => {
    document.addEventListener("keydown", onEscKey, false);
    return () => document.removeEventListener("keydown", onEscKey);
  }, [onEscKey]);

  useEffect(() => {
    document.addEventListener("click", onClickOutside, false);
    return () => document.removeEventListener("click", onClickOutside);
  }, [onClickOutside]);

  useEffect(() => {
    if (!allowScroll) {
      if (isOpen) document.body.style.overflow = "hidden";
    }

    return () => {
      document.body.style.overflow = "";
    };
  }, [isOpen, allowScroll]);

  const offcanvasStyles = css`
    position: fixed;
    bottom: 0;
    z-index: 1050;
    display: flex;
    flex-direction: column;
    max-width: 100%;
    background-color: #fff;
    background-clip: padding-box;
    outline: 0;
    transition: transform 0.3s ease-in-out;
    @media (prefers-reduced-motion: reduce) {
      & {
        transition: none;
      }
    }`;
  const globalStyles = css({
    ":global": {
      ".offcanvasShow": {
        transform: "none !important",
      },
      ".backdropShow": {
        visibility: "visible !important",
        opacity: "1 !important"
      }
    },
  });

  const topStyles = css` 
    top: 0;
    right: 0;
    left: 0;
    height: 30vh;
    max-height: 100%;
    border-bottom: 1px solid rgba(0, 0, 0, 0.2);
    transform: translateY(-100%);`;

  const rightStyles = css`
    top: 0;
    right: 0;
    width: 30vw;
    border-left: 1px solid rgba(0, 0, 0, 0.2);
    transform: translateX(100%);`;

  const bottomStyles = css`
    right: 0;
    left: 0;
    height: 30vh;
    max-height: 100%;
    border-top: 1px solid rgba(0, 0, 0, 0.2);
    transform: translateY(100%);`;

  const leftStyles = css`
    top: 0;
    left: 0;
    width: 30vw;
    border-right: 1px solid rgba(0, 0, 0, 0.2);
    transform: translateX(-100%); `;
  const headerStyles = css`
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding: 1rem;`;

  const titleStyles = css`
    margin: 0;
    line-height: 1.5;
    `;
  const closeStyles = css`
    box-sizing: content-box;
    width: 1em;
    height: 1em;
    padding: 0.25em 0.25em;
    color: #000;
    background: transparent
      url("data:image/svg+xml,%3csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 16 16' fill='%23000'%3e%3cpath d='M.293.293a1 1 0 011.414 0L8 6.586 14.293.293a1 1 0 111.414 1.414L9.414 8l6.293 6.293a1 1 0 01-1.414 1.414L8 9.414l-6.293 6.293a1 1 0 01-1.414-1.414L6.586 8 .293 1.707a1 1 0 010-1.414z'/%3e%3c/svg%3e")
      center/1em auto no-repeat;
    border: 0;
    border-radius: 0.25rem;
    opacity: 0.5;
    cursor: pointer;
    &:hover {
      color: #000;
      text-decoration: none;
      opacity: 0.75;
    }
    
    &:focus {
      outline: 0;
      box-shadow: 0 0 0 0.25rem rgba(13, 110, 253, 0.25);
      opacity: 1;
    }`;
  const bodyStyles = css`
    flex-grow: 1;
    padding: 1rem 1rem;
    overflow-y: auto;`;

  const backdropStyles = css`
    position: fixed;
    left: 0;
    top: 0;
    bottom: 0;
    right: 0;
    background-color: rgba(0, 0, 0, 0.5);
    opacity: 0;
    visibility: hidden;
    transition: visibility 0.2s ease-in-out, opacity 0.2s ease-in-out;`;

  return (
    <>
      <div
        id={"offcanvas_" + randomId}
        className={(isOpen ? 'offcanvasShow ' : '')+ tw(
          globalStyles,
          offcanvasStyles,
          position == "bottom" && bottomStyles,
          position == "left" && leftStyles,
          position == "right" && rightStyles,
          position == "top" && topStyles,
          className,
        )}
        tabIndex={-1}
        style={styles}
        role="dialog"
        aria-labelledby={tw(titleStyles)}
        aria-modal="true"
        onClick={(event) => event.stopPropagation()}
        aria-hidden="true"
      >
        <div className={tw(headerStyles)}>
          <h5 className={tw(titleStyles)}>{title}</h5>
          <button
            className={tw(closeStyles)}
            onClick={handleClose}
            type="button"
            tabIndex={0}
            aria-label="Close"
          />
        </div>
        <div className={tw(bodyStyles)}>
          {children ||
            "Some text as placeholder. In real life you can have the elements you have chosen. Like, text, images, lists, etc."}
        </div>
      </div>

      {backdrop && (
        <div className={(isOpen?'backdropShow ':'') + tw(backdropStyles)} />
      )}
    </>
  );
}
