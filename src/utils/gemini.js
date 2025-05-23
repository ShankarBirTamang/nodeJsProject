import axios from "axios";

async function promptGemini(product) {
  const geminiUrl = process.env.GEMINI_URL;
  const geminiApiKey = process.env.GEMINI_API_KEY;
  const data = {
    contents: [
      {
        parts: [
          {
            text: `Write a short, engaging product description for the ${product.name}. IList its most important key features, immediately follow with the core benefit of each, and briefly describe the ideal user or situation where this product shines. Keep it lively and persuasive! 
        ProductName : ${product.name} , Brand : ${product.brand} , Category : ${product.category} `,
          },
        ],
      },
    ],
  };
  const response = await axios.post(`${geminiUrl}?key=${geminiApiKey}`, data, {
    headers: {
      "Content-Type": "application/json",
    },
  });
  return response.data.candidates[0]?.content.parts[0].text;
  //   return response.data;
}

export default promptGemini;
