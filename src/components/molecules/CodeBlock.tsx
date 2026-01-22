import './CodeBlock.css';

interface CodeBlockProps {
  code: string;
  language?: string;
}

/**
 * CodeBlock - A molecule for displaying code snippets
 */
const CodeBlock = ({ code }: CodeBlockProps) => (
  <pre className="code-block">
    {code}
  </pre>
);

export default CodeBlock;
