'use server';

// import { StructuredOutputParser } from '@langchain/core/output_parsers';
// import { ChatPromptTemplate } from '@langchain/core/prompts';
// import { RunnableSequence } from '@langchain/core/runnables';
// import { ChatGoogleGenerativeAI } from '@langchain/google-genai';
// import { z } from 'zod';

// const model = new ChatGoogleGenerativeAI({
//   model: 'gemini-2.0-flash',
// });

// const outputSchema = z.object({
//   tagline: z
//     .string()
//     .describe(
//       'Analyze the data and create a short title based on the new feature added',
//     ),
//   description: z
//     .string()
//     .describe(
//       'A detailed twitter post about the new feature added in  max 280 characters. Add some build in public and 100 days of code hashtags as well. Add emoji as well.',
//     ),
// });

// const parser = StructuredOutputParser.fromZodSchema(outputSchema);

// const chain = RunnableSequence.from([
//   ChatPromptTemplate.fromTemplate(
//     '{format_instructions}\nProject Title: {title}\nProject Description: {description}\nNew Feature Title: {feat_title}\nNew Feature Description: {feat_desc}',
//   ),
//   model,
//   parser,
// ]);

export async function generateTwitterPost(
  title: string,
  description: string,
  feat_title: string,
  feat_desc: string,
) {
  // const data = await chain.invoke({
  //   format_instructions: parser.getFormatInstructions(),
  //   title,
  //   description,
  //   feat_title,
  //   feat_desc,
  // });
  // return data;
}
