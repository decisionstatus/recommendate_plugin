import { Page, Layout, Card, Text, BlockStack, Button, EmptyState, SkeletonBodyText, Banner } from '@shopify/polaris';
import { PlusIcon } from '@shopify/polaris-icons';
import { RuleBuilder } from '@/components/RuleBuilder';
import { useState, useEffect } from 'react';
import { useQuery, useMutation } from '@tanstack/react-query';
import { MerchandisingRule } from '@shared/schema';
import { queryClient, apiRequest } from '@/lib/queryClient';
import { useToast } from '@/hooks/use-toast';

export default function Merchandising() {
  const { toast } = useToast();

  const { data: globalRules, isLoading, isError } = useQuery<MerchandisingRule[]>({
    queryKey: ['/api/merchandising-rules/global'],
  });

  const [localRules, setLocalRules] = useState<MerchandisingRule[]>([]);

  // Sync global rules to local state when they load
  useEffect(() => {
    if (globalRules) {
      setLocalRules(globalRules);
    }
  }, [globalRules]);

  const saveMutation = useMutation({
    mutationFn: async (rules: MerchandisingRule[]) => {
      return apiRequest('POST', '/api/merchandising-rules/global', { rules });
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['/api/merchandising-rules/global'] });
      toast({
        title: 'Success',
        description: 'Global merchandising rules updated successfully',
      });
    },
    onError: () => {
      toast({
        title: 'Error',
        description: 'Failed to update merchandising rules',
        variant: 'destructive',
      });
    },
  });

  const handleSave = () => {
    saveMutation.mutate(localRules);
  };

  if (isLoading) {
    return (
      <Page title="Global Merchandising Rules">
        <Layout>
          <Layout.Section>
            <Card>
              <SkeletonBodyText lines={10} />
            </Card>
          </Layout.Section>
        </Layout>
      </Page>
    );
  }

  return (
    <Page
      title="Global Merchandising Rules"
      subtitle="Rules that apply across all recommendation use cases"
      primaryAction={{
        content: 'Save Rules',
        onAction: handleSave,
        loading: saveMutation.isPending,
      }}
      data-testid="page-merchandising"
    >
      <Layout>
        {isError && (
          <Layout.Section>
            <Banner tone="critical">
              <p>Unable to load merchandising rules. Please check your connection and try again.</p>
            </Banner>
          </Layout.Section>
        )}
        <Layout.Section>
          <Card>
            <BlockStack gap="400">
              <Text as="p" variant="bodyMd">
                Global merchandising rules override AI recommendations across all use cases.
                Use these to pin products, create whitelists/blacklists, and apply consistent
                merchandising strategies throughout your store.
              </Text>
            </BlockStack>
          </Card>
        </Layout.Section>

        <Layout.Section>
          <RuleBuilder rules={localRules} onChange={setLocalRules} showGlobalToggle={false} />
        </Layout.Section>
      </Layout>
    </Page>
  );
}
