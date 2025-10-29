import { Page, EmptyState } from '@shopify/polaris';
import { useLocation } from 'wouter';

export default function NotFound() {
  const [, setLocation] = useLocation();

  return (
    <Page>
      <EmptyState
        heading="Page not found"
        action={{
          content: 'Go to Dashboard',
          onAction: () => setLocation('/'),
        }}
        image="https://cdn.shopify.com/s/files/1/0262/4071/2726/files/emptystate-files.png"
      >
        <p>The page you're looking for doesn't exist.</p>
      </EmptyState>
    </Page>
  );
}
