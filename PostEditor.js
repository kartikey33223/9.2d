import React, { useState } from 'react';
import { Controlled as CodeMirror } from 'react-codemirror2';
import ReactMarkdown from 'react-markdown';
import 'codemirror/lib/codemirror.css';
import 'codemirror/theme/material.css';
import 'codemirror/mode/javascript/javascript';

function PostEditor() {
  const [code, setCode] = useState('// Write your code here');
  const [markdown, setMarkdown] = useState('## Write your markdown here');

  return (
    <div>
      <h2>Write Your Post</h2>
      
      <div style={{ marginBottom: '20px' }}>
        <h3>Code Editor</h3>
        <CodeMirror
          value={code}
          options={{
            mode: 'javascript',
            theme: 'material',
            lineNumbers: true,
          }}
          onBeforeChange={(editor, data, value) => setCode(value)}
        />
      </div>
      
      <div style={{ marginBottom: '20px' }}>
        <h3>Markdown Editor</h3>
        <textarea
          value={markdown}
          onChange={(e) => setMarkdown(e.target.value)}
          rows="10"
          style={{ width: '100%', fontSize: '16px', padding: '10px' }}
          placeholder="Write your markdown here..."
        />
      </div>
      
      <div>
        <h3>Markdown Preview</h3>
        <div style={{ padding: '10px', border: '1px solid #ddd', borderRadius: '5px', backgroundColor: '#f9f9f9' }}>
          <ReactMarkdown>{markdown}</ReactMarkdown>
        </div>
      </div>
    </div>
  );
}

export default PostEditor;
