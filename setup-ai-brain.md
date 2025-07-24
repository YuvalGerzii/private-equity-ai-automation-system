# AI Brain Setup Guide

This guide will help you set up the complete local AI "brain" system with RAG capabilities and MCP server integration.

## Prerequisites

### 1. Install Ollama (Local LLM Server)

**On macOS:**
```bash
brew install ollama
```

**On Linux:**
```bash
curl -fsSL https://ollama.ai/install.sh | sh
```

**On Windows:**
Download from https://ollama.ai/download

### 2. Install ChromaDB (Vector Database)

```bash
pip install chromadb
```

Or run ChromaDB in Docker:
```bash
docker run -p 8000:8000 chromadb/chroma
```

### 3. Install Required Models

Start Ollama service:
```bash
ollama serve
```

Pull required models:
```bash
# Llama 3.1 8B (recommended for speed)
ollama pull llama3.1:8b

# Llama 3.1 70B (for high-quality analysis)
ollama pull llama3.1:70b

# Mistral 7B (excellent for structured analysis)
ollama pull mistral:7b

# Mistral Instruct (optimized for instructions)
ollama pull mistral:instruct

# Code Llama (for financial calculations)
ollama pull codellama:13b
```

## Installation Steps

### 1. Install Node.js Dependencies

```bash
npm install
```

### 2. Set Up Environment Variables

Create a `.env.local` file in the project root:

```env
# Ollama Configuration
OLLAMA_HOST=http://localhost:11434
DEFAULT_LLM_MODEL=llama3.1:8b

# ChromaDB Configuration
CHROMADB_URL=http://localhost:8000

# MCP Server Configuration
MCP_PORT=8080

# Optional: Fallback API Keys (for backup)
OPENROUTER_API_KEY=your_openrouter_key_here
```

### 3. Initialize Database

```bash
npm run setup-db
```

### 4. Start Required Services

**Terminal 1 - Start Ollama:**
```bash
ollama serve
```

**Terminal 2 - Start ChromaDB (if not using Docker):**
```bash
chroma run --host localhost --port 8000
```

**Terminal 3 - Start the Application:**
```bash
npm run dev
```

## System Architecture

```
┌─────────────────────────────────────────────────────────────┐
│                    AI Brain System                          │
├─────────────────────────────────────────────────────────────┤
│  ┌─────────────┐  ┌─────────────┐  ┌─────────────┐        │
│  │   Scrapers  │  │ File Upload │  │ Manual Input│        │
│  │   (TASE,    │  │   (PDF,     │  │             │        │
│  │   Yahoo)    │  │   Excel)    │  │             │        │
│  └─────────────┘  └─────────────┘  └─────────────┘        │
│         │                 │                 │              │
│         └─────────────────┼─────────────────┘              │
│                           │                                │
│  ┌─────────────────────────▼─────────────────────────────┐  │
│  │            Brain Integration Service                  │  │
│  │  ┌─────────────┐  ┌─────────────┐  ┌─────────────┐   │  │
│  │  │ Vector Store│  │ Local LLM   │  │ RAG Agent   │   │  │
│  │  │ (ChromaDB)  │  │ (Ollama)    │  │             │   │  │
│  │  └─────────────┘  └─────────────┘  └─────────────┘   │  │
│  │                                                      │  │
│  │  ┌─────────────┐  ┌─────────────┐                   │  │
│  │  │ MCP Server  │  │ SQL Database│                   │  │
│  │  │             │  │ (SQLite)    │                   │  │
│  │  └─────────────┘  └─────────────┘                   │  │
│  └──────────────────────────────────────────────────────┘  │
│                           │                                │
│  ┌─────────────────────────▼─────────────────────────────┐  │
│  │              Analysis Engines                        │  │
│  │  ┌─────────────┐  ┌─────────────┐  ┌─────────────┐   │  │
│  │  │ DCF Engine  │  │ LBO Engine  │  │ Deal Opt    │   │  │
│  │  └─────────────┘  └─────────────┘  └─────────────┘   │  │
│  └──────────────────────────────────────────────────────┘  │
│                           │                                │
│  ┌─────────────────────────▼─────────────────────────────┐  │
│  │                 Dashboard UI                          │  │
│  │        (Next.js with Tailwind CSS)                   │  │
│  └──────────────────────────────────────────────────────┘  │
└─────────────────────────────────────────────────────────────┘
```

## Key Features

### 1. Local AI Processing
- **No external API dependencies** for core functionality
- **Llama 3.1 & Mistral models** for financial analysis
- **Offline operation** with full privacy

### 2. RAG (Retrieval-Augmented Generation)
- **ChromaDB vector store** for semantic search
- **Context-aware analysis** using historical data
- **Intelligent document retrieval** for relevant insights

### 3. MCP (Model Context Protocol) Server
- **Real-time communication** with AI models
- **WebSocket-based** for low-latency interactions
- **Session management** for continuous conversations

### 4. Machine Learning Integration
- **Continuous learning** from analysis patterns
- **Anomaly detection** in financial data
- **Performance optimization** based on usage

### 5. Comprehensive Analysis
- **DCF Analysis** with enhanced validation
- **LBO Modeling** with covenant tracking
- **Deal Structure Optimization**
- **Comparable Company Analysis**

## Testing the System

### 1. Run System Health Check

```bash
node -e "
const brain = require('./src/services/brainIntegration');
brain.healthCheck().then(health => {
  console.log('System Health:', JSON.stringify(health, null, 2));
  process.exit(0);
});
"
```

### 2. Test Individual Components

```bash
# Test Local LLM
node -e "
const llm = require('./src/services/localLLMIntegration');
llm.testModel().then(result => {
  console.log('LLM Test:', result);
  process.exit(0);
});
"

# Test Vector Store
node -e "
const vectorStore = require('./src/services/vectorStore');
vectorStore.getStats().then(stats => {
  console.log('Vector Store Stats:', stats);
  process.exit(0);
});
"

# Test RAG Agent
node -e "
const rag = require('./src/services/ragAgent');
rag.testRAG().then(result => {
  console.log('RAG Test:', result);
  process.exit(0);
});
"
```

### 3. Test Full Integration

```bash
node test_brain_integration.js
```

## Troubleshooting

### Common Issues

1. **Ollama Connection Failed**
   - Ensure Ollama is running: `ollama serve`
   - Check if models are installed: `ollama list`
   - Verify port 11434 is not blocked

2. **ChromaDB Connection Failed**
   - Start ChromaDB: `chroma run --host localhost --port 8000`
   - Or use Docker: `docker run -p 8000:8000 chromadb/chroma`
   - Check port 8000 availability

3. **MCP Server Won't Start**
   - Check if port 8080 is available
   - Look for firewall restrictions
   - Review MCP server logs in console

4. **Models Not Loading**
   - Ensure sufficient RAM (8GB+ recommended for 8B models)
   - Check disk space for model storage
   - Verify model names match configuration

### Performance Optimization

1. **For Better Speed:**
   - Use `llama3.1:8b` or `mistral:7b` models
   - Increase `contextWindow` in configuration
   - Enable `enableContextCaching` in RAG settings

2. **For Better Quality:**
   - Use `llama3.1:70b` model (requires 32GB+ RAM)
   - Increase `maxRetrievedDocs` in RAG configuration
   - Lower `minSimilarityThreshold` for more context

3. **For Memory Efficiency:**
   - Use smaller models like `mistral:7b`
   - Reduce `contextWindow` size
   - Enable periodic cleanup in MCP server

## Monitoring and Maintenance

### 1. System Monitoring

The dashboard provides real-time monitoring of:
- AI Brain component status
- RAG context usage and metrics
- Knowledge base growth
- Analysis performance statistics

### 2. Knowledge Base Management

- **Automatic learning** from all analyses
- **Document versioning** for data updates
- **Cleanup routines** for old/irrelevant data
- **Backup and restore** capabilities

### 3. Model Management

- **Model switching** based on analysis complexity
- **Performance tracking** for different models
- **Automatic fallback** to backup models
- **Model update notifications**

## Security Considerations

1. **Local Processing**: All sensitive financial data stays on your machine
2. **No External APIs**: Core functionality doesn't require internet
3. **Encrypted Storage**: Database encryption for sensitive information
4. **Access Control**: MCP server with client authentication
5. **Audit Logging**: Complete analysis trail for compliance

## Next Steps

1. **Customize Models**: Fine-tune models with your specific financial data
2. **Extend Analysis**: Add custom analysis types and metrics
3. **Integration**: Connect with existing financial systems
4. **Scaling**: Deploy on multiple machines for larger datasets
5. **Automation**: Set up scheduled analysis and reporting

For support and advanced configuration, refer to the individual component documentation in the `/docs` folder.
