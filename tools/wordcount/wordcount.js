/* Word Counter — live, no dependencies */

(function () {
  const input      = document.getElementById('wc-input');
  const clearBtn   = document.getElementById('wc-clear');
  const statWords  = document.getElementById('stat-words');
  const statChars  = document.getElementById('stat-chars');
  const statCharsNS= document.getElementById('stat-chars-no-spaces');
  const statLines  = document.getElementById('stat-lines');
  const statSents  = document.getElementById('stat-sentences');

  if (!input) return;

  function count(text) {
    const words     = text.trim() === '' ? 0 : text.trim().split(/\s+/).length;
    const chars     = text.length;
    const charsNoSp = (text.match(/ /g) || []).length;
    const lines     = text === '' ? 0 : text.split('\n').length;
    const sentences = text.trim() === '' ? 0 : (text.match(/[^.!?]*[.!?]+/g) || []).length;
    const empty = text.trim() === '';
    statWords.textContent   = empty ? '—' : words.toLocaleString();
    statChars.textContent   = empty ? '—' : chars.toLocaleString();
    statCharsNS.textContent = empty ? '—' : charsNoSp.toLocaleString();
    statLines.textContent   = empty ? '—' : lines.toLocaleString();
    statSents.textContent   = empty ? '—' : sentences.toLocaleString();

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
