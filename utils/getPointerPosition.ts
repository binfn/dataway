export function getPointerPosition(event: TouchEvent | MouseEvent) {
  if (event instanceof TouchEvent) {
    return {
      x: event.targetTouches[0].clientX,
      y: event.targetTouches[0].clientY,
    };
  }
  return { x: event.clientX, y: event.clientY };
}
