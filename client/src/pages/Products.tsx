import {
  Page,
  Layout,
  Card,
  Button,
  ProgressBar,
  Text,
  BlockStack,
  InlineStack,
  Badge,
  Banner,
  SkeletonBodyText,
  EmptyState,
} from '@shopify/polaris';
import { RefreshIcon } from '@shopify/polaris-icons';
import { ProductTable } from '@/components/ProductTable';
import { useQuery, useMutation } from '@tanstack/react-query';
import { Product, CatalogInfo, SyncStatus } from '@shared/schema';
import { queryClient, apiRequest } from '@/lib/queryClient';
import { useToast } from '@/hooks/use-toast';

export default function Products() {
  const { toast } = useToast();

  const { data: products, isLoading: productsLoading, isError: productsError } = useQuery<Product[]>({
    queryKey: ['/api/products'],
  });

  const { data: catalogInfo, isLoading: catalogLoading, isError: catalogError } = useQuery<CatalogInfo>({
    queryKey: ['/api/products/info'],
  });

  const { data: syncStatus, isError: syncError } = useQuery<SyncStatus>({
    queryKey: ['/api/products/sync-status'],
    refetchInterval: (query) => {
      const data = query.state.data;
      return data?.status === 'syncing' ? 2000 : false;
    },
  });

  const syncMutation = useMutation({
    mutationFn: async () => {
      return apiRequest('POST', '/api/products/sync', {});
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['/api/products'] });
      queryClient.invalidateQueries({ queryKey: ['/api/products/info'] });
      queryClient.invalidateQueries({ queryKey: ['/api/products/sync-status'] });
      toast({
        title: 'Sync Started',
        description: 'Product synchronization has been initiated',
      });
    },
    onError: () => {
      toast({
        title: 'Sync Failed',
        description: 'Failed to start product synchronization',
        variant: 'destructive',
      });
    },
  });

  const handleSync = () => {
    syncMutation.mutate();
  };

  const isSyncing = syncStatus?.status === 'syncing' || syncMutation.isPending;

  if (productsLoading || catalogLoading) {
    return (
      <Page title="Products">
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
      title="Products"
      subtitle={catalogInfo ? `${catalogInfo.product_count} products synced` : ''}
      primaryAction={{
        content: 'Sync Products',
        icon: RefreshIcon,
        onAction: handleSync,
        loading: isSyncing,
        disabled: isSyncing,
      }}
      data-testid="page-products"
    >
      <Layout>
        {(productsError || catalogError || syncError) && (
          <Layout.Section>
            <Banner tone="critical">
              <p>Unable to load product data. Please check your connection and try again.</p>
            </Banner>
          </Layout.Section>
        )}
        {isSyncing && syncStatus && (
          <Layout.Section>
            <Card>
              <BlockStack gap="400">
                <InlineStack align="space-between" blockAlign="center">
                  <Text as="h2" variant="headingMd" fontWeight="semibold">
                    Syncing Products
                  </Text>
                  <Badge tone="info">In Progress</Badge>
                </InlineStack>
                <ProgressBar progress={syncStatus.progress} size="small" />
                <Text as="p" variant="bodyMd" tone="subdued">
                  {syncStatus.current_count} of {syncStatus.total_count} products synced
                  {syncStatus.message && ` - ${syncStatus.message}`}
                </Text>
              </BlockStack>
            </Card>
          </Layout.Section>
        )}

        {catalogInfo && catalogInfo.sync_status === 'error' && (
          <Layout.Section>
            <Banner tone="critical">
              <p>
                The last sync failed. Please try syncing again or contact support if the issue persists.
              </p>
            </Banner>
          </Layout.Section>
        )}

        <Layout.Section>
          {!products || products.length === 0 ? (
            <EmptyState
              heading="No products synced"
              action={{ content: 'Sync Products', onAction: handleSync, loading: isSyncing }}
              image="https://cdn.shopify.com/s/files/1/0262/4071/2726/files/emptystate-files.png"
            >
              <p>
                Sync your Shopify products to start creating product recommendations.
              </p>
            </EmptyState>
          ) : (
            <Card padding="0">
              <ProductTable products={products} />
            </Card>
          )}
        </Layout.Section>

        {catalogInfo && catalogInfo.last_sync_at && (
          <Layout.Section>
            <Card>
              <BlockStack gap="200">
                <Text as="h3" variant="headingSm" fontWeight="medium">
                  Last Sync
                </Text>
                <Text as="p" variant="bodyMd" tone="subdued">
                  {new Date(catalogInfo.last_sync_at).toLocaleString()}
                </Text>
                <Text as="p" variant="bodyMd" tone="subdued">
                  {catalogInfo.batch_count} batches processed
                </Text>
              </BlockStack>
            </Card>
          </Layout.Section>
        )}
      </Layout>
    </Page>
  );
}
