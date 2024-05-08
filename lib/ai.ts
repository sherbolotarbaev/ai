import type { ChatCompletionChunk } from 'openai/resources';
import type { Stream } from 'openai/streaming';
import type { ChatCompletionCreateParamsBase } from 'openai/resources/chat/completions';

import { OpenAI } from 'openai';

export class AI {
  private openai: OpenAI;

  constructor(apiKey: string) {
    this.openai = new OpenAI({ apiKey });
  }

  public async completion({
    messages,
    model = 'gpt-3.5-turbo',
    temperature = 0.5,
    max_tokens = 400,
  }: ChatCompletionCreateParamsBase) {
    console.log(`${model}:`);

    try {
      const completion: Stream<ChatCompletionChunk> =
        await this.openai.chat.completions.create({
          messages,
          model,
          temperature,
          max_tokens,
          stream: true,
        });

      return completion;
    } catch (error) {
      console.error('[ERROR] new completion failed:', error.message);
      return;
    }
  }

  extractContent(completion: ChatCompletionChunk): string | undefined {
    for (const choice of completion.choices) {
      if (choice.delta && choice.delta.content) {
        return choice.delta.content;
      }
    }
  }
}
