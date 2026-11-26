export default function scrollToTop(behavior = 'smooth') {
  window.scrollTo({ top: 0, behavior });
  const main = document.querySelector('main');
  if (main) {
    main.scrollTo({ top: 0, behavior });
  }
}
