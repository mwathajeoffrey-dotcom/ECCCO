import { logger } from '@/lib/logger';
/**
 * Meditron AI Integration for Clinical Evidence Synthesis
 * Medical-specific LLM for generating OpenEvidence-style summaries
 *
 * Meditron: Open-source medical AI trained on PubMed, clinical notes, textbooks
 * - 70B model: 94% accuracy on medical board questions
 * - 7B model: 88% accuracy, less resource intensive
 *
 * Setup:
 * 1. Install Ollama: curl -fsSL https://ollama.ai/install.sh | sh
 * 2. Pull Meditron: ollama pull meditron:7b-instruct (or :70b-instruct)
 * 3. Start server: ollama serve
 */

export interface MeditronConfig {
  baseUrl: string;
  model: "meditron:7b-instruct" | "meditron:70b-instruct" | "llama3.1:8b" | "llama3.1:70b";
  temperature: number;
  maxTokens: number;
}

export interface MeditronResponse {
  response: string;
  done: boolean;
  context?: number[];
  total_duration?: number;
  load_duration?: number;
  prompt_eval_count?: number;
  eval_count?: number;
}

const DEFAULT_CONFIG: MeditronConfig = {
  baseUrl: process.env.OLLAMA_BASE_URL || "http://localhost:11434",
  model: (process.env.OLLAMA_MODEL as any) || "meditron:7b-instruct",
  temperature: 0.2, // Low for medical accuracy
  maxTokens: 2500, // Enough for multi-paragraph synthesis
};

/**
 * Call Meditron via Ollama API
 */
export async function callMeditron(prompt: string, config: Partial<MeditronConfig> = {}): Promise<string> {
  const finalConfig = { ...DEFAULT_CONFIG, ...config };

  try {
    const response = await fetch(`${finalConfig.baseUrl}/api/generate`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        model: finalConfig.model,
        prompt,
        stream: false,
        options: {
          temperature: finalConfig.temperature,
          top_p: 0.9,
          top_k: 40,
          repeat_penalty: 1.1,
          num_predict: finalConfig.maxTokens,
        },
      }),
    });

    if (!response.ok) {
      throw new Error(`Meditron API error: ${response.statusText}`);
    }

    const data: MeditronResponse = await response.json();
    return data.response;
  } catch (error) {
    logger.error("Meditron call failed:", error);
    throw new Error("Failed to generate clinical synthesis. Ensure Ollama is running with Meditron model.");
  }
}

/**
 * Test Meditron connection
 */
export async function testMeditronConnection(config?: Partial<MeditronConfig>): Promise<boolean> {
  try {
    const response = await callMeditron("What is the first-line treatment for septic shock?", {
      ...config,
      maxTokens: 100,
    });
    return response.length > 0;
  } catch (error) {
    return false;
  }
}

/**
 * Check if Meditron is available
 */
export async function isMeditronAvailable(config?: Partial<MeditronConfig>): Promise<boolean> {
  const finalConfig = { ...DEFAULT_CONFIG, ...config };

  try {
    const response = await fetch(`${finalConfig.baseUrl}/api/tags`, {
      method: "GET",
    });

    if (!response.ok) return false;

    const data = await response.json();
    const models = data.models || [];

    return models.some((m: any) => m.name?.includes("meditron") || m.name?.includes("llama3.1"));
  } catch (error) {
    return false;
  }
}

/**
 * List available models in Ollama
 */
export async function listAvailableModels(config?: Partial<MeditronConfig>): Promise<string[]> {
  const finalConfig = { ...DEFAULT_CONFIG, ...config };

  try {
    const response = await fetch(`${finalConfig.baseUrl}/api/tags`);
    if (!response.ok) return [];

    const data = await response.json();
    return (data.models || []).map((m: any) => m.name);
  } catch (error) {
    return [];
  }
}

/**
 * Get setup instructions if Meditron not available
 */
export function getMeditronSetupInstructions(): string[] {
  return [
    "1. Install Ollama:",
    "   curl -fsSL https://ollama.ai/install.sh | sh",
    "",
    "2. Pull Meditron model (choose one):",
    "   ollama pull meditron:7b-instruct   # Faster, 8GB RAM",
    "   ollama pull meditron:70b-instruct  # Better quality, 48GB RAM",
    "   ollama pull llama3.1:8b            # Alternative, good quality",
    "",
    "3. Start Ollama server:",
    "   ollama serve",
    "",
    "4. Test connection:",
    "   curl http://localhost:11434/api/tags",
  ];
}
