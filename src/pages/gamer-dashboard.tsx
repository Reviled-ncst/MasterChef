'use client';

import { Box, Heading, Text, Grid, GridItem, VStack, HStack, Badge, Button } from '@chakra-ui/react';
import { MdDashboard, MdAttachMoney, MdSettings, MdPlayArrow, MdShoppingCart, MdEmojiEvents, MdStar, MdAnalytics, MdBackpack, MdLock } from 'react-icons/md';
import { useCurrentUser } from '../../lib/authHooks';
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import RecentNotifications from '../../components/RecentNotifications';
import GamerWalletCard from '../../components/GamerWalletCard';
import DailyChallengesPanel from '../../components/DailyChallengesPanel';
import InventorySection from '../../components/InventorySection';
import CurrentTournament from '../../components/CurrentTournament';
import BattlePassSection from '../../components/BattlePassSection';
import CustomProgress from '../../components/CustomProgress';
import { generatePlayerProfile, generateDailyChallenges, generateNotifications, generatePlayerInventory, generateTournaments, generateBattlePass, generatePlayerWallet } from '../../lib/mockData';

export default function GamerDashboard() {
  const currentUser = useCurrentUser();
  const router = useRouter();
  const [isHydrated, setIsHydrated] = useState(false);
  const [activeTab, setActiveTab] = useState(0);

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

  // Generate mock data
  const playerProfile = generatePlayerProfile(currentUser);
  const playerWallet = generatePlayerWallet();
  const dailyChallenges = generateDailyChallenges();
  const notifications = generateNotifications();
  const inventory = generatePlayerInventory();
  const tournaments = generateTournaments();
  const battlePass = generateBattlePass();

  return (
    <Box py={8} px={{ base: 4, md: 8 }}>
      <VStack align="stretch" gap={8}>
        {/* HERO BANNER */}
        <Box
          bgGradient="linear(to-r, #D9642E 0%, #FF8A3D 100%)"
          borderRadius="2xl"
          p={{ base: 6, md: 8 }}
          color="white"
          position="relative"
          overflow="hidden"
          _before={{
            content: '""',
            position: 'absolute',
            top: 0,
            right: 0,
            width: '300px',
            height: '300px',
            bg: 'rgba(255,255,255,0.1)',
            borderRadius: 'full',
            transform: 'translate(50%, -50%)',
          }}
        >
          <VStack align="start" gap={4} position="relative" zIndex={1}>
            <HStack justify="space-between" width="100%">
              <VStack align="start" gap={2}>
                <HStack gap={2}>
                  <Heading as="h1" size="2xl">
                    Welcome back, {currentUser.name}!
                  </Heading>
                  <Box fontSize="2xl" color="white" pt={2}>
                    <MdDashboard />
                  </Box>
                </HStack>
                <Text fontSize="lg" opacity={0.9}>
                  Level {playerProfile.level} • {playerProfile.totalPlaytime}
                </Text>
              </VStack>
              <Box textAlign="right">
                <Badge bg="rgba(255,255,255,0.3)" color="white" fontSize="sm" px={3} py={1}>
                  <HStack gap={1}>
                    <MdStar size={14} />
                    <Text>{playerProfile.tier}</Text>
                  </HStack>
                </Badge>
              </Box>
            </HStack>

            {/* Level Progress in Banner */}
            <Box width="100%" maxW="400px">
              <HStack justify="space-between" mb={2}>
                <Text fontSize="sm" fontWeight="600">
                  Experience Progress
                </Text>
                <Text fontSize="sm">{playerProfile.exp} / {playerProfile.nextLevelExp}</Text>
              </HStack>
              <CustomProgress value={(playerProfile.exp / playerProfile.nextLevelExp) * 100} colorScheme="whiteAlpha" height="8px" />
            </Box>

            {/* Quick Actions */}
            <HStack gap={3} pt={2}>
              <Button bg="white" color="#D9642E" fontWeight="700" _hover={{ bg: 'gray.100' }} display="flex" gap="8px">
                <MdPlayArrow size={18} />
                Play Now
              </Button>
              <Button variant="outline" borderColor="white" color="white" fontWeight="700" _hover={{ bg: 'rgba(255,255,255,0.1)' }} display="flex" gap="8px">
                <MdSettings size={18} />
                Settings
              </Button>
            </HStack>
          </VStack>
        </Box>

        {/* WALLET & QUICK ACTIONS */}
        <Box>
          <HStack gap={2} mb={4}>
            <Box fontSize="lg" color="#D9642E">
              <MdAttachMoney />
            </Box>
            <Heading as="h2" size="lg" color="#D9642E">
              Your Resources
            </Heading>
          </HStack>
          <GamerWalletCard wallet={{ coins: playerWallet.coins, gems: playerWallet.gems, premiumCurrency: playerWallet.premiumCurrency }} />
        </Box>

        {/* NOTIFICATIONS & MAIN CONTENT */}
        <Grid templateColumns={{ base: '1fr', lg: '1fr 350px' }} gap={6}>
          {/* TABS SECTION */}
          <VStack align="stretch" gap={0}>
            {/* Tab Navigation */}
            <HStack pb={6} overflowX="auto" overflowY="hidden" display="flex" gap={2} borderBottom="1px solid rgba(217,108,47,0.1)">
              <Button
                fontSize="sm"
                fontWeight="600"
                px={4}
                py={2}
                onClick={() => setActiveTab(0)}
                bg={activeTab === 0 ? 'orange.100' : 'transparent'}
                color={activeTab === 0 ? '#D9642E' : 'gray.600'}
                borderBottom={activeTab === 0 ? '2px solid #D9642E' : 'none'}
                borderRadius={0}
                _hover={{ bg: activeTab === 0 ? 'orange.100' : 'gray.50' }}
                display="flex"
                gap="8px"
              >
                <MdAnalytics size={16} />
                Overview
              </Button>
              <Button
                fontSize="sm"
                fontWeight="600"
                px={4}
                py={2}
                onClick={() => setActiveTab(1)}
                bg={activeTab === 1 ? 'orange.100' : 'transparent'}
                color={activeTab === 1 ? '#D9642E' : 'gray.600'}
                borderBottom={activeTab === 1 ? '2px solid #D9642E' : 'none'}
                borderRadius={0}
                _hover={{ bg: activeTab === 1 ? 'orange.100' : 'gray.50' }}
                display="flex"
                gap="8px"
              >
                <MdBackpack size={16} />
                Inventory
              </Button>
              <Button
                fontSize="sm"
                fontWeight="600"
                px={4}
                py={2}
                onClick={() => setActiveTab(2)}
                bg={activeTab === 2 ? 'orange.100' : 'transparent'}
                color={activeTab === 2 ? '#D9642E' : 'gray.600'}
                borderBottom={activeTab === 2 ? '2px solid #D9642E' : 'none'}
                borderRadius={0}
                _hover={{ bg: activeTab === 2 ? 'orange.100' : 'gray.50' }}
                display="flex"
                gap="8px"
              >
                <MdEmojiEvents size={16} />
                Tournaments
              </Button>
              <Button
                fontSize="sm"
                fontWeight="600"
                px={4}
                py={2}
                onClick={() => setActiveTab(3)}
                bg={activeTab === 3 ? 'orange.100' : 'transparent'}
                color={activeTab === 3 ? '#D9642E' : 'gray.600'}
                borderBottom={activeTab === 3 ? '2px solid #D9642E' : 'none'}
                borderRadius={0}
                _hover={{ bg: activeTab === 3 ? 'orange.100' : 'gray.50' }}
                display="flex"
                gap="8px"
              >
                <MdShoppingCart size={16} />
                Shop
              </Button>
            </HStack>

            {/* Tab Content */}
            <Box pt={6}>
              {/* OVERVIEW TAB */}
              {activeTab === 0 && (
                <VStack align="stretch" gap={8}>
                  {/* Stats Cards */}
                  <Box>
                    <Heading as="h3" size="md" color="#D9642E" mb={4}>
                      Your Stats
                    </Heading>
                    <Grid templateColumns={{ base: '1fr', md: '1fr 1fr', lg: '1fr 1fr 1fr 1fr' }} gap={4}>
                      <Box bg="white" p={6} borderRadius="lg" boxShadow="0 2px 8px rgba(0,0,0,0.06)" border="1px solid rgba(217,108,47,0.1)">
                        <Text color="gray.600" fontSize="sm" fontWeight="600" mb={2}>
                          Current Level
                        </Text>
                        <Text color="#D9642E" fontSize="3xl" fontWeight="700">
                          {playerProfile.level}
                        </Text>
                        <CustomProgress value={(playerProfile.exp / playerProfile.nextLevelExp) * 100} colorScheme="orange" height="6px" />
                      </Box>

                      <Box bg="white" p={6} borderRadius="lg" boxShadow="0 2px 8px rgba(0,0,0,0.06)" border="1px solid rgba(217,108,47,0.1)">
                        <Text color="gray.600" fontSize="sm" fontWeight="600" mb={2}>
                          Cooking Skill
                        </Text>
                        <Text color="#D9642E" fontSize="3xl" fontWeight="700">
                          78%
                        </Text>
                        <Text color="gray.500" fontSize="xs" mt={1}>
                          Expert level
                        </Text>
                      </Box>

                      <Box bg="white" p={6} borderRadius="lg" boxShadow="0 2px 8px rgba(0,0,0,0.06)" border="1px solid rgba(217,108,47,0.1)">
                        <Text color="gray.600" fontSize="sm" fontWeight="600" mb={2}>
                          Recipes
                        </Text>
                        <Text color="#D9642E" fontSize="3xl" fontWeight="700">
                          47
                        </Text>
                        <Text color="gray.500" fontSize="xs" mt={1}>
                          / 120 total
                        </Text>
                      </Box>

                      <Box bg="white" p={6} borderRadius="lg" boxShadow="0 2px 8px rgba(0,0,0,0.06)" border="1px solid rgba(217,108,47,0.1)">
                        <Text color="gray.600" fontSize="sm" fontWeight="600" mb={2}>
                          Achievements
                        </Text>
                        <Text color="#D9642E" fontSize="3xl" fontWeight="700">
                          14
                        </Text>
                        <Text color="gray.500" fontSize="xs" mt={1}>
                          Badges unlocked
                        </Text>
                      </Box>
                    </Grid>
                  </Box>

                  {/* Daily Challenges */}
                  <DailyChallengesPanel challenges={dailyChallenges} />

                  {/* Battle Pass */}
                  <BattlePassSection battlePass={battlePass} />

                  {/* Current Tournament */}
                  <CurrentTournament tournament={tournaments[0]} />
                </VStack>
              )}

              {/* INVENTORY TAB */}
              {activeTab === 1 && (
                <InventorySection items={inventory} />
              )}

              {/* TOURNAMENTS TAB */}
              {activeTab === 2 && (
                <VStack align="stretch" gap={6}>
                  <Box>
                    <Heading as="h3" size="md" color="#D9642E" mb={4}>
                      Featured Tournament
                    </Heading>
                    <CurrentTournament tournament={tournaments[0]} />
                  </Box>

                  <Box>
                    <Heading as="h3" size="md" color="#D9642E" mb={4}>
                      Active Tournaments
                    </Heading>
                    <Grid templateColumns={{ base: '1fr', md: '1fr 1fr' }} gap={4}>
                      {tournaments.slice(1, 3).map((tournament) => (
                        <Box key={tournament.id} bg="white" p={4} borderRadius="lg" border="1px solid rgba(217,108,47,0.1)">
                          <Text fontWeight="700" color="#D9642E" mb={2}>
                            {tournament.name}
                          </Text>
                          <Text fontSize="sm" color="gray.600" mb={3}>
                            Entry: {tournament.entryFee} coins
                          </Text>
                          <HStack justify="space-between" fontSize="sm" mb={3}>
                            <Text>{tournament.currentPlayers}/{tournament.maxPlayers} players</Text>
                            <Badge bg="orange.100" color="#D9642E">
                              Active
                            </Badge>
                          </HStack>
                          <Button width="100%" size="sm" bg="#D9642E" color="white" fontWeight="600">
                            Register
                          </Button>
                        </Box>
                      ))}
                    </Grid>
                  </Box>
                </VStack>
              )}

              {/* SHOP TAB */}
              {activeTab === 3 && (
                <VStack align="stretch" gap={6}>
                  <Box>
                    <Heading as="h3" size="md" color="#D9642E" mb={4}>
                      Featured Items
                    </Heading>
                    <Grid templateColumns={{ base: '1fr', md: '1fr 1fr' }} gap={4}>
                      <Box bg="linear-gradient(135deg, rgba(217,100,46,0.15) 0%, rgba(255,184,77,0.1) 100%)" p={6} borderRadius="lg" border="2px solid #D9642E">
                        <Text fontSize="sm" color="gray.600" fontWeight="600" mb={2}>
                          FEATURED
                        </Text>
                        <Text fontWeight="700" color="#D9642E" fontSize="lg" mb={2}>
                          Premium Battle Pass
                        </Text>
                        <Text fontSize="sm" color="gray.600" mb={4}>
                          Unlock exclusive rewards and level rewards faster
                        </Text>
                        <HStack justify="space-between">
                          <Text fontWeight="700" color="#D9642E">
                            1,200 coins
                          </Text>
                          <Button size="sm" bg="#D9642E" color="white" fontWeight="600">
                            Buy
                          </Button>
                        </HStack>
                      </Box>

                      <Box bg="linear-gradient(135deg, rgba(155,89,182,0.15) 0%, rgba(155,89,182,0.05) 100%)" p={6} borderRadius="lg" border="1px solid rgba(155,89,182,0.3)">
                        <Text fontSize="sm" color="gray.600" fontWeight="600" mb={2}>
                          NEW
                        </Text>
                        <Text fontWeight="700" color="#9b59b6" fontSize="lg" mb={2}>
                          Purple Dragon Spatula
                        </Text>
                        <Text fontSize="sm" color="gray.600" mb={4}>
                          Legendary cooking equipment
                        </Text>
                        <HStack justify="space-between">
                          <Text fontWeight="700" color="#9b59b6">
                            500 gems
                          </Text>
                          <Button size="sm" bg="#9b59b6" color="white" fontWeight="600">
                            Buy
                          </Button>
                        </HStack>
                      </Box>
                    </Grid>
                  </Box>

                  <Box>
                    <Heading as="h3" size="md" color="#D9642E" mb={4}>
                      All Shop Items
                    </Heading>
                    <Grid templateColumns={{ base: '1fr', md: '1fr 1fr' }} gap={4}>
                      {[
                        { name: 'Golden Whisk', price: '250 coins', rarity: 'epic' },
                        { name: 'Flame Knife', price: '350 gems', rarity: 'legendary' },
                        { name: 'Herb Pack', price: '100 coins', rarity: 'common' },
                        { name: 'Crystal Bowl', price: '200 gems', rarity: 'rare' },
                      ].map((item) => (
                        <Box key={item.name} bg="white" p={4} borderRadius="lg" border="1px solid rgba(217,108,47,0.1)" _hover={{ boxShadow: '0 4px 12px rgba(0,0,0,0.1)', transform: 'translateY(-2px)' }} transition="all 0.2s">
                          <Text fontWeight="700" mb={2}>
                            {item.name}
                          </Text>
                          <Badge fontSize="10px" mb={3} colorScheme={item.rarity === 'common' ? 'gray' : item.rarity === 'rare' ? 'blue' : 'orange'}>
                            {item.rarity}
                          </Badge>
                          <HStack justify="space-between">
                            <Text fontWeight="700" color="#D9642E">
                              {item.price}
                            </Text>
                            <Button size="sm" bg="#D9642E" color="white" fontWeight="600">
                              Add
                            </Button>
                          </HStack>
                        </Box>
                      ))}
                    </Grid>
                  </Box>
                </VStack>
              )}
            </Box>
          </VStack>

          {/* NOTIFICATIONS SIDEBAR */}
          <Box bg="white" p={6} borderRadius="lg" boxShadow="0 2px 8px rgba(0,0,0,0.06)" height="fit-content" position={{ base: 'relative', lg: 'sticky' }} top={{ lg: '20px' }}>
            <RecentNotifications notifications={notifications} />
          </Box>
        </Grid>
      </VStack>
    </Box>
  );
}

GamerDashboard.title = 'Gamer Dashboard - Master Chef';
