export const Direction = {
  left: 'left',
  right: 'right',
  up: 'up',
  down: 'down',
};

export type Direction = (typeof Direction)[keyof typeof Direction];
