import { Box, Heading, Text, HStack, VStack } from '@chakra-ui/react';
import { ReactNode } from 'react';

interface PageHeaderProps {
  title: string;
  subtitle: string;
  icon: ReactNode;
  bgGradient?: string;
  borderColor?: string;
}

/**
 * Reusable PageHeader component for consistent headers across all pages
 * Prevents legacy behavior with centralized header styling
 *
 * @param title - Main page title
 * @param subtitle - Descriptive subtitle
 * @param icon - React icon component
 * @param bgGradient - Optional gradient override (default: orange theme)
 * @param borderColor - Optional border color override (default: orange)
 */
export default function PageHeader({
  title,
  subtitle,
  icon,
  bgGradient = 'linear-gradient(135deg, rgba(217,100,46,0.35) 0%, rgba(251,146,60,0.25) 100%)',
  borderColor = 'rgba(217,100,46,0.5)',
}: PageHeaderProps) {
  return (
    <Box
      bg={bgGradient}
      borderRadius="3xl"
      p={{ base: 6, md: 8 }}
      border={`2px solid ${borderColor}`}
      className="page-header"
    >
      <HStack gap={3}>
        <Box fontSize="40px" color="white">
          {icon}
        </Box>
        <VStack align="start" gap={0}>
          <Heading as="h1" size={{ base: 'lg', md: '2xl' }} color="white">
            {title}
          </Heading>
          <Text color="rgba(255,255,255,0.95)" fontSize={{ base: 'sm', md: 'md' }}>
            {subtitle}
          </Text>
        </VStack>
      </HStack>
    </Box>
  );
}
