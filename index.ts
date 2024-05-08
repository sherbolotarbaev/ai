import type { ChatCompletionMessageParam } from 'openai/resources';
import type { ChatCompletionCreateParamsBase } from 'openai/resources/chat/completions';

import { createInterface } from 'readline';
import { config } from 'dotenv';

config();

import { AI } from './lib/ai';

const apiKey = process.env.OPENAI_API_KEY || '';

const ai = new AI(apiKey);

const readline = createInterface({
  input: process.stdin,
  output: process.stdout,
});

const prompt =
  'Assistance is needed across a spectrum of tasks. Your responses are expected to exude elegance and grace, reflecting a commitment to aesthetic excellence.';

async function main() {
  console.clear();

  console.info('[INFO] starting stream conversation.');

  console.log('\n');

  readline.question('Type your message: ', async (input) => {
    console.log('\n');

    if (input.length) {
      await newConversation(input);
    }

    readline.close();
    console.log('\n');
    console.info('[INFO] stream closed.');
  });
}

main();

const newConversation = async (input: string) => {
  const messages: ChatCompletionMessageParam[] = [
    { role: 'system', content: prompt },
    { role: 'user', content: input },
  ];

  const params: ChatCompletionCreateParamsBase = {
    messages,
    model: 'gpt-4',
  };

  const output = await ai.completion(params);

  for await (const chunk of output) {
    const content = ai.extractContent(chunk) ?? '';
    process.stdout.write(content);
  }
};
