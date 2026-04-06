'use client';

import React from 'react';
import { Box } from '@chakra-ui/react';

interface CustomProgressProps {
  value: number;
  colorScheme?: 'orange' | 'whiteAlpha';
  size?: 'sm' | 'lg';
  borderRadius?: string;
  height?: string;
}

export default function CustomProgress({
  value,
  colorScheme = 'orange',
  size = 'sm',
  borderRadius = '4px',
  height = '6px'
}: CustomProgressProps) {
  const colors = {
    orange: '#D9642E',
    whiteAlpha: 'rgba(255,255,255,0.5)'
  };

  const sizeHeights = {
    sm: '4px',
    lg: '8px'
  };

  return (
    <Box
      width="100%"
      height={height || sizeHeights[size] || '6px'}
      bg="rgba(0,0,0,0.1)"
      borderRadius={borderRadius}
      overflow="hidden"
    >
      <Box
        height="100%"
        width={`${Math.min(100, Math.max(0, value))}%`}
        bg={colors[colorScheme]}
        transition="width 0.3s ease"
      />
    </Box>
  );
}
