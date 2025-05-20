import { RecursiveCharacterTextSplitter } from 'langchain/text_splitter'
import { readFile } from 'fs/promises';

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
  } catch (err) {
    console.error('Error:', err);
  }