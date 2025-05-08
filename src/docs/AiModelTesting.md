
# AI Model Testing Area

This feature provides a simple interface for creating and testing different AI models within the application. It allows users to:

1. Create new AI models with customized settings
2. Test models with a chat-like interface
3. Compare responses between different models

## Components

### SimpleModelForm

A simplified form for creating new AI model configurations with:

- Name and provider selection
- Model selection based on provider
- API key input
- Temperature and max tokens configuration
- System prompt customization
- Enabled/disabled toggle

### AiModelTesting

A testing environment that includes:

- Model selector
- Chat interface for sending messages
- Real-time response display
- Option to add new models

## Supported Providers

- OpenAI (GPT-4o, GPT-4o Mini, GPT-4.5 Preview)
- Google Gemini (Gemini Pro, Gemini Ultra)
- Mistral AI (Small, Medium, Large)
- Grok (Grok-1)
- Hugging Face (Llama 3, Mistral 7B, Phi-2)
- Anthropic (Claude 3 Opus, Sonnet, Haiku)

## Backend Integration

The backend provides an API endpoint for testing AI models:

```
POST /api/ai-models/{aiModel}/test
```

This endpoint accepts a message and returns a simulated response based on the model's provider.

## Future Enhancements

1. Real API integration with actual AI providers
2. Response comparison view
3. Performance metrics (latency, token usage)
4. Cost estimation
5. Response formatting options
6. History of test conversations
