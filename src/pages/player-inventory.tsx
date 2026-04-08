'use client';

import { Box, Container, Heading, Text, VStack, HStack, Grid, Badge } from '@chakra-ui/react';
import { MdBackpack, MdStorage } from 'react-icons/md';
import { useCurrentUser } from '../../lib/authHooks';
import { useRouter } from 'next/router';
import { useEffect } from 'react';

export default function PlayerInventory() {
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
              Inventory
            </Heading>
            <Text color="gray.400" maxW="3xl" mx="auto">
              Manage your items, equipment, and collectibles
            </Text>
          </Box>

          {/* Stat Cards */}
          <Grid templateColumns={{ base: '1fr', md: 'repeat(4, 1fr)' }} gap={4}>
            {[
              { label: 'Total Items', value: '156', desc: 'In inventory' },
              { label: 'Equipped', value: '8', desc: 'Active items' },
              { label: 'Rarity Rare', value: '32', desc: 'Rare items' },
              { label: 'Storage Used', value: '65%', desc: 'Capacity used' },
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

          {/* Inventory Items */}
          <Box>
            <Heading as="h2" size="md" color="white" mb={4}>
              Equipment
            </Heading>
            <Grid templateColumns={{ base: '1fr', md: 'repeat(3, 1fr)' }} gap={4}>
              {[
                { name: 'Golden Chef Knife', rarity: 'Rare', icon: '🔪' },
              ].map((item, idx) => (
                <Box
                  key={idx}
                  bg="rgba(0,0,0,0.36)"
                  border="1px solid rgba(217,100,46,0.2)"
                  borderRadius="md"
                  p={5}
                  textAlign="center"
                  transition="transform 180ms"
                  _hover={{ transform: 'translateY(-6px)' }}
                >
                  <Text fontSize="3xl" mb={3}>
                    {item.icon}
                  </Text>
                  <Heading as="h3" size="sm" color="white" mb={2}>
                    {item.name}
                  </Heading>
                  <Badge colorScheme="orange" borderRadius="full" fontSize="xs">
                    {item.rarity}
                  </Badge>
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
