import { SxProps, Theme } from '@mui/material';

const insetOutline = {
  border: 'none',
  outline: '1px solid',
  outlineOffset: '-1px',
};

export const generatorSx: SxProps<Theme> = {
  '& .MuiButton-outlined, & .MuiButton-outlined:hover, & .MuiButton-outlined.Mui-focusVisible, & .MuiButton-outlined.Mui-disabled': {
    border: 'none',
  },
  '& .MuiButton-outlined': {
    ...insetOutline,
    outlineColor: 'currentColor',
    '&.Mui-focusVisible': {
      outlineWidth: '2px',
    },
    '&.Mui-disabled': {
      outlineColor: 'action.disabled',
    },
  },
  '& .MuiToggleButtonGroup-grouped': {
    border: 'none !important',
    margin: 0,
  },
  '& .MuiToggleButton-root': {
    ...insetOutline,
    outlineColor: 'divider',
    '&.Mui-selected': {
      outlineWidth: '2px',
      outlineColor: 'primary.main',
    },
    '&.Mui-focusVisible': {
      outlineWidth: '2px',
      outlineColor: 'primary.main',
    },
  },
  '& .MuiIconButton-root.Mui-focusVisible': {
    outline: '2px solid',
    outlineColor: 'primary.main',
    outlineOffset: '-2px',
  },
};
