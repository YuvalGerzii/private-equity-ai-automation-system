# Private Equity Automation System with AI Brain

A comprehensive financial analysis platform with intelligent AI capabilities, featuring local LLM integration, RAG (Retrieval-Augmented Generation), and advanced valuation engines.

## 🧠 AI Brain Features

- **Local LLM Integration**: Offline AI using Llama 3.1 & Mistral models via Ollama
- **RAG System**: Context-aware analysis using ChromaDB vector database
- **MCP Server**: Real-time Model Context Protocol for live AI communication
- **Machine Learning**: Continuous learning from financial data patterns
- **Knowledge Base**: Intelligent document storage and retrieval system

## 🚀 Quick Start

### Prerequisites

1. **Node.js** (v20.12.1 or higher)
2. **Ollama** for local LLM hosting
3. **ChromaDB** for vector storage
4. **Python 3.8+** (for ChromaDB)

### Installation

1. **Clone and install dependencies:**
```bash
git clone <repository-url>
cd private-equity-automation-system
npm install --legacy-peer-deps
```

2. **Install Ollama:**
```bash
# macOS
brew install ollama

# Linux
curl -fsSL https://ollama.ai/install.sh | sh

# Windows: Download from https://ollama.ai/download
```

3. **Install ChromaDB:**
```bash
pip install chromadb
```

4. **Pull AI models:**
```bash
ollama serve  # Start Ollama server
ollama pull llama3.1:8b
ollama pull mistral:7b
```

5. **Set up environment:**
```bash
cp .env.example .env.local
# Edit .env.local with your configuration
```

6. **Initialize database:**
```bash
npm run setup-db
```

### Running the System

1. **Start required services:**
```bash
# Terminal 1: Start Ollama
ollama serve

# Terminal 2: Start ChromaDB
chroma run --host localhost --port 8000

# Terminal 3: Start the application
npm run dev
```

2. **Access the dashboard:**
Open http://localhost:8000 in your browser

## 📁 Project Structure

```
private-equity-automation-system/
├── src/
│   ├── api/                    # Next.js API routes
│   │   ├── analyze.js         # AI analysis endpoint
│   │   ├── scrape.js          # Data scraping endpoint
│   │   ├── valuation.js       # Valuation analysis
│   │   └── dealStructureOptimization.js
│   ├── app/                   # Next.js app directory
│   │   ├── layout.tsx         # App layout
│   │   ├── page.tsx           # Main dashboard
│   │   └── globals.css        # Global styles
│   ├── config/
│   │   └── analysisConfig.js  # AI and analysis configuration
│   ├── database/
│   │   └── setup.js           # SQLite database setup
│   ├── services/              # Core business logic
│   │   ├── brainIntegration.js    # Main AI orchestrator
│   │   ├── ragAgent.js            # RAG implementation
│   │   ├── localLLMIntegration.js # Ollama integration
│   │   ├── vectorStore.js         # ChromaDB integration
│   │   ├── mcpServer.js           # MCP server
│   │   ├── aiIntegration.js       # AI service coordinator
│   │   ├── valuationEngine.js     # Financial valuation
│   │   ├── financialAnalysis.js   # Financial calculations
│   │   └── scrapers/              # Data scrapers
│   └── utils/
│       └── logger.js          # Logging utility
├── test_brain_integration.js  # Comprehensive test suite
├── setup-ai-brain.md         # Detailed setup guide
└── README.md                 # This file
```

## 🔧 Configuration

### Environment Variables (.env.local)

```env
# Ollama Configuration
OLLAMA_HOST=http://localhost:11434
DEFAULT_LLM_MODEL=llama3.1:8b

# ChromaDB Configuration
CHROMADB_URL=http://localhost:8000

# MCP Server Configuration
MCP_PORT=8080

# Optional: Backup API Keys
OPENROUTER_API_KEY=your_key_here
```

### AI Configuration (src/config/analysisConfig.js)

```javascript
module.exports = {
  aiSettings: {
    useLocalAI: true,
    enableMCPServer: true,
    localLLM: {
      defaultModel: 'llama3.1:8b',
      temperature: 0.1,
      maxTokens: 2048
    },
    vectorStore: {
      type: 'chromadb',
      similarityThreshold: 0.3
    },
    ragSettings: {
      maxRetrievedDocs: 5,
      contextWindow: 4000
    }
  }
}
```

## 🧪 Testing

### Run Full Test Suite
```bash
node test_brain_integration.js
```

### Test Individual Components
```bash
# Test Local LLM
node -e "require('./src/services/localLLMIntegration').testModel().then(console.log)"

# Test Vector Store
node -e "require('./src/services/vectorStore').getStats().then(console.log)"

# Test RAG Agent
node -e "require('./src/services/ragAgent').testRAG().then(console.log)"
```

### Health Check
```bash
node -e "require('./src/services/brainIntegration').healthCheck().then(console.log)"
```

## 📊 Core Features

### 1. Financial Analysis Engines

- **DCF Analysis**: Discounted Cash Flow with enhanced validation
- **LBO Modeling**: Leveraged Buyout analysis with covenant tracking
- **Comparable Analysis**: Trading multiples and peer comparison
- **Deal Optimization**: M&A structure optimization

### 2. Data Sources

- **TASE Scraper**: Tel Aviv Stock Exchange data
- **Yahoo Finance**: Market data and screening
- **File Upload**: PDF and Excel financial statements
- **Manual Input**: Direct data entry

### 3. AI Brain System

- **Local Processing**: No external API dependencies
- **RAG Enhancement**: Context-aware responses
- **Continuous Learning**: Improves from usage patterns
- **Real-time Communication**: MCP server for live updates

## 🔄 Development Workflow

### Adding New Features

1. **Create feature branch:**
```bash
git checkout -b feature/new-analysis-type
```

2. **Add service logic:**
```javascript
// src/services/newAnalysisEngine.js
class NewAnalysisEngine {
  async performAnalysis(data) {
    // Implementation
  }
}
```

3. **Add API endpoint:**
```javascript
// src/api/newAnalysis.js
export default async function handler(req, res) {
  // API implementation
}
```

4. **Update UI:**
```tsx
// src/app/page.tsx
// Add new analysis button and results display
```

5. **Add tests:**
```javascript
// test_new_analysis.js
// Comprehensive testing
```

### Extending AI Capabilities

1. **Add new model support:**
```javascript
// src/services/localLLMIntegration.js
this.availableModels['new-model:version'] = {
  name: 'New Model',
  description: 'Model description'
}
```

2. **Enhance RAG context:**
```javascript
// src/services/ragAgent.js
async enhanceContext(query, options) {
  // Custom context enhancement
}
```

3. **Add MCP commands:**
```javascript
// src/services/mcpServer.js
case 'new_command':
  await this.handleNewCommand(clientId, message);
  break;
```

## 🛠️ Troubleshooting

### Common Issues

1. **Ollama Connection Failed**
```bash
# Check if Ollama is running
curl http://localhost:11434/api/tags

# Restart Ollama
ollama serve
```

2. **ChromaDB Connection Failed**
```bash
# Start ChromaDB
chroma run --host localhost --port 8000

# Or use Docker
docker run -p 8000:8000 chromadb/chroma
```

3. **Models Not Loading**
```bash
# Check available models
ollama list

# Pull missing models
ollama pull llama3.1:8b
```

4. **Memory Issues**
```bash
# Use smaller models
export DEFAULT_LLM_MODEL=mistral:7b

# Or increase system memory
```

### Debug Mode

Enable detailed logging:
```javascript
// src/utils/logger.js
const logger = new Logger();
logger.setLevel('debug');
```

## 📈 Performance Optimization

### For Speed
- Use `llama3.1:8b` or `mistral:7b` models
- Enable context caching in RAG settings
- Reduce `maxRetrievedDocs` for faster retrieval

### For Quality
- Use `llama3.1:70b` model (requires 32GB+ RAM)
- Increase `contextWindow` size
- Lower `similarityThreshold` for more context

### For Memory Efficiency
- Use smaller models
- Enable periodic cleanup
- Reduce vector store cache size

## 🔒 Security

- **Local Processing**: All data stays on your machine
- **No External APIs**: Core functionality works offline
- **Encrypted Storage**: Database encryption available
- **Access Control**: MCP server authentication
- **Audit Logging**: Complete analysis trail

## 🤝 Contributing

1. **Fork the repository**
2. **Create feature branch**
3. **Add comprehensive tests**
4. **Update documentation**
5. **Submit pull request**

### Code Style

- Use ESLint configuration
- Follow existing patterns
- Add JSDoc comments
- Include error handling

### Testing Requirements

- Unit tests for new services
- Integration tests for API endpoints
- End-to-end tests for user workflows
- Performance benchmarks

## 📚 API Documentation

### Analysis Endpoints

```javascript
// POST /api/analyze
{
  "data": { /* financial data */ },
  "analysisType": "dcf|lbo|comparable|general"
}

// POST /api/valuation
{
  "data": { /* company data */ },
  "method": "auto|dcf|lbo|comparable"
}

// POST /api/scrape
{
  "source": "tase|yahoo",
  "symbols": ["AAPL", "MSFT"]
}
```

### MCP WebSocket API

```javascript
// Connect to ws://localhost:8080
{
  "type": "analysis_request",
  "data": { /* financial data */ }
}

{
  "type": "context_request",
  "data": { "query": "DCF analysis" }
}
```

## 🗺️ Roadmap

### Short Term (1-3 months)
- [ ] Enhanced model fine-tuning
- [ ] Advanced visualization dashboard
- [ ] Real-time market data integration
- [ ] Mobile responsive design

### Medium Term (3-6 months)
- [ ] Multi-language support
- [ ] Advanced ML algorithms
- [ ] Cloud deployment options
- [ ] API rate limiting

### Long Term (6+ months)
- [ ] Distributed processing
- [ ] Advanced security features
- [ ] Third-party integrations
- [ ] Enterprise features

## 📄 License

This project is licensed under the MIT License - see the LICENSE file for details.

## 🙋‍♂️ Support

- **Documentation**: Check `setup-ai-brain.md` for detailed setup
- **Issues**: Create GitHub issues for bugs
- **Discussions**: Use GitHub discussions for questions
- **Email**: [Your contact email]

## 🏆 Acknowledgments

- **Ollama**: Local LLM hosting
- **ChromaDB**: Vector database
- **Next.js**: React framework
- **Tailwind CSS**: Styling framework
- **Financial Community**: Domain expertise

---

**Built with ❤️ for the financial analysis community**
