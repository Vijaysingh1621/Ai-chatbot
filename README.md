

# AI Chatbot
This project is a responsive AI Chatbot built with React, featuring functionalities such as editing and deleting chat history, clearing chat history, and copying responses to the clipboard. The chatbot leverages the Gemini API for generating responses. This chatbot offers voice input and saves chat history locally in the browser .

## Features

- **Voice Input**: Utilize the Web Speech API to convert voice to text. Users can interact with the chatbot using voice commands, providing a hands-free and natural conversation experience.
- **AI-Powered Conversations**: Integrated with the Gemini API, the chatbot delivers intelligent and responsive interactions, making conversations more engaging and context-aware.
- **Local Chat History**: Chat history is automatically saved in the local browser storage, enabling users to revisit past conversations and maintain continuity across sessions.

## Installation

Follow these steps to set up the project on your local machine:

1. **Clone the repository**:
   ```bash
   git clone https://github.com/yourusername/ai-chatbot.git
   ```
2. **Navigate to the project directory**:
   ```bash
   cd ai-chatbot
   ```
3. **Install the necessary dependencies**:
   ```bash
   npm install
   ```
4. **Start the development server**:
   ```bash
   npm start
   ```

## Usage

After setting up, you can start using the chatbot:

1. Open your web browser and go to `http://localhost:3000`.
2. You can interact with the chatbot by typing your messages in the input field or by clicking the microphone icon to use voice input.
3. Your chat history will be saved automatically in your local browser storage, allowing you to access previous conversations whenever you return to the application.

## Project Structure

Here's an overview of the project's structure:

- `src/`: Contains the source code for the React application.
  - `components/`: Reusable React components.
  - `services/`: Services for interacting with the Gemini API and managing chat history.
  - `styles/`: CSS styles for the application.
  - `App.js`: Main application component.
  - `index.js`: Entry point of the application.
- `public/`: Static assets and the main HTML file.
- `package.json`: Lists project dependencies and scripts.

## Contributing

We welcome contributions to improve this project! If you have suggestions, bug reports, or would like to contribute code, please read our [Contributing Guide](CONTRIBUTING.md) to get started. Here are some ways you can contribute:

- **Report Bugs**: Use the issue tracker to report bugs.
- **Suggest Features**: Use the issue tracker to suggest new features.
- **Submit Pull Requests**: Fork the repository, make your changes, and submit a pull request.

## License

This project is licensed under the MIT License. For more details, see the [LICENSE](LICENSE) file.

