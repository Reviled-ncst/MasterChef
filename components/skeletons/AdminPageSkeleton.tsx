'use client';

import { Box, VStack, HStack, Skeleton, Grid } from '@chakra-ui/react';

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

export default function AdminPageSkeleton() {
  return (
    <>
      <style suppressHydrationWarning>{skeletonStyles}</style>
      <Box minH="100vh" py={12} color="gray.100" ml={{ base: 0, md: '300px' }} transition="margin 0.3s ease">
        <Box maxW="container.lg" mx="auto" px={4}>
          <VStack align="stretch" gap={8}>
            {/* Header Skeleton */}
            <Box>
              <HStack justify="space-between" mb={2}>
                <Box flex={1}>
                  <Box h="40px" w="60%" className="skeleton-shimmer" borderRadius="md" mb={2} />
                  <Box h="20px" w="40%" className="skeleton-shimmer" borderRadius="md" />
                </Box>
                <Box h="40px" w="150px" className="skeleton-shimmer" borderRadius="md" />
              </HStack>
            </Box>

            {/* Stat Cards Skeleton */}
            <Grid templateColumns={{ base: '1fr', md: 'repeat(4, 1fr)' }} gap={4}>
              {[1, 2, 3, 4].map((idx) => (
                <Box
                  key={idx}
                  bg="rgba(0,0,0,0.36)"
                  border="1px solid rgba(217,100,46,0.2)"
                  borderRadius="md"
                  p={5}
                >
                  <Box h="16px" w="70%" className="skeleton-shimmer" borderRadius="md" mb={4} />
                  <Box h="32px" w="80%" className="skeleton-shimmer" borderRadius="md" mb={2} />
                  <Box h="14px" w="60%" className="skeleton-shimmer" borderRadius="md" />
                </Box>
              ))}
            </Grid>

            {/* Content List Skeleton */}
            <Box>
              <Box h="24px" w="150px" className="skeleton-shimmer" borderRadius="md" mb={4} />
              <VStack align="stretch" gap={3}>
                {[1, 2, 3, 4, 5].map((idx) => (
                  <Box
                    key={idx}
                    bg="rgba(0,0,0,0.36)"
                    border="1px solid rgba(217,100,46,0.2)"
                    borderRadius="md"
                    p={4}
                  >
                    <HStack justify="space-between" mb={3}>
                      <Box flex={1}>
                        <Box h="18px" w="40%" className="skeleton-shimmer" borderRadius="md" mb={2} />
                        <Box h="14px" w="60%" className="skeleton-shimmer" borderRadius="md" />
                      </Box>
                      <Box h="24px" w="80px" className="skeleton-shimmer" borderRadius="full" />
                    </HStack>
                    <HStack gap={2}>
                      <Box h="32px" w="70px" className="skeleton-shimmer" borderRadius="md" />
                      <Box h="32px" w="70px" className="skeleton-shimmer" borderRadius="md" />
                      <Box h="32px" w="70px" className="skeleton-shimmer" borderRadius="md" />
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
