import kuromoji from "kuromoji";

const tokenizePromiseFactory = (expression: string) =>
  new Promise((resolve, reject) => {
    kuromoji
      .builder({ dicPath: "./node_modules/kuromoji/dict/" })
      .build(function (err, tokenizer) {
        if (err) return reject(err);
        // tokenizer is ready
        var path = tokenizer.tokenize(expression);
        resolve(path);
      });
  });

export async function POST(event) {
  const body = await event.request.json();

  const tokens = await tokenizePromiseFactory(body.text);

  console.log(tokens);

  return new Response(JSON.stringify(tokens), {
    status: 200,
    headers: { "Content-Type": "application/json" },
  });
}
