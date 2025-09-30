'use server';
/**
 * @fileOverview A flow for sending a contact message from the website.
 *
 * - sendContactMessage - A function that handles sending the contact form data.
 * - SendContactMessageInput - The input type for the sendContactMessage function.
 * - SendContactMessageOutput - The return type for the sendContactMessage function.
 */

import { ai } from '@/ai/genkit';
import { z } from 'genkit';

const SendContactMessageInputSchema = z.object({
  name: z.string().describe('The name of the person sending the message.'),
  email: z.string().email().describe('The email address of the sender.'),
  message: z.string().describe('The content of the message.'),
});
export type SendContactMessageInput = z.infer<typeof SendContactMessageInputSchema>;

const SendContactMessageOutputSchema = z.object({
  success: z.boolean(),
});
export type SendContactMessageOutput = z.infer<typeof SendContactMessageOutputSchema>;

const emailPrompt = ai.definePrompt({
    name: 'sendEmailPrompt',
    input: { schema: SendContactMessageInputSchema },
    prompt: `
      To: eajaz.dev@devilslab.co.in
      From: "DevilsLab Contact Form" <noreply@devilslab.io>
      Subject: New Contact Form Submission from {{name}}

      You have received a new message from your website contact form.

      Name: {{name}}
      Email: {{email}}

      Message:
      {{message}}
    `,
});

const sendEmailFlow = ai.defineFlow(
  {
    name: 'sendEmailFlow',
    inputSchema: SendContactMessageInputSchema,
    outputSchema: SendContactMessageOutputSchema,
  },
  async (input) => {
    try {
      const { text } = await emailPrompt(input);
      
      // In a real application, you would integrate with an email sending service
      // like SendGrid, Mailgun, or AWS SES here to send the email.
      // For this prototype, we'll just log the email content to the console.
      console.log("----- EMAIL TO BE SENT -----");
      console.log(text);
      console.log("--------------------------");

      return { success: true };
    } catch (error) {
        console.error("Error in sendEmailFlow:", error);
        return { success: false };
    }
  }
);


export async function sendContactMessage(input: SendContactMessageInput): Promise<SendContactMessageOutput> {
  return sendEmailFlow(input);
}

    