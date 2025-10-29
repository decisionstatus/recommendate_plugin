import { Card, BlockStack, InlineStack, Button, Select, TextField, Tag, Checkbox, Banner } from '@shopify/polaris';
import { DeleteIcon } from '@shopify/polaris-icons';
import { MerchandisingRule, ruleTypeSchema } from '@shared/schema';
import { useState } from 'react';

interface RuleBuilderProps {
  rules: MerchandisingRule[];
  onChange: (rules: MerchandisingRule[]) => void;
  showGlobalToggle?: boolean;
}

export function RuleBuilder({ rules, onChange, showGlobalToggle = false }: RuleBuilderProps) {
  const [newRuleType, setNewRuleType] = useState<string>('pin');

  const ruleTypeOptions = ruleTypeSchema.options.map((type) => ({
    label: type.replace('_', ' ').replace(/\b\w/g, l => l.toUpperCase()),
    value: type,
  }));

  const addRule = () => {
    const newRule: MerchandisingRule = {
      id: `rule-${Date.now()}`,
      type: newRuleType as any,
      priority: rules.length + 1,
      is_global: false,
      product_ids: [],
      tags: [],
    };
    onChange([...rules, newRule]);
  };

  const updateRule = (index: number, updates: Partial<MerchandisingRule>) => {
    const updatedRules = [...rules];
    updatedRules[index] = { ...updatedRules[index], ...updates };
    onChange(updatedRules);
  };

  const removeRule = (index: number) => {
    onChange(rules.filter((_, i) => i !== index));
  };

  return (
    <BlockStack gap="400">
      {rules.length === 0 && (
        <Banner tone="info">
          <p>No merchandising rules configured. Add rules to control which products appear in recommendations.</p>
        </Banner>
      )}

      {rules.map((rule, index) => (
        <Card key={rule.id}>
          <BlockStack gap="400">
            <InlineStack align="space-between" blockAlign="start">
              <Select
                label="Rule Type"
                options={ruleTypeOptions}
                value={rule.type}
                onChange={(value) => updateRule(index, { type: value as any })}
                data-testid={`select-rule-type-${index}`}
              />
              <Button
                icon={DeleteIcon}
                variant="tertiary"
                tone="critical"
                onClick={() => removeRule(index)}
                accessibilityLabel="Delete rule"
                data-testid={`button-delete-rule-${index}`}
              />
            </InlineStack>

            {showGlobalToggle && (
              <Checkbox
                label="Apply globally to all use cases"
                checked={rule.is_global}
                onChange={(checked) => updateRule(index, { is_global: checked })}
                data-testid={`checkbox-global-${index}`}
              />
            )}

            <TextField
              label="Priority (1 = highest)"
              type="number"
              value={String(rule.priority)}
              onChange={(value) => updateRule(index, { priority: parseInt(value) || 1 })}
              autoComplete="off"
              data-testid={`input-priority-${index}`}
            />

            {(rule.type === 'pin' || rule.type === 'boost' || rule.type === 'bury' || 
              rule.type === 'whitelist' || rule.type === 'blacklist') && (
              <TextField
                label="Product IDs (comma-separated)"
                value={rule.product_ids?.join(', ') || ''}
                onChange={(value) =>
                  updateRule(index, { product_ids: value.split(',').map((id) => id.trim()) })
                }
                autoComplete="off"
                helpText="Enter product IDs to apply this rule to specific products"
                data-testid={`input-product-ids-${index}`}
              />
            )}

            {rule.type === 'tag_based' && (
              <TextField
                label="Tags (comma-separated)"
                value={rule.tags?.join(', ') || ''}
                onChange={(value) =>
                  updateRule(index, { tags: value.split(',').map((tag) => tag.trim()) })
                }
                autoComplete="off"
                data-testid={`input-tags-${index}`}
              />
            )}

            {rule.type === 'price_range' && (
              <InlineStack gap="400">
                <TextField
                  label="Min Price"
                  type="number"
                  value={String(rule.min_price || '')}
                  onChange={(value) => updateRule(index, { min_price: parseFloat(value) || undefined })}
                  autoComplete="off"
                  prefix="$"
                  data-testid={`input-min-price-${index}`}
                />
                <TextField
                  label="Max Price"
                  type="number"
                  value={String(rule.max_price || '')}
                  onChange={(value) => updateRule(index, { max_price: parseFloat(value) || undefined })}
                  autoComplete="off"
                  prefix="$"
                  data-testid={`input-max-price-${index}`}
                />
              </InlineStack>
            )}

            {rule.type === 'inventory_based' && (
              <TextField
                label="Minimum Inventory"
                type="number"
                value={String(rule.min_inventory || '')}
                onChange={(value) => updateRule(index, { min_inventory: parseInt(value) || undefined })}
                autoComplete="off"
                data-testid={`input-min-inventory-${index}`}
              />
            )}

            {rule.type === 'time_based' && (
              <InlineStack gap="400">
                <TextField
                  label="Start Date"
                  type="date"
                  value={rule.start_date || ''}
                  onChange={(value) => updateRule(index, { start_date: value })}
                  autoComplete="off"
                  data-testid={`input-start-date-${index}`}
                />
                <TextField
                  label="End Date"
                  type="date"
                  value={rule.end_date || ''}
                  onChange={(value) => updateRule(index, { end_date: value })}
                  autoComplete="off"
                  data-testid={`input-end-date-${index}`}
                />
              </InlineStack>
            )}
          </BlockStack>
        </Card>
      ))}

      <InlineStack gap="200" align="start">
        <Select
          label=""
          labelHidden
          options={ruleTypeOptions}
          value={newRuleType}
          onChange={setNewRuleType}
          data-testid="select-new-rule-type"
        />
        <Button onClick={addRule} variant="primary" data-testid="button-add-rule">
          Add Rule
        </Button>
      </InlineStack>
    </BlockStack>
  );
}
