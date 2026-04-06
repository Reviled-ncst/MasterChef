'use client';

import { Box, Heading, Text, VStack, HStack, Button, Input, Grid } from '@chakra-ui/react';
import { MdBackpack, MdTrendingUp, MdShield, MdStorage } from 'react-icons/md';
import { useCurrentUser } from '../../lib/authHooks';
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import InventorySection from '../../components/InventorySection';
import { generatePlayerInventory } from '../../lib/mockData';

const animationStyles = `
  @keyframes fadeInUp {
    from {
      opacity: 0;
      transform: translateY(20px);
    }
    to {
      opacity: 1;
      transform: translateY(0);
    }
  }

  @keyframes scaleIn {
    from {
      opacity: 0;
      transform: scale(0.95);
    }
    to {
      opacity: 1;
      transform: scale(1);
    }
  }

  @keyframes slideInLeft {
    from {
      opacity: 0;
      transform: translateX(-20px);
    }
    to {
      opacity: 1;
      transform: translateX(0);
    }
  }

  @keyframes float {
    0%, 100% {
      transform: translateY(0px);
    }
    50% {
      transform: translateY(-10px);
    }
  }

  @keyframes shimmer {
    0% {
      background-position: -1000px 0;
    }
    100% {
      background-position: 1000px 0;
    }
  }

  @keyframes pulse {
    0%, 100% {
      opacity: 1;
    }
    50% {
      opacity: 0.8;
    }
  }

  .inventory-header {
    animation: fadeInUp 0.6s ease-out;
  }

  .stat-card {
    animation: scaleIn 0.5s ease-out backwards;
  }

  .stat-card:nth-child(1) {
    animation-delay: 0.1s;
  }

  .stat-card:nth-child(2) {
    animation-delay: 0.2s;
  }

  .stat-card:nth-child(3) {
    animation-delay: 0.3s;
  }

  .stat-card:nth-child(4) {
    animation-delay: 0.4s;
  }

  .stat-icon {
    animation: float 3s ease-in-out infinite;
  }

  .stat-card:nth-child(1) .stat-icon {
    animation-delay: 0s;
  }

  .stat-card:nth-child(2) .stat-icon {
    animation-delay: 0.3s;
  }

  .stat-card:nth-child(3) .stat-icon {
    animation-delay: 0.6s;
  }

  .stat-card:nth-child(4) .stat-icon {
    animation-delay: 0.9s;
  }

  .filter-section {
    animation: fadeInUp 0.6s ease-out 0.5s backwards;
  }

  .inventory-section {
    animation: slideInLeft 0.7s ease-out 0.7s backwards;
  }

  .storage-info {
    animation: fadeInUp 0.6s ease-out 0.9s backwards;
  }
`;

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
    <>
      <style>{animationStyles}</style>
      <Box py={{ base: 4, md: 8 }} px={{ base: 3, md: 8 }}>
        <VStack align="stretch" gap={8}>
          {/* HEADER */}
          <Box className="inventory-header" bg="linear-gradient(135deg, rgba(217,100,46,0.15) 0%, rgba(59,130,246,0.1) 100%)" borderRadius="3xl" p={{ base: 6, md: 8 }} border="2px solid rgba(217,100,46,0.3)">
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
          <Box className="stat-card" bg="white" p={5} borderRadius="2xl" border="1px solid rgba(217,108,47,0.1)" boxShadow="0 4px 12px rgba(0,0,0,0.05)" transition="all 0.3s" _hover={{ transform: 'translateY(-8px)', boxShadow: '0 12px 24px rgba(217,100,46,0.2)' }}>
            <HStack justify="space-between" mb={2}>
              <Text color="gray.600" fontSize="xs" fontWeight="700" textTransform="uppercase">
                Total Items
              </Text>
              <Box className="stat-icon" fontSize="20px" color="#D9642E" bg="rgba(217,100,46,0.1)" p={2} borderRadius="lg">
                <MdBackpack />
              </Box>
            </HStack>
            <Text color="#D9642E" fontSize="3xl" fontWeight="800">
              {inventory.length}
            </Text>
            <Text fontSize="xs" color="gray.500" mt={1}>Items collected</Text>
          </Box>

          <Box className="stat-card" bg="linear-gradient(135deg, rgba(16,185,129,0.1) 0%, rgba(16,185,129,0.05) 100%)" p={5} borderRadius="2xl" border="1px solid rgba(16,185,129,0.3)" transition="all 0.3s" _hover={{ transform: 'translateY(-8px)', boxShadow: '0 12px 24px rgba(16,185,129,0.2)' }}>
            <HStack justify="space-between" mb={2}>
              <Text color="gray.600" fontSize="xs" fontWeight="700" textTransform="uppercase">
                Equipped
              </Text>
              <Box className="stat-icon" fontSize="20px" color="#10b981" bg="rgba(16,185,129,0.1)" p={2} borderRadius="lg">
                <MdShield />
              </Box>
            </HStack>
            <Text color="#10b981" fontSize="3xl" fontWeight="800">
              {inventory.filter(i => i.equipped).length}
            </Text>
            <Text fontSize="xs" color="gray.500" mt={1}>Now in use</Text>
          </Box>

          <Box className="stat-card" bg="linear-gradient(135deg, rgba(251,146,60,0.1) 0%, rgba(251,146,60,0.05) 100%)" p={5} borderRadius="2xl" border="1px solid rgba(251,146,60,0.3)" transition="all 0.3s" _hover={{ transform: 'translateY(-8px)', boxShadow: '0 12px 24px rgba(251,146,60,0.2)' }}>
            <HStack justify="space-between" mb={2}>
              <Text color="gray.600" fontSize="xs" fontWeight="700" textTransform="uppercase">
                Legendary
              </Text>
              <Box className="stat-icon" fontSize="20px" color="#fb923c" bg="rgba(251,146,60,0.1)" p={2} borderRadius="lg">
                <MdTrendingUp />
              </Box>
            </HStack>
            <Text color="#fb923c" fontSize="3xl" fontWeight="800">
              {inventory.filter(i => i.rarity === 'legendary').length}
            </Text>
            <Text fontSize="xs" color="gray.500" mt={1}>Rare items</Text>
          </Box>

          <Box className="stat-card" bg="linear-gradient(135deg, rgba(168,85,247,0.1) 0%, rgba(168,85,247,0.05) 100%)" p={5} borderRadius="2xl" border="1px solid rgba(168,85,247,0.3)" transition="all 0.3s" _hover={{ transform: 'translateY(-8px)', boxShadow: '0 12px 24px rgba(168,85,247,0.2)' }}>
            <HStack justify="space-between" mb={2}>
              <Text color="gray.600" fontSize="xs" fontWeight="700" textTransform="uppercase">
                Storage
              </Text>
              <Box className="stat-icon" fontSize="20px" color="#a855f7" bg="rgba(168,85,247,0.1)" p={2} borderRadius="lg">
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
        <Box className="filter-section" bg="white" p={4} borderRadius="lg" border="1px solid rgba(217,108,47,0.1)">
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
        <Box className="inventory-section">
          <InventorySection items={inventory} />
        </Box>

        {/* STORAGE INFO */}
        <Box className="storage-info" bg="rgba(217,100,46,0.05)" p={4} borderRadius="lg" border="1px solid rgba(217,108,47,0.2)">
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
    </>
  );
}

PlayerInventory.title = 'Inventory - Master Chef';
