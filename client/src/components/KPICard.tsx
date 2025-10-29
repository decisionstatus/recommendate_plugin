import { Card, Text, BlockStack, InlineStack, Icon } from '@shopify/polaris';
import { ArrowUpIcon, ArrowDownIcon } from '@shopify/polaris-icons';

interface KPICardProps {
  title: string;
  value: string;
  trend?: {
    value: number;
    isPositive: boolean;
  };
  subtitle?: string;
}

export function KPICard({ title, value, trend, subtitle }: KPICardProps) {
  return (
    <Card>
      <BlockStack gap="200">
        <Text as="h3" variant="headingSm" fontWeight="medium" tone="subdued">
          {title}
        </Text>
        <Text as="p" variant="heading2xl" fontWeight="semibold">
          {value}
        </Text>
        {trend && (
          <InlineStack gap="100" align="start">
            <Icon
              source={trend.isPositive ? ArrowUpIcon : ArrowDownIcon}
              tone={trend.isPositive ? 'success' : 'critical'}
            />
            <Text
              as="span"
              variant="bodyMd"
              tone={trend.isPositive ? 'success' : 'critical'}
            >
              {trend.value > 0 ? '+' : ''}{trend.value}%
            </Text>
            {subtitle && (
              <Text as="span" variant="bodyMd" tone="subdued">
                {subtitle}
              </Text>
            )}
          </InlineStack>
        )}
      </BlockStack>
    </Card>
  );
}
