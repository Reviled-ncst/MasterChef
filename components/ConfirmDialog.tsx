'use client';

import {
  Box,
  Button,
} from '@chakra-ui/react';
import { useEffect } from 'react';

interface ConfirmDialogProps {
  isOpen: boolean;
  onClose: () => void;
  onConfirm: () => void;
  title: string;
  message: string;
  confirmText?: string;
  cancelText?: string;
  isDangerous?: boolean;
  isLoading?: boolean;
}

export default function ConfirmDialog({
  isOpen,
  onClose,
  onConfirm,
  title,
  message,
  confirmText = 'Confirm',
  cancelText = 'Cancel',
  isDangerous = false,
  isLoading = false,
}: ConfirmDialogProps) {
  // Close dialog on Escape key
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && isOpen) {
        onClose();
      }
    };
    document.addEventListener('keydown', handleKeyDown);
    return () => document.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  return (
    <>
      {/* Overlay */}
      <Box
        position="fixed"
        top={0}
        left={0}
        right={0}
        bottom={0}
        bg="rgba(0,0,0,0.5)"
        zIndex={999}
        onClick={onClose}
      />

      {/* Dialog */}
      <Box
        position="fixed"
        top="50%"
        left="50%"
        transform="translate(-50%, -50%)"
        zIndex={1000}
        bg="rgba(0,0,0,0.8)"
        border="1px solid rgba(217,100,46,0.3)"
        borderRadius="lg"
        minW="400px"
        boxShadow="0 20px 60px rgba(0,0,0,0.7)"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <Box
          px={6}
          py={4}
          borderBottom="1px solid rgba(217,100,46,0.2)"
          color={isDangerous ? '#ef4444' : '#D9642E'}
          fontSize="lg"
          fontWeight="700"
        >
          {title}
        </Box>

        {/* Body */}
        <Box px={6} py={6} color="gray.300" fontSize="sm" lineHeight="1.6">
          {message}
        </Box>

        {/* Footer */}
        <Box
          px={6}
          py={4}
          borderTop="1px solid rgba(217,100,46,0.2)"
          display="flex"
          gap={3}
          justifyContent="flex-end"
        >
          <Button
            onClick={onClose}
            variant="outline"
            borderColor="gray.600"
            color="gray.400"
            _hover={{ borderColor: 'gray.500', color: 'gray.300' }}
            disabled={isLoading}
          >
            {cancelText}
          </Button>
          <Button
            onClick={onConfirm}
            bg={isDangerous ? '#ef4444' : '#D9642E'}
            color="white"
            _hover={{
              bg: isDangerous ? '#dc2626' : '#C65525',
              transform: 'translateY(-2px)',
              boxShadow: isDangerous ? '0 8px 16px rgba(239,68,68,0.3)' : '0 8px 16px rgba(217,100,46,0.3)',
            }}
            transition="all 0.2s"
            disabled={isLoading}
          >
            {isLoading ? 'Processing...' : confirmText}
          </Button>
        </Box>
      </Box>
    </>
  );
}
