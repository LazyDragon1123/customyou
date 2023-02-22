import React from 'react'
import { Box, BoxProps } from '@chakra-ui/react'
import { Color } from '../styles/themes'

export type SectionBoxProps = BoxProps

export const SectionBox: React.FC<SectionBoxProps> = ({ children, ...rest }) => {
  return (
    <Box
      backgroundColor={Color.BACKGROUND_WHITE}
      boxShadow="0px 1px 3px rgba(0, 0, 0, 0.1), 0px 1px 2px rgba(0, 0, 0, 0.06)"
      padding="32px"
      {...rest}
    >
      {children}
    </Box>
  )
}