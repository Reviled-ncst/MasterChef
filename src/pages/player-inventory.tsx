'use client';

import { Box, Heading, Text, VStack, HStack, Button, Input, Grid } from '@chakra-ui/react';
import { MdBackpack, MdTrendingUp, MdShield, MdStorage } from 'react-icons/md';
import { useCurrentUser } from '../../lib/authHooks';
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import InventorySection from '../../components/InventorySection';
import { generatePlayerInventory } from '../../lib/mockData';

const animationStyles = `
  /* ENTRANCE ANIMATIONS */
  @keyframes fadeInUp {
    from { opacity: 0; transform: translateY(40px); }
    to { opacity: 1; transform: translateY(0); }
  }

  @keyframes bounceIn {
    0% { opacity: 0; transform: scale(0.8); }
    50% { transform: scale(1.08); }
    100% { opacity: 1; transform: scale(1); }
  }

  @keyframes popIn {
    0% { opacity: 0; transform: scale(0.5) rotate(-10deg); }
    50% { transform: scale(1.12) rotate(5deg); }
    100% { opacity: 1; transform: scale(1) rotate(0deg); }
  }

  @keyframes slideInLeft {
    from { opacity: 0; transform: translateX(-40px); }
    to { opacity: 1; transform: translateX(0); }
  }

  @keyframes morphIn {
    0% { opacity: 0; transform: scale(0.85); filter: blur(10px); }
    100% { opacity: 1; transform: scale(1); filter: blur(0px); }
  }

  /* INTERACTIVE ANIMATIONS */
  @keyframes glow {
    0%, 100% { box-shadow: 0 0 20px rgba(217,100,46,0.3), 0 8px 32px rgba(217,100,46,0.15); }
    50% { box-shadow: 0 0 40px rgba(217,100,46,0.5), 0 16px 48px rgba(217,100,46,0.25); }
  }

  @keyframes glowRarity {
    0%, 100% { filter: drop-shadow(0 0 8px currentColor); }
    50% { filter: drop-shadow(0 0 20px currentColor); }
  }

  @keyframes iconSpin {
    0% { transform: rotate(0deg); filter: hue-rotate(0deg); }
    100% { transform: rotate(360deg); filter: hue-rotate(45deg); }
  }

  @keyframes float {
    0%, 100% { transform: translateY(0px) rotate(0deg); }
    50% { transform: translateY(-15px) rotate(8deg); }
  }

  @keyframes shimmer {
    0% { background-position: -1000px 0; }
    100% { background-position: 1000px 0; }
  }

  /* STATE ANIMATIONS */
  @keyframes breathing {
    0%, 100% { opacity: 1; transform: scale(1); }
    50% { opacity: 0.9; transform: scale(1.02); }
  }

  @keyframes pulse {
    0%, 100% { opacity: 1; }
    50% { opacity: 0.8; }
  }

  @keyframes scaleIn {
    from { opacity: 0; transform: scale(0.88); }
    to { opacity: 1; transform: scale(1); }
  }

  /* STAT CARDS WITH GLASSMORPHISM */
  .stat-card {
    animation: bounceIn 0.9s cubic-bezier(0.34, 1.56, 0.64, 1) backwards;
    background: rgba(255,255,255,0.08) !important;
    backdrop-filter: blur(10px) !important;
    border: 1px solid rgba(255,255,255,0.15) !important;
    transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1) !important;
    position: relative;
  }

  .stat-card:hover {
    transform: translateY(-12px) scale(1.04);
    background: rgba(255,255,255,0.12) !important;
    backdrop-filter: blur(12px) !important;
    box-shadow: 0 0 40px rgba(217,100,46,0.4), 0 20px 60px rgba(217,100,46,0.25), 0 0 0 1px rgba(255,255,255,0.3) inset !important;
    border-left: 4px solid currentColor !important;
  }

  .stat-card:nth-child(1) { animation-delay: 0.15s; }
  .stat-card:nth-child(2) { animation-delay: 0.3s; }
  .stat-card:nth-child(3) { animation-delay: 0.45s; }
  .stat-card:nth-child(4) { animation-delay: 0.6s; }

  .stat-icon {
    animation: float 3.5s ease-in-out infinite;
    transition: all 0.3s ease;
  }

  .stat-card:hover .stat-icon {
    animation: iconSpin 0.6s cubic-bezier(0.34, 1.56, 0.64, 1);
    filter: drop-shadow(0 0 16px rgba(217,100,46,0.5));
  }

  .inventory-header {
    animation: fadeInUp 0.8s cubic-bezier(0.34, 1.56, 0.64, 1);
  }

  .filter-section {
    animation: slideInLeft 0.8s cubic-bezier(0.34, 1.56, 0.64, 1) 0.3s backwards;
    background: rgba(255,255,255,0.06) !important;
    backdrop-filter: blur(8px) !important;
    border: 1px solid rgba(255,255,255,0.1) !important;
  }

  .inventory-section {
    animation: fadeInUp 0.8s cubic-bezier(0.34, 1.56, 0.64, 1) 0.6s backwards;
  }

  .storage-info {
    animation: popIn 0.8s cubic-bezier(0.34, 1.56, 0.64, 1) 0.9s backwards;
  }

  /* INVENTORY GRID ITEMS */
  .inventory-item {
    animation: bounceIn 0.8s cubic-bezier(0.34, 1.56, 0.64, 1) backwards;
    transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
  }

  .inventory-item:nth-child(1) { animation-delay: 0.7s; }
  .inventory-item:nth-child(2) { animation-delay: 0.78s; }
  .inventory-item:nth-child(3) { animation-delay: 0.86s; }
  .inventory-item:nth-child(4) { animation-delay: 0.94s; }
  .inventory-item:nth-child(5) { animation-delay: 1.02s; }
  .inventory-item:nth-child(6) { animation-delay: 1.1s; }

  .inventory-item:hover {
    transform: translateY(-8px) scale(1.05);
    box-shadow: 0 0 30px rgba(217,100,46,0.3), 0 12px 36px rgba(217,100,46,0.2);
  }

  .rarity-border {
    animation: glowRarity 2s ease-in-out infinite;
    transition: border 0.3s cubic-bezier(0.34, 1.56, 0.64, 1);
  }

  /* FILTER DROPDOWN */
  .filter-dropdown {
    transition: all 0.3s cubic-bezier(0.34, 1.56, 0.64, 1);
  }

  .filter-dropdown:hover, .filter-dropdown:focus {
    border-color: #D9642E;
    box-shadow: 0 0 12px rgba(217,100,46,0.3);
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
          <Box className="inventory-header" bg="linear-gradient(135deg, rgba(217,100,46,0.25) 0%, rgba(59,130,246,0.15) 100%)" borderRadius="3xl" p={{ base: 6, md: 8 }} border="2px solid rgba(217,100,46,0.4)">
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

          <Box className="stat-card" bg="linear-gradient(135deg, rgba(16,185,129,0.08) 0%, rgba(16,185,129,0.04) 100%)" p={5} borderRadius="2xl" border="1px solid rgba(16,185,129,0.3)" borderLeft="4px solid #10b981" transition="all 0.3s" _hover={{ transform: 'translateY(-8px)', boxShadow: '0 12px 24px rgba(16,185,129,0.25)', borderLeftColor: '#059669' }}>
            <HStack justify="space-between" mb={2}>
              <Text color="#1a1a1a" fontSize="xs" fontWeight="700" textTransform="uppercase">
                Equipped
              </Text>
              <Box className="stat-icon" fontSize="20px" color="#10b981" bg="rgba(16,185,129,0.15)" p={2} borderRadius="lg">
                <MdShield />
              </Box>
            </HStack>
            <Text color="#10b981" fontSize="3xl" fontWeight="800">
              {inventory.filter(i => i.equipped).length}
            </Text>
            <Text fontSize="xs" color="#1a1a1a" mt={1} fontWeight="600">Now in use</Text>
          </Box>

          <Box className="stat-card" bg="linear-gradient(135deg, rgba(251,146,60,0.08) 0%, rgba(251,146,60,0.04) 100%)" p={5} borderRadius="2xl" border="1px solid rgba(251,146,60,0.3)" borderLeft="4px solid #fb923c" transition="all 0.3s" _hover={{ transform: 'translateY(-8px)', boxShadow: '0 12px 24px rgba(251,146,60,0.25)', borderLeftColor: '#f97316' }}>
            <HStack justify="space-between" mb={2}>
              <Text color="#1a1a1a" fontSize="xs" fontWeight="700" textTransform="uppercase">
                Legendary
              </Text>
              <Box className="stat-icon" fontSize="20px" color="#fb923c" bg="rgba(251,146,60,0.15)" p={2} borderRadius="lg">
                <MdTrendingUp />
              </Box>
            </HStack>
            <Text color="#fb923c" fontSize="3xl" fontWeight="800">
              {inventory.filter(i => i.rarity === 'legendary').length}
            </Text>
            <Text fontSize="xs" color="#1a1a1a" mt={1} fontWeight="600">Rare items</Text>
          </Box>

          <Box className="stat-card" bg="linear-gradient(135deg, rgba(168,85,247,0.08) 0%, rgba(168,85,247,0.04) 100%)" p={5} borderRadius="2xl" border="1px solid rgba(168,85,247,0.3)" borderLeft="4px solid #a855f7" transition="all 0.3s" _hover={{ transform: 'translateY(-8px)', boxShadow: '0 12px 24px rgba(168,85,247,0.25)', borderLeftColor: '#9333ea' }}>
            <HStack justify="space-between" mb={2}>
              <Text color="#1a1a1a" fontSize="xs" fontWeight="700" textTransform="uppercase">
                Storage
              </Text>
              <Box className="stat-icon" fontSize="20px" color="#a855f7" bg="rgba(168,85,247,0.15)" p={2} borderRadius="lg">
                <MdStorage />
              </Box>
            </HStack>
            <Text color="#a855f7" fontSize="3xl" fontWeight="800">
              {Math.round((inventory.length / 200) * 100)}%
            </Text>
            <Text fontSize="xs" color="#1a1a1a" mt={1} fontWeight="600">{inventory.length}/200 slots</Text>
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
