// Backend Integration Test
// Tests the connection between frontend and backend services

async function testBackendIntegration() {
  console.log('🧪 Testing Backend-Frontend Integration\n');

  const BACKEND_URL = 'http://localhost:8000';
  
  const tests = [
    {
      name: 'Health Check',
      endpoint: '/api/health/all',
      expectedKeys: ['status', 'models', 'uptime']
    },
    {
      name: 'PrizePicks Props',
      endpoint: '/api/prizepicks/props',
      expectedKeys: ['player', 'sport', 'confidence']
    },
    {
      name: 'Comprehensive Projections',
      endpoint: '/api/prizepicks/comprehensive-projections',
      expectedKeys: ['projections', 'service_stats', 'timestamp']
    }
  ];

  let passedTests = 0;
  
  for (const test of tests) {
    try {
      console.log(`Testing ${test.name}...`);
      
      const response = await fetch(`${BACKEND_URL}${test.endpoint}`);
      
      if (!response.ok) {
        throw new Error(`HTTP ${response.status}: ${response.statusText}`);
      }
      
      const data = await response.json();
      
      // Check if expected keys exist
      const hasExpectedKeys = test.expectedKeys.some(key => 
        JSON.stringify(data).includes(key)
      );
      
      if (hasExpectedKeys) {
        console.log(`✅ ${test.name}: PASS`);
        if (test.name === 'PrizePicks Props' && Array.isArray(data)) {
          console.log(`   📊 Props available: ${data.length}`);
          if (data.length > 0) {
            const sample = data[0];
            console.log(`   🏀 Sample: ${sample.player} - ${sample.prop_type} (${sample.confidence}% confidence)`);
          }
        }
        passedTests++;
      } else {
        console.log(`❌ ${test.name}: FAIL - Missing expected data structure`);
      }
      
    } catch (error) {
      console.log(`❌ ${test.name}: FAIL - ${error.message}`);
    }
    
    console.log('');
  }
  
  console.log(`\n🎯 Integration Test Results: ${passedTests}/${tests.length} tests passed`);
  
  if (passedTests === tests.length) {
    console.log('✅ Backend-Frontend integration is WORKING!');
    console.log('\n📋 Next Steps:');
    console.log('1. Start frontend: cd frontend && npm run dev');
    console.log('2. Open browser: http://localhost:3000');
    console.log('3. Test Money Maker Pro, PrizePicks Pro, PropOllama components');
  } else {
    console.log('❌ Some integration tests failed. Check backend status.');
  }
}

// Run the test
testBackendIntegration().catch(console.error); 