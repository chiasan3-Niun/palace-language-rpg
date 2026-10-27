export const level01 = {
  id: 'level-01',
  title: '神武門',
  objective: '完成秀女名冊驗籍',
  scene: '../public/images/backgrounds/BG_01_SHENWUMEN.png',
  character: '../public/images/characters/CH_PROTAGONIST_01_neutral.png',
  knowledge: '漢字形體演變與六書',
  dialogue: {
    opening: '神武門前，宮門官翻開名冊，指向其中一字。',
    prompt: '「此字的字形似乎有人動過手腳。你要如何回應？」',
    choices: [
      { id: 'respectful', label: '請容我依字形與構件仔細辨認。' },
      { id: 'careless', label: '這種小事不必查，照名冊放行即可。' }
    ]
  },
  question: {
    status: 'pending-review',
    prompt: '請根據字形構件與造字意義，判斷這個字最需要先觀察哪一項？',
    options: [
      { id: 'meaning', label: '構件是否共同提示字的意義。' },
      { id: 'sound', label: '只看讀音，不必看字形。' },
      { id: 'stroke', label: '筆畫越多就一定越古老。' },
      { id: 'appearance', label: '字看起來是否漂亮整齊。' }
    ],
    answer: 'meaning',
    reasoning: '判斷六書與字形時，不能只看外觀；要觀察構件和字義、字音之間的關係。',
    wrongReason: '這個判斷忽略了字形構件與造字意義的關係，請重新閱讀題幹。'
  },
  lessonCard: {
    title: '神武門驗籍：先看構件，再判斷造字關係',
    body: '六書判斷不能只靠字的外觀。先觀察構件，再思考它們和字義、字音的關係。',
    sourceStatus: '專案自編，待教師審查'
  }
};
