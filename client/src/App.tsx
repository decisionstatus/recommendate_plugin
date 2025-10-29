import { Switch, Route } from "wouter";
import { queryClient } from "./lib/queryClient";
import { QueryClientProvider } from "@tanstack/react-query";
import { Toaster } from "@/components/ui/toaster";
import { Frame } from '@shopify/polaris';
import { PolarisProvider } from '@/components/PolarisProvider';
import { Navigation } from '@/components/Navigation';
import Dashboard from '@/pages/Dashboard';
import UseCases from '@/pages/UseCases';
import UseCaseConfig from '@/pages/UseCaseConfig';
import Products from '@/pages/Products';
import Merchandising from '@/pages/Merchandising';
import Analytics from '@/pages/Analytics';
import NotFound from "@/pages/not-found";

function Router() {
  return (
    <Switch>
      <Route path="/" component={Dashboard} />
      <Route path="/use-cases" component={UseCases} />
      <Route path="/use-case/:id" component={UseCaseConfig} />
      <Route path="/products" component={Products} />
      <Route path="/merchandising" component={Merchandising} />
      <Route path="/analytics" component={Analytics} />
      <Route component={NotFound} />
    </Switch>
  );
}

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <PolarisProvider>
        <Frame navigation={<Navigation />}>
          <Router />
        </Frame>
        <Toaster />
      </PolarisProvider>
    </QueryClientProvider>
  );
}

export default App;
