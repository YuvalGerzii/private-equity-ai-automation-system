/**
 * Brain Integration Test Script
 * Comprehensive testing of the AI brain system components
 */

const brainIntegration = require('./src/services/brainIntegration');
const logger = require('./src/utils/logger');

class BrainIntegrationTester {
  constructor() {
    this.testResults = {
      passed: 0,
      failed: 0,
      total: 0,
      details: []
    };
  }

  /**
   * Run a single test
   */
  async runTest(testName, testFunction) {
    this.testResults.total++;
    console.log(`\n🧪 Running test: ${testName}`);
    
    try {
      const startTime = Date.now();
      const result = await testFunction();
      const duration = Date.now() - startTime;
      
      if (result.success) {
        this.testResults.passed++;
        console.log(`✅ PASSED: ${testName} (${duration}ms)`);
        if (result.details) {
          console.log(`   Details: ${result.details}`);
        }
      } else {
        this.testResults.failed++;
        console.log(`❌ FAILED: ${testName} (${duration}ms)`);
        console.log(`   Error: ${result.error}`);
      }
      
      this.testResults.details.push({
        name: testName,
        success: result.success,
        duration,
        error: result.error,
        details: result.details
      });
      
    } catch (error) {
      this.testResults.failed++;
      console.log(`❌ FAILED: ${testName}`);
      console.log(`   Exception: ${error.message}`);
      
      this.testResults.details.push({
        name: testName,
        success: false,
        duration: 0,
        error: error.message
      });
    }
  }

  /**
   * Test brain integration initialization
   */
  async testBrainInitialization() {
    return new Promise(async (resolve) => {
      try {
        const initialized = await brainIntegration.initialize();
        
        if (initialized) {
          const stats = await brainIntegration.getSystemStats();
          resolve({
            success: true,
            details: `Components initialized: ${Object.keys(stats.brainIntegration.components).filter(k => stats.brainIntegration.components[k]).length}/5`
          });
        } else {
          resolve({
            success: false,
            error: 'Brain integration failed to initialize'
          });
        }
      } catch (error) {
        resolve({
          success: false,
          error: error.message
        });
      }
    });
  }

  /**
   * Test system health check
   */
  async testSystemHealthCheck() {
    return new Promise(async (resolve) => {
      try {
        const health = await brainIntegration.healthCheck();
        
        if (health.overall === 'healthy') {
          resolve({
            success: true,
            details: `All components healthy`
          });
        } else {
          resolve({
            success: false,
            error: `System health: ${health.overall}, Issues: ${health.issues?.join(', ')}`
          });
        }
      } catch (error) {
        resolve({
          success: false,
          error: error.message
        });
      }
    });
  }

  /**
   * Test knowledge base functionality
   */
  async testKnowledgeBase() {
    return new Promise(async (resolve) => {
      try {
        // Add a test document
        const testDoc = {
          id: `test_doc_${Date.now()}`,
          text: `Test financial analysis document for Apple Inc. 
                 Revenue: $394.3 billion
                 Net Income: $99.8 billion
                 Total Assets: $352.8 billion
                 This is a test document for the knowledge base system.`,
          metadata: {
            company: 'Apple Inc',
            type: 'test_document',
            source: 'integration_test',
            date: new Date().toISOString()
          }
        };

        const added = await brainIntegration.addKnowledge(testDoc);
        
        if (!added) {
          resolve({
            success: false,
            error: 'Failed to add test document to knowledge base'
          });
          return;
        }

        // Wait a moment for indexing
        await new Promise(resolve => setTimeout(resolve, 1000));

        // Search for the document
        const searchResults = await brainIntegration.searchKnowledge('Apple financial analysis');
        
        if (searchResults.documents && searchResults.documents.length > 0) {
          resolve({
            success: true,
            details: `Added and retrieved document. Found ${searchResults.documents.length} results with avg similarity ${(searchResults.avgSimilarity * 100).toFixed(1)}%`
          });
        } else {
          resolve({
            success: false,
            error: 'Document added but not found in search results'
          });
        }
      } catch (error) {
        resolve({
          success: false,
          error: error.message
        });
      }
    });
  }

  /**
   * Test intelligent financial analysis
   */
  async testIntelligentAnalysis() {
    return new Promise(async (resolve) => {
      try {
        const testFinancialData = {
          companyName: 'Test Corporation',
          totalRevenue: 1000000000, // $1B
          ebitda: 200000000,        // $200M
          netIncome: 150000000,     // $150M
          totalAssets: 2000000000,  // $2B
          totalDebt: 500000000,     // $500M
          shareholdersEquity: 1200000000, // $1.2B
          operatingCashFlow: 180000000,   // $180M
          freeCashFlow: 120000000,        // $120M
          industry: 'Technology',
          marketCap: 5000000000     // $5B
        };

        const analysisResult = await brainIntegration.performIntelligentAnalysis(
          testFinancialData,
          'general',
          { companyName: 'Test Corporation' }
        );

        if (analysisResult && typeof analysisResult === 'string' && analysisResult.length > 100) {
          // Check if the analysis contains key financial terms
          const hasFinancialTerms = [
            'revenue', 'ebitda', 'analysis', 'financial', 'company'
          ].some(term => analysisResult.toLowerCase().includes(term));

          if (hasFinancialTerms) {
            resolve({
              success: true,
              details: `Generated ${analysisResult.length} character analysis with financial insights`
            });
          } else {
            resolve({
              success: false,
              error: 'Analysis generated but lacks financial content'
            });
          }
        } else {
          resolve({
            success: false,
            error: `Analysis failed or too short: ${analysisResult}`
          });
        }
      } catch (error) {
        resolve({
          success: false,
          error: error.message
        });
      }
    });
  }

  /**
   * Test scraped data processing
   */
  async testScrapedDataProcessing() {
    return new Promise(async (resolve) => {
      try {
        const mockScrapedData = [
          {
            company_name: 'Microsoft Corporation',
            symbol: 'MSFT',
            totalRevenue: 211915000000,
            netIncome: 72361000000,
            totalAssets: 411976000000,
            exchange: 'NASDAQ',
            sector: 'Technology',
            industry: 'Software',
            marketCap: 2800000000000,
            scraped_at: new Date().toISOString()
          },
          {
            company_name: 'Amazon.com Inc',
            symbol: 'AMZN',
            totalRevenue: 513983000000,
            netIncome: -2722000000,
            totalAssets: 420549000000,
            exchange: 'NASDAQ',
            sector: 'Consumer Discretionary',
            industry: 'E-commerce',
            marketCap: 1500000000000,
            scraped_at: new Date().toISOString()
          }
        ];

        const processed = await brainIntegration.processScrapedData(mockScrapedData, 'TEST_SOURCE');
        
        if (processed) {
          // Wait for processing
          await new Promise(resolve => setTimeout(resolve, 2000));
          
          // Search for one of the companies
          const searchResults = await brainIntegration.searchKnowledge('Microsoft financial data');
          
          resolve({
            success: true,
            details: `Processed ${mockScrapedData.length} companies, search found ${searchResults.documents?.length || 0} results`
          });
        } else {
          resolve({
            success: false,
            error: 'Failed to process scraped data'
          });
        }
      } catch (error) {
        resolve({
          success: false,
          error: error.message
        });
      }
    });
  }

  /**
   * Test system statistics
   */
  async testSystemStatistics() {
    return new Promise(async (resolve) => {
      try {
        const stats = await brainIntegration.getSystemStats();
        
        if (stats && stats.brainIntegration && stats.vectorStore && stats.localLLM) {
          const componentsActive = Object.values(stats.brainIntegration.components).filter(Boolean).length;
          
          resolve({
            success: true,
            details: `Retrieved stats for ${componentsActive} active components, uptime: ${Math.round(stats.brainIntegration.uptime / 1000)}s`
          });
        } else {
          resolve({
            success: false,
            error: 'Incomplete system statistics returned'
          });
        }
      } catch (error) {
        resolve({
          success: false,
          error: error.message
        });
      }
    });
  }

  /**
   * Test RAG context retrieval
   */
  async testRAGContextRetrieval() {
    return new Promise(async (resolve) => {
      try {
        // First add some context documents
        const contextDocs = [
          {
            id: `rag_test_1_${Date.now()}`,
            text: 'DCF analysis shows strong cash flow generation with 15% WACC and 3% terminal growth rate.',
            metadata: { type: 'dcf_analysis', company: 'Test Corp' }
          },
          {
            id: `rag_test_2_${Date.now()}`,
            text: 'LBO analysis indicates 25% IRR with 6x leverage and 5-year hold period.',
            metadata: { type: 'lbo_analysis', company: 'Test Corp' }
          }
        ];

        // Add documents
        for (const doc of contextDocs) {
          await brainIntegration.addKnowledge(doc);
        }

        // Wait for indexing
        await new Promise(resolve => setTimeout(resolve, 1500));

        // Test context retrieval
        const contextResults = await brainIntegration.searchKnowledge('DCF cash flow analysis');
        
        if (contextResults.documents && contextResults.documents.length > 0) {
          resolve({
            success: true,
            details: `Retrieved ${contextResults.documents.length} context documents with ${(contextResults.avgSimilarity * 100).toFixed(1)}% avg similarity`
          });
        } else {
          resolve({
            success: false,
            error: 'No context documents retrieved'
          });
        }
      } catch (error) {
        resolve({
          success: false,
          error: error.message
        });
      }
    });
  }

  /**
   * Run all tests
   */
  async runAllTests() {
    console.log('🚀 Starting Brain Integration Test Suite');
    console.log('=====================================');

    // Test 1: Brain Initialization
    await this.runTest('Brain Integration Initialization', () => this.testBrainInitialization());

    // Test 2: System Health Check
    await this.runTest('System Health Check', () => this.testSystemHealthCheck());

    // Test 3: Knowledge Base
    await this.runTest('Knowledge Base Functionality', () => this.testKnowledgeBase());

    // Test 4: RAG Context Retrieval
    await this.runTest('RAG Context Retrieval', () => this.testRAGContextRetrieval());

    // Test 5: Intelligent Analysis
    await this.runTest('Intelligent Financial Analysis', () => this.testIntelligentAnalysis());

    // Test 6: Scraped Data Processing
    await this.runTest('Scraped Data Processing', () => this.testScrapedDataProcessing());

    // Test 7: System Statistics
    await this.runTest('System Statistics', () => this.testSystemStatistics());

    // Print results
    this.printResults();

    // Cleanup
    await this.cleanup();
  }

  /**
   * Print test results
   */
  printResults() {
    console.log('\n📊 Test Results Summary');
    console.log('=======================');
    console.log(`Total Tests: ${this.testResults.total}`);
    console.log(`Passed: ${this.testResults.passed} ✅`);
    console.log(`Failed: ${this.testResults.failed} ❌`);
    console.log(`Success Rate: ${((this.testResults.passed / this.testResults.total) * 100).toFixed(1)}%`);

    if (this.testResults.failed > 0) {
      console.log('\n❌ Failed Tests:');
      this.testResults.details
        .filter(test => !test.success)
        .forEach(test => {
          console.log(`   - ${test.name}: ${test.error}`);
        });
    }

    console.log('\n📈 Performance Summary:');
    const avgDuration = this.testResults.details.reduce((sum, test) => sum + test.duration, 0) / this.testResults.total;
    console.log(`   Average Test Duration: ${avgDuration.toFixed(0)}ms`);
    
    const slowestTest = this.testResults.details.reduce((prev, current) => 
      (prev.duration > current.duration) ? prev : current
    );
    console.log(`   Slowest Test: ${slowestTest.name} (${slowestTest.duration}ms)`);

    if (this.testResults.passed === this.testResults.total) {
      console.log('\n🎉 All tests passed! The AI Brain system is working correctly.');
    } else {
      console.log('\n⚠️  Some tests failed. Please check the setup and configuration.');
    }
  }

  /**
   * Cleanup after tests
   */
  async cleanup() {
    try {
      console.log('\n🧹 Cleaning up test resources...');
      // The brain integration will handle cleanup automatically
      await brainIntegration.shutdown();
      console.log('✅ Cleanup completed');
    } catch (error) {
      console.log(`⚠️  Cleanup warning: ${error.message}`);
    }
  }
}

// Run the tests if this script is executed directly
if (require.main === module) {
  const tester = new BrainIntegrationTester();
  
  tester.runAllTests()
    .then(() => {
      process.exit(tester.testResults.failed > 0 ? 1 : 0);
    })
    .catch((error) => {
      console.error('❌ Test suite failed:', error);
      process.exit(1);
    });
}

module.exports = BrainIntegrationTester;
