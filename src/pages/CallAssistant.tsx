// src/pages/CallAssistant.tsx

'use client';

import { useState, useCallback } from 'react';

export function CallAssistant() {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const startConversation = useCallback(async () => {
    try {
      // Set loading state to true
      setIsLoading(true);
      setError(null);

      // Log to ensure the function is triggered
      console.log('Start conversation triggered');

      // Start the conversation by calling the external API
      const response = await fetch('https://v2-api.respell.ai/spells/start', {
        method: 'POST',
        headers: {
          ['x-api-key']: 'cm7hry5rn009qixqnusmwwmrw',  // Updated API key
          accept: 'application/json',
          'content-type': 'application/json',
        },
        body: JSON.stringify({
          spellId: 'cm7hrz1af00a3ixqnkgir57nj',
          wait: true,
          inputs: {
              "email": "YOUR INPUT",  // Replace with actual email
              "phone_number": "9724646949",  // Replace with actual phone number
              "recipient_name": "Bertha",  // Replace with actual recipient name
              "call_objective_script": "I want the agent to prompt me questions for a diagnosis and when the user gives symptoms I want it to diagnose with an illness. Prompt the user to tell you about their details such as age and past medical history."  // Your original script
          },
        }),
      });

      // Check if the response is successful
      if (!response.ok) {
        throw new Error('Failed to start conversation');
      }

      const data = await response.json();
      console.log('Conversation started:', data);
      
      // You can further process the response here, like storing session info or updating UI
    } catch (err) {
      console.error('Error starting conversation:', err);
      setError('Failed to start the conversation. Please try again.');
    } finally {
      // Set loading state to false
      setIsLoading(false);
    }
  }, []);

  const stopConversation = useCallback(() => {
    // Logic for stopping the conversation can be added here if needed
    console.log('Conversation stopped');
  }, []);

  return (
    <div className="flex flex-col items-center gap-4">
      <div className="flex gap-2">
        <button
          onClick={startConversation}
          disabled={isLoading}
          className="px-4 py-2 bg-blue-500 text-white rounded disabled:bg-gray-300"
        >
          {isLoading ? 'Starting Conversation...' : 'Start Conversation'}
        </button>
        <button
          onClick={stopConversation}
          className="px-4 py-2 bg-red-500 text-white rounded"
        >
          Stop Conversation
        </button>
      </div>

      {error && (
        <div className="mt-4 text-red-500">
          <p>{error}</p>
        </div>
      )}

      <div className="flex flex-col items-center">
        <p>Status: {isLoading ? 'Starting...' : 'Idle'}</p>
      </div>
    </div>
  );
}

export default CallAssistant;
