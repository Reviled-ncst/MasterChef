'use client';

import React from 'react';
import { Box, VStack, HStack, Button, Text, Badge } from '@chakra-ui/react';
import { MdClose, MdArrowForward, MdEmojiEvents, MdOutlinePeople, MdNotifications, MdSystemUpdate, MdGrade } from 'react-icons/md';
import { Notification } from '../lib/mockData';

interface RecentNotificationsProps {
  notifications: Notification[];
  onDismiss?: (id: string) => void;
  onAction?: (notification: Notification) => void;
}

const typeConfig: { [key: string]: { Component: React.ComponentType; color: string; bg: string } } = {
  achievement: { Component: MdGrade, color: '#FFB84D', bg: 'rgba(255, 184, 77, 0.1)' },
  tournament_invite: { Component: MdEmojiEvents, color: '#FF6B9D', bg: 'rgba(255, 107, 157, 0.1)' },
  friend_request: { Component: MdOutlinePeople, color: '#3498db', bg: 'rgba(52, 152, 219, 0.1)' },
  new_content: { Component: MdNotifications, color: '#9b59b6', bg: 'rgba(155, 89, 182, 0.1)' },
  system: { Component: MdSystemUpdate, color: '#95a5a6', bg: 'rgba(149, 165, 166, 0.1)' },
};

export default function RecentNotifications({ notifications, onDismiss, onAction }: RecentNotificationsProps) {
  const timeAgo = (timestamp: number) => {
    const now = Date.now();
    const diff = now - timestamp;
    const hours = Math.floor(diff / (1000 * 60 * 60));
    const days = Math.floor(diff / (1000 * 60 * 60 * 24));

    if (hours < 1) return 'Just now';
    if (hours < 24) return `${hours}h ago`;
    return `${days}d ago`;
  };

  const unreadCount = notifications.filter(n => !n.read).length;

  return (
    <Box width="100%">
      <VStack align="stretch" gap={3}>
        <HStack justify="space-between">
          <Text fontSize="lg" fontWeight="700">
            Notifications
          </Text>
          {unreadCount > 0 && (
            <Badge bg="#ef4444" color="white" fontSize="10px" fontWeight="700">
              {unreadCount} new
            </Badge>
          )}
        </HStack>

        {notifications.length > 0 ? (
          <VStack align="stretch" gap={2} maxH="400px" overflowY="auto">
            {notifications.map(notif => {
              const config = typeConfig[notif.type] || typeConfig.system;
              return (
                <Box
                  key={notif.id}
                  p={3}
                  borderRadius="md"
                  bg={config.bg}
                  border={`1px solid ${config.color}40`}
                  opacity={notif.read ? 0.7 : 1}
                  transition="all 0.2s"
                  _hover={{ boxShadow: `0 4px 12px ${config.color}20` }}
                >
                  <HStack align="start" gap={3} justify="space-between">
                    <HStack align="start" gap={3} flex={1}>
                      <Box fontSize="20px" color={config.color}>
                        {React.createElement(config.Component as any)}
                      </Box>
                      <VStack align="start" gap={1} flex={1} minW={0}>
                        <HStack gap={1} justify="space-between" width="100%">
                          <Text fontSize="sm" fontWeight="600">
                            {notif.title}
                          </Text>
                          <Text fontSize="10px" color="gray.500" whiteSpace="nowrap">
                            {timeAgo(notif.timestamp)}
                          </Text>
                        </HStack>
                        <Text fontSize="12px" color="gray.600">
                          {notif.message}
                        </Text>
                      </VStack>
                    </HStack>

                    <HStack gap={1}>
                      {notif.action && (
                        <Button
                          size="xs"
                          variant="ghost"
                          colorScheme="orange"
                          onClick={() => onAction?.(notif)}
                          display="flex"
                          gap="4px"
                        >
                          <Text fontSize="xs">{notif.action.label}</Text>
                          <MdArrowForward size={12} />
                        </Button>
                      )}
                      <Button
                        size="xs"
                        variant="ghost"
                        onClick={() => onDismiss?.(notif.id)}
                      >
                        <MdClose size={16} />
                      </Button>
                    </HStack>
                  </HStack>
                </Box>
              );
            })}
          </VStack>
        ) : (
          <Box p={8} textAlign="center" bg="gray.50" borderRadius="md">
            <Text color="gray.500" fontSize="sm">
              No notifications
            </Text>
          </Box>
        )}

        <Button variant="ghost" width="100%" size="sm" colorScheme="orange" fontWeight="600">
          View All Notifications
        </Button>
      </VStack>
    </Box>
  );
}
