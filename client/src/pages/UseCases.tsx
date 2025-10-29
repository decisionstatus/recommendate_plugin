import { Page, Layout, Button, EmptyState, InlineGrid, SkeletonBodyText, Card, Banner } from '@shopify/polaris';
import { PlusIcon } from '@shopify/polaris-icons';
import { UseCaseCard } from '@/components/UseCaseCard';
import { useLocation } from 'wouter';
import { useQuery, useMutation } from '@tanstack/react-query';
import { RecoConfig } from '@shared/schema';
import { queryClient, apiRequest } from '@/lib/queryClient';

export default function UseCases() {
  const [, setLocation] = useLocation();

  const { data: configs, isLoading, isError } = useQuery<RecoConfig[]>({
    queryKey: ['/api/reco-configs'],
  });

  const toggleMutation = useMutation({
    mutationFn: async ({ id, enabled }: { id: string; enabled: boolean }) => {
      return apiRequest('PUT', `/api/reco-configs/${id}`, { is_enabled: enabled });
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['/api/reco-configs'] });
    },
  });

  const handleEdit = (id: string) => {
    setLocation(`/use-case/${id}`);
  };

  const handleToggle = (id: string, enabled: boolean) => {
    toggleMutation.mutate({ id, enabled });
  };

  const handleCreate = () => {
    setLocation('/use-case/new');
  };

  if (isLoading) {
    return (
      <Page title="Use Cases">
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

  if (!configs || configs.length === 0) {
    return (
      <Page
        title="Use Cases"
        primaryAction={{
          content: 'Create Use Case',
          icon: PlusIcon,
          onAction: handleCreate,
        }}
        data-testid="page-use-cases"
      >
        <Layout>
          {isError && (
            <Layout.Section>
              <Banner tone="critical">
                <p>Unable to load use cases. Please check your connection and try again.</p>
              </Banner>
            </Layout.Section>
          )}
          {!isError && (
            <Layout.Section>
              <EmptyState
                heading="No recommendation use cases yet"
                action={{ content: 'Create Your First Use Case', onAction: handleCreate }}
                image="https://cdn.shopify.com/s/files/1/0262/4071/2726/files/emptystate-files.png"
              >
                <p>
                  Create recommendation use cases to show similar products, cross-sells, upsells, and more to your customers.
                </p>
              </EmptyState>
            </Layout.Section>
          )}
        </Layout>
      </Page>
    );
  }

  return (
    <Page
      title="Use Cases"
      subtitle={`${configs.length} recommendation ${configs.length === 1 ? 'use case' : 'use cases'} configured`}
      primaryAction={{
        content: 'Create Use Case',
        icon: PlusIcon,
        onAction: handleCreate,
      }}
      data-testid="page-use-cases"
    >
      <Layout>
        {isError && (
          <Layout.Section>
            <Banner tone="critical">
              <p>Unable to load use cases. Please check your connection and try again.</p>
            </Banner>
          </Layout.Section>
        )}
        <Layout.Section>
          <InlineGrid columns={{ xs: 1, sm: 2, md: 3 }} gap="400">
            {configs.map((config) => (
              <UseCaseCard
                key={config.id}
                config={config}
                onEdit={() => handleEdit(config.id)}
                onToggle={(enabled) => handleToggle(config.id, enabled)}
              />
            ))}
          </InlineGrid>
        </Layout.Section>
      </Layout>
    </Page>
  );
}
