import { Page, Layout, Card, BlockStack, Text, InlineGrid, EmptyState, SkeletonBodyText, Banner } from '@shopify/polaris';
import { KPICard } from '@/components/KPICard';
import { LineChart, Line, BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import { useQuery } from '@tanstack/react-query';
import { AnalyticsMetrics, AnalyticsTrend, RecoPerformance } from '@shared/schema';

export default function Dashboard() {
  const { data: metrics, isLoading: metricsLoading, isError: metricsError } = useQuery<AnalyticsMetrics>({
    queryKey: ['/api/analytics/metrics'],
  });

  const { data: trends, isLoading: trendsLoading, isError: trendsError } = useQuery<AnalyticsTrend[]>({
    queryKey: ['/api/analytics/trends'],
  });

  const { data: performance, isLoading: performanceLoading, isError: performanceError } = useQuery<RecoPerformance[]>({
    queryKey: ['/api/analytics/performance'],
  });

  if (metricsLoading) {
    return (
      <Page title="Dashboard">
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

  if (metricsError) {
    return (
      <Page title="Dashboard">
        <Layout>
          <Layout.Section>
            <Banner tone="critical">
              <p>Unable to load analytics data. Please check your connection and try again.</p>
            </Banner>
          </Layout.Section>
        </Layout>
      </Page>
    );
  }

  if (!metrics) {
    return (
      <Page title="Dashboard">
        <Layout>
          <Layout.Section>
            <EmptyState
              heading="No analytics data available"
              image="https://cdn.shopify.com/s/files/1/0262/4071/2726/files/emptystate-files.png"
            >
              <p>Start by configuring your first recommendation use case and syncing your products.</p>
            </EmptyState>
          </Layout.Section>
        </Layout>
      </Page>
    );
  }

  const trendData = trends || [];
  const perfData = performance || [];

  return (
    <Page
      title="Dashboard"
      subtitle="Overview of your recommendation performance and ROI"
      data-testid="page-dashboard"
    >
      <Layout>
        {(metricsError || trendsError || performanceError) && (
          <Layout.Section>
            <Banner tone="critical">
              <p>Unable to load analytics data. Please check your connection and try again.</p>
            </Banner>
          </Layout.Section>
        )}
        <Layout.Section>
          <InlineGrid columns={{ xs: 1, sm: 2, md: 4 }} gap="400">
            <KPICard
              title="Revenue Attribution"
              value={`$${metrics.revenue_attributed.toLocaleString()}`}
              trend={{ value: 12.5, isPositive: true }}
              subtitle="vs last month"
            />
            <KPICard
              title="Average Order Value"
              value={`$${metrics.average_order_value.toFixed(2)}`}
              trend={{ value: 8.3, isPositive: true }}
              subtitle="vs last month"
            />
            <KPICard
              title="Conversion Rate"
              value={`${(metrics.conversion_rate * 100).toFixed(2)}%`}
              trend={{ value: 5.1, isPositive: true }}
              subtitle="vs last month"
            />
            <KPICard
              title="Click-Through Rate"
              value={`${(metrics.click_through_rate * 100).toFixed(2)}%`}
              trend={{ value: -2.3, isPositive: false }}
              subtitle="vs last month"
            />
          </InlineGrid>
        </Layout.Section>

        <Layout.Section>
          <InlineGrid columns={{ xs: 1, md: 2 }} gap="400">
            <Card>
              <BlockStack gap="400">
                <Text as="h2" variant="headingMd" fontWeight="semibold">
                  Performance Trends
                </Text>
                {trendsLoading ? (
                  <SkeletonBodyText lines={8} />
                ) : trendData.length > 0 ? (
                  <div style={{ height: '300px' }}>
                    <ResponsiveContainer width="100%" height="100%">
                      <LineChart data={trendData}>
                        <CartesianGrid strokeDasharray="3 3" stroke="#e1e3e5" />
                        <XAxis dataKey="date" tick={{ fontSize: 12 }} />
                        <YAxis tick={{ fontSize: 12 }} />
                        <Tooltip />
                        <Legend />
                        <Line
                          type="monotone"
                          dataKey="conversions"
                          stroke="#008060"
                          strokeWidth={2}
                          name="Conversions"
                        />
                        <Line
                          type="monotone"
                          dataKey="clicks"
                          stroke="#5C6AC4"
                          strokeWidth={2}
                          name="Clicks"
                        />
                      </LineChart>
                    </ResponsiveContainer>
                  </div>
                ) : (
                  <Text as="p" variant="bodyMd" tone="subdued">
                    No trend data available yet
                  </Text>
                )}
              </BlockStack>
            </Card>

            <Card>
              <BlockStack gap="400">
                <Text as="h2" variant="headingMd" fontWeight="semibold">
                  Performance by Recommendation Type
                </Text>
                {performanceLoading ? (
                  <SkeletonBodyText lines={8} />
                ) : perfData.length > 0 ? (
                  <div style={{ height: '300px' }}>
                    <ResponsiveContainer width="100%" height="100%">
                      <BarChart data={perfData}>
                        <CartesianGrid strokeDasharray="3 3" stroke="#e1e3e5" />
                        <XAxis dataKey="recommendation_type" tick={{ fontSize: 12 }} />
                        <YAxis tick={{ fontSize: 12 }} />
                        <Tooltip />
                        <Legend />
                        <Bar dataKey="revenue" fill="#008060" name="Revenue ($)" />
                        <Bar dataKey="conversions" fill="#5C6AC4" name="Conversions" />
                      </BarChart>
                    </ResponsiveContainer>
                  </div>
                ) : (
                  <Text as="p" variant="bodyMd" tone="subdued">
                    No performance data available yet
                  </Text>
                )}
              </BlockStack>
            </Card>
          </InlineGrid>
        </Layout.Section>

        <Layout.Section>
          <Card>
            <BlockStack gap="400">
              <Text as="h2" variant="headingMd" fontWeight="semibold">
                Key Metrics Summary
              </Text>
              <InlineGrid columns={{ xs: 1, sm: 2, md: 3 }} gap="400">
                <div>
                  <Text as="p" variant="bodySm" tone="subdued">
                    Total Impressions
                  </Text>
                  <Text as="p" variant="headingLg" fontWeight="semibold">
                    {metrics.total_impressions.toLocaleString()}
                  </Text>
                </div>
                <div>
                  <Text as="p" variant="bodySm" tone="subdued">
                    Total Clicks
                  </Text>
                  <Text as="p" variant="headingLg" fontWeight="semibold">
                    {metrics.total_clicks.toLocaleString()}
                  </Text>
                </div>
                <div>
                  <Text as="p" variant="bodySm" tone="subdued">
                    ROI
                  </Text>
                  <Text as="p" variant="headingLg" fontWeight="semibold">
                    {metrics.roi_percentage.toFixed(1)}%
                  </Text>
                </div>
              </InlineGrid>
            </BlockStack>
          </Card>
        </Layout.Section>
      </Layout>
    </Page>
  );
}
