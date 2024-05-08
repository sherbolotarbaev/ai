# AI CLI (OpenAI) 🤖

A command-line interface (CLI) for interacting with an AI model using OpenAI's API. This CLI allows users to engage in text-based conversations with the AI model and receive responses in real-time.

## Features 🪄

- **Initiate Conversations**: Start conversations with the AI model via a simple command-line interface.
- **Real-time Responses**: Send messages to the AI model and receive responses instantly.
- **Multiple AI Models**: Supports various AI models provided by OpenAI, including GPT-3.5 Turbo and GPT-4.
- **Customizable and Extendable**: Easily customize and extend for different use cases.


## Prerequisites ⚙️

Before using this CLI, you need to obtain an API key from OpenAI. You can sign up for an account and get your API key [here](https://openai.com).

## Installation ✅

1. **Clone the Repository**: Clone this repository to your local machine:

```bash
git clone https://github.com/sherbolotarbaev/ai.git
```

2. **Navigate to the Directory**: Change your current directory to the project directory:

```bash
cd ai
```

3. **Install Dependencies**: Install project dependencies using [pnpm](https://pnpm.io/):

```bash
pnpm install
```

4. **Add API Key**: Create a `.env` file in the root directory and add your OpenAI API key:

```makefile
OPENAI_API_KEY='your-api-key'
```

## Usage ✨

1. **Run the CLI**: Start the CLI (locally):

```bash
pnpm dev
```

2. **Start Conversations**: Follow the prompts to initiate a conversation with the AI model.
3. **Send Messages**: Type your message and press Enter to send it to the AI model.

## Configuration ⚙️

You can customize the behavior of the CLI by modifying the following parameters in the `index.ts` file:

- `**prompt**`: Prompt: Define the prompt for instructing the AI on the desired response. Refer to the prompt engineering guide [here](https://platform.openai.com/docs/guides/prompt-engineering).
- **`model`**: Choose the AI model to use for generating responses (e.g., 'gpt-3.5-turbo', 'gpt-4').
- **`temperature`**: Adjust the temperature parameter to control the randomness of the AI's responses.
- **`max_tokens**`**: Set the maximum number of tokens to generate for each response.

## Contributing 🚀

Contributions are welcome! If you encounter any issues or have suggestions for improvements, please open an issue or submit a pull request. 🙌🏻
