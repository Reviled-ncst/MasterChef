import { Box, VStack, HStack, Text, Badge } from '@chakra-ui/react';

interface DashboardCardProps {
  icon?: React.ReactNode;
  label: string;
  value: string | number;
  subtext?: string;
  trend?: {
    direction: 'up' | 'down';
    percentage: number;
  };
  bgGradient?: string;
  color?: string;
}

export default function DashboardCard({
  icon,
  label,
  value,
  subtext,
  trend,
  bgGradient = 'linear-gradient(135deg, rgba(217,108,47,0.08) 0%, rgba(217,108,47,0.02) 100%)',
  color = '#D9642E',
}: DashboardCardProps) {
  return (
    <Box
      bg={bgGradient}
      border="1px solid rgba(217,108,47,0.15)"
      borderRadius="lg"
      p={5}
      transition="all 0.2s"
      _hover={{
        borderColor: color,
        boxShadow: `0 4px 12px rgba(0,0,0,0.08)`,
      }}
    >
      <VStack align="start" style={{ gap: '12px' }}>
        {/* Icon + Label + Trend */}
        <HStack justify="space-between" width="100%">
          {icon && <Box color={color}>{icon}</Box>}
          <Box flex={1}>
            <Text fontSize="xs" fontWeight="600" textTransform="uppercase" color="gray.500" letterSpacing="0.5px">
              {label}
            </Text>
          </Box>
          {trend && (
            <Badge
              colorScheme={trend.direction === 'up' ? 'green' : 'red'}
              fontSize="xs"
              fontWeight="600"
            >
              {trend.direction === 'up' ? '↑' : '↓'} {trend.percentage}%
            </Badge>
          )}
        </HStack>

        {/* Value */}
        <Text fontSize="2xl" fontWeight="700" color={color}>
          {value}
        </Text>

        {/* Subtext */}
        {subtext && (
          <Text fontSize="xs" color="gray.600">
            {subtext}
          </Text>
        )}
      </VStack>
    </Box>
  );
}
