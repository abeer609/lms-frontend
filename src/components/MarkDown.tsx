import Markdown from "react-markdown";
import SyntaxHighlighter from "react-syntax-highlighter";
import { dracula } from "react-syntax-highlighter/dist/esm/styles/hljs";

interface Props {
  children: string;
}
const MarkDown = ({ children }: Props) => {
  return (
    <div className="prose">
      <Markdown
        children={children}
        components={{
          code(props) {
            const { children } = props;
            return (
              <SyntaxHighlighter style={dracula}>
                {String(children)}
              </SyntaxHighlighter>
            );
          },
        }}
      ></Markdown>
    </div>
  );
};

export default MarkDown;
