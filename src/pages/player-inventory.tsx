'use client';

import { Box, Heading, Text, VStack, HStack, Button, Input, Grid } from '@chakra-ui/react';
import { MdBackpack, MdTrendingUp, MdShield, MdStorage } from 'react-icons/md';
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
        <Box bg="linear-gradient(135deg, rgba(217,100,46,0.15) 0%, rgba(59,130,246,0.1) 100%)" borderRadius="3xl" p={{ base: 6, md: 8 }} border="2px solid rgba(217,100,46,0.3)">
          <HStack gap={3} mb={2}>
            <Box fontSize="40px" color="#D9642E">
              <MdBackpack />
            </Box>
            <VStack align="start" gap={0}>
              <Heading as="h1" size={{ base: 'lg', md: '2xl' }} color="#1a1a1a">
                Your Inventory
              </Heading>
              <Text color="gray.600" fontSize={{ base: 'sm', md: 'md' }}>
                Manage your equipment, ingredients, and cosmetics
              </Text>
            </VStack>
          </HStack>
        </Box>

        {/* STATS */}
        <Grid templateColumns={{ base: '1fr', md: '1fr 1fr', lg: 'repeat(4, 1fr)' }} gap={4}>
          <Box bg="white" p={5} borderRadius="2xl" border="1px solid rgba(217,108,47,0.1)" boxShadow="0 4px 12px rgba(0,0,0,0.05)" transition="all 0.3s" _hover={{ transform: 'translateY(-4px)', boxShadow: '0 12px 24px rgba(217,100,46,0.15)' }}>
            <HStack justify="space-between" mb={2}>
              <Text color="gray.600" fontSize="xs" fontWeight="700" textTransform="uppercase">
                Total Items
              </Text>
              <Box fontSize="20px" color="#D9642E" bg="rgba(217,100,46,0.1)" p={2} borderRadius="lg">
                <MdBackpack />
              </Box>
            </HStack>
            <Text color="#D9642E" fontSize="3xl" fontWeight="800">
              {inventory.length}
            </Text>
            <Text fontSize="xs" color="gray.500" mt={1}>Items collected</Text>
          </Box>

          <Box bg="linear-gradient(135deg, rgba(16,185,129,0.1) 0%, rgba(16,185,129,0.05) 100%)" p={5} borderRadius="2xl" border="1px solid rgba(16,185,129,0.3)" transition="all 0.3s" _hover={{ transform: 'translateY(-4px)', boxShadow: '0 12px 24px rgba(16,185,129,0.15)' }}>
            <HStack justify="space-between" mb={2}>
              <Text color="gray.600" fontSize="xs" fontWeight="700" textTransform="uppercase">
                Equipped
              </Text>
              <Box fontSize="20px" color="#10b981" bg="rgba(16,185,129,0.1)" p={2} borderRadius="lg">
                <MdShield />
              </Box>
            </HStack>
            <Text color="#10b981" fontSize="3xl" fontWeight="800">
              {inventory.filter(i => i.equipped).length}
            </Text>
            <Text fontSize="xs" color="gray.500" mt={1}>Now in use</Text>
          </Box>

          <Box bg="linear-gradient(135deg, rgba(251,146,60,0.1) 0%, rgba(251,146,60,0.05) 100%)" p={5} borderRadius="2xl" border="1px solid rgba(251,146,60,0.3)" transition="all 0.3s" _hover={{ transform: 'translateY(-4px)', boxShadow: '0 12px 24px rgba(251,146,60,0.15)' }}>
            <HStack justify="space-between" mb={2}>
              <Text color="gray.600" fontSize="xs" fontWeight="700" textTransform="uppercase">
                Legendary
              </Text>
              <Box fontSize="20px" color="#fb923c" bg="rgba(251,146,60,0.1)" p={2} borderRadius="lg">
                <MdTrendingUp />
              </Box>
            </HStack>
            <Text color="#fb923c" fontSize="3xl" fontWeight="800">
              {inventory.filter(i => i.rarity === 'legendary').length}
            </Text>
            <Text fontSize="xs" color="gray.500" mt={1}>Rare items</Text>
          </Box>

          <Box bg="linear-gradient(135deg, rgba(168,85,247,0.1) 0%, rgba(168,85,247,0.05) 100%)" p={5} borderRadius="2xl" border="1px solid rgba(168,85,247,0.3)" transition="all 0.3s" _hover={{ transform: 'translateY(-4px)', boxShadow: '0 12px 24px rgba(168,85,247,0.15)' }}>
            <HStack justify="space-between" mb={2}>
              <Text color="gray.600" fontSize="xs" fontWeight="700" textTransform="uppercase">
                Storage
              </Text>
              <Box fontSize="20px" color="#a855f7" bg="rgba(168,85,247,0.1)" p={2} borderRadius="lg">
                <MdStorage />
              </Box>
            </HStack>
            <Text color="#a855f7" fontSize="3xl" fontWeight="800">
              {Math.round((inventory.length / 200) * 100)}%
            </Text>
            <Text fontSize="xs" color="gray.500" mt={1}>{inventory.length}/200 slots</Text>
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
