'use client';

import { Box, Heading, Text, VStack, HStack, Badge, Grid, Button } from '@chakra-ui/react';
import { MdTrendingUp, MdStar, MdPerson, MdArrowUpward, MdArrowDownward } from 'react-icons/md';
import { useRouter } from 'next/router';
import { useState } from 'react';

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

  /* INTERACTIVE ANIMATIONS */
  @keyframes glow {
    0%, 100% { box-shadow: 0 0 20px rgba(217,100,46,0.3), 0 8px 32px rgba(217,100,46,0.15); }
    50% { box-shadow: 0 0 40px rgba(217,100,46,0.5), 0 16px 48px rgba(217,100,46,0.25); }
  }

  @keyframes iconSpin {
    0% { transform: rotate(0deg) scale(1); filter: hue-rotate(0deg); }
    100% { transform: rotate(360deg) scale(1.1); filter: hue-rotate(45deg); }
  }

  @keyframes float {
    0%, 100% { transform: translateY(0px) rotate(0deg); }
    50% { transform: translateY(-12px) rotate(8deg); }
  }

  @keyframes shimmer {
    0% { background-position: -1000px 0; }
    100% { background-position: 1000px 0; }
  }

  @keyframes rankGlow {
    0%, 100% { box-shadow: 0 0 12px rgba(255,184,77,0.3); }
    50% { box-shadow: 0 0 24px rgba(255,184,77,0.6); }
  }

  @keyframes rowHoverGlow {
    0% { box-shadow: 0 2px 8px rgba(0,0,0,0.08); }
    100% { box-shadow: 0 12px 32px rgba(217,100,46,0.2), 0 0 20px rgba(217,100,46,0.15); }
  }

  /* STATE ANIMATIONS */
  @keyframes pulse {
    0%, 100% { opacity: 1; }
    50% { opacity: 0.8; }
  }

  @keyframes breathing {
    0%, 100% { opacity: 1; transform: scale(1); }
    50% { opacity: 0.9; transform: scale(1.02); }
  }

  .leaderboard-header {
    animation: fadeInUp 0.8s cubic-bezier(0.34, 1.56, 0.64, 1);
  }

  .stat-card {
    animation: bounceIn 0.9s cubic-bezier(0.34, 1.56, 0.64, 1) backwards;
    transition: all 0.4s cubic-bezier(0.34, 1.56, 0.64, 1) !important;
  }

  .stat-card:hover {
    transform: translateY(-16px) scale(1.06);
    box-shadow: 0 20px 60px rgba(217,100,46,0.3) !important;
  }

  .stat-card:nth-child(1) { animation-delay: 0.15s; }
  .stat-card:nth-child(2) { animation-delay: 0.3s; }
  .stat-card:nth-child(3) { animation-delay: 0.45s; }
  .stat-card:nth-child(4) { animation-delay: 0.6s; }

  .stat-icon {
    animation: float 3.5s ease-in-out infinite;
    transition: all 0.3s cubic-bezier(0.34, 1.56, 0.64, 1);
  }

  .stat-card:hover .stat-icon {
    animation: iconSpin 0.8s cubic-bezier(0.34, 1.56, 0.64, 1);
    filter: drop-shadow(0 0 20px rgba(217,100,46,0.6));
  }

  .leaderboard-row {
    animation: slideInLeft 0.6s cubic-bezier(0.34, 1.56, 0.64, 1) backwards;
    transition: all 0.35s cubic-bezier(0.34, 1.56, 0.64, 1);
    position: relative;
    border-left: 4px solid transparent;
  }

  .leaderboard-row:nth-child(1) { animation-delay: 0.2s; }
  .leaderboard-row:nth-child(2) { animation-delay: 0.28s; }
  .leaderboard-row:nth-child(3) { animation-delay: 0.36s; }
  .leaderboard-row:nth-child(4) { animation-delay: 0.44s; }
  .leaderboard-row:nth-child(5) { animation-delay: 0.52s; }
  .leaderboard-row:nth-child(6) { animation-delay: 0.6s; }
  .leaderboard-row:nth-child(7) { animation-delay: 0.68s; }
  .leaderboard-row:nth-child(8) { animation-delay: 0.76s; }
  .leaderboard-row:nth-child(9) { animation-delay: 0.84s; }
  .leaderboard-row:nth-child(10) { animation-delay: 0.92s; }

  .leaderboard-row:hover {
    transform: translateY(-6px) scale(1.02);
    border-left-color: #D9642E;
    background: linear-gradient(90deg, rgba(217,100,46,0.08) 0%, transparent 100%) !important;
  }

  .leaderboard-row:nth-child(-n+3):hover {
    box-shadow: 0 12px 32px rgba(255,184,77,0.2), 0 0 20px rgba(255,184,77,0.1) !important;
  }

  .leaderboard-row:nth-child(n+4):hover {
    box-shadow: 0 12px 32px rgba(217,100,46,0.15), 0 0 20px rgba(217,100,46,0.1) !important;
  }

  .rank-badge {
    animation: breathing 2s ease-in-out infinite;
    font-weight: 700;
    min-width: 32px;
    text-align: center;
    transition: all 0.3s ease;
  }

  .rank-badge.top-3 {
    animation: rankGlow 2s ease-in-out infinite;
    color: #FFB84D;
    font-size: 18px;
  }

  .leaderboard-row:hover .rank-badge {
    transform: scale(1.15);
  }

  .leaderboard-row:hover .rank-badge.top-3 {
    filter: drop-shadow(0 0 12px rgba(255,184,77,0.8));
  }

  .tab-button {
    transition: all 0.3s cubic-bezier(0.34, 1.56, 0.64, 1);
    position: relative;
    border-bottom: 3px solid transparent;
  }

  .tab-button:hover {
    transform: translateY(-3px);
    color: #D9642E !important;
    border-bottom-color: #D9642E;
  }
`;

const mockLeaderboardData = [
  { rank: 1, name: 'ChefMaster99', score: 15850, region: 'Global', trend: 'up', games: 342 },
  { rank: 2, name: 'CookingQueen', score: 15620, region: 'Europe', trend: 'up', games: 298 },
  { rank: 3, name: 'KitchenKing', score: 15340, region: 'NA', trend: 'down', games: 256 },
  { rank: 4, name: 'RecipeWizard', score: 14920, region: 'Asia', trend: 'up', games: 213 },
  { rank: 5, name: 'FlavorMaster', score: 14650, region: 'Global', trend: 'same', games: 187 },
  { rank: 6, name: 'PalateExpert', score: 14320, region: 'Europe', trend: 'down', games: 165 },
  { rank: 7, name: 'DishWhisperer', score: 13950, region: 'NA', trend: 'up', games: 142 },
  { rank: 8, name: 'SauceSorcerer', score: 13580, region: 'Asia', trend: 'up', games: 128 },
  { rank: 9, name: 'SpiceNinja', score: 13210, region: 'Global', trend: 'same', games: 112 },
  { rank: 10, name: 'FeastFounder', score: 12840, region: 'Europe', trend: 'down', games: 98 },
];

export default function Leaderboards() {
  const router = useRouter();
  const [activeTab, setActiveTab] = useState(0);

  return (
    <>
      <style>{animationStyles}</style>
      <Box py={{ base: 4, md: 8 }} px={{ base: 3, md: 8 }}>
        <VStack align="stretch" gap={8}>
          {/* HEADER */}
          <Box className="leaderboard-header" bg="linear-gradient(135deg, rgba(217,100,46,0.35) 0%, rgba(251,146,60,0.25) 100%)" borderRadius="3xl" p={{ base: 6, md: 8 }} border="2px solid rgba(217,100,46,0.5)">
            <HStack gap={3}>
              <Box fontSize="40px" color="white">
                <MdTrendingUp />
              </Box>
              <VStack align="start" gap={0}>
                <Heading as="h1" size={{ base: 'lg', md: '2xl' }} color="white">
                  Global Leaderboards
                </Heading>
                <Text color="rgba(255,255,255,0.95)" fontSize={{ base: 'sm', md: 'md' }} fontWeight="500">
                  Compete with players worldwide and climb the rankings
                </Text>
              </VStack>
            </HStack>
          </Box>

          {/* STAT CARDS */}
          <Grid templateColumns={{ base: '1fr', md: '1fr 1fr', lg: 'repeat(4, 1fr)' }} gap={6}>
            {/* Total Players Card */}
            <Box className="stat-card" bg="linear-gradient(135deg, #ffffff 0%, rgba(255,255,255,0.95) 100%)" p={6} borderRadius="2xl" border="1px solid rgba(217,100,46,0.2)" boxShadow="0 8px 24px rgba(217,100,46,0.1)">
              <HStack justify="space-between" mb={3}>
                <Text color="#1a1a1a" fontSize="xs" fontWeight="700" textTransform="uppercase" letterSpacing="1px">
                  Total Players
                </Text>
                <Box className="stat-icon" fontSize="24px" color="#D9642E" bg="linear-gradient(135deg, rgba(217,100,46,0.15) 0%, rgba(217,100,46,0.08) 100%)" p={2.5} borderRadius="xl" border="1px solid rgba(217,100,46,0.2)">
                  <MdPerson />
                </Box>
              </HStack>
              <Text color="#D9642E" fontSize="4xl" fontWeight="900" letterSpacing="-1px">
                45.2K
              </Text>
              <Text fontSize="xs" color="rgba(26,26,26,0.7)" mt={2} fontWeight="600">Active players</Text>
            </Box>

            {/* Top Score Card */}
            <Box className="stat-card" bg="linear-gradient(135deg, #FFF8E7 0%, #FFFBF0 100%)" p={6} borderRadius="2xl" border="1px solid rgba(251,146,60,0.3)" boxShadow="0 8px 24px rgba(251,146,60,0.12)">
              <HStack justify="space-between" mb={3}>
                <Text color="#b8860b" fontSize="xs" fontWeight="700" textTransform="uppercase" letterSpacing="1px">
                  Top Score
                </Text>
                <Box className="stat-icon" fontSize="24px" color="#fb923c" bg="linear-gradient(135deg, rgba(251,146,60,0.25) 0%, rgba(251,146,60,0.15) 100%)" p={2.5} borderRadius="xl" border="1px solid rgba(251,146,60,0.3)">
                  <MdStar />
                </Box>
              </HStack>
              <Text color="#FFB84D" fontSize="4xl" fontWeight="900" letterSpacing="-1px">
                15,850
              </Text>
              <Text fontSize="xs" color="rgba(184,134,11,0.8)" mt={2} fontWeight="600">Current record</Text>
            </Box>

            {/* Avg Score Card */}
            <Box className="stat-card" bg="linear-gradient(135deg, #F3E8FF 0%, #FAF5FF 100%)" p={6} borderRadius="2xl" border="1px solid rgba(168,85,247,0.3)" boxShadow="0 8px 24px rgba(168,85,247,0.12)">
              <HStack justify="space-between" mb={3}>
                <Text color="#7c3aed" fontSize="xs" fontWeight="700" textTransform="uppercase" letterSpacing="1px">
                  Avg. Score
                </Text>
                <Box className="stat-icon" fontSize="24px" color="#a855f7" bg="linear-gradient(135deg, rgba(168,85,247,0.2) 0%, rgba(168,85,247,0.1) 100%)" p={2.5} borderRadius="xl" border="1px solid rgba(168,85,247,0.3)">
                  <MdTrendingUp />
                </Box>
              </HStack>
              <Text color="#a855f7" fontSize="4xl" fontWeight="900" letterSpacing="-1px">
                8,420
              </Text>
              <Text fontSize="xs" color="rgba(124,58,237,0.7)" mt={2} fontWeight="600">Across all players</Text>
            </Box>

            {/* New This Week Card */}
            <Box className="stat-card" bg="linear-gradient(135deg, #ECFDF5 0%, #F0FDF4 100%)" p={6} borderRadius="2xl" border="1px solid rgba(16,185,129,0.3)" boxShadow="0 8px 24px rgba(16,185,129,0.12)">
              <HStack justify="space-between" mb={3}>
                <Text color="#059669" fontSize="xs" fontWeight="700" textTransform="uppercase" letterSpacing="1px">
                  New This Week
                </Text>
                <Box className="stat-icon" fontSize="24px" color="#10b981" bg="linear-gradient(135deg, rgba(16,185,129,0.2) 0%, rgba(16,185,129,0.1) 100%)" p={2.5} borderRadius="xl" border="1px solid rgba(16,185,129,0.3)">
                  <MdArrowUpward />
                </Box>
              </HStack>
              <Text color="#10b981" fontSize="4xl" fontWeight="900" letterSpacing="-1px">
                +1,240
              </Text>
              <Text fontSize="xs" color="rgba(5,150,105,0.7)" mt={2} fontWeight="600">Players ranked</Text>
            </Box>
          </Grid>

          {/* TABS */}
          <HStack gap={4} mb={6} borderBottom="2px solid rgba(217,108,47,0.1)" pb={4}>
            {['Global', 'Regional', 'Weekly', 'Friends'].map((tab, idx) => (
              <Button
                key={idx}
                className="tab-button"
                variant="ghost"
                onClick={() => setActiveTab(idx)}
                color={activeTab === idx ? '#D9642E' : 'gray.600'}
                fontWeight="600"
                borderBottom={activeTab === idx ? '3px solid #D9642E' : 'none'}
                pb={activeTab === idx ? 2 : 3}
                _hover={{ color: '#D9642E' }}
              >
                {tab}
              </Button>
            ))}
          </HStack>

          {/* TAB CONTENT */}
          {activeTab === 0 && (
            <VStack align="stretch" gap={2}>
              {mockLeaderboardData.map((player, idx) => (
                <Box
                  key={player.rank}
                  className="leaderboard-row"
                  bg={player.rank <= 3 ? 'linear-gradient(90deg, #FFF9F0 0%, white 100%)' : idx % 2 === 0 ? 'rgba(217,100,46,0.02)' : 'white'}
                  p={4}
                  borderRadius="lg"
                  border={player.rank <= 3 ? '1px solid rgba(255,184,77,0.3)' : '1px solid rgba(217,108,47,0.1)'}
                  display="flex"
                  justifyContent="space-between"
                  alignItems="center"
                  boxShadow={player.rank <= 3 ? '0 4px 12px rgba(255,184,77,0.08)' : '0 2px 8px rgba(0,0,0,0.05)'}
                >
                  <HStack gap={4} flex={1}>
                    <Box
                      className={`rank-badge ${player.rank <= 3 ? 'top-3' : ''}`}
                      fontSize={player.rank <= 3 ? '24px' : '18px'}
                      fontWeight="900"
                      minW="45px"
                      h="45px"
                      display="flex"
                      alignItems="center"
                      justifyContent="center"
                      borderRadius="md"
                      bg={player.rank === 1 ? 'linear-gradient(135deg, #FFD700 0%, #FFC700 100%)' : player.rank === 2 ? 'linear-gradient(135deg, #C0C0C0 0%, #A8A8A8 100%)' : player.rank === 3 ? 'linear-gradient(135deg, #CD7F32 0%, #B87333 100%)' : 'rgba(217,100,46,0.08)'}
                      color={player.rank <= 3 ? 'white' : '#D9642E'}
                      border={player.rank <= 3 ? '2px solid rgba(255,255,255,0.4)' : 'none'}
                      boxShadow={player.rank <= 3 ? '0 4px 12px rgba(0,0,0,0.15)' : 'none'}
                    >
                      {player.rank <= 3 && '👑'}
                      {player.rank > 3 && player.rank}
                    </Box>
                    <VStack align="start" gap={0.5}>
                      <Text fontWeight="700" fontSize="md" color="#1a1a1a">
                        {player.name}
                      </Text>
                      <HStack gap={2} fontSize="xs" color="rgba(26,26,26,0.6)">
                        <Text fontWeight="500">{player.region}</Text>
                        <Text>•</Text>
                        <Text>{player.games} games</Text>
                      </HStack>
                    </VStack>
                  </HStack>
                  <HStack gap={6} minW="fit-content">
                    <VStack align="end" gap={0}>
                      <Text fontWeight="900" fontSize="lg" color={player.rank <= 3 ? '#FFB84D' : '#D9642E'}>
                        {player.score.toLocaleString()}
                      </Text>
                      <HStack gap={1.5} justify="end">
                        {player.trend === 'up' && <MdArrowUpward color="#10b981" size={16} />}
                        {player.trend === 'down' && <MdArrowDownward color="#ef4444" size={16} />}
                        <Text fontSize="xs" fontWeight="600" color={player.trend === 'up' ? '#10b981' : player.trend === 'down' ? '#ef4444' : 'rgba(26,26,26,0.5)'}>
                          {player.trend === 'up' ? '+' : player.trend === 'down' ? '-' : '='}{' '}2
                        </Text>
                      </HStack>
                    </VStack>
                  </HStack>
                </Box>
              ))}
            </VStack>
          )}
          {activeTab === 1 && (
            <Box textAlign="center" py={12}>
              <Text color="gray.600" fontSize="lg">Regional leaderboards coming soon!</Text>
            </Box>
          )}
          {activeTab === 2 && (
            <Box textAlign="center" py={12}>
              <Text color="gray.600" fontSize="lg">Weekly leaderboards coming soon!</Text>
            </Box>
          )}
          {activeTab === 3 && (
            <Box textAlign="center" py={12}>
              <Text color="gray.600" fontSize="lg">Sign in to view your friends' rankings</Text>
            </Box>
          )}
        </VStack>
      </Box>
    </>
  );
}
