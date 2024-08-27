export const BORDER_STYLES = [
  'all',
  'headers-only-with-outline',
  'headers-only-with-underline',
  'headers-only',
  'horizontal-with-outline',
  'horizontal',
  'none',
  'outline',
  'vertical-with-outline',
  'vertical',
] as const

export type BorderStyle = (typeof BORDER_STYLES)[number]

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
    headerFooter?: Skeleton
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
  'headers-only': {
    data: {
      cross: ' ',
      left: ' ',
      line: ' ',
      right: ' ',
    },
    footer: {
      cross: '',
      left: '',
      line: '',
      right: '',
    },
    header: {
      cross: '─',
      left: '┌',
      line: '─',
      right: '┐',
    },
    headerFooter: {
      cross: '─',
      left: '└',
      line: '─',
      right: '┘',
    },
    heading: {
      cross: ' ',
      left: '│',
      line: ' ',
      right: '│',
    },
    separator: {
      cross: '',
      left: '',
      line: '',
      right: '',
    },
  },
  'headers-only-with-outline': {
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
    headerFooter: {
      cross: '─',
      left: '├',
      line: '─',
      right: '┤',
    },
    heading: {
      cross: ' ',
      left: '│',
      line: ' ',
      right: '│',
    },
    separator: {
      cross: '',
      left: '',
      line: '',
      right: '',
    },
  },
  'headers-only-with-underline': {
    data: {
      cross: ' ',
      left: ' ',
      line: ' ',
      right: ' ',
    },
    footer: {
      cross: '',
      left: '',
      line: '',
      right: '',
    },
    header: {
      cross: '',
      left: '',
      line: '',
      right: '',
    },
    headerFooter: {
      cross: '─',
      left: ' ',
      line: '─',
      right: ' ',
    },
    heading: {
      cross: ' ',
      left: ' ',
      line: ' ',
      right: ' ',
    },
    separator: {
      cross: '',
      left: '',
      line: '',
      right: '',
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
      cross: '',
      left: '',
      line: '',
      right: '',
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
      cross: '',
      left: '',
      line: '',
      right: '',
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
      cross: '',
      left: '',
      line: '',
      right: '',
    },
    header: {
      cross: ' ',
      left: ' ',
      line: ' ',
      right: ' ',
    },
    heading: {
      cross: '│',
      left: '│',
      line: ' ',
      right: '│',
    },
    separator: {
      cross: '',
      left: '',
      line: '',
      right: '',
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
    headerFooter: {
      cross: '┼',
      left: '├',
      line: '─',
      right: '┤',
    },
    heading: {
      cross: '│',
      left: '│',
      line: ' ',
      right: '│',
    },
    separator: {
      cross: '',
      left: '',
      line: '',
      right: '',
    },
  },
}
