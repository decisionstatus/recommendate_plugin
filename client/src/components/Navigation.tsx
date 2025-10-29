import { Navigation as PolarisNav } from '@shopify/polaris';
import {
  HomeIcon,
  PackageIcon,
  SettingsIcon,
  ChartVerticalIcon,
  ProductIcon,
} from '@shopify/polaris-icons';
import { useLocation } from 'wouter';

export function Navigation() {
  const [location, setLocation] = useLocation();

  return (
    <PolarisNav location={location}>
      <PolarisNav.Section
        items={[
          {
            url: '/',
            label: 'Dashboard',
            icon: HomeIcon,
            selected: location === '/',
            onClick: () => setLocation('/'),
          },
          {
            url: '/use-cases',
            label: 'Use Cases',
            icon: ProductIcon,
            selected: location === '/use-cases' || location.startsWith('/use-case/'),
            onClick: () => setLocation('/use-cases'),
          },
          {
            url: '/merchandising',
            label: 'Merchandising Rules',
            icon: SettingsIcon,
            selected: location === '/merchandising',
            onClick: () => setLocation('/merchandising'),
          },
          {
            url: '/products',
            label: 'Products',
            icon: PackageIcon,
            selected: location === '/products',
            onClick: () => setLocation('/products'),
          },
          {
            url: '/analytics',
            label: 'Analytics',
            icon: ChartVerticalIcon,
            selected: location === '/analytics',
            onClick: () => setLocation('/analytics'),
          },
        ]}
      />
    </PolarisNav>
  );
}
