export function renderDialogue(level, state) {
  if (state.phase !== 'dialogue') return '';
  return `
    <section class="dialogue-card">
      <div class="speaker">宮門官</div>
      <p>${level.dialogue.opening}</p>
      <p>${level.dialogue.prompt}</p>
      <div class="choice-list">
        ${level.dialogue.choices.map((choice) => `<button class="choice-button" data-choice="${choice.id}">${choice.label}</button>`).join('')}
      </div>
    </section>`;
}
