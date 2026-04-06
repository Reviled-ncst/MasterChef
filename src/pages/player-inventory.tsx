'use client';

import { Box, Heading, Text, VStack, HStack, Button, Input, Grid } from '@chakra-ui/react';
import { MdBackpack } from 'react-icons/md';
import { useCurrentUser } from '../../lib/authHooks';
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import InventorySection from '../../components/InventorySection';
import { generatePlayerInventory } from '../../lib/mockData';

export default function PlayerInventory() {
  const currentUser = useCurrentUser();
  const router = useRouter();
  const [isHydrated, setIsHydrated] = useState(false);
  const [sortBy, setSortBy] = useState('recent');
  const [filterType, setFilterType] = useState('all');

  useEffect(() => {
    if (!currentUser || currentUser.role !== 'gamer') {
      router.push('/');
    } else {
      setIsHydrated(true);
    }
  }, [currentUser, router]);

  if (!currentUser || currentUser.role !== 'gamer' || !isHydrated) {
    return null;
  }

  const inventory = generatePlayerInventory();

  return (
    <Box py={{ base: 4, md: 8 }} px={{ base: 3, md: 8 }}>
      <VStack align="stretch" gap={8}>
        {/* HEADER */}
        <Box>
          <HStack gap={2} mb={4}>
            <Box fontSize="lg" color="#D9642E">
              <MdBackpack />
            </Box>
            <Heading as="h1" size={{ base: 'lg', md: '2xl' }} color="#D9642E">
              Inventory
            </Heading>
          </HStack>
          <Text color="gray.600" fontSize={{ base: 'md', md: 'lg' }}>
            Manage your equipment, ingredients, and cosmetics
          </Text>
        </Box>

        {/* STATS */}
        <Grid templateColumns={{ base: '1fr', md: '1fr 1fr', lg: 'repeat(4, 1fr)' }} gap={4}>
          <Box bg="white" p={4} borderRadius="lg" border="1px solid rgba(217,108,47,0.1)" textAlign="center">
            <Text color="gray.600" fontSize="sm" fontWeight="600" mb={1}>
              Total Items
            </Text>
            <Text color="#D9642E" fontSize="2xl" fontWeight="700">
              {inventory.length}
            </Text>
          </Box>

          <Box bg="white" p={4} borderRadius="lg" border="1px solid rgba(217,108,47,0.1)" textAlign="center">
            <Text color="gray.600" fontSize="sm" fontWeight="600" mb={1}>
              Equipped
            </Text>
            <Text color="#D9642E" fontSize="2xl" fontWeight="700">
              {inventory.filter(i => i.equipped).length}
            </Text>
          </Box>

          <Box bg="white" p={4} borderRadius="lg" border="1px solid rgba(217,108,47,0.1)" textAlign="center">
            <Text color="gray.600" fontSize="sm" fontWeight="600" mb={1}>
              Legendary
            </Text>
            <Text color="#D9642E" fontSize="2xl" fontWeight="700">
              {inventory.filter(i => i.rarity === 'legendary').length}
            </Text>
          </Box>

          <Box bg="white" p={4} borderRadius="lg" border="1px solid rgba(217,108,47,0.1)" textAlign="center">
            <Text color="gray.600" fontSize="sm" fontWeight="600" mb={1}>
              Storage Used
            </Text>
            <Text color="#D9642E" fontSize="2xl" fontWeight="700">
              {inventory.length}/200
            </Text>
          </Box>
        </Grid>

        {/* FILTERS */}
        <Box bg="white" p={4} borderRadius="lg" border="1px solid rgba(217,108,47,0.1)">
          <Grid templateColumns={{ base: '1fr', md: '1fr 1fr 1fr' }} gap={4}>
            <Box>
              <Text fontSize="sm" fontWeight="600" mb={2} color="gray.600">
                Filter by Type
              </Text>
              <select value={filterType} onChange={(e) => setFilterType(e.target.value)} style={{ width: '100%', padding: '8px 12px', borderRadius: '4px', borderColor: '#D9642E', border: '1px solid #D9642E', fontSize: '14px' }}>
                <option value="all">All Items</option>
                <option value="equipment">Equipment</option>
                <option value="ingredient">Ingredients</option>
                <option value="cosmetic">Cosmetics</option>
              </select>
            </Box>

            <Box>
              <Text fontSize="sm" fontWeight="600" mb={2} color="gray.600">
                Sort by
              </Text>
              <select value={sortBy} onChange={(e) => setSortBy(e.target.value)} style={{ width: '100%', padding: '8px 12px', borderRadius: '4px', borderColor: '#D9642E', border: '1px solid #D9642E', fontSize: '14px' }}>
                <option value="recent">Recently Used</option>
                <option value="rarity">Rarity</option>
                <option value="name">Name A-Z</option>
                <option value="quantity">Quantity</option>
              </select>
            </Box>

            <Box>
              <Text fontSize="sm" fontWeight="600" mb={2} color="gray.600">
                Search
              </Text>
              <Input placeholder="Find item..." borderColor="#D9642E" _focus={{ borderColor: '#D9642E' }} />
            </Box>
          </Grid>
        </Box>

        {/* INVENTORY SECTION */}
        <InventorySection items={inventory} />

        {/* STORAGE INFO */}
        <Box bg="rgba(217,100,46,0.05)" p={4} borderRadius="lg" border="1px solid rgba(217,108,47,0.2)">
          <HStack justify="space-between">
            <VStack align="start" gap={1}>
              <Text fontWeight="700" color="#D9642E">
                Storage: {inventory.length}/200 items
              </Text>
              <Text fontSize="sm" color="gray.600">
                {200 - inventory.length} slots remaining
              </Text>
            </VStack>
            <Button bg="#D9642E" color="white" fontWeight="700">
              Expand Storage
            </Button>
          </HStack>
        </Box>
      </VStack>
    </Box>
  );
}

PlayerInventory.title = 'Inventory - Master Chef';
