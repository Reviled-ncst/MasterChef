'use client';

import { Box, Container, Heading, Text, VStack, HStack, Grid, Badge, Button } from '@chakra-ui/react';
import { MdShoppingCart, MdStar } from 'react-icons/md';
import { GiDiamonds } from 'react-icons/gi';
import { useCurrentUser } from '../../lib/authHooks';
import { useRouter } from 'next/router';
import { useEffect } from 'react';

export default function PlayerShop() {
  const currentUser = useCurrentUser();
  const router = useRouter();

  useEffect(() => {
    if (!currentUser) {
      router.push('/login');
    }
  }, [currentUser, router]);

  if (!currentUser) {
    return null;
  }

  return (
    <>
      <Box minH="100vh" py={12} color="gray.100" transition="margin 0.3s ease">
        <Container maxW="container.lg">
        <VStack align="stretch" gap={8}>
          {/* Header */}
          <Box mb={4} textAlign="center">
            <Heading as="h1" size="xl" mb={2}>
              Shop
            </Heading>
            <Text color="gray.400" maxW="3xl" mx="auto">
              Browse and purchase exclusive items, cosmetics, and battle passes
            </Text>
          </Box>

          {/* Stat Cards */}
          <Grid templateColumns={{ base: '1fr', md: 'repeat(4, 1fr)' }} gap={4}>
            {[
              { label: 'Your Balance', value: '5.2K', desc: 'Gold coins' },
              { label: 'Gems', value: '250', desc: 'Premium currency' },
              { label: 'Items Available', value: '48', desc: 'For purchase' },
              { label: 'Battle Pass', value: 'Tier 32', desc: 'Current progress' },
            ].map((stat, idx) => (
              <Box
                key={idx}
                bg="rgba(0,0,0,0.36)"
                border="1px solid rgba(217,100,46,0.2)"
                borderRadius="md"
                p={5}
                transition="transform 180ms"
                _hover={{ transform: 'translateY(-6px)' }}
              >
                <Text color="gray.400" fontSize="xs" fontWeight="700" textTransform="uppercase" mb={2}>
                  {stat.label}
                </Text>
                <Text color="orange.300" fontSize="3xl" fontWeight="900" mb={2}>
                  {stat.value}
                </Text>
                <Text color="gray.400" fontSize="xs" fontWeight="500">
                  {stat.desc}
                </Text>
              </Box>
            ))}
          </Grid>

          {/* Shop Items */}
          <Box>
            <Heading as="h2" size="md" color="white" mb={4}>
              Featured Items
            </Heading>
            <Grid templateColumns={{ base: '1fr', md: 'repeat(3, 1fr)' }} gap={4}>
              {[
                { name: 'Flame Grill Set', price: '2,499', icon: '🔥', badge: 'Featured' },
              ].map((item, idx) => (
                <Box
                  key={idx}
                  bg="rgba(0,0,0,0.36)"
                  border="1px solid rgba(217,100,46,0.2)"
                  borderRadius="md"
                  p={5}
                  transition="transform 180ms"
                  _hover={{ transform: 'translateY(-6px)' }}
                >
                  {item.badge && (
                    <Badge colorScheme="orange" mb={3} borderRadius="full" fontSize="xs">
                      {item.badge}
                    </Badge>
                  )}
                  <Text fontSize="3xl" mb={3}>
                    {item.icon}
                  </Text>
                  <Heading as="h3" size="sm" color="white" mb={3}>
                    {item.name}
                  </Heading>
                  <HStack justify="space-between">
                    <HStack gap={1}>
                      <MdStar color="#FFB84D" size={16} />
                      <Text color="orange.300" fontWeight="700">
                        {item.price}
                      </Text>
                    </HStack>
                    <Button
                      size="sm"
                      bg="#D9642E"
                      color="white"
                      fontWeight="700"
                      _hover={{ bg: '#C65525' }}
                    >
                      Buy
                    </Button>
                  </HStack>
                </Box>
              ))}
            </Grid>
          </Box>
        </VStack>
      </Container>
    </Box>
    </>
  );
}
