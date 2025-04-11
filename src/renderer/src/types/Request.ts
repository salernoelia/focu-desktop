export interface GroqRequest {
  id: string;
  object: string;
  created: number;
  model: string;
  choices: {
    index: number;
    message: {
      role: string;
      content: string;
    };
    logprobs: null;
    finish_reason: string;
  }[];
  usage: {
    queue_time: number;
    prompt_tokens: number;
    prompt_time: number;
    completion_tokens: number;
    completion_time: number;
    total_tokens: number;
    total_time: number;
  };
  system_fingerprint: string;
  x_groq: { id: string };
}
