import React from 'react';
import MdEditor from 'react-markdown-editor-lite';
import MarkdownIt from 'markdown-it';
import emoji from 'markdown-it-emoji';
import subscript from 'markdown-it-sub';
import superscript from 'markdown-it-sup';
import footnote from 'markdown-it-footnote';
import deflist from 'markdown-it-deflist';
import abbreviation from 'markdown-it-abbr';
import insert from 'markdown-it-ins';
import mark from 'markdown-it-mark';
import tasklists from 'markdown-it-task-lists';
import hljs from 'highlight.js';
import 'highlight.js/styles/atom-one-light.css';
import './index.less';

const MOCK_DATA =
  'Hello.\n\n * This is markdown.\n * It is fun\n * Love it or leave it.';

const Editor: React.FC<{}> = (props) => {
  return <div></div>;
};

export default Editor;
