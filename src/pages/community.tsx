import React from 'react';
import Head from 'next/head';
import {
  Box,
  Container,
  Grid,
  Heading,
  Text,
  VStack,
  HStack,
  Button,
  Image,
  Input,
  TagRoot as Tag,
} from '@chakra-ui/react';

const FALLBACK_AVATAR = 'https://res.cloudinary.com/djnzwvb2t/image/upload/v1774440372/Character_rtlfvv.png';

const mockPosts = [
  { id: 'p1', title: 'How to craft the perfect stew', author: 'ChefMax', replies: 14, date: 'Mar 20, 2026' },
  { id: 'p2', title: 'Best shortcuts for timed challenges', author: 'Lina', replies: 8, date: 'Mar 18, 2026' },
  { id: 'p3', title: 'Share your signature dish', author: 'Ava', replies: 42, date: 'Mar 15, 2026' },
];

const mockEvents = [
  { id: 'e1', title: 'Community Cook-off #3', date: 'Apr 05, 2026', location: 'Online' },
  { id: 'e2', title: 'Live Q&A with Devs', date: 'Apr 12, 2026', location: 'Discord' },
];

const mockContributors = [
  { id: 'c1', name: 'ChefMax', avatar: '', contributions: 124 },
  { id: 'c2', name: 'Ava', avatar: '', contributions: 98 },
  { id: 'c3', name: 'Lina', avatar: '', contributions: 76 },
];

function openRegister() {
  if (typeof window !== 'undefined') window.dispatchEvent(new Event('mc:open-register'));
}

export default function Community(): JSX.Element {
  return (
    <Box as="main">
      <Head>
        <title>Community - Master Chef</title>
      </Head>

      <Container maxW="container.lg" py={12} color="gray.100">
        <Box
          mb={8}
          borderRadius="md"
          p={{ base: 4, md: 8 }}
          bgGradient="linear(to-b, rgba(217,108,47,0.06), rgba(217,108,47,0.02))"
          boxShadow="sm"
          textAlign="center"
        >
          <Heading as="h1" size="xl" mb={2} color="white">
            Community
          </Heading>
          <Text color="gray.200" maxW="3xl" mx="auto">
            Connect with other players, join events, and share recipes. Browse discussions, jump into upcoming events, or meet our top contributors.
          </Text>
        </Box>

        <Grid templateColumns={{ base: '1fr', md: '2fr 1fr' }} gap={6}>
          <VStack align="stretch" style={{ gap: '24px' }}>
            <Box bg="rgba(0,0,0,0.56)" p={5} borderRadius="md" boxShadow="md" border="1px solid rgba(255,255,255,0.06)">
              <HStack justify="space-between" mb={4} align="center">
                <Heading as="h2" size="md" color="white">
                  Recent Discussions
                </Heading>
                <HStack>
                  <Button size="sm" colorScheme="orange" onClick={openRegister}>
                    Start a discussion
                  </Button>
                </HStack>
              </HStack>

              <HStack mb={4} maxW="480px" align="center" style={{ gap: '12px' }}>
                <svg width="18" height="18" viewBox="0 0 24 24" style={{ color: 'gray.400' }} fill="none" stroke="currentColor" strokeWidth={2} xmlns="http://www.w3.org/2000/svg">
                  <path d="M21 21l-4.35-4.35" strokeLinecap="round" strokeLinejoin="round" />
                  <circle cx="10.5" cy="10.5" r="6.5" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
                <Input placeholder="Search discussions" bg="transparent" borderColor="rgba(255,255,255,0.12)" />
              </HStack>

              <VStack align="stretch" style={{ gap: '12px' }}>
                {mockPosts.map((p) => (
                  <HStack key={p.id} justify="space-between" align="flex-start" py={3} borderBottom="1px solid rgba(255,255,255,0.02)">
                    <Box>
                      <Text fontWeight={700} color="white">
                        {p.title}
                      </Text>
                      <Text color="gray.300" fontSize="sm">
                        {p.author} • {p.replies} replies
                      </Text>
                    </Box>
                    <VStack align="end">
                      <Text color="gray.400" fontSize="sm">
                        {p.date}
                      </Text>
                      <Tag size="sm" colorScheme="orange">
                        {p.replies} replies
                      </Tag>
                    </VStack>
                  </HStack>
                ))}
              </VStack>
            </Box>

            <Box bg="rgba(0,0,0,0.56)" p={5} borderRadius="md" boxShadow="md" border="1px solid rgba(255,255,255,0.06)">
              <Heading as="h2" size="md" mb={3} color="white">
                Upcoming Events
              </Heading>
              <VStack align="stretch" style={{ gap: '12px' }}>
                {mockEvents.map((e) => (
                  <HStack key={e.id} justify="space-between" py={3} borderBottom="1px solid rgba(255,255,255,0.02)">
                    <Box>
                      <Text fontWeight={600} color="white">
                        {e.title}
                      </Text>
                      <Text color="gray.300" fontSize="sm">
                        {e.location}
                      </Text>
                    </Box>
                    <Text color="gray.400" fontSize="sm">
                      {e.date}
                    </Text>
                  </HStack>
                ))}
              </VStack>
            </Box>
          </VStack>

          <Box bg="rgba(0,0,0,0.56)" p={5} borderRadius="md" boxShadow="md" border="1px solid rgba(255,255,255,0.06)">
            <Heading as="h2" size="md" mb={4} color="white">
              Top Contributors
            </Heading>
            <VStack align="stretch" style={{ gap: '16px' }}>
              {mockContributors.map((c) => (
                <HStack key={c.id} align="center" py={2} borderRadius="md" _hover={{ bg: 'rgba(255,255,255,0.02)' }} style={{ gap: '12px' }}>
                  <Box boxSize="56px" borderRadius="full" overflow="hidden" bg="rgba(255,255,255,0.02)" display="flex" alignItems="center" justifyContent="center">
                    <Image src={c.avatar || FALLBACK_AVATAR} alt={c.name} maxH="56px" objectFit="contain" width="auto" />
                  </Box>
                  <Box>
                    <Text fontWeight={700} color="white">
                      {c.name}
                    </Text>
                    <Text color="gray.300" fontSize="sm">{c.contributions} contributions</Text>
                  </Box>
                </HStack>
              ))}

              <Button mt={2} colorScheme="orange" onClick={openRegister}>
                Join the community
              </Button>
            </VStack>
          </Box>
        </Grid>
      </Container>
    </Box>
  );
}
