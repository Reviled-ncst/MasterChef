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
    0% { transform: rotate(0deg); filter: hue-rotate(0deg); }
    100% { transform: rotate(360deg); filter: hue-rotate(45deg); }
  }

  @keyframes float {
    0%, 100% { transform: translateY(0px) rotate(0deg); }
    50% { transform: translateY(-12px) rotate(8deg); }
  }

  @keyframes shimmer {
    0% { background-position: -1000px 0; }
    100% { background-position: 1000px 0; }
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

  .leaderboard-row {
    animation: slideInLeft 0.6s cubic-bezier(0.34, 1.56, 0.64, 1) backwards;
    transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
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
    transform: translateX(8px);
    background: rgba(217,100,46,0.1) !important;
    border-left: 4px solid #D9642E !important;
  }

  .rank-badge {
    animation: breathing 2s ease-in-out infinite;
    font-weight: 700;
    min-width: 32px;
    text-align: center;
  }

  .rank-badge.top-3 {
    animation: pulse 1.5s ease-in-out infinite;
    color: #FFB84D;
    font-size: 18px;
  }

  .tab-button {
    transition: all 0.3s cubic-bezier(0.34, 1.56, 0.64, 1);
  }

  .tab-button:hover {
    transform: translateY(-2px) scale(1.05);
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
          <Grid templateColumns={{ base: '1fr', md: '1fr 1fr', lg: 'repeat(4, 1fr)' }} gap={4}>
            <Box className="stat-card" bg="white" p={5} borderRadius="2xl" border="1px solid rgba(217,108,47,0.1)" boxShadow="0 4px 12px rgba(0,0,0,0.05)">
              <HStack justify="space-between" mb={2}>
                <Text color="#1a1a1a" fontSize="xs" fontWeight="700" textTransform="uppercase">
                  Total Players
                </Text>
                <Box className="stat-icon" fontSize="20px" color="#D9642E" bg="rgba(217,100,46,0.1)" p={2} borderRadius="lg">
                  <MdPerson />
                </Box>
              </HStack>
              <Text color="#D9642E" fontSize="3xl" fontWeight="800">
                45.2K
              </Text>
              <Text fontSize="xs" color="#1a1a1a" mt={1} fontWeight="600">Active players</Text>
            </Box>

            <Box className="stat-card" bg="linear-gradient(135deg, rgba(251,146,60,0.2) 0%, rgba(251,146,60,0.12) 100%)" p={5} borderRadius="2xl" border="1px solid rgba(251,146,60,0.4)" borderLeft="4px solid #fb923c">
              <HStack justify="space-between" mb={2}>
                <Text color="white" fontSize="xs" fontWeight="700" textTransform="uppercase">
                  Top Score
                </Text>
                <Box className="stat-icon" fontSize="20px" color="#fb923c" bg="rgba(251,146,60,0.2)" p={2} borderRadius="lg">
                  <MdStar />
                </Box>
              </HStack>
              <Text color="#FFB84D" fontSize="3xl" fontWeight="800">
                15,850
              </Text>
              <Text fontSize="xs" color="rgba(255,255,255,0.8)" mt={1} fontWeight="600">Current record</Text>
            </Box>

            <Box className="stat-card" bg="linear-gradient(135deg, rgba(168,85,247,0.2) 0%, rgba(168,85,247,0.12) 100%)" p={5} borderRadius="2xl" border="1px solid rgba(168,85,247,0.4)" borderLeft="4px solid #a855f7">
              <HStack justify="space-between" mb={2}>
                <Text color="white" fontSize="xs" fontWeight="700" textTransform="uppercase">
                  Avg. Score
                </Text>
                <Box className="stat-icon" fontSize="20px" color="#a855f7" bg="rgba(168,85,247,0.2)" p={2} borderRadius="lg">
                  <MdTrendingUp />
                </Box>
              </HStack>
              <Text color="#CCAAFF" fontSize="3xl" fontWeight="800">
                8,420
              </Text>
              <Text fontSize="xs" color="rgba(255,255,255,0.8)" mt={1} fontWeight="600">Across all players</Text>
            </Box>

            <Box className="stat-card" bg="linear-gradient(135deg, rgba(10,184,129,0.2) 0%, rgba(10,184,129,0.12) 100%)" p={5} borderRadius="2xl" border="1px solid rgba(10,184,129,0.4)" borderLeft="4px solid #10b981">
              <HStack justify="space-between" mb={2}>
                <Text color="white" fontSize="xs" fontWeight="700" textTransform="uppercase">
                  New This Week
                </Text>
                <Box className="stat-icon" fontSize="20px" color="#10b981" bg="rgba(10,184,129,0.2)" p={2} borderRadius="lg">
                  <MdArrowUpward />
                </Box>
              </HStack>
              <Text color="#6EE7B7" fontSize="3xl" fontWeight="800">
                +1,240
              </Text>
              <Text fontSize="xs" color="rgba(255,255,255,0.8)" mt={1} fontWeight="600">Players ranked</Text>
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
            <VStack align="stretch" gap={3}>
              {mockLeaderboardData.map((player, idx) => (
                <Box
                  key={player.rank}
                  className="leaderboard-row"
                  bg="white"
                  p={4}
                  borderRadius="lg"
                  border="1px solid rgba(217,108,47,0.15)"
                  display="flex"
                  justifyContent="space-between"
                  alignItems="center"
                  boxShadow="0 2px 8px rgba(0,0,0,0.08)"
                >
                  <HStack gap={4} flex={1}>
                    <Box className={`rank-badge ${player.rank <= 3 ? 'top-3' : ''}`} fontSize={player.rank <= 3 ? '20px' : '16px'}>
                      {player.rank <= 3 && '👑'}
                      <Text as="span" fontSize="md" fontWeight="700" color={player.rank <= 3 ? '#FFB84D' : '#1a1a1a'} ml={1}>
                        {player.rank}
                      </Text>
                    </Box>
                    <VStack align="start" gap={0}>
                      <Text fontWeight="700" fontSize="md" color="#1a1a1a">
                        {player.name}
                      </Text>
                      <Text fontSize="xs" color="gray.600">
                        {player.region} • {player.games} games
                      </Text>
                    </VStack>
                  </HStack>
                  <HStack gap={6}>
                    <VStack align="end" gap={0}>
                      <Text fontWeight="800" fontSize="lg" color="#D9642E">
                        {player.score.toLocaleString()}
                      </Text>
                      <HStack gap={1} justify="end">
                        {player.trend === 'up' && <MdArrowUpward color="#10b981" size={14} />}
                        {player.trend === 'down' && <MdArrowDownward color="#ef4444" size={14} />}
                        <Text fontSize="xs" color={player.trend === 'up' ? '#10b981' : player.trend === 'down' ? '#ef4444' : 'gray.600'}>
                          {player.trend === 'up' ? '+' : player.trend === 'down' ? '-' : '='} 2
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
