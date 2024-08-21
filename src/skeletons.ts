export type BorderStyle =
  | 'all'
  | 'vertical'
  | 'horizontal'
  | 'none'
  | 'outline'
  | 'vertical-with-outline'
  | 'horizontal-with-outline'

type Skeleton = {
  cross: string
  left: string
  line: string
  right: string
}

export const BORDER_SKELETONS: Record<
  BorderStyle,
  {
    data: Skeleton
    footer: Skeleton
    header: Skeleton
    heading: Skeleton
    separator: Skeleton
  }
> = {
  all: {
    data: {
      cross: '│',
      left: '│',
      line: ' ',
      right: '│',
    },
    footer: {
      cross: '┴',
      left: '└',
      line: '─',
      right: '┘',
    },
    header: {
      cross: '┬',
      left: '┌',
      line: '─',
      right: '┐',
    },
    heading: {
      cross: '│',
      left: '│',
      line: ' ',
      right: '│',
    },
    separator: {
      cross: '┼',
      left: '├',
      line: '─',
      right: '┤',
    },
  },
  horizontal: {
    data: {
      cross: ' ',
      left: ' ',
      line: ' ',
      right: ' ',
    },
    footer: {
      cross: '─',
      left: '─',
      line: '─',
      right: '─',
    },
    header: {
      cross: ' ',
      left: ' ',
      line: ' ',
      right: ' ',
    },
    heading: {
      cross: ' ',
      left: ' ',
      line: ' ',
      right: ' ',
    },
    separator: {
      cross: '─',
      left: '─',
      line: '─',
      right: '─',
    },
  },
  'horizontal-with-outline': {
    data: {
      cross: ' ',
      left: '│',
      line: ' ',
      right: '│',
    },
    footer: {
      cross: '─',
      left: '└',
      line: '─',
      right: '┘',
    },
    header: {
      cross: '─',
      left: '┌',
      line: '─',
      right: '┐',
    },
    heading: {
      cross: ' ',
      left: '│',
      line: ' ',
      right: '│',
    },
    separator: {
      cross: '─',
      left: '├',
      line: '─',
      right: '┤',
    },
  },
  none: {
    data: {
      cross: ' ',
      left: ' ',
      line: ' ',
      right: ' ',
    },
    footer: {
      cross: ' ',
      left: ' ',
      line: ' ',
      right: ' ',
    },
    header: {
      cross: ' ',
      left: ' ',
      line: ' ',
      right: ' ',
    },
    heading: {
      cross: ' ',
      left: ' ',
      line: ' ',
      right: ' ',
    },
    separator: {
      cross: ' ',
      left: ' ',
      line: ' ',
      right: ' ',
    },
  },
  outline: {
    data: {
      cross: ' ',
      left: '│',
      line: ' ',
      right: '│',
    },
    footer: {
      cross: '─',
      left: '└',
      line: '─',
      right: '┘',
    },
    header: {
      cross: '─',
      left: '┌',
      line: '─',
      right: '┐',
    },
    heading: {
      cross: ' ',
      left: '│',
      line: ' ',
      right: '│',
    },
    separator: {
      cross: ' ',
      left: '│',
      line: ' ',
      right: '│',
    },
  },
  vertical: {
    data: {
      cross: '│',
      left: '│',
      line: ' ',
      right: '│',
    },
    footer: {
      cross: '│',
      left: '│',
      line: ' ',
      right: '│',
    },
    header: {
      cross: ' ',
      left: ' ',
      line: ' ',
      right: ' ',
    },
    heading: {
      cross: ' ',
      left: ' ',
      line: ' ',
      right: ' ',
    },
    separator: {
      cross: '│',
      left: '│',
      line: ' ',
      right: '│',
    },
  },
  'vertical-with-outline': {
    data: {
      cross: '│',
      left: '│',
      line: ' ',
      right: '│',
    },
    footer: {
      cross: '┴',
      left: '└',
      line: '─',
      right: '┘',
    },
    header: {
      cross: '┬',
      left: '┌',
      line: '─',
      right: '┐',
    },
    heading: {
      cross: '│',
      left: '│',
      line: ' ',
      right: '│',
    },
    separator: {
      cross: '│',
      left: '│',
      line: ' ',
      right: '│',
    },
  },
}
