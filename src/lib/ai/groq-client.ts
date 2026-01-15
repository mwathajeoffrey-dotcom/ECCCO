/**
 * Groq AI Client
 * Fast, free LLM inference API with medical capabilities
 *
 * Groq provides ultra-fast inference with Llama 3 models
 * Free tier: 30 requests/minute, 14,400/day
 * Models: llama-3.1-70b-versatile (best for medical synthesis)
 */

interface GroqMessage {
  role: "system" | "user" | "assistant";
  content: string;
}

interface GroqResponse {
  choices: Array<{
    message: {
      role: string;
      content: string;
    };
    finish_reason: string;
  }>;
  usage: {
    prompt_tokens: number;
    completion_tokens: number;
    total_tokens: number;
  };
}

/**
 * Call Groq API for medical text synthesis
 * @param systemPrompt - Instructions for the AI (clinical context)
 * @param userPrompt - The actual question/task
 * @param options - Temperature, max tokens, etc.
 * @returns Generated text
 */
export async function callGroq(
  systemPrompt: string,
  userPrompt: string,
  options: {
    temperature?: number;
    maxTokens?: number;
    model?: "llama-3.3-70b-versatile" | "llama-3.1-8b-instant" | "mixtral-8x7b-32768";
  } = {}
): Promise<string> {
  const apiKey = process.env.GROQ_API_KEY;

  if (!apiKey) {
    throw new Error("GROQ_API_KEY not found in environment variables. Get free API key at https://console.groq.com");
  }

  const {
    temperature = 0.2, // Low temperature for factual medical content
    maxTokens = 2500,
    model = "llama-3.3-70b-versatile", // Updated model (Jan 2026)
  } = options;

  try {
    const response = await fetch("https://api.groq.com/openai/v1/chat/completions", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${apiKey}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        model,
        messages: [
          { role: "system", content: systemPrompt },
          { role: "user", content: userPrompt },
        ] as GroqMessage[],
        temperature,
        max_tokens: maxTokens,
        top_p: 0.95,
        stream: false,
      }),
    });

    if (!response.ok) {
      const error = await response.text();
      throw new Error(`Groq API error (${response.status}): ${error}`);
    }

    const data: GroqResponse = await response.json();

    if (!data.choices || data.choices.length === 0) {
      throw new Error("No response from Groq API");
    }

    const content = data.choices[0].message.content;

    console.log(`[Groq] Generated ${data.usage.completion_tokens} tokens in response`);

    return content;
  } catch (error) {
    console.error("[Groq] API call failed:", error);
    throw error;
  }
}

/**
 * Generate completion from a single prompt (simpler API)
 */
export async function generateGroqCompletion(
  prompt: string,
  options: {
    temperature?: number;
    maxTokens?: number;
    model?: "llama-3.3-70b-versatile" | "llama-3.1-8b-instant" | "mixtral-8x7b-32768";
  } = {}
): Promise<string> {
  return callGroq("You are a helpful medical AI assistant.", prompt, options);
}

/**
 * Check if Groq API is available (API key configured)
 */
export function isGroqAvailable(): boolean {
  return !!process.env.GROQ_API_KEY;
}

/**
 * Get available Groq models
 */
export async function listGroqModels(): Promise<string[]> {
  const apiKey = process.env.GROQ_API_KEY;

  if (!apiKey) {
    return [];
  }

  try {
    const response = await fetch("https://api.groq.com/openai/v1/models", {
      headers: {
        Authorization: `Bearer ${apiKey}`,
      },
    });

    if (!response.ok) {
      return [];
    }

    const data = await response.json();
    return data.data?.map((model: any) => model.id) || [];
  } catch (error) {
    console.error("[Groq] Failed to list models:", error);
    return [];
  }
}
