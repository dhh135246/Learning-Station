/**
 * SM-2 间隔重复算法与备份管理模块
 */

// SM-2 间隔重复算法核心计算
function calculateSM2(q, repetitions, interval, easeFactor) {
  if (q < 3) {
    repetitions = 0;
    interval = 1;
  } else {
    if (repetitions === 0) {
      interval = 1;
    } else if (repetitions === 1) {
      interval = 4; // 测试期缩短（常规是6天）
    } else {
      interval = Math.round(interval * easeFactor);
    }
    repetitions++;
  }
  easeFactor = easeFactor + (0.1 - (5 - q) * (0.08 + (5 - q) * 0.02));
  if (easeFactor < 1.3) easeFactor = 1.3;
  return { repetitions, interval, easeFactor };
}

// 备份导出 (Blob 强健化)
function exportProgressJSON() {
  const backup = {
    kana_mastery: JSON.parse(localStorage.getItem('kana_mastery') || '{}'),
    vocab_list: JSON.parse(localStorage.getItem('vocab_list') || '[]'),
    streak: localStorage.getItem('streak') || '0',
    lastStudyDate: localStorage.getItem('lastStudyDate') || '',
    custom_grammar_notes: JSON.parse(localStorage.getItem('custom_grammar_notes') || '[]')
  };

  const blob = new Blob([JSON.stringify(backup, null, 2)], { type: 'application/json' });
  const url = URL.createObjectURL(blob);
  
  const dlAnchor = document.createElement('a');
  dlAnchor.setAttribute("href", url);
  dlAnchor.setAttribute("download", `japanese_station_progress_${new Date().toISOString().slice(0,10)}.json`);
  document.body.appendChild(dlAnchor);
  dlAnchor.click();
  dlAnchor.remove();

  // 释放 ObjectURL，保障离线单机大体量导出不泄露内存
  setTimeout(() => URL.revokeObjectURL(url), 100);
}

// 备份导入 (兼顾拖拽与选择)
function importProgressJSON(draggedFile) {
  let file = draggedFile;
  if (!file) {
    const fileInput = document.getElementById('import-file-selector');
    if (!fileInput || !fileInput.files.length) {
      alert('请先选择备份 JSON 文件！');
      return;
    }
    file = fileInput.files[0];
  }

  const reader = new FileReader();
  reader.onload = function(e) {
    try {
      const data = JSON.parse(e.target.result);
      if (data.kana_mastery) localStorage.setItem('kana_mastery', JSON.stringify(data.kana_mastery));
      if (data.vocab_list) localStorage.setItem('vocab_list', JSON.stringify(data.vocab_list));
      if (data.streak) localStorage.setItem('streak', data.streak);
      if (data.lastStudyDate) localStorage.setItem('lastStudyDate', data.lastStudyDate);
      if (data.custom_grammar_notes) {
        localStorage.setItem('custom_grammar_notes', JSON.stringify(data.custom_grammar_notes));
      }

      alert('进度数据恢复成功！🌸');
      window.location.reload();
    } catch (err) {
      alert('JSON 解析失败，请上传正确的备份文件！');
    }
  };
  reader.readAsText(file);
}

// 完全重置
function resetAllProgress() {
  if (confirm('此操作不可逆！确认清空所有进度数据吗？')) {
    localStorage.clear();
    alert('数据已重置，系统正在重新载入。');
    window.location.reload();
  }
}

// 挂载到全局 window 命名空间以支持 HTML 行内 onclick 调用与跨模块访问
window.calculateSM2 = calculateSM2;
window.exportProgressJSON = exportProgressJSON;
window.importProgressJSON = importProgressJSON;
window.resetAllProgress = resetAllProgress;
