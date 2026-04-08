'use client';

import {
  Modal,
  ModalBody,
  ModalFooter,
  ModalHeader,
  ModalContent,
  ModalOverlay,
  Button,
  Box,
} from '@chakra-ui/react';

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
  return (
    <Modal isOpen={isOpen} onClose={onClose} isCentered>
      <ModalOverlay />
      <ModalContent bg="rgba(0,0,0,0.8)" border="1px solid rgba(217,100,46,0.3)">
        <ModalHeader
          fontSize="lg"
          fontWeight="700"
          color={isDangerous ? '#ef4444' : '#D9642E'}
          borderBottom="1px solid rgba(217,100,46,0.2)"
        >
          {title}
        </ModalHeader>

        <ModalBody color="gray.300" py={6}>
          <Box fontSize="sm" lineHeight="1.6">
            {message}
          </Box>
        </ModalBody>

        <ModalFooter borderTop="1px solid rgba(217,100,46,0.2)">
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
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
}
