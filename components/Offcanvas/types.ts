
import {h,ComponentChildren} from "../../client_deps.ts";

export declare type Position = 'left' | 'right' | 'top' | 'bottom'
export declare type Component = 'button' | 'div'

export interface ProviderProps {
  children: ComponentChildren
  onOpen?: () => void
  onClose?: () => void
}
export interface TriggerProps {
  component?: Component
  className?: string
  styles?: h.JSX.CSSProperties
  children?: ComponentChildren
}

export interface OffcanvasProps extends TriggerProps {
  title?: string
  position?: Position
  backdrop?: boolean
  allowClickAway?: boolean
  allowEsc?: boolean
  allowScroll?: boolean
}
