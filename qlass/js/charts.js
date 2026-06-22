/* ============================================
   QLASS CHARTS ENGINE
   Lightweight Canvas-based charts
   ============================================ */

const QlassCharts = (function() {
  'use strict';

  function getComputedVar(name) {
    return getComputedStyle(document.documentElement).getPropertyValue(name).trim();
  }

  // -- BAR CHART --
  function barChart(canvasId, data, options = {}) {
    const canvas = document.getElementById(canvasId);
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    const dpr = window.devicePixelRatio || 1;
    const rect = canvas.parentElement.getBoundingClientRect();
    canvas.width = rect.width * dpr;
    canvas.height = (options.height || 200) * dpr;
    canvas.style.width = rect.width + 'px';
    canvas.style.height = (options.height || 200) + 'px';
    ctx.scale(dpr, dpr);

    const w = rect.width;
    const h = options.height || 200;
    const padding = { top: 30, right: 20, bottom: 40, left: 45 };
    const chartW = w - padding.left - padding.right;
    const chartH = h - padding.top - padding.bottom;

    const max = Math.max(...data.data) * 1.15;
    const barWidth = Math.min(40, (chartW / data.labels.length) * 0.6);
    const gap = (chartW - barWidth * data.labels.length) / (data.labels.length + 1);

    // Grid lines
    ctx.strokeStyle = getComputedVar('--color-border') || '#E2E8F0';
    ctx.lineWidth = 0.5;
    for (let i = 0; i <= 4; i++) {
      const y = padding.top + (chartH / 4) * i;
      ctx.beginPath();
      ctx.moveTo(padding.left, y);
      ctx.lineTo(w - padding.right, y);
      ctx.stroke();
      ctx.fillStyle = getComputedVar('--color-text-tertiary') || '#94A3B8';
      ctx.font = '11px Inter, sans-serif';
      ctx.textAlign = 'right';
      ctx.fillText(Math.round(max - (max / 4) * i), padding.left - 8, y + 4);
    }

    // Bars
    data.labels.forEach((label, i) => {
      const x = padding.left + gap + i * (barWidth + gap);
      const barH = (data.data[i] / max) * chartH;
      const y = padding.top + chartH - barH;

      // Gradient fill
      const grad = ctx.createLinearGradient(x, y, x, y + barH);
      const color = data.colors ? data.colors[i] : (options.color || '#2563EB');
      grad.addColorStop(0, color);
      grad.addColorStop(1, color + '88');
      ctx.fillStyle = grad;

      // Rounded top
      const r = Math.min(6, barWidth / 2);
      ctx.beginPath();
      ctx.moveTo(x, y + barH);
      ctx.lineTo(x, y + r);
      ctx.quadraticCurveTo(x, y, x + r, y);
      ctx.lineTo(x + barWidth - r, y);
      ctx.quadraticCurveTo(x + barWidth, y, x + barWidth, y + r);
      ctx.lineTo(x + barWidth, y + barH);
      ctx.closePath();
      ctx.fill();

      // Value on top
      ctx.fillStyle = getComputedVar('--color-text-secondary') || '#64748B';
      ctx.font = 'bold 11px Inter, sans-serif';
      ctx.textAlign = 'center';
      ctx.fillText(data.data[i], x + barWidth / 2, y - 6);

      // Label
      ctx.fillStyle = getComputedVar('--color-text-secondary') || '#64748B';
      ctx.font = '11px Inter, sans-serif';
      ctx.fillText(label, x + barWidth / 2, h - padding.bottom + 18);
    });

    // Title
    if (options.title) {
      ctx.fillStyle = getComputedVar('--color-text') || '#0F172A';
      ctx.font = 'bold 13px Inter, sans-serif';
      ctx.textAlign = 'left';
      ctx.fillText(options.title, padding.left, 16);
    }
  }

  // -- LINE CHART --
  function lineChart(canvasId, data, options = {}) {
    const canvas = document.getElementById(canvasId);
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    const dpr = window.devicePixelRatio || 1;
    const rect = canvas.parentElement.getBoundingClientRect();
    canvas.width = rect.width * dpr;
    canvas.height = (options.height || 200) * dpr;
    canvas.style.width = rect.width + 'px';
    canvas.style.height = (options.height || 200) + 'px';
    ctx.scale(dpr, dpr);

    const w = rect.width;
    const h = options.height || 200;
    const padding = { top: 30, right: 20, bottom: 40, left: 45 };
    const chartW = w - padding.left - padding.right;
    const chartH = h - padding.top - padding.bottom;

    const allValues = data.datasets.flatMap(d => d.data);
    const max = Math.max(...allValues) * 1.1;
    const min = Math.min(...allValues) * 0.9;
    const range = max - min;
    const stepX = chartW / (data.labels.length - 1);

    // Grid
    ctx.strokeStyle = getComputedVar('--color-border') || '#E2E8F0';
    ctx.lineWidth = 0.5;
    for (let i = 0; i <= 4; i++) {
      const y = padding.top + (chartH / 4) * i;
      ctx.beginPath();
      ctx.moveTo(padding.left, y);
      ctx.lineTo(w - padding.right, y);
      ctx.stroke();
      ctx.fillStyle = getComputedVar('--color-text-tertiary') || '#94A3B8';
      ctx.font = '11px Inter, sans-serif';
      ctx.textAlign = 'right';
      ctx.fillText(Math.round(max - (range / 4) * i), padding.left - 8, y + 4);
    }

    // Labels
    data.labels.forEach((label, i) => {
      ctx.fillStyle = getComputedVar('--color-text-secondary') || '#64748B';
      ctx.font = '11px Inter, sans-serif';
      ctx.textAlign = 'center';
      ctx.fillText(label, padding.left + i * stepX, h - padding.bottom + 18);
    });

    // Lines
    data.datasets.forEach(ds => {
      ctx.strokeStyle = ds.color;
      ctx.lineWidth = 2.5;
      ctx.lineJoin = 'round';
      ctx.lineCap = 'round';
      ctx.beginPath();

      ds.data.forEach((val, i) => {
        const x = padding.left + i * stepX;
        const y = padding.top + chartH - ((val - min) / range) * chartH;
        if (i === 0) ctx.moveTo(x, y);
        else ctx.lineTo(x, y);
      });
      ctx.stroke();

      // Area fill
      ctx.globalAlpha = 0.06;
      ctx.lineTo(padding.left + (ds.data.length - 1) * stepX, padding.top + chartH);
      ctx.lineTo(padding.left, padding.top + chartH);
      ctx.closePath();
      ctx.fillStyle = ds.color;
      ctx.fill();
      ctx.globalAlpha = 1;

      // Dots
      ds.data.forEach((val, i) => {
        const x = padding.left + i * stepX;
        const y = padding.top + chartH - ((val - min) / range) * chartH;
        ctx.fillStyle = '#FFFFFF';
        ctx.beginPath();
        ctx.arc(x, y, 4, 0, Math.PI * 2);
        ctx.fill();
        ctx.strokeStyle = ds.color;
        ctx.lineWidth = 2;
        ctx.stroke();
      });
    });

    // Legend
    let legendX = padding.left;
    data.datasets.forEach(ds => {
      ctx.fillStyle = ds.color;
      ctx.fillRect(legendX, 8, 12, 3);
      ctx.fillStyle = getComputedVar('--color-text-secondary') || '#64748B';
      ctx.font = '11px Inter, sans-serif';
      ctx.textAlign = 'left';
      ctx.fillText(ds.label, legendX + 16, 14);
      legendX += ctx.measureText(ds.label).width + 32;
    });
  }

  // -- DONUT CHART --
  function donutChart(canvasId, data, options = {}) {
    const canvas = document.getElementById(canvasId);
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    const dpr = window.devicePixelRatio || 1;
    const size = options.size || 160;
    canvas.width = size * dpr;
    canvas.height = size * dpr;
    canvas.style.width = size + 'px';
    canvas.style.height = size + 'px';
    ctx.scale(dpr, dpr);

    const cx = size / 2;
    const cy = size / 2;
    const radius = (size - 20) / 2;
    const lineWidth = options.lineWidth || 20;
    const total = data.data.reduce((a, b) => a + b, 0);
    let startAngle = -Math.PI / 2;

    data.data.forEach((val, i) => {
      const sliceAngle = (val / total) * 2 * Math.PI;
      ctx.beginPath();
      ctx.arc(cx, cy, radius, startAngle, startAngle + sliceAngle);
      ctx.strokeStyle = data.colors[i];
      ctx.lineWidth = lineWidth;
      ctx.lineCap = 'round';
      ctx.stroke();
      startAngle += sliceAngle + 0.04; // gap
    });

    // Center text
    if (options.centerText) {
      ctx.fillStyle = getComputedVar('--color-text') || '#0F172A';
      ctx.font = 'bold 22px Inter, sans-serif';
      ctx.textAlign = 'center';
      ctx.fillText(options.centerText, cx, cy + 2);
      if (options.centerLabel) {
        ctx.fillStyle = getComputedVar('--color-text-secondary') || '#64748B';
        ctx.font = '11px Inter, sans-serif';
        ctx.fillText(options.centerLabel, cx, cy + 18);
      }
    }
  }

  return { barChart, lineChart, donutChart };
})();
