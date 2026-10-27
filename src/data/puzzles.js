export const puzzles = {
  'level-01': { type: 'sequence', title: '部首溯源', instruction: '依照查驗流程排列證物。', parts: ['名冊', '印章', '字形構件卡'], answer: '名冊>印章>字形構件卡', successText: '先確認文件，再核對印記，最後分析字形。' },
  'level-02': { type: 'punctuation', title: '血書斷句', instruction: '選出能保留主客關係的斷句。', parts: ['其人可疑', '其人／可疑', '其／人可疑'], answer: '其人／可疑', successText: '斷句必須讓指涉與語意完整。' },
  'level-03': { type: 'rhetoric', title: '修辭機鋒', instruction: '選出「朱門」在句中的修辭作用。', parts: ['借代', '排比', '設問'], answer: '借代', successText: '以相關事物代替本來要說的對象，是借代。' },
  'level-04': { type: 'grammar', title: '語法格擋', instruction: '標出句子的主語、動詞與受詞關係。', parts: ['誰做什麼', '只看句尾', '只看語氣'], answer: '誰做什麼', successText: '先還原成分功能，才能看出主受詞是否顛倒。' },
  'level-05': { type: 'matching', title: '題辭配對', instruction: '把場合與合宜題辭配成一組。', parts: ['壽誕→祝壽頌德', '壽誕→哀輓悼亡', '壽誕→醫界仁心'], answer: '壽誕→祝壽頌德', successText: '題辭要同時符合對象、場合與目的。' },
  'level-06': { type: 'lookup', title: '藥典檢索', instruction: '不會讀的字要先用哪條索引查找？', parts: ['部首與筆畫', '書架高度', '藥包顏色'], answer: '部首與筆畫', successText: '不依賴讀音時，可用部首與筆畫建立檢索路徑。' },
  'level-07': { type: 'letter', title: '家書鑑定', instruction: '找出最能證明家書偽造的線索。', parts: ['稱謂與身分不合', '紙張有折痕', '墨色略有深淺'], answer: '稱謂與身分不合', successText: '書信格式與身分關係不合，比外觀更具證據力。' },
  'level-08': { type: 'invitation', title: '柬帖校正', instruction: '選出完整且位置正確的請帖資訊。', parts: ['對象／時間／席設／敬辭', '只放金粉花紋', '刪去日期'], answer: '對象／時間／席設／敬辭', successText: '柬帖先求資訊完整，再求格式合宜。' },
  'level-09': { type: 'age', title: '年齡輪盤', instruction: '依文化約定排列年齡稱謂。', parts: ['志學→弱冠→知命', '知命→志學→弱冠', '弱冠→知命→志學'], answer: '志學→弱冠→知命', successText: '密碼核心是稱謂代表的生命階段。' },
  'level-10': { type: 'calendar', title: '歲時日晷', instruction: '把不同時間系統分開，再校正日晷。', parts: ['干支／時辰／節慶', '干支＝節慶', '節慶＝書信格式'], answer: '干支／時辰／節慶', successText: '先分系統，才能建立正確的歲時對應。' },
  'level-11': { type: 'classification', title: '典籍歸卷', instruction: '把正確的分類依據拖入「史部」卷匣。', parts: ['內容與編寫體例', '書匣顏色', '書本厚薄'], answer: '內容與編寫體例', target: '史部卷匣', successText: '分類要回到內容性質與史書體例。' },
  'level-12': { type: 'final', title: '偽詔破陣', instruction: '選出終局論辯的正確起手式。', parts: ['句法／語意／證據', '音量／氣勢／威嚇', '直接奪取玉璽'], answer: '句法／語意／證據', successText: '終局必須以文本分析和證據組織論證。' }
};
