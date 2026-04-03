/* Word Counter — live, no dependencies */

(function () {
  const input      = document.getElementById('wc-input');
  const clearBtn   = document.getElementById('wc-clear');
  const statWords  = document.getElementById('stat-words');
  const statChars  = document.getElementById('stat-chars');
  const statCharsNS= document.getElementById('stat-chars-no-spaces');
  const statLines  = document.getElementById('stat-lines');
  const statSents  = document.getElementById('stat-sentences');
  const statRead   = document.getElementById('stat-read-time');

  if (!input) return;

  function count(text) {
    const words     = text.trim() === '' ? 0 : text.trim().split(/\s+/).length;
    const chars     = text.length;
    const charsNoSp = text.replace(/\s/g, '').length;
    const lines     = text === '' ? 0 : text.split('\n').length;
    const sentences = text.trim() === '' ? 0 : (text.match(/[^.!?]*[.!?]+/g) || []).length;
    const readMin   = Math.ceil(words / 238); // avg reading speed

    statWords.textContent  = words.toLocaleString();
    statChars.textContent  = chars.toLocaleString();
    statCharsNS.textContent= charsNoSp.toLocaleString();
    statLines.textContent  = lines.toLocaleString();
    statSents.textContent  = sentences.toLocaleString();
    statRead.textContent   = words === 0 ? '0 min' : readMin + ' min';
  }

  input.addEventListener('input', function () {
    count(input.value);
  });

  clearBtn.addEventListener('click', function () {
    input.value = '';
    count('');
    input.focus();
  });

  // Count on load in case browser restores textarea value
  count(input.value);
})();
