import { Card, Badge, Text, BlockStack, InlineStack, Button, InlineGrid } from '@shopify/polaris';
import { EditIcon } from '@shopify/polaris-icons';
import { RecoConfig } from '@shared/schema';

interface UseCaseCardProps {
  config: RecoConfig;
  onEdit: () => void;
  onToggle: (enabled: boolean) => void;
}

const RECOMMENDATION_TYPE_LABELS: Record<string, string> = {
  similar: 'Similar Products',
  bought_together: 'Frequently Bought Together',
  cross_sell: 'Cross-sell',
  upsell: 'Upsell',
  personalized: 'Personalized',
  trending: 'Trending',
};

export function UseCaseCard({ config, onEdit, onToggle }: UseCaseCardProps) {
  return (
    <Card>
      <BlockStack gap="400">
        <InlineStack align="space-between" blockAlign="start">
          <BlockStack gap="200">
            <InlineStack gap="200" align="start">
              <Text as="h3" variant="headingMd" fontWeight="semibold">
                {config.name}
              </Text>
              <Badge tone={config.is_enabled ? 'success' : 'info'}>
                {config.is_enabled ? 'Active' : 'Disabled'}
              </Badge>
            </InlineStack>
            <Text as="p" variant="bodyMd" tone="subdued">
              {RECOMMENDATION_TYPE_LABELS[config.recommendation_type] || config.recommendation_type}
            </Text>
          </BlockStack>
          <Button
            icon={EditIcon}
            onClick={onEdit}
            accessibilityLabel={`Edit ${config.name}`}
            data-testid={`button-edit-${config.id}`}
          />
        </InlineStack>

        <InlineGrid columns={2} gap="200">
          <div>
            <Text as="p" variant="bodySm" tone="subdued">
              Placement
            </Text>
            <Text as="p" variant="bodyMd" fontWeight="medium">
              {config.placement.replace('_', ' ')}
            </Text>
          </div>
          <div>
            <Text as="p" variant="bodySm" tone="subdued">
              Algorithm
            </Text>
            <Text as="p" variant="bodyMd" fontWeight="medium">
              {config.ai_config.algorithm.replace('_', ' ')}
            </Text>
          </div>
        </InlineGrid>

        <InlineStack gap="200" align="start">
          <Button
            variant={config.is_enabled ? 'secondary' : 'primary'}
            onClick={() => onToggle(!config.is_enabled)}
            data-testid={`button-toggle-${config.id}`}
          >
            {config.is_enabled ? 'Disable' : 'Enable'}
          </Button>
          <Button onClick={onEdit} data-testid={`button-configure-${config.id}`}>
            Configure
          </Button>
        </InlineStack>
      </BlockStack>
    </Card>
  );
}
