# Chat Client

This is the client-side application for a chat with Open AI, built with modern web technologies. The chat client connects to the server, allowing users to send and receive messages in real-time.

## Technologies Used

- **Next.js**: Framework for React, providing server-side rendering and static site generation.
- **React**: Frontend framework for building the user interface.
- **TypeScript**: Typed superset of JavaScript, ensuring type safety and reducing runtime errors.
- **WebSockets**: For real-time messaging.
- **CSS/SCSS**: Styling of the chat interface.
- **Redux/Context API**: For managing global state (if used).
  
## Installation

1. Clone the repository:

  ```bash
  git clone https://github.com/yourusername/chat-client.git
  ```

2. Navigate to the project directory:

  ```bash
  cd chat-client-next
  ```

3. Install dependencies:

  ```bash
  npm install
  # or 
  npx install
  ```

4. Start the development server:
  ```bash
  npx next dev
  ```
The app will be available at http://localhost:3000.

## Configuration

Ensure the server-side API (for WebSocket communication and message storage) is running. You may need to adjust the WebSocket URL or other API endpoints in the client configuration, for example in src/api.js.

In next.config.ts verify that BASE_URL is set correctly

module.exports = {
  env: {
    BASE_URL: 'your_url',
  },
}