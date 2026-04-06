'use client';

import React from 'react';
import { Box, VStack, HStack, Button, Text, Badge } from '@chakra-ui/react';
import { MdEmojiEvents, MdTimer } from 'react-icons/md';
import CustomProgress from './CustomProgress';
import { Tournament } from '../lib/mockData';

interface CurrentTournamentProps {
  tournament: Tournament;
  onRegister?: () => void;
}

export default function CurrentTournament({ tournament, onRegister }: CurrentTournamentProps) {
  const timeRemaining = Math.max(0, tournament.endDate - Date.now());
  const daysLeft = Math.floor(timeRemaining / (1000 * 60 * 60 * 24));
  const hoursLeft = Math.floor((timeRemaining % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));

  const fillPercentage = (tournament.currentPlayers / tournament.maxPlayers) * 100;

  return (
    <Box
      p={{ base: 4, md: 8 }}
      borderRadius="lg"
      bg="linear-gradient(135deg, rgba(217,100,46,0.15) 0%, rgba(255,184,77,0.08) 100%)"
      border="2px solid #D9642E"
      width="100%"
    >
      <VStack align="stretch" gap={4}>
        {/* Header */}
        <HStack justify="space-between" align="start">
          <VStack align="start" gap={1} flex={1}>
            <HStack gap={2}>
              <Box fontSize="28px">
                <MdEmojiEvents />
              </Box>
              <VStack align="start" gap={0}>
                <Text fontSize="xl" fontWeight="700" color="white">
                  {tournament.name}
                </Text>
                <Text fontSize="xs" color="#FFB84D">
                  Featured Tournament
                </Text>
              </VStack>
            </HStack>
          </VStack>
          <Badge bg="#D9642E" color="white" fontSize="11px" fontWeight="700">
            FEATURED
          </Badge>
        </HStack>

        {/* Tournament Info Grid */}
        <HStack gap={{ base: 2, md: 4 }} wrap="wrap" fontSize={{ base: 'sm', md: 'md' }}>
          <Box>
            <Text fontSize="xs" color="white" fontWeight="600">
              Prize Pool
            </Text>
            <Text fontSize="lg" fontWeight="700" color="#D9642E">
              {tournament.prizes.reduce((sum, p) => sum + p.amount, 0).toLocaleString()} coins
            </Text>
          </Box>
          <Box>
            <Text fontSize="xs" color="white" fontWeight="600">
              Entry Fee
            </Text>
            <Text fontSize="lg" fontWeight="700" color="#D9642E">
              {tournament.entryFee} coins
            </Text>
          </Box>
          <Box>
            <Text fontSize="xs" color="white" fontWeight="600">
              Participants
            </Text>
            <Text fontSize="lg" fontWeight="700" color="#D9642E">
              {tournament.currentPlayers}/{tournament.maxPlayers}
            </Text>
          </Box>
          <Box ml="auto">
            <Text fontSize="xs" color="white" fontWeight="600">
              Time Remaining
            </Text>
            <HStack gap={1}>
              <MdTimer size={16} color="#D9642E" />
              <Text fontSize="lg" fontWeight="700" color="#D9642E">
                {daysLeft}d {hoursLeft}h
              </Text>
            </HStack>
          </Box>
        </HStack>

        {/* Participants Progress */}
        <Box>
          <HStack justify="space-between" mb={1}>
            <Text fontSize="sm" fontWeight="600" color="#D9642E">
              Participants Filled
            </Text>
            <Text fontSize="sm" color="#D9642E">{Math.round(fillPercentage)}%</Text>
          </HStack>
          <CustomProgress value={fillPercentage} colorScheme="orange" />
        </Box>

        {/* Prizes */}
        <Box p={3} bg="white" borderRadius="md">
          <Text fontSize="xs" fontWeight="700" mb={2} color="#D9642E">
            TOP REWARDS
          </Text>
          <HStack gap={3}>
            {tournament.prizes.slice(0, 3).map((prize, idx) => {
              const medalColors = ['#FFD700', '#C0C0C0', '#CD7F32']; // Gold, Silver, Bronze
              return (
                <Box key={idx} textAlign="center" flex={1}>
                  <Box fontSize="28px" color={medalColors[idx]} mb={2}>
                    <MdEmojiEvents />
                  </Box>
                  <Text fontSize="xs" fontWeight="600" mb={1} color="#1a1a1a">
                    {idx === 0 ? '1st' : idx === 1 ? '2nd' : '3rd'}
                  </Text>
                  <Text fontSize="xs" color="#D9642E" fontWeight="600">
                    {prize.amount.toLocaleString()} coins
                  </Text>
                </Box>
              );
            })}
          </HStack>
        </Box>

        {/* Action Button */}
        <Button
          width="100%"
          bg="#D9642E"
          color="white"
          fontWeight="700"
          size="lg"
          onClick={onRegister}
          _hover={{ bg: '#C55527', transform: 'scale(1.02)' }}
          transition="all 0.2s"
        >
          Register Now
        </Button>
      </VStack>
    </Box>
  );
}
