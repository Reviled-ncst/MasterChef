'use client';

import { Box, Heading, Text, VStack, HStack, Button, Grid, Badge, Input } from '@chakra-ui/react';
import { MdEmojiEvents } from 'react-icons/md';
import { useCurrentUser } from '../../lib/authHooks';
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import CurrentTournament from '../../components/CurrentTournament';
import { generateTournaments } from '../../lib/mockData';

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
      transform: translateY(-8px);
    }
  }

  @keyframes glow {
    0%, 100% {
      filter: drop-shadow(0 0 8px rgba(217,100,46,0.4));
    }
    50% {
      filter: drop-shadow(0 0 16px rgba(217,100,46,0.8));
    }
  }

  .tournament-header {
    animation: fadeInUp 0.6s ease-out;
  }

  .featured-tournament {
    animation: scaleIn 0.6s ease-out 0.2s backwards;
  }

  .filter-section {
    animation: slideInLeft 0.5s ease-out 0.3s backwards;
  }

  .tournament-card {
    animation: scaleIn 0.5s ease-out backwards;
    transition: all 0.3s ease;
  }

  .tournament-card:nth-child(1) {
    animation-delay: 0.4s;
  }

  .tournament-card:nth-child(2) {
    animation-delay: 0.5s;
  }

  .tournament-card:nth-child(3) {
    animation-delay: 0.6s;
  }

  .tournament-card:nth-child(4) {
    animation-delay: 0.7s;
  }

  .tournament-card:hover {
    transform: translateY(-8px);
  }

  .trophy-icon {
    animation: glow 2s ease-in-out infinite;
  }

  .registration-table {
    animation: fadeInUp 0.6s ease-out 0.8s backwards;
  }

  .history-table {
    animation: fadeInUp 0.6s ease-out 1s backwards;
  }
`;

export default function PlayerTournaments() {
  const currentUser = useCurrentUser();
  const router = useRouter();
  const [isHydrated, setIsHydrated] = useState(false);
  const [filterStatus, setFilterStatus] = useState('all');

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

  const tournaments = generateTournaments();
  const myTournaments = tournaments.slice(0, 2);

  return (
    <>
      <style>{animationStyles}</style>
      <Box py={{ base: 4, md: 8 }} px={{ base: 3, md: 8 }}>
        <VStack align="stretch" gap={8}>
          {/* HEADER */}
          <Box className="tournament-header" bg="linear-gradient(135deg, rgba(217,100,46,0.15) 0%, rgba(251,146,60,0.1) 100%)" borderRadius="3xl" p={{ base: 6, md: 8 }} border="2px solid rgba(217,100,46,0.3)">
          <HStack gap={3}>
            <Box fontSize="40px" color="#D9642E">
              <MdEmojiEvents />
            </Box>
            <VStack align="start" gap={0}>
              <Heading as="h1" size={{ base: 'lg', md: '2xl' }} color="#1a1a1a">
                Tournaments
              </Heading>
              <Text color="gray.600" fontSize={{ base: 'sm', md: 'md' }}>
                Join tournaments, compete with players, and win prizes
              </Text>
            </VStack>
          </HStack>
        </Box>

        {/* FEATURED TOURNAMENT */}
        <Box className="featured-tournament">
          <Heading as="h2" size={{ base: 'md', md: 'lg' }} color="#D9642E" mb={4}>
            Featured Tournament
          </Heading>
          <CurrentTournament tournament={tournaments[0]} />
        </Box>

        {/* FILTERS */}
        <Box className="filter-section" bg="white" p={4} borderRadius="lg" border="1px solid rgba(217,108,47,0.1)">
          <Grid templateColumns={{ base: '1fr', md: '1fr 1fr', lg: 'repeat(4, 1fr)' }} gap={4}>
            <Box>
              <Text fontSize="sm" fontWeight="600" mb={2} color="#D9642E">
                Filter
              </Text>
              <select value={filterStatus} onChange={(e) => setFilterStatus(e.target.value)} style={{ width: '100%', padding: '8px 12px', borderRadius: '4px', borderColor: '#D9642E', border: '1px solid #D9642E', fontSize: '14px' }}>
                <option value="all">All Tournaments</option>
                <option value="active">Active Now</option>
                <option value="coming">Coming Soon</option>
                <option value="ended">Completed</option>
              </select>
            </Box>

            <Box>
              <Text fontSize="sm" fontWeight="600" mb={2} color="#D9642E">
                Entry Fee
              </Text>
              <select style={{ width: '100%', padding: '8px 12px', borderRadius: '4px', borderColor: '#D9642E', border: '1px solid #D9642E', fontSize: '14px' }}>
                <option>All Fees</option>
                <option>Free Entry</option>
                <option>50-100 coins</option>
                <option>100+ coins</option>
              </select>
            </Box>

            <Box>
              <Text fontSize="sm" fontWeight="600" mb={2} color="#D9642E">
                Prize Pool
              </Text>
              <select style={{ width: '100%', padding: '8px 12px', borderRadius: '4px', borderColor: '#D9642E', border: '1px solid #D9642E', fontSize: '14px' }}>
                <option>Any Prize</option>
                <option>1000+ coins</option>
                <option>5000+ coins</option>
              </select>
            </Box>

            <Box>
              <Text fontSize="sm" fontWeight="600" mb={2} color="#D9642E">
                Search
              </Text>
              <Input placeholder="Tournament name..." borderColor="#D9642E" _focus={{ borderColor: '#D9642E' }} />
            </Box>
          </Grid>
        </Box>

        {/* ACTIVE TOURNAMENTS */}
        <Box>
          <Heading as="h2" size={{ base: 'md', md: 'lg' }} color="#1a1a1a" mb={4} display="flex" alignItems="center" gap={2}>
            <Box fontSize="24px" color="#D9642E">⚡</Box>
            Active Tournaments
          </Heading>
          <Grid templateColumns={{ base: '1fr', md: '1fr 1fr' }} gap={4}>
            {tournaments.slice(1, 5).map((tournament) => (
              <Box key={tournament.id} className="tournament-card" bg="white" p={6} borderRadius="2xl" border="2px solid rgba(217,108,47,0.15)" boxShadow="0 4px 12px rgba(0,0,0,0.08)" _hover={{ borderColor: '#D9642E', boxShadow: '0 12px 32px rgba(217,100,46,0.25)' }}>
                <HStack justify="space-between" mb={4}>
                  <Heading as="h3" size="md" color="#1a1a1a" maxW="70%">
                    {tournament.name}
                  </Heading>
                  <Badge bg="orange.100" color="#D9642E" fontWeight="700" fontSize="xs" px={2} py={1}>
                    🔴 Active
                  </Badge>
                </HStack>

                <VStack align="start" gap={3} mb={5}>
                  <HStack justify="space-between" width="100%" fontSize="sm" pb={3} borderBottom="1px solid rgba(217,108,47,0.1)">
                    <HStack gap={2}>
                      <Box color="#FFB84D" fontSize="16px">💰</Box>
                      <Text color="gray.600" fontWeight="600">Entry Fee:</Text>
                    </HStack>
                    <Text fontWeight="700" color="#D9642E">{tournament.entryFee} coins</Text>
                  </HStack>

                  <HStack justify="space-between" width="100%" fontSize="sm" pb={3} borderBottom="1px solid rgba(217,108,47,0.1)">
                    <HStack gap={2}>
                      <Box color="#D9642E" fontSize="16px">👥</Box>
                      <Text color="gray.600" fontWeight="600">Players:</Text>
                    </HStack>
                    <HStack gap={1}>
                      <Box width="120px" height="6px" bg="rgba(217,108,47,0.1)" borderRadius="full" overflow="hidden">
                        <Box width={`${(tournament.currentPlayers / tournament.maxPlayers) * 100}%`} height="100%" bg="linear-gradient(90deg, #D9642E 0%, #FF8A3D 100%)" />
                      </Box>
                      <Text fontWeight="700">{tournament.currentPlayers}/{tournament.maxPlayers}</Text>
                    </HStack>
                  </HStack>

                  <HStack justify="space-between" width="100%" fontSize="sm" pt={3}>
                    <HStack gap={2}>
                      <Box color="#FFB84D" fontSize="16px">🏆</Box>
                      <Text color="gray.600" fontWeight="600">Prize Pool</Text>
                    </HStack>
                    <Text fontWeight="700" color="#D9642E">
                      {tournament.prizes.reduce((sum, p) => sum + p.amount, 0).toLocaleString()} coins
                    </Text>
                  </HStack>
                </VStack>

                <Button width="100%" bg="linear-gradient(90deg, #D9642E 0%, #FF8A3D 100%)" color="white" fontWeight="700" borderRadius="xl" _hover={{ transform: 'scale(1.02)', boxShadow: '0 8px 16px rgba(217,100,46,0.3)' }} transition="all 0.2s">
                  Register Now
                </Button>
              </Box>
            ))}
          </Grid>
        </Box>

        {/* MY REGISTRATIONS */}
        <Box className="registration-table">
          <Heading as="h2" size={{ base: 'md', md: 'lg' }} color="#D9642E" mb={4}>
            My Registrations
          </Heading>
          <Box overflowX="auto" bg="white" borderRadius="lg" border="1px solid rgba(217,108,47,0.1)">
            <table style={{ width: '100%', borderCollapse: 'collapse' }}>
              <thead style={{ backgroundColor: 'rgba(217,100,46,0.05)' }}>
                <tr>
                  <th style={{ color: '#D9642E', fontWeight: '700', padding: '12px', textAlign: 'left', borderBottom: '1px solid rgba(217,108,47,0.1)' }}>
                    Tournament
                  </th>
                  <th style={{ color: '#D9642E', fontWeight: '700', padding: '12px', textAlign: 'left', borderBottom: '1px solid rgba(217,108,47,0.1)' }}>
                    Prize Pool
                  </th>
                  <th style={{ color: '#D9642E', fontWeight: '700', padding: '12px', textAlign: 'left', borderBottom: '1px solid rgba(217,108,47,0.1)' }}>
                    My Rank
                  </th>
                  <th style={{ color: '#D9642E', fontWeight: '700', padding: '12px', textAlign: 'left', borderBottom: '1px solid rgba(217,108,47,0.1)' }}>
                    Status
                  </th>
                  <th style={{ color: '#D9642E', fontWeight: '700', padding: '12px', textAlign: 'left', borderBottom: '1px solid rgba(217,108,47,0.1)' }}>
                    Action
                  </th>
                </tr>
              </thead>
              <tbody>
                {myTournaments.map((tournament) => (
                  <tr key={tournament.id} style={{ borderBottom: '1px solid rgba(217,108,47,0.1)' }}>
                    <td style={{ fontWeight: '600', padding: '12px', borderBottom: '1px solid rgba(217,108,47,0.1)' }}>{tournament.name}</td>
                    <td style={{ padding: '12px', borderBottom: '1px solid rgba(217,108,47,0.1)' }}>{tournament.prizes.reduce((sum, p) => sum + p.amount, 0).toLocaleString()} coins</td>
                    <td style={{ fontWeight: '700', color: '#D9642E', padding: '12px', borderBottom: '1px solid rgba(217,108,47,0.1)' }}>
                      #12
                    </td>
                    <td style={{ padding: '12px', borderBottom: '1px solid rgba(217,108,47,0.1)' }}>
                      <Badge bg="green.100" color="green.800">
                        Active
                      </Badge>
                    </td>
                    <td style={{ padding: '12px', borderBottom: '1px solid rgba(217,108,47,0.1)' }}>
                      <Button size="sm" variant="outline" borderColor="#D9642E" color="#D9642E" fontWeight="600">
                        View Details
                      </Button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </Box>
        </Box>

        {/* TOURNAMENT HISTORY */}
        <Box className="history-table">
          <Heading as="h2" size={{ base: 'md', md: 'lg' }} color="#D9642E" mb={4}>
            Past Results
          </Heading>
          <Box overflowX="auto" bg="white" borderRadius="lg" border="1px solid rgba(217,108,47,0.1)">
            <table style={{ width: '100%', borderCollapse: 'collapse' }}>
              <thead style={{ backgroundColor: 'rgba(217,100,46,0.05)' }}>
                <tr>
                  <th style={{ color: '#D9642E', fontWeight: '700', padding: '12px', textAlign: 'left', borderBottom: '1px solid rgba(217,108,47,0.1)' }}>
                    Tournament
                  </th>
                  <th style={{ color: '#D9642E', fontWeight: '700', padding: '12px', textAlign: 'left', borderBottom: '1px solid rgba(217,108,47,0.1)' }}>
                    Placement
                  </th>
                  <th style={{ color: '#D9642E', fontWeight: '700', padding: '12px', textAlign: 'left', borderBottom: '1px solid rgba(217,108,47,0.1)' }}>
                    Winnings
                  </th>
                  <th style={{ color: '#D9642E', fontWeight: '700', padding: '12px', textAlign: 'left', borderBottom: '1px solid rgba(217,108,47,0.1)' }}>
                    Date
                  </th>
                </tr>
              </thead>
              <tbody>
                <tr style={{ borderBottom: '1px solid rgba(217,108,47,0.1)' }}>
                  <td style={{ fontWeight: '600', padding: '12px', borderBottom: '1px solid rgba(217,108,47,0.1)' }}>Spring Cooking Clash</td>
                  <td style={{ fontWeight: '700', color: '#FFB84D', padding: '12px', borderBottom: '1px solid rgba(217,108,47,0.1)' }}>
                    <HStack gap={1}>
                      <Box fontSize="18px">
                        <MdEmojiEvents />
                      </Box>
                      <Text>1st Place</Text>
                    </HStack>
                  </td>
                  <td style={{ fontWeight: '700', padding: '12px', borderBottom: '1px solid rgba(217,108,47,0.1)' }}>5,000 coins</td>
                  <td style={{ color: '#D9642E', padding: '12px', borderBottom: '1px solid rgba(217,108,47,0.1)', fontWeight: '600' }}>Apr 2</td>
                </tr>
                <tr style={{ borderBottom: '1px solid rgba(217,108,47,0.1)' }}>
                  <td style={{ fontWeight: '600', padding: '12px', borderBottom: '1px solid rgba(217,108,47,0.1)' }}>Master Chef Showdown</td>
                  <td style={{ fontWeight: '700', color: '#D9642E', padding: '12px', borderBottom: '1px solid rgba(217,108,47,0.1)' }}>
                    <HStack gap={1}>
                      <Box fontSize="18px" color="#C0C0C0">
                        <MdEmojiEvents />
                      </Box>
                      <Text>2nd Place</Text>
                    </HStack>
                  </td>
                  <td style={{ fontWeight: '700', padding: '12px', borderBottom: '1px solid rgba(217,108,47,0.1)' }}>2,500 coins</td>
                  <td style={{ color: '#D9642E', padding: '12px', borderBottom: '1px solid rgba(217,108,47,0.1)', fontWeight: '600' }}>Mar 28</td>
                </tr>
              </tbody>
            </table>
          </Box>
        </Box>
      </VStack>
    </Box>
    </>
  );
}

PlayerTournaments.title = 'Tournaments - Master Chef';
