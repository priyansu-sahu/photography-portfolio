/* ============================================================
   Diff Checker — Longest Common Subsequence diff algorithm
   No dependencies, pure JS
   ============================================================ */

(function () {

  const compareBtn = document.getElementById('compare-btn');
  const clearBtn   = document.getElementById('clear-btn');
  const textA      = document.getElementById('text-a');
  const textB      = document.getElementById('text-b');
  const output     = document.getElementById('diff-output');
  const stats      = document.getElementById('diff-stats');

  if (!compareBtn) return;

  // --- LCS-based line diff ---

  function lcs(a, b) {
    const m = a.length, n = b.length;
    const dp = Array.from({ length: m + 1 }, () => new Int32Array(n + 1));
    for (let i = 1; i <= m; i++) {
      for (let j = 1; j <= n; j++) {
        dp[i][j] = a[i-1] === b[j-1]
          ? dp[i-1][j-1] + 1
          : Math.max(dp[i-1][j], dp[i][j-1]);
      }
    }
    return dp;
  }

  function diff(linesA, linesB) {
    const dp = lcs(linesA, linesB);
    const result = [];
    let i = linesA.length, j = linesB.length;
    while (i > 0 || j > 0) {
      if (i > 0 && j > 0 && linesA[i-1] === linesB[j-1]) {
        result.push({ type: 'equal', line: linesA[i-1] });
        i--; j--;
      } else if (j > 0 && (i === 0 || dp[i][j-1] >= dp[i-1][j])) {
        result.push({ type: 'added', line: linesB[j-1] });
        j--;
      } else {
        result.push({ type: 'removed', line: linesA[i-1] });
        i--;
      }
    }
    return result.reverse();
  }

  // --- Render ---

  function renderDiff(diffResult) {
    output.innerHTML = '';
    let lineNumA = 1, lineNumB = 1;
    let added = 0, removed = 0;

    diffResult.forEach(function (entry) {
      const row = document.createElement('div');
      row.className = 'diff-line diff-line--' + entry.type;

      const numEl = document.createElement('div');
      numEl.className = 'diff-line-num';

      const contentEl = document.createElement('div');
      contentEl.className = 'diff-line-content';
      contentEl.textContent = entry.line;

      if (entry.type === 'equal') {
        numEl.textContent = lineNumA + ' / ' + lineNumB;
        lineNumA++; lineNumB++;
      } else if (entry.type === 'added') {
        numEl.textContent = lineNumB;
        lineNumB++; added++;
      } else {
        numEl.textContent = lineNumA;
        lineNumA++; removed++;
      }

      row.appendChild(numEl);
      row.appendChild(contentEl);
      output.appendChild(row);
    });

    // Stats
    const identical = added === 0 && removed === 0;
    if (identical) {
      stats.textContent = 'texts are identical';
    } else {
      const parts = [];
      if (added)   parts.push('+' + added + ' line' + (added > 1 ? 's' : ''));
      if (removed) parts.push('-' + removed + ' line' + (removed > 1 ? 's' : ''));
      stats.textContent = parts.join('  ');
    }
  }

  // --- Event handlers ---

  compareBtn.addEventListener('click', function () {
    const linesA = textA.value.split('\n');
    const linesB = textB.value.split('\n');
    const result = diff(linesA, linesB);
    renderDiff(result);
    output.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
  });

  clearBtn.addEventListener('click', function () {
    textA.value = '';
    textB.value = '';
    output.innerHTML = '';
    stats.textContent = '';
    textA.focus();
  });

  // Also auto-compare on Cmd/Ctrl+Enter
  [textA, textB].forEach(function (el) {
    el.addEventListener('keydown', function (e) {
      if ((e.metaKey || e.ctrlKey) && e.key === 'Enter') {
        e.preventDefault();
        compareBtn.click();
      }
    });
  });

})();
