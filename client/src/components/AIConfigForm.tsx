import { BlockStack, Select, RangeSlider, Text, Card } from '@shopify/polaris';
import { AIConfig, algorithmTypeSchema } from '@shared/schema';

interface AIConfigFormProps {
  config: AIConfig;
  onChange: (config: AIConfig) => void;
}

export function AIConfigForm({ config, onChange }: AIConfigFormProps) {
  const algorithmOptions = algorithmTypeSchema.options.map((alg) => ({
    label: alg.split('_').map(word => word.charAt(0).toUpperCase() + word.slice(1)).join(' '),
    value: alg,
  }));

  return (
    <Card>
      <BlockStack gap="400">
        <Select
          label="AI Algorithm"
          options={algorithmOptions}
          value={config.algorithm}
          onChange={(value) => onChange({ ...config, algorithm: value as any })}
          helpText="Choose the machine learning algorithm for generating recommendations"
          data-testid="select-algorithm"
        />

        <div>
          <Text as="p" variant="bodyMd" fontWeight="medium">
            Confidence Threshold: {(config.confidence_threshold * 100).toFixed(0)}%
          </Text>
          <RangeSlider
            label="Confidence Threshold"
            labelHidden
            value={config.confidence_threshold * 100}
            onChange={(value) => onChange({ ...config, confidence_threshold: (typeof value === 'number' ? value : value[0]) / 100 })}
            min={0}
            max={100}
            step={5}
            output
            helpText="Minimum confidence score for recommendations to be shown"
            data-testid="slider-confidence"
          />
        </div>

        <div>
          <Text as="p" variant="bodyMd" fontWeight="medium">
            Max Results: {config.max_results}
          </Text>
          <RangeSlider
            label="Max Results"
            labelHidden
            value={config.max_results}
            onChange={(value) => onChange({ ...config, max_results: typeof value === 'number' ? value : value[0] })}
            min={1}
            max={50}
            step={1}
            output
            helpText="Maximum number of products to recommend"
            data-testid="slider-max-results"
          />
        </div>

        <div>
          <Text as="p" variant="bodyMd" fontWeight="medium">
            Diversity Factor: {((config.diversity_factor || 0.5) * 100).toFixed(0)}%
          </Text>
          <RangeSlider
            label="Diversity Factor"
            labelHidden
            value={(config.diversity_factor || 0.5) * 100}
            onChange={(value) => onChange({ ...config, diversity_factor: (typeof value === 'number' ? value : value[0]) / 100 })}
            min={0}
            max={100}
            step={5}
            output
            helpText="Balance between similar and diverse recommendations"
            data-testid="slider-diversity"
          />
        </div>

        <div>
          <Text as="p" variant="bodyMd" fontWeight="medium">
            Personalization Weight: {((config.personalization_weight || 0.7) * 100).toFixed(0)}%
          </Text>
          <RangeSlider
            label="Personalization Weight"
            labelHidden
            value={(config.personalization_weight || 0.7) * 100}
            onChange={(value) => onChange({ ...config, personalization_weight: (typeof value === 'number' ? value : value[0]) / 100 })}
            min={0}
            max={100}
            step={5}
            output
            helpText="How much to personalize based on user behavior"
            data-testid="slider-personalization"
          />
        </div>

        <div>
          <Text as="p" variant="bodyMd" fontWeight="medium">
            Recency Weight: {((config.recency_weight || 0.3) * 100).toFixed(0)}%
          </Text>
          <RangeSlider
            label="Recency Weight"
            labelHidden
            value={(config.recency_weight || 0.3) * 100}
            onChange={(value) => onChange({ ...config, recency_weight: (typeof value === 'number' ? value : value[0]) / 100 })}
            min={0}
            max={100}
            step={5}
            output
            helpText="Prioritize recently viewed or trending products"
            data-testid="slider-recency"
          />
        </div>
      </BlockStack>
    </Card>
  );
}
