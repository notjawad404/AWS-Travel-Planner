import type {Schema} from "../../data/resource";

const GROQ_URL = "https://api.groq.com/openai/v1/chat/completions";
const GROQ_MODEL = "openai/gpt-oss-120b";


export const handler: Schema["askTrip"]["functionHandler"] = async (event) => {
    const apiKey = process.env.GROQ_API_KEY;
    console.log("GROQ_API_KEY set:", Boolean(apiKey), "length:", apiKey?.length ?? 0, "value:", apiKey ? `${apiKey.slice(0, 4)}...${apiKey.slice(-4)}` : "(missing)");

    const interests = (event.arguments.interests ?? []).filter(Boolean);
    const prompt = `You are a travel planner. Based on the following interests: ${interests.join(", ")}, provide a detailed travel itinerary with recommendations for destinations, activities, and accommodations.`;

    try{
        const res = await fetch(GROQ_URL, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                "Authorization": `Bearer ${process.env.GROQ_API_KEY}`,
            },
            body: JSON.stringify({
                model: GROQ_MODEL,
                messages: [
                    {
                        role: "user",
                        content: prompt,
                    },
                ],
                max_tokens: 4000,
            }),
        });

        if (!res.ok) {
            return {error: `Groq request failed with status (${res.status}): ${await res.text()}`};

        }

        const json = await res.json();
        return {body: json.choices?.[0]?.message?.content ?? "No response from Groq."};
    } catch (error) {
        return {error: `Unexpected error: ${error}`};
    }
}