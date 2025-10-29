import { IndexTable, Badge, Text, Thumbnail, useIndexResourceState } from '@shopify/polaris';
import { Product } from '@shared/schema';

interface ProductTableProps {
  products: Product[];
  selectable?: boolean;
  onSelect?: (selectedIds: string[]) => void;
}

export function ProductTable({ products, selectable = false, onSelect }: ProductTableProps) {
  const resourceName = {
    singular: 'product',
    plural: 'products',
  };

  const { selectedResources, allResourcesSelected, handleSelectionChange } =
    useIndexResourceState(products);

  const handleSelection = (selectionType: any, isSelecting: boolean, selection?: string | any) => {
    handleSelectionChange(selectionType, isSelecting, selection);
    if (onSelect && selectionType === 'multi') {
      onSelect(selectedResources as any);
    }
  };

  const rowMarkup = products.map((product, index) => (
    <IndexTable.Row
      id={product.id}
      key={product.id}
      selected={(selectedResources as any).includes(product.id)}
      position={index}
    >
      <IndexTable.Cell>
        <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
          {product.image_url && (
            <Thumbnail source={product.image_url} alt={product.title} size="small" />
          )}
          <Text as="span" variant="bodyMd" fontWeight="semibold">
            {product.title}
          </Text>
        </div>
      </IndexTable.Cell>
      <IndexTable.Cell>
        <Text as="span" variant="bodyMd">
          ${product.price.toFixed(2)}
        </Text>
      </IndexTable.Cell>
      <IndexTable.Cell>
        <Text as="span" variant="bodyMd" tone="subdued">
          {product.vendor || '—'}
        </Text>
      </IndexTable.Cell>
      <IndexTable.Cell>
        <Text as="span" variant="bodyMd" tone="subdued">
          {product.inventory_quantity ?? '—'}
        </Text>
      </IndexTable.Cell>
      <IndexTable.Cell>
        <Badge tone={product.inventory_quantity && product.inventory_quantity > 0 ? 'success' : 'critical'}>
          {product.inventory_quantity && product.inventory_quantity > 0 ? 'In Stock' : 'Out of Stock'}
        </Badge>
      </IndexTable.Cell>
    </IndexTable.Row>
  ));

  return (
    <IndexTable
      resourceName={resourceName}
      itemCount={products.length}
      selectedItemsCount={allResourcesSelected ? 'All' : (selectedResources as any).length}
      onSelectionChange={handleSelection}
      headings={[
        { title: 'Product' },
        { title: 'Price' },
        { title: 'Vendor' },
        { title: 'Inventory' },
        { title: 'Status' },
      ]}
      selectable={selectable}
    >
      {rowMarkup}
    </IndexTable>
  );
}
