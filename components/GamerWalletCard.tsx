'use client';

import React from 'react';
import { Box, HStack, VStack, Button, Text } from '@chakra-ui/react';
import { MdAttachMoney, MdStar, MdShoppingCart } from 'react-icons/md';

interface GamerWalletCardProps {
  wallet: { coins: number; gems: number; premiumCurrency: number };
  onTopUp?: () => void;
}

export default function GamerWalletCard({ wallet, onTopUp }: GamerWalletCardProps) {
  const currencies = [
    { label: 'Coins', value: wallet.coins, icon: MdAttachMoney, color: '#FFB84D', bg: 'rgba(255, 184, 77, 0.1)' },
    { label: 'Gems', value: wallet.gems, icon: MdStar, color: '#FF6B9D', bg: 'rgba(255, 107, 157, 0.1)' },
    { label: 'Premium', value: wallet.premiumCurrency, icon: MdShoppingCart, color: '#D9642E', bg: 'rgba(217, 100, 46, 0.1)' },
  ];

  return (
    <HStack gap={4} align="stretch" style={{ gap: '16px' }} wrap="wrap">
      {currencies.map((currency, idx) => {
        const IconComponent = currency.icon;
        return (
          <Box
            key={idx}
            flex={{ base: '1 1 100%', md: '1 1 calc(33.333% - 11px)', lg: '1 1 calc(33.333% - 11px)' }}
            minW="150px"
            p={6}
            borderRadius="lg"
            bg={currency.bg}
            border={`2px solid ${currency.color}`}
            style={{
              backdropFilter: 'blur(10px)',
              animation: 'float 3s ease-in-out infinite',
            }}
          >
            <VStack align="stretch" gap={3}>
              <HStack gap={2} justify="space-between">
                <HStack gap={2}>
                  <Box color={currency.color} fontSize="24px">
                    <IconComponent />
                  </Box>
                  <Text fontSize="sm" fontWeight="600" color="gray.600">
                    {currency.label}
                  </Text>
                </HStack>
              </HStack>

              <VStack align="start" gap={1}>
                <Text
                  fontSize="32px"
                  fontWeight="800"
                  color="#1a1a1a"
                  style={{
                    background: `linear-gradient(135deg, ${currency.color}, ${currency.color}cc)`,
                    backgroundClip: 'text',
                    WebkitBackgroundClip: 'text',
                    WebkitTextFillColor: 'transparent',
                  }}
                >
                  {currency.value.toLocaleString()}
                </Text>
              </VStack>

              <Button
                size="sm"
                bg={currency.color}
                color="white"
                fontWeight="600"
                _hover={{ opacity: 0.9, transform: 'scale(1.05)' }}
                onClick={onTopUp}
                transition="all 0.2s"
                width="100%"
              >
                + Add
              </Button>
            </VStack>
          </Box>
        );
      })}

      <style>{`
        @keyframes float {
          0%, 100% { transform: translateY(0px); }
          50% { transform: translateY(-10px); }
        }
      `}</style>
    </HStack>
  );
}
