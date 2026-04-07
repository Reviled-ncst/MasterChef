'use client';

import { Box, Heading, Text, VStack, HStack, Button, Grid, Badge, Avatar, AvatarGroup } from '@chakra-ui/react';
import { MdGroup, MdForum, MdEvent, MdTrendingUp, MdThumbUp, MdComment } from 'react-icons/md';
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

  @keyframes slideInRight {
    from { opacity: 0; transform: translateX(40px); }
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

  @keyframes pulse {
    0%, 100% { opacity: 1; }
    50% { opacity: 0.8; }
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

  .community-header {
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

  .section-header {
    animation: slideInLeft 0.8s cubic-bezier(0.34, 1.56, 0.64, 1);
  }

  .forum-thread {
    animation: slideInLeft 0.6s cubic-bezier(0.34, 1.56, 0.64, 1) backwards;
    transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
  }

  .forum-thread:nth-child(1) { animation-delay: 0.2s; }
  .forum-thread:nth-child(2) { animation-delay: 0.28s; }
  .forum-thread:nth-child(3) { animation-delay: 0.36s; }
  .forum-thread:nth-child(4) { animation-delay: 0.44s; }
  .forum-thread:nth-child(5) { animation-delay: 0.52s; }

  .forum-thread:hover {
    transform: translateX(8px);
    background: rgba(217,100,46,0.08) !important;
    border-left: 4px solid #D9642E !important;
  }

  .event-card {
    animation: popIn 0.8s cubic-bezier(0.34, 1.56, 0.64, 1) backwards;
    transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
  }

  .event-card:nth-child(1) { animation-delay: 0.8s; }
  .event-card:nth-child(2) { animation-delay: 0.96s; }
  .event-card:nth-child(3) { animation-delay: 1.12s; }

  .event-card:hover {
    transform: translateY(-8px) scale(1.05);
    box-shadow: 0 0 30px rgba(217,100,46,0.3), 0 12px 36px rgba(217,100,46,0.2);
  }

  .member-grid {
    animation: fadeInUp 0.8s cubic-bezier(0.34, 1.56, 0.64, 1) 1.4s backwards;
  }

  .action-button {
    position: relative;
    overflow: hidden;
    transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
  }

  .action-button:hover {
    transform: translateY(-4px) scale(1.05);
    box-shadow: 0 12px 32px rgba(217,100,46,0.3);
  }
`;

const mockThreads = [
  { id: 1, title: 'Best strategies for the new recipe challenge', author: 'ChefMaster99', replies: 42, likes: 156, views: 1240 },
  { id: 2, title: 'Join our weekend tournament!', author: 'CookingQueen', replies: 28, likes: 98, views: 840 },
  { id: 3, title: 'Tips for improving your cooking speed', author: 'KitchenKing', replies: 35, likes: 145, views: 2100 },
  { id: 4, title: 'New seasonal ingredients guide', author: 'RecipeWizard', replies: 19, likes: 87, views: 620 },
  { id: 5, title: 'Community spotlight - Player stories', author: 'FlavorMaster', replies: 52, likes: 201, views: 3450 },
];

const mockEvents = [
  { id: 1, name: 'Birthday Bash Tournament', date: 'April 15', participants: 234, status: 'Active' },
  { id: 2, name: 'Chef\'s Challenge Season 2', date: 'April 22', participants: 512, status: 'Upcoming' },
  { id: 3, name: 'Recipe Swap Event', date: 'April 29', participants: 89, status: 'Upcoming' },
];

export default function Community() {
  const router = useRouter();

  return (
    <>
      <style>{animationStyles}</style>
      <Box py={{ base: 4, md: 8 }} px={{ base: 3, md: 8 }}>
        <VStack align="stretch" gap={8}>
          {/* HEADER */}
          <Box className="community-header" bg="linear-gradient(135deg, rgba(217,100,46,0.25) 0%, rgba(59,130,246,0.15) 100%)" borderRadius="3xl" p={{ base: 6, md: 8 }} border="2px solid rgba(217,100,46,0.4)">
            <HStack gap={3}>
              <Box fontSize="40px" color="#D9642E">
                <MdGroup />
              </Box>
              <VStack align="start" gap={0}>
                <Heading as="h1" size={{ base: 'lg', md: '2xl' }} color="#1a1a1a">
                  Community
                </Heading>
                <Text color="#1a1a1a" fontSize={{ base: 'sm', md: 'md' }} fontWeight="500">
                  Connect with players, share strategies, and participate in events
                </Text>
              </VStack>
            </HStack>
          </Box>

          {/* STAT CARDS */}
          <Grid templateColumns={{ base: '1fr', md: '1fr 1fr', lg: 'repeat(4, 1fr)' }} gap={4}>
            <Box className="stat-card" bg="white" p={5} borderRadius="2xl" border="1px solid rgba(217,108,47,0.1)" boxShadow="0 4px 12px rgba(0,0,0,0.05)">
              <HStack justify="space-between" mb={2}>
                <Text color="#1a1a1a" fontSize="xs" fontWeight="700" textTransform="uppercase">
                  Members
                </Text>
                <Box className="stat-icon" fontSize="20px" color="#D9642E" bg="rgba(217,100,46,0.1)" p={2} borderRadius="lg">
                  <MdGroup />
                </Box>
              </HStack>
              <Text color="#D9642E" fontSize="3xl" fontWeight="800">
                45K+
              </Text>
              <Text fontSize="xs" color="#1a1a1a" mt={1} fontWeight="600">Active members</Text>
            </Box>

            <Box className="stat-card" bg="linear-gradient(135deg, rgba(52,152,219,0.08) 0%, rgba(52,152,219,0.04) 100%)" p={5} borderRadius="2xl" border="1px solid rgba(52,152,219,0.3)" borderLeft="4px solid #3498db">
              <HStack justify="space-between" mb={2}>
                <Text color="#1a1a1a" fontSize="xs" fontWeight="700" textTransform="uppercase">
                  Discussions
                </Text>
                <Box className="stat-icon" fontSize="20px" color="#3498db" bg="rgba(52,152,219,0.15)" p={2} borderRadius="lg">
                  <MdForum />
                </Box>
              </HStack>
              <Text color="#3498db" fontSize="3xl" fontWeight="800">
                8.2K
              </Text>
              <Text fontSize="xs" color="#1a1a1a" mt={1} fontWeight="600">Forum threads</Text>
            </Box>

            <Box className="stat-card" bg="linear-gradient(135deg, rgba(168,85,247,0.08) 0%, rgba(168,85,247,0.04) 100%)" p={5} borderRadius="2xl" border="1px solid rgba(168,85,247,0.3)" borderLeft="4px solid #a855f7">
              <HStack justify="space-between" mb={2}>
                <Text color="#1a1a1a" fontSize="xs" fontWeight="700" textTransform="uppercase">
                  Events/Month
                </Text>
                <Box className="stat-icon" fontSize="20px" color="#a855f7" bg="rgba(168,85,247,0.15)" p={2} borderRadius="lg">
                  <MdEvent />
                </Box>
              </HStack>
              <Text color="#a855f7" fontSize="3xl" fontWeight="800">
                12+
              </Text>
              <Text fontSize="xs" color="#1a1a1a" mt={1} fontWeight="600">Community events</Text>
            </Box>

            <Box className="stat-card" bg="linear-gradient(135deg, rgba(251,146,60,0.08) 0%, rgba(251,146,60,0.04) 100%)" p={5} borderRadius="2xl" border="1px solid rgba(251,146,60,0.3)" borderLeft="4px solid #fb923c">
              <HStack justify="space-between" mb={2}>
                <Text color="#1a1a1a" fontSize="xs" fontWeight="700" textTransform="uppercase">
                  Posts Today
                </Text>
                <Box className="stat-icon" fontSize="20px" color="#fb923c" bg="rgba(251,146,60,0.15)" p={2} borderRadius="lg">
                  <MdTrendingUp />
                </Box>
              </HStack>
              <Text color="#fb923c" fontSize="3xl" fontWeight="800">
                342
              </Text>
              <Text fontSize="xs" color="#1a1a1a" mt={1} fontWeight="600">Community posts</Text>
            </Box>
          </Grid>

          {/* RECENT DISCUSSIONS */}
          <Box className="section-header">
            <Heading as="h2" size="md" color="#D9642E" mb={4}>
              Latest Discussions
            </Heading>
            <VStack align="stretch" gap={3}>
              {mockThreads.map((thread) => (
                <Box
                  key={thread.id}
                  className="forum-thread"
                  bg="white"
                  p={4}
                  borderRadius="lg"
                  border="1px solid rgba(217,108,47,0.1)"
                  display="flex"
                  justifyContent="space-between"
                  alignItems="center"
                  cursor="pointer"
                >
                  <VStack align="start" gap={1} flex={1}>
                    <Text fontWeight="700" fontSize="md" color="#1a1a1a">
                      {thread.title}
                    </Text>
                    <Text fontSize="xs" color="gray.600">
                      By {thread.author} • {thread.views.toLocaleString()} views
                    </Text>
                  </VStack>
                  <HStack gap={6} minW="200px" justifyContent="flex-end">
                    <VStack align="center" gap={0}>
                      <HStack gap={1}>
                        <MdComment size={16} color="#D9642E" />
                        <Text fontSize="sm" fontWeight="600" color="#1a1a1a">{thread.replies}</Text>
                      </HStack>
                      <Text fontSize="xs" color="gray.600">Replies</Text>
                    </VStack>
                    <VStack align="center" gap={0}>
                      <HStack gap={1}>
                        <MdThumbUp size={16} color="#10b981" />
                        <Text fontSize="sm" fontWeight="600" color="#1a1a1a">{thread.likes}</Text>
                      </HStack>
                      <Text fontSize="xs" color="gray.600">Likes</Text>
                    </VStack>
                  </HStack>
                </Box>
              ))}
            </VStack>
          </Box>

          {/* UPCOMING EVENTS */}
          <Box>
            <Heading as="h2" size="md" color="#D9642E" mb={4}>
              Upcoming Events
            </Heading>
            <Grid templateColumns={{ base: '1fr', md: 'repeat(2, 1fr)', lg: 'repeat(3, 1fr)' }} gap={4}>
              {mockEvents.map((event) => (
                <Box
                  key={event.id}
                  className="event-card"
                  bg="linear-gradient(135deg, rgba(217,100,46,0.1) 0%, rgba(217,100,46,0.05) 100%)"
                  p={5}
                  borderRadius="xl"
                  border="1px solid rgba(217,100,46,0.2)"
                >
                  <HStack justify="space-between" mb={3}>
                    <Badge colorScheme={event.status === 'Active' ? 'green' : 'orange'} borderRadius="full">
                      {event.status}
                    </Badge>
                    <Text fontSize="xs" fontWeight="700" color="#D9642E">
                      {event.date}
                    </Text>
                  </HStack>
                  <Heading as="h3" size="sm" color="#1a1a1a" mb={2}>
                    {event.name}
                  </Heading>
                  <HStack gap={2} mb={4}>
                    <MdGroup color="#D9642E" size={16} />
                    <Text fontSize="sm" color="gray.700">
                      {event.participants.toLocaleString()} participants
                    </Text>
                  </HStack>
                  <Button className="action-button" bg="#D9642E" color="white" width="100%" _hover={{ bg: '#C55527' }}>
                    Join Event
                  </Button>
                </Box>
              ))}
            </Grid>
          </Box>

          {/* FEATURED MEMBERS */}
          <Box className="member-grid">
            <Heading as="h2" size="md" color="#D9642E" mb={4}>
              Featured Members
            </Heading>
            <Grid templateColumns={{ base: '1fr', md: 'repeat(2, 1fr)', lg: 'repeat(4, 1fr)' }} gap={4}>
              {[
                { name: 'ChefMaster99', role: 'Community Leader', avatar: '🧑‍🍳' },
                { name: 'CookingQueen', role: 'Event Organizer', avatar: '👩‍🍳' },
                { name: 'KitchenKing', role: 'Moderator', avatar: '👨‍🍳' },
                { name: 'RecipeWizard', role: 'Guide Writer', avatar: '🧙‍♂️' },
              ].map((member, idx) => (
                <Box
                  key={idx}
                  bg="white"
                  p={4}
                  borderRadius="lg"
                  border="1px solid rgba(217,108,47,0.1)"
                  textAlign="center"
                  cursor="pointer"
                  _hover={{ boxShadow: '0 8px 24px rgba(217,100,46,0.2)' }}
                  transition="all 0.3s ease"
                >
                  <Box fontSize="40px" mb={2}>{member.avatar}</Box>
                  <Text fontWeight="700" fontSize="md" color="#1a1a1a" mb={1}>
                    {member.name}
                  </Text>
                  <Badge colorScheme="orange" variant="subtle" borderRadius="full">
                    {member.role}
                  </Badge>
                </Box>
              ))}
            </Grid>
          </Box>
        </VStack>
      </Box>
    </>
  );
}
