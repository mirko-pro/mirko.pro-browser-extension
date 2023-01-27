export const restoreWatchedLinkInNavbar = (mainNav: HTMLElement) => {
  const mojWykopLi = mainNav.querySelector('li.moj-wykop');
  if (mojWykopLi) return;

  const notActiveLi = mainNav.querySelector('li:not(.active)');
  if (notActiveLi) {
    const clonedLi = notActiveLi.cloneNode(true);
    const clonedLiElement = clonedLi as Element;

    if (clonedLiElement) {
      clonedLiElement.classList.add('moj-wykop');
      const a = clonedLiElement.querySelector('a');
      if (a) {
        a.href = '/obserwowane';
        a.innerHTML = 'Mój Wykop';
      }

      const ulElement = mainNav.querySelector('ul');
      if (ulElement) ulElement.appendChild(clonedLiElement);
    }
  }
};
