function clearCanvas(
  ctx: CanvasRenderingContext2D,
  width: number,
  height: number
) {
  // Store the current transformation matrix
  ctx.save();

  // Use the identity matrix while clearing the canvas
  ctx.setTransform(1, 0, 0, 1, 0, 0);
  ctx.clearRect(0, 0, width, height);

  // Restore the transform
  ctx.restore();
}

export { clearCanvas };
