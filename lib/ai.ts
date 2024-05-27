import type { ChatCompletionChunk, ImagesResponse } from 'openai/resources';
import type { Stream } from 'openai/streaming';
import type { ChatCompletionCreateParamsBase } from 'openai/resources/chat/completions';

import { OpenAI } from 'openai';

import { play } from './player';

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

  public async generateImage({ prompt }: { prompt: string }) {
    try {
      const res: ImagesResponse = await this.openai.images.generate({
        model: 'dall-e-3',
        prompt,
        response_format: 'url',
        style: 'natural',
      });

      const url = res.data[0].url;
      const recievedPrompt = res.data[0].revised_prompt;

      console.log('prompt:', recievedPrompt);

      return url;
    } catch (error) {
      console.error('[ERROR] image generation failed:', error.message);
      return;
    }
  }

  public async textToSpeech({ input }: { input: string }) {
    try {
      const res = await this.openai.audio.speech.create({
        input,
        model: 'tts-1-hd',
        voice: 'fable',
      });

      const arrayBuffer = await res.arrayBuffer();
      const audioBuffer = Buffer.from(arrayBuffer);

      play(audioBuffer);
    } catch (error) {
      console.error('[ERROR] text to speech failed:', error.message);
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
