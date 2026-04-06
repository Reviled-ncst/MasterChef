'use client';

import { Box, Heading, Text, VStack, HStack, Button, Grid, Badge, Input } from '@chakra-ui/react';
import { MdEmojiEvents } from 'react-icons/md';
import { useCurrentUser } from '../../lib/authHooks';
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import CurrentTournament from '../../components/CurrentTournament';
import { generateTournaments } from '../../lib/mockData';

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
    <Box py={{ base: 4, md: 8 }} px={{ base: 3, md: 8 }}>
      <VStack align="stretch" gap={8}>
        {/* HEADER */}
        <Box>
          <Heading as="h1" size={{ base: 'lg', md: '2xl' }} color="#D9642E" mb={2}>
            🏆 Tournaments
          </Heading>
          <Text color="#D9642E" fontSize={{ base: 'md', md: 'lg' }}>
            Join tournaments, compete with players, and win prizes
          </Text>
        </Box>

        {/* FEATURED TOURNAMENT */}
        <Box>
          <Heading as="h2" size={{ base: 'md', md: 'lg' }} color="#D9642E" mb={4}>
            Featured Tournament
          </Heading>
          <CurrentTournament tournament={tournaments[0]} />
        </Box>

        {/* FILTERS */}
        <Box bg="white" p={4} borderRadius="lg" border="1px solid rgba(217,108,47,0.1)">
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
          <Heading as="h2" size={{ base: 'md', md: 'lg' }} color="#D9642E" mb={4}>
            Active Tournaments
          </Heading>
          <Grid templateColumns={{ base: '1fr', md: '1fr 1fr' }} gap={4}>
            {tournaments.slice(1, 5).map((tournament) => (
              <Box key={tournament.id} bg="white" p={6} borderRadius="lg" border="1px solid rgba(217,108,47,0.1)" _hover={{ boxShadow: '0 8px 24px rgba(217,100,46,0.15)', transform: 'translateY(-4px)' }} transition="all 0.2s">
                <HStack justify="space-between" mb={3}>
                  <Heading as="h3" size="md" color="#D9642E">
                    {tournament.name}
                  </Heading>
                  <Badge bg="orange.100" color="#D9642E" fontWeight="700">
                    Active
                  </Badge>
                </HStack>

                <VStack align="start" gap={3} mb={4}>
                  <HStack justify="space-between" width="100%" fontSize="sm">
                    <Text color="#D9642E" fontWeight="600">Entry Fee:</Text>
                    <Text fontWeight="700">{tournament.entryFee} coins</Text>
                  </HStack>

                  <HStack justify="space-between" width="100%" fontSize="sm">
                    <Text color="#D9642E" fontWeight="600">Participants:</Text>
                    <Text fontWeight="700">{tournament.currentPlayers}/{tournament.maxPlayers}</Text>
                  </HStack>

                  <Box width="100%">
                    <Text fontSize="xs" color="#D9642E" mb={1} fontWeight="600">
                      Prize Pool
                    </Text>
                    <Text fontWeight="700" color="#D9642E">
                      {tournament.prizes.reduce((sum, p) => sum + p.amount, 0).toLocaleString()} coins
                    </Text>
                  </Box>
                </VStack>

                <Button width="100%" bg="#D9642E" color="white" fontWeight="700" _hover={{ bg: '#C55527' }}>
                  Register Now
                </Button>
              </Box>
            ))}
          </Grid>
        </Box>

        {/* MY REGISTRATIONS */}
        <Box>
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
        <Box>
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
  );
}

PlayerTournaments.title = 'Tournaments - Master Chef';
