import type { ChatCompletionMessageParam } from 'openai/resources';
import type { ChatCompletionCreateParamsBase } from 'openai/resources/chat/completions';

import { createInterface } from 'readline';
import { config } from 'dotenv';

config();

import { AI } from './lib/ai';
import { history } from './lib/history';

const apiKey = process.env.OPENAI_API_KEY || '';

const ai = new AI(apiKey);

const readline = createInterface({
  input: process.stdin,
  output: process.stdout,
});

async function main() {
  console.log('\n');

  readline.question('Type your message: ', async (input) => {
    console.log('\n');

    if (input.length) {
      const output = await newConversation(input);
      await ai.textToSpeech({ input: output });
    }

    console.log('\n');
    main();
  });
}

main();

const newConversation = async (input: string) => {
  const prompt =
    'You are a helpful assistant. You can make question to make the conversation entertaining. My name is Sher';

  const messages: ChatCompletionMessageParam[] = [
    { role: 'system', content: prompt },
    ...history,
    { role: 'user', content: input },
  ];

  const params: ChatCompletionCreateParamsBase = {
    messages,
    model: 'gpt-4',
  };

  const output = await ai.completion(params);

  let result = '';
  for await (const chunk of output) {
    const content = ai.extractContent(chunk) ?? '';
    result += content;
    process.stdout.write(content);
  }

  history.push(
    {
      role: 'user',
      content: input,
    },
    {
      role: 'assistant',
      content: result,
    },
  );

  return result;
};
