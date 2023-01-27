export const expandButtonCounter = (el: any) => {
  const commentCounter = el.querySelector('.comment-counter');

  // console.log('commentCounter', commentCounter);

  if (commentCounter) {
    const commentCounterText = commentCounter.innerText;
    let commentCounterNumber = parseInt(commentCounterText);
    if (commentCounterNumber > 2) commentCounterNumber -= 2;
    const expandButton = el.querySelector('footer .button button');
    if (expandButton) {
      expandButton.innerHTML = `${expandButton.innerHTML} (${commentCounterNumber})`;
    }
  }
};

export const expandButtonOldBehavior = (el: any) => {
  const buttonWrapper = el.querySelector('footer .button');

  // console.log('buttonWrapper', buttonWrapper);

  if (buttonWrapper) {
    buttonWrapper.style.position = 'relative';
    const a = document.createElement('a');
    a.href = el.querySelector('.comment-counter').getAttribute('href');
    a.style.width = '100%';
    a.style.height = '100%';
    a.style.position = 'absolute';
    a.style.top = '0';
    a.style.left = '0';
    a.style.zIndex = '1';
    buttonWrapper.appendChild(a);
    a.addEventListener('click', (e) => {
      e.preventDefault();
      buttonWrapper.querySelector('button').click();
    });
  }
};
