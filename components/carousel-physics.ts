type SelectInertialTargetOptions = {
  currentScrollLeft: number;
  velocity: number;
  targets: readonly number[];
  projectionMs?: number;
  maxProjection: number;
};

export function selectInertialTarget({
  currentScrollLeft,
  velocity,
  targets,
  projectionMs = 240,
  maxProjection,
}: SelectInertialTargetOptions) {
  if (targets.length === 0) return -1;

  const projection = Math.max(
    -maxProjection,
    Math.min(maxProjection, velocity * projectionMs),
  );
  const projectedScrollLeft = currentScrollLeft + projection;
  let nearestIndex = 0;
  let nearestDistance = Math.abs(targets[0] - projectedScrollLeft);

  for (let index = 1; index < targets.length; index += 1) {
    const distance = Math.abs(targets[index] - projectedScrollLeft);
    if (distance < nearestDistance) {
      nearestDistance = distance;
      nearestIndex = index;
    }
  }

  return nearestIndex;
}
