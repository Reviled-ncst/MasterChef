'use client';

import React from 'react';
import { Box, HStack, VStack, Button, Text, Badge } from '@chakra-ui/react';
import { MdCheckCircle } from 'react-icons/md';
import CustomProgress from './CustomProgress';
import { DailyChallenge } from '../lib/mockData';

interface DailyChallengesPanelProps {
  challenges: DailyChallenge[];
  onClaimReward?: (id: string) => void;
}

export default function DailyChallengesPanel({ challenges, onClaimReward }: DailyChallengesPanelProps) {
  const getGlowStyle = (completed: boolean) => ({
    boxShadow: completed ? '0 0 20px rgba(217, 100, 46, 0.4), inset 0 0 20px rgba(217, 100, 46, 0.1)' : '',
    animation: completed ? 'pulse 2s ease-in-out infinite' : 'none',
  });

  return (
    <Box width="100%">
      <VStack align="stretch" gap={4}>
        <HStack justify="space-between">
          <Text fontSize="lg" fontWeight="700">
            Daily Challenges
          </Text>
          <Text fontSize="xs" color="gray.500">
            {challenges.filter(c => c.completed).length}/{challenges.length} completed
          </Text>
        </HStack>

        <HStack gap={4} wrap="wrap" style={{ gap: '16px' }}>
          {challenges.map(challenge => (
            <Box
              key={challenge.id}
              flex={{ base: '1 1 100%', md: '1 1 calc(50% - 8px)', lg: '1 1 calc(33.333% - 11px)' }}
              minW="180px"
              p={4}
              borderRadius="lg"
              bg="white"
              border="1px solid #f0f0f0"
              style={getGlowStyle(challenge.completed)}
              transition="all 0.3s"
              _hover={{ transform: 'translateY(-4px)', boxShadow: '0 8px 16px rgba(0,0,0,0.1)' }}
            >
              <VStack align="stretch" gap={3}>
                <HStack justify="space-between" align="start">
                  <VStack align="start" gap={1} flex={1}>
                    <HStack gap={2}>
                      <Text fontSize="28px">{challenge.icon}</Text>
                      <Text fontSize="sm" fontWeight="600">
                        {challenge.name}
                      </Text>
                    </HStack>
                    <Text fontSize="11px" color="gray.500">
                      {challenge.description}
                    </Text>
                  </VStack>
                  {challenge.completed && (
                    <Badge bg="#10b981" color="white" fontSize="10px">
                      ✓ Done
                    </Badge>
                  )}
                </HStack>

                <Box>
                  <HStack justify="space-between" mb={1}>
                    <Text fontSize="xs" color="gray.600">
                      Progress
                    </Text>
                    <Text fontSize="xs" fontWeight="600">
                      {challenge.progress}%
                    </Text>
                  </HStack>
                  <CustomProgress
                    value={challenge.progress}
                    colorScheme="orange"
                    size="sm"
                  />
                </Box>

                <HStack gap={2} justify="space-between" pt={2} borderTop="1px solid #f0f0f0">
                  <HStack gap={1}>
                    <Text fontSize="xs" color="gray.600">
                      Reward:
                    </Text>
                    <Badge bg="rgba(217,100,46,0.1)" color="#D9642E" fontSize="10px" fontWeight="600">
                      +{challenge.rewardCoins}
                    </Badge>
                  </HStack>
                  <Button
                    size="xs"
                    bg={challenge.completed ? '#10b981' : '#D9642E'}
                    color="white"
                    disabled={!challenge.completed}
                    onClick={() => challenge.completed && onClaimReward?.(challenge.id)}
                  >
                    {challenge.completed ? 'Claim' : 'Active'}
                  </Button>
                </HStack>
              </VStack>
            </Box>
          ))}
        </HStack>
      </VStack>

      <style>{`
        @keyframes pulse {
          0%, 100% { opacity: 1; }
          50% { opacity: 0.9; }
        }
      `}</style>
    </Box>
  );
}
