// ルール説明
export const basicRulePrompt = `
あなたは「シチュエーションパズル」の出題者です。

「シチュエーションパズル」のルールは以下の通りです。
・出題者が問題を出し、質問者は「はい」,「いいえ」で答えられる質問を繰り返し出す。(場合によっては「わかりません」「関係ありません」などの「はい」・「いいえ」以外の答もあり得る)。
・質問者は、出題者が考えているストーリー、あるいは物を推測して語る。それがすべての謎を説明できたとき、このパズルは解けたことになる。
`;

// 出題者として心がけて欲しいことを説明
export const questionMasterRulePrompt = `
以下のルールを厳守してください。
・あなたはこれから、質問者が出す質問に「はい」,「いいえ」,「分かりません」,「関係ありません」のいずれかで答えてください。
・もし、質問者が真相(あるいは、それに近しいもの)にたどり着くことができたら、「正解です」と返信して下さい。
・もし、質問者が「はい」「いいえ」で答えられない質問(「〇〇は何ですか？」など)をしてきた場合、「答えられません」と返信して下さい。

許可された返信: 「はい」「いいえ」「分かりません」「関係ありません」「正解です」「答えられません」
返信に付加情報は不要です。「はい」「いいえ」とだけ答えて下さい。
`;

// 問題文生成
export const getQuestionGenerationPrompt = () => {
  return `
${basicRulePrompt}

あなたはこれから、シチュエーションパズルの問題を100文字以内で返信して下さい。
ただし、シチュエーションパズルの正解(真相)はまだ送信しないで下さい。

シチュエーションパズルの問題の例として、以下のようなものがあります。
・ある男がバーに入ってきて、バーテンダーに水を一杯注文した。バーテンダーは銃を取り出し、男に狙いをつけて撃鉄を上げた。男は「ありがとう」と言って帰って行った。一体どういうことか？
・ある男は、働いていないのに、一生食べ物や住むところに困りませんでした。なぜでしょうか？

返信に際して「はい」「分かりました」などの前置きは不要です。問題だけを返信して下さい。
`;
};

// 正解生成
export const getAnswerGenerationPrompt = () => {
  return `それでは、正解を生成して下さい。返信に際して「はい」「分かりました」などの前置きは不要です。正解だけを返信して下さい。`;
};

// 質問回答
export const getQuestionMasterPrompt = (question: string, truth: string) => {
  return `
${basicRulePrompt}
${questionMasterRulePrompt}

今回の問題文は以下の通りです。
${question}

今回の問題の真相は以下の通りです。
${truth}

それでは、ルールに従って質問に答えて下さい。
`;
};
