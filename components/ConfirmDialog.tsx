'use client';

import {
  AlertDialog,
  AlertDialogBody,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogContent,
  AlertDialogOverlay,
  Button,
  Box,
} from '@chakra-ui/react';
import { useRef } from 'react';

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
  const cancelRef = useRef(null);

  return (
    <AlertDialog
      isOpen={isOpen}
      leastDestructiveRef={cancelRef}
      onClose={onClose}
      isCentered
    >
      <AlertDialogOverlay>
        <AlertDialogContent bg="rgba(0,0,0,0.8)" border="1px solid rgba(217,100,46,0.3)">
          <AlertDialogHeader
            fontSize="lg"
            fontWeight="700"
            color={isDangerous ? '#ef4444' : '#D9642E'}
            borderBottom="1px solid rgba(217,100,46,0.2)"
          >
            {title}
          </AlertDialogHeader>

          <AlertDialogBody color="gray.300" py={6}>
            <Box fontSize="sm" lineHeight="1.6">
              {message}
            </Box>
          </AlertDialogBody>

          <AlertDialogFooter borderTop="1px solid rgba(217,100,46,0.2)">
            <Button
              ref={cancelRef}
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
              ml={3}
              bg={isDangerous ? '#ef4444' : '#D9642E'}
              color="white"
              _hover={{
                bg: isDangerous ? '#dc2626' : '#C65525',
                transform: 'translateY(-2px)',
                boxShadow: isDangerous ? '0 8px 16px rgba(239,68,68,0.3)' : '0 8px 16px rgba(217,100,46,0.3)',
              }}
              transition="all 0.2s"
              isLoading={isLoading}
              loadingText="Processing..."
            >
              {confirmText}
            </Button>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialogOverlay>
    </AlertDialog>
  );
}
