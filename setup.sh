#!/bin/bash

# Shopify Product Recommendations Plugin - Setup Script
# This script helps set up the development environment

set -e

echo "🚀 Setting up Shopify Product Recommendations Plugin..."
echo ""

# Check Node.js version
echo "📦 Checking Node.js version..."
NODE_VERSION=$(node -v | cut -d'v' -f2 | cut -d'.' -f1)
if [ "$NODE_VERSION" -lt 18 ]; then
    echo "❌ Error: Node.js 18 or higher is required. Current version: $(node -v)"
    exit 1
fi
echo "✅ Node.js version: $(node -v)"
echo ""

# Install dependencies
echo "📥 Installing dependencies..."
npm install
echo "✅ Dependencies installed"
echo ""

# Create .env file if it doesn't exist
if [ ! -f .env ]; then
    echo "⚙️  Creating .env file from .env.example..."
    cp .env.example .env
    echo "✅ .env file created"
    echo "⚠️  Please update .env with your configuration"
else
    echo "⚙️  .env file already exists"
fi
echo ""

# Type check
echo "🔍 Running type check..."
npm run check
echo "✅ Type check passed"
echo ""

# Try to build
echo "🏗️  Building the project..."
npm run build
echo "✅ Build successful"
echo ""

echo "✨ Setup complete!"
echo ""
echo "📖 Next steps:"
echo "   1. Update your .env file with the correct configuration"
echo "   2. Start the development server: npm run dev"
echo "   3. Open http://localhost:5000 in your browser"
echo ""
echo "📚 For more information, see README.md"
echo ""
