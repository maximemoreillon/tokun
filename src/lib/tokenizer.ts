import kuromoji from "kuromoji";

export const tokenizePromiseFactory = (expression: string) =>
  new Promise<kuromoji.IpadicFeatures[]>((resolve, reject) => {
    kuromoji
      .builder({ dicPath: "./node_modules/kuromoji/dict/" })
      .build(function (err, tokenizer) {
        if (err) return reject(err);
        // tokenizer is ready
        var path = tokenizer.tokenize(expression);
        resolve(path);
      });
  });
