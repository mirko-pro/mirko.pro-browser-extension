import hljs from 'highlight.js/lib/common';

export const syntaxHighlighting = (codeBlock: any): void => {
  codeBlock.innerHTML = codeBlock.innerHTML.replace(/<br>/g, '\n');
  hljs.highlightElement(codeBlock);
};

export const copyCodeButton = (codeBlock: any): void => {
  const codeBlockWrapper = document.createElement('div');
  codeBlockWrapper.classList.add('code-block-wrapper');
  codeBlock.parentNode.insertBefore(codeBlockWrapper, codeBlock);
  codeBlockWrapper.appendChild(codeBlock);

  // add copy button
  const copyButton = document.createElement('button');
  copyButton.classList.add('copy-code-button');
  copyButton.innerHTML = 'Kopiuj';
  codeBlockWrapper.appendChild(copyButton);

  // add copy button event listener
  copyButton.addEventListener('click', () => {
    const textArea = document.createElement('textarea');
    textArea.value = codeBlock.innerText;
    document.body.appendChild(textArea);
    textArea.select();
    document.execCommand('copy');
    textArea.remove();
  });
};
