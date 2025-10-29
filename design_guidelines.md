# Shopify Product Recommendations App - Design Guidelines

## Design Approach
**Selected System:** Shopify Polaris Design System

**Justification:** This is a Shopify admin app requiring high information density, complex data visualization, and configuration interfaces. Polaris provides purpose-built patterns for merchant-facing applications with established conventions for navigation, forms, data display, and analytics.

**Key Design Principles:**
1. **Clarity Through Hierarchy:** Multi-level information architecture with clear visual separation between global and use-case-specific settings
2. **Scannable Data:** Dense information displays balanced with strategic whitespace and visual grouping
3. **Progressive Disclosure:** Complex configuration options revealed progressively to avoid overwhelming users
4. **Action-Oriented:** Primary actions prominently placed, status feedback immediate and clear

---

## Core Design Elements

### A. Typography
**Font Family:** SF Pro (Polaris default system font stack)

**Type Scale:**
- Page Titles: 20px, semibold (--p-font-size-500, --p-font-weight-semibold)
- Section Headings: 16px, semibold (--p-font-size-400)
- Card Titles: 14px, semibold (--p-font-size-300)
- Body Text: 14px, regular (--p-font-size-300)
- Helper Text: 13px, regular (--p-font-size-200)
- Metric Values: 24px, semibold (large KPI numbers)
- Metric Labels: 13px, regular (metric descriptions)

**Line Height:** 1.6 for body text, 1.2 for headings

---

### B. Layout System

**Spacing Primitives:** Use Polaris spacing tokens consistently
- Primary spacing units: `--p-space-4` (16px), `--p-space-5` (20px), `--p-space-8` (32px)
- Tight spacing: `--p-space-2` (8px), `--p-space-3` (12px)
- Generous spacing: `--p-space-10` (40px), `--p-space-12` (48px)

**Page Structure:**
- Use Polaris `Page` component with full-width layout
- Primary navigation in left sidebar (collapsed/expandable)
- Main content area with max-width constraint for readability
- Sticky action bar at bottom for save/cancel actions on configuration pages

**Grid System:**
- Analytics Dashboard: 4-column grid for KPI cards (responsive: 2 cols tablet, 1 col mobile)
- Configuration Forms: 2-column layout for related settings (single column on mobile)
- Product Lists: Full-width data tables with horizontal scroll on mobile
- Rule Builder: Single column with nested sections

**Card Layouts:**
- Use `Card` component with sectioned content for logical grouping
- Add `subdued` sections for secondary information
- Spacing between cards: `--p-space-5` (20px)

---

### C. Component Library

#### Navigation Components
- **App Frame:** Polaris `Frame` with navigation sidebar
- **Navigation Items:** Icon + label for main sections (Dashboard, Use Cases, Merchandising, Products, Settings)
- **Active State:** Solid background with primary color
- **Secondary Navigation:** Tabs within pages for sub-sections (e.g., AI Config, Rules, Manual)

#### Data Display
- **Data Tables:** Polaris `DataTable` with:
  - Sortable columns for product lists
  - Checkbox selection for bulk actions
  - Inline actions (edit, delete) in last column
  - Sticky header on scroll
  - Row hover states
  - Status badges in dedicated columns

- **KPI Cards:** 
  - Metric value prominent at top (24px, semibold)
  - Metric label below (13px, subdued)
  - Trend indicator with up/down arrow and percentage
  - Mini sparkline chart when relevant
  - Card grid with equal heights

- **Status Badges:**
  - Success (green): "Active", "Synced", "Enabled"
  - Warning (yellow): "Syncing", "In Progress"
  - Critical (red): "Error", "Disabled"
  - Info (blue): "Draft", "Pending"
  - Use Polaris `Badge` component with appropriate status prop

- **Progress Indicators:**
  - Linear progress bar for sync operations
  - Percentage text centered above bar
  - Estimated time remaining below (when available)

#### Form Controls
- **Select Dropdowns:** Polaris `Select` for algorithm choice, recommendation types
- **Toggle Switches:** `SettingToggle` for enable/disable use-cases
- **Range Sliders:** For AI algorithm parameters (confidence threshold, max results)
- **Text Fields:** `TextField` with clear labels and helper text
- **Tag Input:** For product whitelisting/blacklisting (autocomplete search)
- **Radio Buttons:** For exclusive algorithm selection
- **Checkboxes:** For multi-select merchandising rules

#### Action Components
- **Primary Buttons:** Polaris `Button` with primary variant for "Save", "Create", "Apply"
- **Secondary Buttons:** Outline style for "Cancel", "Reset"
- **Destructive Buttons:** Critical variant for "Delete", "Remove"
- **Button Groups:** Related actions grouped together (Save & Enable, Save as Draft)
- **Action Menus:** Overflow menu (three dots) for additional options

#### Configuration Panels
- **Collapsible Sections:** `Collapsible` component for advanced settings
- **Choice Lists:** For selecting recommendation types (checkboxes for multiple)
- **Resource Picker:** Custom component for product selection with search and preview
- **Rule Builder:**
  - Add rule button at top
  - Each rule as card with condition inputs
  - Visual indicator of rule priority (drag handles)
  - Delete icon on hover

#### Analytics Visualization
- **Line Charts:** For trend analysis (conversion rate over time)
- **Bar Charts:** For comparison (performance by recommendation type)
- **Use lightweight chart library compatible with React (recharts or similar)
- **Chart Container:** White background, subtle border, padding of `--p-space-5`
- **Tooltips:** Show on hover with formatted values

#### Empty States
- **Illustration + Message:** For no data scenarios
- **Primary Action Button:** "Sync Products", "Create First Use Case"
- **Center-aligned content** in card

---

### D. Page-Specific Layouts

#### Dashboard (Analytics)
- **Top Section:** Date range selector (right-aligned) + refresh button
- **KPI Grid:** 4 cards across (Revenue Attribution, AOV Impact, Conversion Rate, CTR)
- **Charts Section:** 2 side-by-side charts (Recommendation Performance, Trends)
- **Recent Activity:** Data table at bottom showing latest recommendation interactions

#### Use Case Configuration
- **Header:** Use case name + status toggle + save button
- **Tab Navigation:** AI Config | Merchandising Rules | Manual Products
- **AI Config Tab:**
  - Algorithm selection (radio cards with descriptions)
  - Parameter sliders in 2-column grid
  - Real-time preview pane (sticky on scroll)
- **Merchandising Rules Tab:**
  - Add rule button
  - Rule list (cards) with condition builder
  - Global vs. use-case toggle
- **Manual Products Tab:**
  - Search and select products
  - Drag-to-reorder list
  - Product preview cards

#### Product Sync Page
- **Sync Status Card:** Large progress indicator with current/total counts
- **Sync History Table:** Recent syncs with timestamps, status, product counts
- **Manual Sync Button:** Primary action when not syncing

#### Use Cases Overview
- **Create Button:** Top right, primary variant
- **Grid of Cards:** Each use case as card showing:
  - Type badge (Similar, Bought Together, etc.)
  - Enable toggle (top right)
  - Key metrics (impressions, clicks)
  - Edit button
  - 3 cards per row (2 on tablet, 1 on mobile)

---

### E. Interaction Patterns

#### Real-time Updates
- **Optimistic UI:** Immediate toggle response with background sync
- **Loading States:** Skeleton screens for initial page loads, spinners for actions
- **Toast Notifications:** Success/error messages (Polaris `Toast`)

#### Drag and Drop
- **Visual Feedback:** Dragged item follows cursor with elevation shadow
- **Drop Zone Highlighting:** Subtle background color change
- **Reorder Animation:** Smooth position transitions

#### Validation
- **Inline Errors:** Red text below field with icon
- **Form-Level Errors:** Banner at top of page listing all issues
- **Success Confirmation:** Green toast notification

---

### F. Responsive Behavior

**Breakpoints:**
- Mobile: < 768px (single column, collapsed navigation)
- Tablet: 768px - 1024px (2-column grids, visible navigation)
- Desktop: > 1024px (full layout with sidebar)

**Mobile Adaptations:**
- Stack all multi-column layouts to single column
- Data tables scroll horizontally with sticky first column
- Navigation becomes bottom sheet or hamburger menu
- Reduce padding to `--p-space-3`
- KPI cards stack vertically

---

## Images
**No images required.** This is an admin dashboard application focused on data, configuration, and analytics. All visual interest comes from data visualization, iconography, and Polaris component styling.