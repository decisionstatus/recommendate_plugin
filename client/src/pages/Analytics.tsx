import {
  Page,
  Layout,
  Card,
  BlockStack,
  Text,
  InlineGrid,
  Select,
  EmptyState,
  SkeletonBodyText,
  Banner,
} from '@shopify/polaris';
import { KPICard } from '@/components/KPICard';
import { useState } from 'react';
import {
  LineChart,
  Line,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from 'recharts';
import { useQuery } from '@tanstack/react-query';
import { AnalyticsMetrics, AnalyticsTrend, RecoPerformance } from '@shared/schema';

export default function Analytics() {
  const [dateRange, setDateRange] = useState('30');

  const { data: metrics, isLoading: metricsLoading, isError: metricsError } = useQuery<AnalyticsMetrics>({
    queryKey: ['/api/analytics/metrics', dateRange],
  });

  const { data: trends, isLoading: trendsLoading, isError: trendsError } = useQuery<AnalyticsTrend[]>({
    queryKey: ['/api/analytics/trends', dateRange],
  });

  const { data: performance, isLoading: performanceLoading, isError: performanceError } = useQuery<RecoPerformance[]>({
    queryKey: ['/api/analytics/performance', dateRange],
  });

  const dateRangeOptions = [
    { label: 'Last 7 days', value: '7' },
    { label: 'Last 30 days', value: '30' },
    { label: 'Last 90 days', value: '90' },
    { label: 'Last year', value: '365' },
  ];

  if (metricsLoading) {
    return (
      <Page title="Analytics">
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
      <Page title="Analytics">
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
      <Page title="Analytics">
        <Layout>
          <Layout.Section>
            <EmptyState
              heading="No analytics data available"
              image="https://cdn.shopify.com/s/files/1/0262/4071/2726/files/emptystate-files.png"
            >
              <p>Analytics data will appear here once your recommendations start generating impressions and conversions.</p>
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
      title="Analytics"
      subtitle="Detailed performance metrics and ROI analysis"
      data-testid="page-analytics"
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
          <Card>
            <div style={{ maxWidth: '300px' }}>
              <Select
                label="Date Range"
                options={dateRangeOptions}
                value={dateRange}
                onChange={setDateRange}
                data-testid="select-date-range"
              />
            </div>
          </Card>
        </Layout.Section>

        <Layout.Section>
          <InlineGrid columns={{ xs: 1, sm: 2, md: 4 }} gap="400">
            <KPICard
              title="Total Revenue"
              value={`$${metrics.revenue_attributed.toLocaleString()}`}
              trend={{ value: 12.5, isPositive: true }}
              subtitle="attributed to recommendations"
            />
            <KPICard
              title="ROI"
              value={`${metrics.roi_percentage.toFixed(1)}%`}
              trend={{ value: 15.2, isPositive: true }}
              subtitle="return on investment"
            />
            <KPICard
              title="Avg Order Value"
              value={`$${metrics.average_order_value.toFixed(2)}`}
              trend={{ value: 8.3, isPositive: true }}
              subtitle="from recommendations"
            />
            <KPICard
              title="Conversion Rate"
              value={`${(metrics.conversion_rate * 100).toFixed(2)}%`}
              trend={{ value: 5.1, isPositive: true }}
              subtitle="recommendation clicks"
            />
          </InlineGrid>
        </Layout.Section>

        <Layout.Section>
          <Card>
            <BlockStack gap="400">
              <Text as="h2" variant="headingMd" fontWeight="semibold">
                Conversion Trends Over Time
              </Text>
              {trendsLoading ? (
                <SkeletonBodyText lines={8} />
              ) : trendData.length > 0 ? (
                <div style={{ height: '400px' }}>
                  <ResponsiveContainer width="100%" height="100%">
                    <LineChart data={trendData}>
                      <CartesianGrid strokeDasharray="3 3" stroke="#e1e3e5" />
                      <XAxis dataKey="date" tick={{ fontSize: 12 }} />
                      <YAxis yAxisId="left" tick={{ fontSize: 12 }} />
                      <YAxis yAxisId="right" orientation="right" tick={{ fontSize: 12 }} />
                      <Tooltip />
                      <Legend />
                      <Line
                        yAxisId="left"
                        type="monotone"
                        dataKey="conversions"
                        stroke="#008060"
                        strokeWidth={2}
                        name="Conversions"
                      />
                      <Line
                        yAxisId="right"
                        type="monotone"
                        dataKey="revenue"
                        stroke="#5C6AC4"
                        strokeWidth={2}
                        name="Revenue ($)"
                      />
                      <Line
                        yAxisId="left"
                        type="monotone"
                        dataKey="clicks"
                        stroke="#FFA500"
                        strokeWidth={2}
                        name="Clicks"
                      />
                    </LineChart>
                  </ResponsiveContainer>
                </div>
              ) : (
                <Text as="p" variant="bodyMd" tone="subdued">
                  No trend data available for selected period
                </Text>
              )}
            </BlockStack>
          </Card>
        </Layout.Section>

        <Layout.Section>
          <InlineGrid columns={{ xs: 1, md: 2 }} gap="400">
            <Card>
              <BlockStack gap="400">
                <Text as="h2" variant="headingMd" fontWeight="semibold">
                  Revenue by Recommendation Type
                </Text>
                {performanceLoading ? (
                  <SkeletonBodyText lines={8} />
                ) : perfData.length > 0 ? (
                  <div style={{ height: '300px' }}>
                    <ResponsiveContainer width="100%" height="100%">
                      <BarChart data={perfData}>
                        <CartesianGrid strokeDasharray="3 3" stroke="#e1e3e5" />
                        <XAxis dataKey="recommendation_type" tick={{ fontSize: 11 }} angle={-45} textAnchor="end" height={80} />
                        <YAxis tick={{ fontSize: 12 }} />
                        <Tooltip />
                        <Legend />
                        <Bar dataKey="revenue" fill="#008060" name="Revenue ($)" />
                      </BarChart>
                    </ResponsiveContainer>
                  </div>
                ) : (
                  <Text as="p" variant="bodyMd" tone="subdued">
                    No performance data available
                  </Text>
                )}
              </BlockStack>
            </Card>

            <Card>
              <BlockStack gap="400">
                <Text as="h2" variant="headingMd" fontWeight="semibold">
                  Engagement Metrics
                </Text>
                <InlineGrid columns={2} gap="400">
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
                      Click-Through Rate
                    </Text>
                    <Text as="p" variant="headingLg" fontWeight="semibold">
                      {(metrics.click_through_rate * 100).toFixed(2)}%
                    </Text>
                  </div>
                  <div>
                    <Text as="p" variant="bodySm" tone="subdued">
                      Total Conversions
                    </Text>
                    <Text as="p" variant="headingLg" fontWeight="semibold">
                      {metrics.total_conversions.toLocaleString()}
                    </Text>
                  </div>
                </InlineGrid>
              </BlockStack>
            </Card>
          </InlineGrid>
        </Layout.Section>
      </Layout>
    </Page>
  );
}
