import {
  Page,
  Layout,
  Card,
  Tabs,
  TextField,
  Select,
  BlockStack,
  Button,
  Banner,
  SkeletonBodyText,
} from '@shopify/polaris';
import { useState, useEffect } from 'react';
import { useLocation, useParams } from 'wouter';
import { AIConfigForm } from '@/components/AIConfigForm';
import { RuleBuilder } from '@/components/RuleBuilder';
import { ProductTable } from '@/components/ProductTable';
import { useQuery, useMutation } from '@tanstack/react-query';
import { RecoConfig, recommendationTypeSchema, placementTypeSchema, Product } from '@shared/schema';
import { queryClient, apiRequest } from '@/lib/queryClient';
import { useToast } from '@/hooks/use-toast';

export default function UseCaseConfig() {
  const { id } = useParams<{ id: string }>();
  const [, setLocation] = useLocation();
  const { toast } = useToast();
  const [selectedTab, setSelectedTab] = useState(0);

  const isNew = id === 'new';

  const { data: config, isLoading, isError: configError } = useQuery<RecoConfig>({
    queryKey: ['/api/reco-configs', id],
    enabled: !isNew,
  });

  const { data: products, isError: productsError } = useQuery<Product[]>({
    queryKey: ['/api/products'],
  });

  const [formData, setFormData] = useState<Partial<RecoConfig>>({
    name: '',
    recommendation_type: 'similar',
    placement: 'product_page',
    is_enabled: true,
    ai_config: {
      algorithm: 'hybrid',
      confidence_threshold: 0.7,
      max_results: 10,
      diversity_factor: 0.5,
      personalization_weight: 0.7,
      recency_weight: 0.3,
    },
    merchandising_rules: [],
    manual_product_ids: [],
  });

  // Sync fetched config data into form state when editing
  useEffect(() => {
    if (config && !isNew) {
      setFormData(config);
    }
  }, [config, isNew]);

  const saveMutation = useMutation({
    mutationFn: async (data: Partial<RecoConfig>) => {
      if (isNew) {
        return apiRequest('POST', '/api/reco-configs', data);
      } else {
        return apiRequest('PUT', `/api/reco-configs/${id}`, data);
      }
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['/api/reco-configs'] });
      toast({
        title: 'Success',
        description: `Use case ${isNew ? 'created' : 'updated'} successfully`,
      });
      setLocation('/use-cases');
    },
    onError: () => {
      toast({
        title: 'Error',
        description: 'Failed to save use case',
        variant: 'destructive',
      });
    },
  });

  const handleSave = () => {
    saveMutation.mutate(formData);
  };

  const tabs = [
    { id: 'ai-config', content: 'AI Configuration', panelID: 'ai-config-panel' },
    { id: 'merchandising', content: 'Merchandising Rules', panelID: 'merchandising-panel' },
    { id: 'manual', content: 'Manual Products', panelID: 'manual-panel' },
  ];

  const recommendationTypeOptions = recommendationTypeSchema.options.map((type) => ({
    label: type.split('_').map(word => word.charAt(0).toUpperCase() + word.slice(1)).join(' '),
    value: type,
  }));

  const placementOptions = placementTypeSchema.options.map((placement) => ({
    label: placement.split('_').map(word => word.charAt(0).toUpperCase() + word.slice(1)).join(' '),
    value: placement,
  }));

  if (isLoading && !isNew) {
    return (
      <Page title="Loading...">
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
      title={isNew ? 'Create Use Case' : formData.name || 'Edit Use Case'}
      backAction={{ onAction: () => setLocation('/use-cases') }}
      primaryAction={{
        content: 'Save',
        onAction: handleSave,
        loading: saveMutation.isPending,
        disabled: !formData.name,
      }}
      data-testid="page-use-case-config"
    >
      <Layout>
        {(configError || productsError) && (
          <Layout.Section>
            <Banner tone="critical">
              <p>Unable to load configuration data. Please check your connection and try again.</p>
            </Banner>
          </Layout.Section>
        )}
        <Layout.Section>
          <Card>
            <BlockStack gap="400">
              <TextField
                label="Use Case Name"
                value={formData.name || ''}
                onChange={(value) => setFormData({ ...formData, name: value })}
                autoComplete="off"
                helpText="Give this recommendation use case a descriptive name"
                data-testid="input-use-case-name"
              />

              <Select
                label="Recommendation Type"
                options={recommendationTypeOptions}
                value={formData.recommendation_type || 'similar'}
                onChange={(value) =>
                  setFormData({ ...formData, recommendation_type: value as any })
                }
                helpText="Select the type of recommendations to generate"
                data-testid="select-recommendation-type"
              />

              <Select
                label="Placement"
                options={placementOptions}
                value={formData.placement || 'product_page'}
                onChange={(value) => setFormData({ ...formData, placement: value as any })}
                helpText="Where these recommendations will be shown"
                data-testid="select-placement"
              />
            </BlockStack>
          </Card>
        </Layout.Section>

        <Layout.Section>
          <Card>
            <Tabs tabs={tabs} selected={selectedTab} onSelect={setSelectedTab}>
              <div style={{ padding: '16px 0' }}>
                {selectedTab === 0 && formData.ai_config && (
                  <AIConfigForm
                    config={formData.ai_config}
                    onChange={(ai_config) => setFormData({ ...formData, ai_config })}
                  />
                )}

                {selectedTab === 1 && (
                  <RuleBuilder
                    rules={formData.merchandising_rules || []}
                    onChange={(merchandising_rules) =>
                      setFormData({ ...formData, merchandising_rules })
                    }
                    showGlobalToggle
                  />
                )}

                {selectedTab === 2 && (
                  <BlockStack gap="400">
                    <Banner tone="info">
                      <p>
                        Select products to manually include in recommendations. These will override AI suggestions.
                      </p>
                    </Banner>
                    {products && products.length > 0 ? (
                      <ProductTable
                        products={products}
                        selectable
                        onSelect={(selectedIds) =>
                          setFormData({ ...formData, manual_product_ids: selectedIds })
                        }
                      />
                    ) : (
                      <Card>
                        <p>No products available. Please sync your products first.</p>
                      </Card>
                    )}
                  </BlockStack>
                )}
              </div>
            </Tabs>
          </Card>
        </Layout.Section>
      </Layout>
    </Page>
  );
}
