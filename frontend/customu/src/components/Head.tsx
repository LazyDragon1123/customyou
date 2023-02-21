import React from 'react'
import { Heading, HeadingProps } from '@chakra-ui/react'

export const H2: React.FC<HeadingProps> = ({ children, ...rest }) => {
  return (
    <Heading as="h2" fontSize="24px" fontWeight="400" {...rest}>
      {children}
    </Heading>
  )
}

export const H3: React.FC<HeadingProps> = ({ children, ...rest }) => {
  return (
    <Heading as="h3" fontSize="20px" fontWeight="700" {...rest}>
      {children}
    </Heading>
  )
}

export const H5: React.FC<HeadingProps> = ({ children, ...rest }) => {
  return (
    <Heading as="h5" fontSize="16px" fontWeight="700" {...rest}>
      {children}
    </Heading>
  )
}
