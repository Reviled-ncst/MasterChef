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

const animationStyles = `
  /* ENTRANCE ANIMATIONS */
  @keyframes fadeInUp {
    from {
      opacity: 0;
      transform: translateY(40px);
    }
    to {
      opacity: 1;
      transform: translateY(0);
    }
  }

  @keyframes bounceIn {
    0% {
      opacity: 0;
      transform: scale(0.8);
    }
    50% {
      transform: scale(1.08);
    }
    100% {
      opacity: 1;
      transform: scale(1);
    }
  }

  @keyframes popIn {
    0% {
      opacity: 0;
      transform: scale(0.5) rotate(-10deg);
    }
    50% {
      transform: scale(1.12) rotate(5deg);
    }
    100% {
      opacity: 1;
      transform: scale(1) rotate(0deg);
    }
  }

  @keyframes rotateInY {
    from {
      opacity: 0;
      transform: perspective(400px) rotateY(90deg);
    }
    to {
      opacity: 1;
      transform: perspective(400px) rotateY(0deg);
    }
  }

  @keyframes slideInUpScale {
    from {
      opacity: 0;
      transform: translateY(40px) scale(0.9);
    }
    to {
      opacity: 1;
      transform: translateY(0) scale(1);
    }
  }

  @keyframes morphIn {
    0% {
      opacity: 0;
      transform: scale(0.85);
      filter: blur(10px);
    }
    100% {
      opacity: 1;
      transform: scale(1);
      filter: blur(0px);
    }
  }

  /* INTERACTIVE ANIMATIONS */
  @keyframes glow {
    0%, 100% {
      box-shadow: 0 0 20px rgba(217,100,46,0.3), 0 8px 32px rgba(217,100,46,0.15);
    }
    50% {
      box-shadow: 0 0 40px rgba(217,100,46,0.5), 0 16px 48px rgba(217,100,46,0.25);
    }
  }

  @keyframes shimmer {
    0% {
      background: linear-gradient(90deg, transparent, rgba(255,255,255,0.3), transparent);
      background-position: -1000px 0;
    }
    100% {
      background-position: 1000px 0;
    }
  }

  @keyframes ripple {
    0% {
      transform: translate(-50%, -50%) scale(0);
      opacity: 1;
    }
    100% {
      transform: translate(-50%, -50%) scale(4);
      opacity: 0;
    }
  }

  @keyframes float {
    0%, 100% {
      transform: translateY(0px) rotate(0deg);
    }
    50% {
      transform: translateY(-15px) rotate(8deg);
    }
  }

  @keyframes iconSpin {
    0% {
      transform: rotate(0deg);
      filter: hue-rotate(0deg);
    }
    100% {
      transform: rotate(360deg);
      filter: hue-rotate(45deg);
    }
  }

  @keyframes hoverLift3D {
    from {
      transform: translateY(0px) translateZ(0px);
      filter: drop-shadow(0 4px 12px rgba(0,0,0,0.1));
    }
    to {
      transform: translateY(-12px) translateZ(20px);
      filter: drop-shadow(0 16px 40px rgba(217,100,46,0.3));
    }
  }

  @keyframes pulse-glow {
    0%, 100% {
      opacity: 1;
      filter: drop-shadow(0 0 8px rgba(217,100,46,0.3));
    }
    50% {
      opacity: 0.8;
      filter: drop-shadow(0 0 20px rgba(217,100,46,0.6));
    }
  }

  /* STATE ANIMATIONS */
  @keyframes breathing {
    0%, 100% {
      opacity: 1;
      transform: scale(1);
    }
    50% {
      opacity: 0.9;
      transform: scale(1.02);
    }
  }

  @keyframes fadeIn {
    from { opacity: 0; }
    to { opacity: 1; }
  }

  @keyframes slideInDown {
    from {
      opacity: 0;
      transform: translateY(-40px);
    }
    to {
      opacity: 1;
      transform: translateY(0);
    }
  }

  @keyframes scaleIn {
    from {
      opacity: 0;
      transform: scale(0.88);
    }
    to {
      opacity: 1;
      transform: scale(1);
    }
  }

  @keyframes pulse {
    0%, 100% { opacity: 1; }
    50% { opacity: 0.8; }
  }

  /* CLASS ANIMATIONS */
  .fade-in-up {
    animation: fadeInUp 0.8s cubic-bezier(0.34, 1.56, 0.64, 1);
  }

  .fade-in {
    animation: fadeIn 0.7s ease-out;
  }

  .slide-in-down {
    animation: slideInDown 0.8s cubic-bezier(0.34, 1.56, 0.64, 1);
  }

  .scale-in {
    animation: scaleIn 0.7s cubic-bezier(0.34, 1.56, 0.64, 1);
  }

  .float {
    animation: float 4s ease-in-out infinite;
  }

  .pulse-animation {
    animation: pulse 2.5s ease-in-out infinite;
  }

  .stat-card {
    animation: bounceIn 0.9s cubic-bezier(0.34, 1.56, 0.64, 1) backwards;
    background: rgba(255,255,255,0.08) !important;
    backdrop-filter: blur(10px) !important;
    border: 1px solid rgba(255,255,255,0.15) !important;
    transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1) !important;
  }

  .stat-card:hover {
    transform: translateY(-12px) scale(1.04);
    background: rgba(255,255,255,0.12) !important;
    backdrop-filter: blur(12px) !important;
    box-shadow: 0 0 40px rgba(217,100,46,0.4), 0 20px 60px rgba(217,100,46,0.25), 0 0 0 1px rgba(255,255,255,0.3) inset !important;
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

  .tab-button {
    position: relative;
    transition: all 0.4s cubic-bezier(0.34, 1.56, 0.64, 1);
  }

  .tab-button:hover {
    transform: translateY(-4px) scale(1.05);
    color: #D9642E;
  }

  .tab-button::after {
    content: '';
    position: absolute;
    bottom: -4px;
    left: 0;
    width: 0;
    height: 3px;
    background: linear-gradient(90deg, #D9642E, #FFB84D);
    border-radius: 2px;
    transition: width 0.4s cubic-bezier(0.34, 1.56, 0.64, 1);
  }

  .tab-button.active::after {
    width: 100%;
  }

  .tab-content {
    animation: fadeInUp 0.7s cubic-bezier(0.34, 1.56, 0.64, 1);
  }

  /* HERO BANNER ENHANCEMENTS */
  .hero-banner-icon {
    animation: float 4s ease-in-out infinite;
    filter: drop-shadow(0 4px 12px rgba(217,100,46,0.3));
  }

  .hero-banner-icon:hover {
    animation: iconSpin 0.8s cubic-bezier(0.34, 1.56, 0.64, 1);
    filter: drop-shadow(0 0 24px rgba(217,100,46,0.6));
  }

  /* SECTION HEADERS */
  .section-header {
    animation: slideInDown 0.8s cubic-bezier(0.34, 1.56, 0.64, 1);
  }

  /* PROGRESS BARS */
  .progress-fill {
    background: linear-gradient(90deg, #D9642E, #FFB84D);
    background-size: 200% 100%;
    animation: shimmer 3s linear infinite;
    transition: width 0.6s cubic-bezier(0.34, 1.56, 0.64, 1);
  }

  /* GRID ITEMS STAGGER */
  .grid-item {
    animation: bounceIn 0.85s cubic-bezier(0.34, 1.56, 0.64, 1) backwards;
  }

  .grid-item:nth-child(1) { animation-delay: 0.1s; }
  .grid-item:nth-child(2) { animation-delay: 0.18s; }
  .grid-item:nth-child(3) { animation-delay: 0.26s; }
  .grid-item:nth-child(4) { animation-delay: 0.34s; }
  .grid-item:nth-child(5) { animation-delay: 0.42s; }
  .grid-item:nth-child(6) { animation-delay: 0.5s; }

  /* BUTTON ANIMATIONS */
  .action-button {
    position: relative;
    overflow: hidden;
    transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
  }

  .action-button:hover {
    transform: translateY(-4px) scale(1.05);
    box-shadow: 0 16px 40px rgba(217,100,46,0.3);
  }

  .action-button:active {
    transform: translateY(-2px) scale(1.02);
  }
`;

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
    <>
      <style>{animationStyles}</style>
      <Box py={{ base: 4, md: 8 }} px={{ base: 3, md: 8 }} className="fade-in-up">
        <VStack align="stretch" gap={8}>
        {/* HERO BANNER */}
        <Box
          bgGradient="linear(to-r, #D9642E 0%, #FF8A3D 50%, #FFB84D 100%)"
          borderRadius="3xl"
          p={{ base: 6, md: 10 }}
          color="white"
          position="relative"
          overflow="hidden"
          boxShadow="0 8px 32px rgba(217, 100, 46, 0.3)"
          _before={{
            content: '""',
            position: 'absolute',
            top: -50,
            right: -50,
            width: '400px',
            height: '400px',
            bg: 'rgba(255,255,255,0.1)',
            borderRadius: 'full',
            transform: 'translate(50%, -50%)',
          }}
          _after={{
            content: '""',
            position: 'absolute',
            bottom: -80,
            left: -80,
            width: '300px',
            height: '300px',
            bg: 'rgba(255,255,255,0.05)',
            borderRadius: 'full',
          }}
        >
          <VStack align="start" gap={4} position="relative" zIndex={1} width="100%">
            <HStack justify="space-between" width="100%" flexDirection={{ base: 'column', md: 'row' }} align={{ base: 'start', md: 'center' }} gap={4}>
              <VStack align="start" gap={2}>
                <HStack gap={2} flexWrap="wrap">
                  <Heading as="h1" size={{ base: 'lg', md: '2xl' }}>
                    Welcome back, {currentUser.name}!
                  </Heading>
                  <Box fontSize={{ base: 'xl', md: '2xl' }} color="white" pt={2}>
                    <MdDashboard />
                  </Box>
                </HStack>
                <Text fontSize={{ base: 'sm', md: 'lg' }} opacity={0.9}>
                  Level {playerProfile.level} • {playerProfile.totalPlaytime}
                </Text>
              </VStack>
              <Box textAlign="right">
                <Badge bg="rgba(255,255,255,0.3)" color="white" fontSize={{ base: 'xs', md: 'sm' }} px={3} py={1}>
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
            <HStack gap={3} pt={2} flexDirection={{ base: 'column', sm: 'row' }} width={{ base: '100%', sm: 'auto' }}>
              <Button bg="white" color="#D9642E" fontWeight="700" _hover={{ bg: 'gray.100' }} display="flex" gap="8px" width={{ base: '100%', sm: 'auto' }}>
                <MdPlayArrow size={18} />
                Play Now
              </Button>
              <Button variant="outline" borderColor="white" color="white" fontWeight="700" _hover={{ bg: 'rgba(255,255,255,0.1)' }} display="flex" gap="8px" width={{ base: '100%', sm: 'auto' }}>
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
        <Grid templateColumns={{ base: '1fr', md: '1fr', lg: '1fr 350px' }} gap={6}>
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
                      <Box className="stat-card" bg="white" p={6} borderRadius="2xl" boxShadow="0 4px 12px rgba(0,0,0,0.08)" border="1px solid rgba(217,108,47,0.15)" transition="all 0.3s cubic-bezier(0.4, 0, 0.2, 1)" _hover={{ transform: 'translateY(-8px)', boxShadow: '0 20px 40px rgba(217,100,46,0.2)' }}>
                        <HStack justify="space-between" mb={3}>
                          <Text color="gray.600" fontSize="sm" fontWeight="700" textTransform="uppercase">
                            Current Level
                          </Text>
                          <Box fontSize="24px" color="#D9642E" bg="rgba(217,100,46,0.1)" p={2} borderRadius="lg" className="float">
                            <MdDashboard />
                          </Box>
                        </HStack>
                        <Text color="#D9642E" fontSize="4xl" fontWeight="800" mb={2} className="pulse-animation">
                          {playerProfile.level}
                        </Text>
                        <CustomProgress value={(playerProfile.exp / playerProfile.nextLevelExp) * 100} colorScheme="orange" height="6px" />
                        <Text fontSize="xs" color="gray.500" mt={2}>
                          {playerProfile.exp} / {playerProfile.nextLevelExp} EXP
                        </Text>
                      </Box>

                      <Box className="stat-card" bg="linear-gradient(135deg, rgba(16,185,129,0.1) 0%, rgba(16,185,129,0.05) 100%)" p={6} borderRadius="2xl" border="1px solid rgba(16,185,129,0.3)" transition="all 0.3s cubic-bezier(0.4, 0, 0.2, 1)" _hover={{ transform: 'translateY(-8px)', boxShadow: '0 20px 40px rgba(16,185,129,0.15)' }}>
                        <HStack justify="space-between" mb={3}>
                          <Text color="gray.600" fontSize="sm" fontWeight="700" textTransform="uppercase">
                            Cooking Skill
                          </Text>
                          <Box fontSize="24px" color="#10b981" bg="rgba(16,185,129,0.1)" p={2} borderRadius="lg" className="float" style={{ animationDelay: '0.5s' }}>
                            <MdAnalytics />
                          </Box>
                        </HStack>
                        <Text color="#10b981" fontSize="4xl" fontWeight="800" mb={2}>
                          78%
                        </Text>
                        <Text color="gray.600" fontSize="xs">
                          Expert level
                        </Text>
                      </Box>

                      <Box className="stat-card" bg="linear-gradient(135deg, rgba(59,130,246,0.1) 0%, rgba(59,130,246,0.05) 100%)" p={6} borderRadius="2xl" border="1px solid rgba(59,130,246,0.3)" transition="all 0.3s cubic-bezier(0.4, 0, 0.2, 1)" _hover={{ transform: 'translateY(-8px)', boxShadow: '0 20px 40px rgba(59,130,246,0.15)' }}>
                        <HStack justify="space-between" mb={3}>
                          <Text color="gray.600" fontSize="sm" fontWeight="700" textTransform="uppercase">
                            Recipes
                          </Text>
                          <Box fontSize="24px" color="#3b82f6" bg="rgba(59,130,246,0.1)" p={2} borderRadius="lg" className="float" style={{ animationDelay: '1s' }}>
                            <MdBackpack />
                          </Box>
                        </HStack>
                        <Text color="#3b82f6" fontSize="4xl" fontWeight="800" mb={2}>
                          47
                        </Text>
                        <Text color="gray.600" fontSize="xs">
                          / 120 total
                        </Text>
                      </Box>

                      <Box className="stat-card" bg="linear-gradient(135deg, rgba(168,85,247,0.1) 0%, rgba(168,85,247,0.05) 100%)" p={6} borderRadius="2xl" border="1px solid rgba(168,85,247,0.3)" transition="all 0.3s cubic-bezier(0.4, 0, 0.2, 1)" _hover={{ transform: 'translateY(-8px)', boxShadow: '0 20px 40px rgba(168,85,247,0.15)' }}>
                        <HStack justify="space-between" mb={3}>
                          <Text color="gray.600" fontSize="sm" fontWeight="700" textTransform="uppercase">
                            Achievements
                          </Text>
                          <Box fontSize="24px" color="#a855f7" bg="rgba(168,85,247,0.1)" p={2} borderRadius="lg" className="float" style={{ animationDelay: '1.5s' }}>
                            <MdStar />
                          </Box>
                        </HStack>
                        <Text color="#a855f7" fontSize="4xl" fontWeight="800" mb={2}>
                          14
                        </Text>
                        <Text color="gray.600" fontSize="xs">
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
    </>
  );
}

GamerDashboard.title = 'Gamer Dashboard - Master Chef';
