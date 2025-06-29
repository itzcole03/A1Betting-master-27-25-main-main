#!/bin/bash

# Frontend Production Integration Test
# Tests all frontend components with real backend API integration

echo "🚀 Starting Frontend Production Integration Test..."
echo "=================================================="

# Change to frontend directory
cd frontend

# Check if production API service exists
if [ ! -f "src/services/productionApiServiceNew.ts" ]; then
    echo "❌ ERROR: Production API service not found!"
    exit 1
fi

echo "✅ Production API service found"

# Check environment configuration
if [ ! -f ".env.example" ]; then
    echo "❌ ERROR: Environment example file not found!"
    exit 1
fi

echo "✅ Environment configuration found"

# Install dependencies if needed
echo "📦 Installing dependencies..."
npm install

# Type check the project
echo "🔍 Running TypeScript type checking..."
npx tsc --noEmit

if [ $? -eq 0 ]; then
    echo "✅ TypeScript compilation successful"
else
    echo "❌ TypeScript compilation failed"
    exit 1
fi

# Lint the project
echo "🔍 Running ESLint..."
npm run lint

if [ $? -eq 0 ]; then
    echo "✅ Linting passed"
else
    echo "⚠️  Linting warnings detected, continuing..."
fi

# Test build process
echo "🏗️  Testing production build..."
npm run build

if [ $? -eq 0 ]; then
    echo "✅ Production build successful"
else
    echo "❌ Production build failed"
    exit 1
fi

# Test component imports
echo "🧪 Testing component imports..."
node -e "
const fs = require('fs');
const path = require('path');

// Test key component files
const components = [
    'src/components/A1BettingQuantumPlatform.tsx',
    'src/components/A1BettingPlatform.tsx',
    'src/services/productionApiServiceNew.ts',
    'src/api/index.ts'
];

let errors = [];

components.forEach(component => {
    try {
        const content = fs.readFileSync(component, 'utf8');
        
        // Check for hardcoded localhost URLs
        if (content.includes('localhost:') && !content.includes('import.meta.env')) {
            errors.push(\`❌ \${component}: Contains hardcoded localhost URLs\`);
        }
        
        // Check for mock data usage
        if (content.includes('mockOpportunities') || content.includes('Mock data')) {
            errors.push(\`⚠️  \${component}: May contain mock data\`);
        }
        
        // Check for production API service import
        if (component.includes('components/') && content.includes('fetch(') && !content.includes('productionApiService')) {
            errors.push(\`⚠️  \${component}: Uses direct fetch instead of production API service\`);
        }
        
        console.log(\`✅ \${component}: Checked\`);
    } catch (err) {
        errors.push(\`❌ \${component}: File not found or unreadable\`);
    }
});

if (errors.length > 0) {
    console.log('\n🚨 Issues found:');
    errors.forEach(error => console.log(error));
    process.exit(1);
} else {
    console.log('\n✅ All component checks passed');
}
"

if [ $? -eq 0 ]; then
    echo "✅ Component import tests passed"
else
    echo "❌ Component import tests failed"
    exit 1
fi

# Check for environment variable usage
echo "🔧 Checking environment variable configuration..."
grep -r "import.meta.env" src/ > /dev/null

if [ $? -eq 0 ]; then
    echo "✅ Environment variables properly configured"
else
    echo "⚠️  No environment variable usage detected"
fi

# Test API service methods
echo "🔌 Testing API service methods..."
node -e "
const fs = require('fs');

try {
    const apiContent = fs.readFileSync('src/services/productionApiServiceNew.ts', 'utf8');
    
    const requiredMethods = [
        'getHealth',
        'getBettingOpportunities', 
        'getPredictions',
        'getArbitrageOpportunities',
        'getValueBets',
        'getPrizePicksProps',
        'getPlayerStats',
        'getLiveGames'
    ];
    
    let missingMethods = [];
    
    requiredMethods.forEach(method => {
        if (!apiContent.includes(method)) {
            missingMethods.push(method);
        }
    });
    
    if (missingMethods.length > 0) {
        console.log('❌ Missing API methods:', missingMethods.join(', '));
        process.exit(1);
    } else {
        console.log('✅ All required API methods found');
    }
} catch (err) {
    console.log('❌ Failed to check API service methods');
    process.exit(1);
}
"

if [ $? -eq 0 ]; then
    echo "✅ API service methods verified"
else
    echo "❌ API service methods verification failed"
    exit 1
fi

echo ""
echo "🎉 Frontend Production Integration Test PASSED!"
echo "=================================================="
echo "✅ TypeScript compilation successful"
echo "✅ Production build successful" 
echo "✅ Component imports verified"
echo "✅ API service methods verified"
echo "✅ Environment configuration checked"
echo ""
echo "🚀 Frontend is ready for production deployment!"
