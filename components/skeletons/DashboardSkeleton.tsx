'use client';

import { Box, VStack, HStack, Grid } from '@chakra-ui/react';

const skeletonStyles = `
  @keyframes shimmer {
    0% {
      background-position: -200% 0;
    }
    100% {
      background-position: 200% 0;
    }
  }

  .skeleton-shimmer {
    background: linear-gradient(
      90deg,
      rgba(217, 100, 46, 0.1) 0%,
      rgba(217, 100, 46, 0.2) 50%,
      rgba(217, 100, 46, 0.1) 100%
    );
    background-size: 200% 100%;
    animation: shimmer 2s infinite;
  }
`;

export default function DashboardSkeleton() {
  return (
    <>
      <style suppressHydrationWarning>{skeletonStyles}</style>
      <Box minH="100vh" py={12} color="gray.100">
        <Box maxW="container.lg" mx="auto" px={4}>
          <VStack align="stretch" gap={8}>
            {/* Header Skeleton */}
            <Box>
              <Box h="32px" w="50%" className="skeleton-shimmer" borderRadius="md" mb={2} />
              <Box h="16px" w="40%" className="skeleton-shimmer" borderRadius="md" />
            </Box>

            {/* Stat Cards Skeleton */}
            <Grid templateColumns={{ base: '1fr', md: 'repeat(4, 1fr)' }} gap={4}>
              {[1, 2, 3, 4].map((idx) => (
                <Box
                  key={idx}
                  bg="rgba(0,0,0,0.36)"
                  border="1px solid rgba(217,100,46,0.2)"
                  borderRadius="md"
                  p={6}
                >
                  <Box h="12px" w="70%" className="skeleton-shimmer" borderRadius="md" mb={4} />
                  <Box h="36px" w="90%" className="skeleton-shimmer" borderRadius="md" mb={3} />
                  <Box h="12px" w="50%" className="skeleton-shimmer" borderRadius="md" />
                </Box>
              ))}
            </Grid>

            {/* Large Chart/Content Area Skeleton */}
            <Box
              bg="rgba(0,0,0,0.36)"
              border="1px solid rgba(217,100,46,0.2)"
              borderRadius="md"
              p={6}
            >
              <Box h="24px" w="200px" className="skeleton-shimmer" borderRadius="md" mb={6} />
              <Box h="300px" w="100%" className="skeleton-shimmer" borderRadius="md" />
            </Box>

            {/* Recent Activity List Skeleton */}
            <Box>
              <Box h="24px" w="180px" className="skeleton-shimmer" borderRadius="md" mb={4} />
              <VStack align="stretch" gap={3}>
                {[1, 2, 3].map((idx) => (
                  <Box
                    key={idx}
                    bg="rgba(0,0,0,0.36)"
                    border="1px solid rgba(217,100,46,0.2)"
                    borderRadius="md"
                    p={4}
                  >
                    <HStack justify="space-between">
                      <Box flex={1}>
                        <Box h="16px" w="50%" className="skeleton-shimmer" borderRadius="md" mb={2} />
                        <Box h="14px" w="70%" className="skeleton-shimmer" borderRadius="md" />
                      </Box>
                      <Box h="16px" w="100px" className="skeleton-shimmer" borderRadius="md" />
                    </HStack>
                  </Box>
                ))}
              </VStack>
            </Box>
          </VStack>
        </Box>
      </Box>
    </>
  );
}
