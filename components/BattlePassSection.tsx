'use client';

import React from 'react';
import { Box, VStack, HStack, Button, Text, Badge, Grid, GridItem } from '@chakra-ui/react';
import { MdStar, MdLock } from 'react-icons/md';
import CustomProgress from './CustomProgress';
import { BattlePass } from '../lib/mockData';

interface BattlePassSectionProps {
  battlePass: BattlePass;
  onBuyPremium?: () => void;
}

export default function BattlePassSection({ battlePass, onBuyPremium }: BattlePassSectionProps) {
  const daysLeft = Math.max(0, Math.floor((battlePass.expiresAt - Date.now()) / (1000 * 60 * 60 * 24)));

  return (
    <Box width="100%" bg="linear-gradient(135deg, rgba(217,100,46,0.12) 0%, rgba(255,184,77,0.05) 100%)" p={6} borderRadius="lg" border="2px solid #D9642E">
      <VStack align="stretch" gap={4}>
        {/* Header */}
        <HStack justify="space-between">
          <VStack align="start" gap={1}>
            <Text fontSize="xl" fontWeight="700" color="#FFB84D">
              Season {battlePass.season} Battle Pass
            </Text>
            <Text fontSize="xs" color="white">
              {daysLeft} days remaining
            </Text>
          </VStack>
          {!battlePass.premium && (
            <Button bg="#D9642E" color="white" size="sm" onClick={onBuyPremium} fontWeight="700">
              Unlock Premium
            </Button>
          )}
          {battlePass.premium && (
            <Badge bg="#10b981" color="white" fontSize="11px">
              ✓ Premium
            </Badge>
          )}
        </HStack>

        {/* Reward Tiers - First */}
        <Box>
          <Text fontSize="sm" fontWeight="700" mb={4} color="#D9642E" textTransform="uppercase">
            REWARD TIERS
          </Text>
          <Grid templateColumns={{ base: '1fr 1fr', md: '1fr 1fr 1fr 1fr 1fr' }} gap={3}>
            {battlePass.rewards.map((reward, idx) => {
              const isUnlocked = battlePass.level >= reward.level;
              return (
                <GridItem key={idx}>
                  <Box
                    p={4}
                    borderRadius="md"
                    bg={isUnlocked ? 'white' : 'gray.100'}
                    border={isUnlocked ? '2px solid #D9642E' : '1px solid #e5e5e5'}
                    textAlign="center"
                    opacity={isUnlocked ? 1 : 0.65}
                    transition="all 0.2s"
                    _hover={{ transform: isUnlocked ? 'translateY(-2px)' : 'none', boxShadow: isUnlocked ? '0 4px 12px rgba(217,100,46,0.2)' : 'none' }}
                  >
                    <VStack gap={2}>
                      {isUnlocked ? (
                        <Box fontSize="28px" color="#D9642E">
                          <MdStar />
                        </Box>
                      ) : (
                        <Box fontSize="28px" color="gray.400">
                          <MdLock />
                        </Box>
                      )}
                      <Text fontSize="11px" fontWeight="700" color={isUnlocked ? '#D9642E' : 'gray.500'}>
                        Lvl {reward.level}
                      </Text>
                      <Text fontSize="10px" color="gray.600">
                        {reward.reward}
                      </Text>
                    </VStack>
                  </Box>
                </GridItem>
              );
            })}
          </Grid>
        </Box>

        {/* Level Progress */}
        <Box p={4} bg="white" borderRadius="lg" border="1px solid rgba(217,108,47,0.1)">
          <HStack justify="space-between" mb={3}>
            <Text fontWeight="700" fontSize="lg" color="#D9642E">
              Level {battlePass.level}
            </Text>
            <Text fontSize="sm" color="#D9642E" fontWeight="600">
              {battlePass.progress}% to next
            </Text>
          </HStack>
          <CustomProgress value={battlePass.progress} colorScheme="orange" size="lg" />
        </Box>

        {/* Progress Info */}
        <Box p={3} bg="rgba(217,100,46,0.05)" borderRadius="md" border="1px solid rgba(217,100,46,0.2)">
          <Text fontSize="xs" color="white" fontWeight="600">
            <strong>{battlePass.premium ? 'Premium' : 'Free'}</strong> track · {battlePass.level}/{battlePass.maxLevel} levels unlocked
          </Text>
        </Box>
      </VStack>
    </Box>
  );
}
