import { RecursiveCharacterTextSplitter } from 'langchain/text_splitter'
import { readFile } from 'fs/promises';
import { createClient } from '@supabase/supabase-js'
import { SupabaseVectorStore } from '@langchain/community/vectorstores/supabase';
import { OpenAIEmbeddings } from '@langchain/openai';
import 'dotenv/config'; // Load environment variables

try {
    // Read the local file
    const text = await readFile('scrimba-info.txt', 'utf8');
    
    // Initialize the text splitter
    const splitter = new RecursiveCharacterTextSplitter({
      chunkSize: 500, // Optional: adjust chunk size as needed
      separators: ['\n\n', '\n', ' ', ''], // default setting
      chunkOverlap: 50, // Optional: adjust overlap as needed
    });
    
    // Create documents from the text
    const output = await splitter.createDocuments([text]);
    console.log(output);
    const sbApiKey = process.env.SUPABASE_API_KEY
    const sbUrl = process.env.SUPABASE_URL_LC_CHATBOT
    const openAIApiKey = process.env.OPENAI_API_KEY

    //Crear cliente de supabase
    const client = createClient(sbUrl, sbApiKey)
    await SupabaseVectorStore.fromDocuments(output,
        new OpenAIEmbeddings({ 
            apiKey: openAIApiKey
        }),
        {
            client,
            tableName: 'documents'
        }
     )


  } catch (err) {
    console.error('Error:', err);
  }