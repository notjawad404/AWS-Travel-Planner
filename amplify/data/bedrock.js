export function request(ctx) {

    const { interests = [] } = ctx.args;

    const prompt = `I am planning a trip and I am interested in ${interests.join(', ')}. Can you suggest some travel destinations and activities for me?`;
    return {
        resourcePath: 'travel-planner/amplify/data/bedrock.js',
        method: 'POST',
        params: {
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                anthropic_version: 'bedrock-2023-05-31',
                max_tokens: 1000,
                messages: [
                    {
                        role: 'user',
                        content: [
                            {
                                type: 'text',
                                text: `\n\nHuman: ${prompt}\n\nAssistant:`
                            }
                        ]
                    }
                ]
            })
        },
    };
}

export function response(ctx) {
    const parsedBody = JSON.parse(ctx.result.body);
    const res = {
        body: parsedBody.content[0].text || 'No response from the model.',
    };
    return res;
}
