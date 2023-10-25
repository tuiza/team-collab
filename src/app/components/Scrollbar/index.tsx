import { memo, forwardRef, Ref } from 'react';

import Box from '@mui/material/Box';

import { StyledScrollbar, StyledRootScrollbar } from './styles';

interface ScrollbarProps {
  children?: React.ReactNode;
  sx?: React.CSSProperties;
}

const Scrollbar = forwardRef<HTMLDivElement, ScrollbarProps>(function Scrollbar({ children, sx, ...other }, ref) {
  const userAgent = typeof navigator === 'undefined' ? 'SSR' : navigator.userAgent;

  const mobile = /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(userAgent);

  if (mobile) {
    return (
      <Box ref={ref as Ref<HTMLDivElement>} sx={{ overflow: 'auto', ...sx }} {...other}>
        {children}
      </Box>
    );
  }

  return (
    <StyledRootScrollbar>
      <StyledScrollbar
        scrollableNodeProps={{
          ref: ref as Ref<HTMLDivElement>,
        }}
        clickOnTrack={false}
        sx={sx}
        {...other}
      >
        {children}
      </StyledScrollbar>
    </StyledRootScrollbar>
  );
});


export default memo(Scrollbar);