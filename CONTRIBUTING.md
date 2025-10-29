# Contributing to Shopify Product Recommendations Plugin

Thank you for your interest in contributing to this project! This document provides guidelines and instructions for contributing.

## 🚀 Getting Started

### Prerequisites

- Node.js 18 or higher
- npm or yarn
- Git
- Basic knowledge of React, TypeScript, and Express.js

### Setup Development Environment

1. Fork the repository on GitHub
2. Clone your fork locally:
   ```bash
   git clone https://github.com/YOUR_USERNAME/recommendate_plugin.git
   cd recommendate_plugin
   ```

3. Add the upstream repository:
   ```bash
   git remote add upstream https://github.com/decisionstatus/recommendate_plugin.git
   ```

4. Install dependencies:
   ```bash
   npm install
   ```

5. Create your `.env` file:
   ```bash
   cp .env.example .env
   ```

6. Start the development server:
   ```bash
   npm run dev
   ```

## 📝 Development Workflow

### 1. Create a Branch

Always create a new branch for your work:

```bash
git checkout -b feature/your-feature-name
# or
git checkout -b fix/your-bug-fix
```

Branch naming conventions:
- `feature/` - New features
- `fix/` - Bug fixes
- `docs/` - Documentation changes
- `refactor/` - Code refactoring
- `test/` - Adding tests
- `chore/` - Maintenance tasks

### 2. Make Your Changes

- Write clean, readable code
- Follow the existing code style
- Add comments for complex logic
- Update documentation if needed

### 3. Test Your Changes

Before committing:

```bash
# Type check
npm run check

# Build to ensure no build errors
npm run build

# Test the application manually
npm run dev
```

### 4. Commit Your Changes

Write clear, descriptive commit messages:

```bash
git add .
git commit -m "feat: add new recommendation algorithm"
```

Commit message format:
- `feat:` - New feature
- `fix:` - Bug fix
- `docs:` - Documentation changes
- `style:` - Code style changes (formatting, etc.)
- `refactor:` - Code refactoring
- `test:` - Adding or updating tests
- `chore:` - Maintenance tasks

### 5. Push and Create Pull Request

```bash
git push origin feature/your-feature-name
```

Then create a Pull Request on GitHub:
- Use a clear, descriptive title
- Describe what changes you made and why
- Reference any related issues
- Add screenshots for UI changes

## 🎨 Code Style Guidelines

### TypeScript

- Use TypeScript for all new code
- Define types/interfaces for all props and return values
- Use Zod schemas for runtime validation
- Avoid `any` types unless absolutely necessary

### React Components

- Use functional components with hooks
- Keep components focused and single-responsibility
- Extract reusable logic into custom hooks
- Use Shopify Polaris components whenever possible

Example:
```tsx
import { Card, Text, Button } from '@shopify/polaris';

interface MyComponentProps {
  title: string;
  onAction: () => void;
}

export function MyComponent({ title, onAction }: MyComponentProps) {
  return (
    <Card>
      <Text variant="headingMd">{title}</Text>
      <Button onClick={onAction}>Action</Button>
    </Card>
  );
}
```

### File Organization

```
client/src/
├── components/         # Reusable UI components
├── pages/             # Page-level components
├── hooks/             # Custom React hooks
├── lib/               # Utility functions
└── types/             # TypeScript type definitions
```

### Naming Conventions

- **Components**: PascalCase (e.g., `UseCaseCard.tsx`)
- **Hooks**: camelCase with `use` prefix (e.g., `useProducts.ts`)
- **Utilities**: camelCase (e.g., `formatPrice.ts`)
- **Constants**: UPPER_SNAKE_CASE (e.g., `API_BASE_URL`)

## 🧪 Testing

### Type Checking

Always run type checking before committing:

```bash
npm run check
```

### Manual Testing Checklist

When making changes, test:

- [ ] UI renders correctly in different screen sizes
- [ ] Forms validate properly
- [ ] API calls handle errors gracefully
- [ ] Loading states display correctly
- [ ] Data updates reflect in the UI
- [ ] No console errors or warnings

## 📚 Documentation

### Code Documentation

- Add JSDoc comments for complex functions
- Document props for React components
- Explain non-obvious logic with inline comments

Example:
```tsx
/**
 * Formats a price value for display
 * @param price - The price value in cents
 * @param currency - The currency code (default: USD)
 * @returns Formatted price string (e.g., "$10.99")
 */
export function formatPrice(price: number, currency = 'USD'): string {
  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency,
  }).format(price / 100);
}
```

### README Updates

Update the README.md if you:
- Add new features
- Change configuration options
- Update dependencies
- Modify setup instructions

## 🐛 Bug Reports

When reporting bugs, include:

1. **Description**: Clear description of the issue
2. **Steps to Reproduce**: Detailed steps to reproduce the bug
3. **Expected Behavior**: What should happen
4. **Actual Behavior**: What actually happens
5. **Environment**: Browser, OS, Node version
6. **Screenshots**: If applicable
7. **Logs**: Any error messages or console logs

## 💡 Feature Requests

When suggesting features:

1. **Use Case**: Explain why this feature is needed
2. **Description**: Detailed description of the feature
3. **Examples**: Similar implementations or mockups
4. **Alternatives**: Other solutions you've considered

## 🔍 Code Review Process

All contributions go through code review:

1. Maintainers will review your PR
2. Address any feedback or requested changes
3. Once approved, your PR will be merged
4. Your contribution will be credited

### What Reviewers Look For

- Code quality and readability
- Adherence to project conventions
- Proper error handling
- Performance considerations
- Security best practices
- Documentation completeness

## 📋 Pull Request Checklist

Before submitting your PR, ensure:

- [ ] Code follows the project style guidelines
- [ ] TypeScript compilation passes (`npm run check`)
- [ ] Build succeeds (`npm run build`)
- [ ] Manual testing completed
- [ ] Documentation updated (if needed)
- [ ] Commit messages are clear and descriptive
- [ ] PR description explains the changes
- [ ] Screenshots included for UI changes

## 🤝 Community Guidelines

- Be respectful and inclusive
- Welcome newcomers and help them learn
- Provide constructive feedback
- Focus on the code, not the person
- Assume good intentions

## 📧 Questions?

If you have questions:

1. Check existing issues and discussions
2. Read the documentation
3. Open a GitHub issue with the `question` label
4. Tag maintainers if needed

## 🙏 Recognition

Contributors will be:
- Listed in the project's contributors
- Credited in release notes
- Thanked in the community

Thank you for contributing to make this project better!

## 📄 License

By contributing, you agree that your contributions will be licensed under the same license as the project (MIT License).
