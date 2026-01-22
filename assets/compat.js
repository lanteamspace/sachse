document.addEventListener('DOMContentLoaded', function () {
  // Wrap iframes into .player-crop if not already present
  const selectors = ['.player-frame', '.player-container', 'main', 'body'];
  selectors.forEach(sel => {
    document.querySelectorAll(sel).forEach(container => {
      const iframe = container.querySelector('iframe');
      if (!iframe) return;
      if (iframe.closest('.player-crop')) return;
      const crop = document.createElement('div');
      crop.className = 'player-crop';
      // Insert crop before iframe and move iframe inside
      iframe.parentNode.insertBefore(crop, iframe);
      crop.appendChild(iframe);
      // If original container is an empty .player-frame, remove it
      if (container.classList && container.classList.contains('player-frame') && container.children.length === 0) {
        container.remove();
      }
    });
  });
});
