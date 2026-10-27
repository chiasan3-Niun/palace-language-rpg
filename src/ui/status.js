export function renderStatus(state) {
  return `
    <section class="status-panel" aria-label="角色狀態">
      <div class="status-row"><span>容止值</span><strong>${state.composure}/100</strong></div>
      <div class="bar"><span class="bar-fill composure" style="width:${state.composure}%"></span></div>
      <div class="status-row"><span>才情值</span><strong>${state.talent}/100</strong></div>
      <div class="bar"><span class="bar-fill talent" style="width:${state.talent}%"></span></div>
      ${state.suspicion !== undefined ? `<div class="status-row"><span>皇上猜忌值</span><strong>${state.suspicion}/100</strong></div><div class="bar"><span class="bar-fill suspicion" style="width:${state.suspicion}%"></span></div>` : ''}
    </section>`;
}
