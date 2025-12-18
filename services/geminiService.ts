
import { GoogleGenAI, Type } from "@google/genai";

/**
 * 프로젝트 내용과 후원자 데이터를 분석하여 가장 적합한 엔젤 후원자들을 매칭합니다.
 * 가이드라인에 따라 호출 직전에 인스턴스를 생성합니다.
 */
export const matchSponsorsAI = async (projectDetails: {
  clubName: string;
  projectTitle: string;
  description: string;
}, sponsorsData: any[]) => {
  const { clubName, projectTitle, description } = projectDetails;
  
  // 가이드라인: 호출 직전에 인스턴스 생성
  const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });
  
  const systemPrompt = `You are an elite matching AI for university club sponsorship.
  Your goal is to analyze a club's project and find the best 'Angel' sponsors from a provided list.
  Consider the sponsor's interests and description.
  Return only the IDs of the matched sponsors in a JSON array.`;

  const prompt = `
    Club: ${clubName}
    Project: ${projectTitle}
    Content: ${description}
    
    Sponsors List: ${JSON.stringify(sponsorsData.map(s => ({ id: s.id, name: s.name, description: s.description, interest: s.interest })))}
    
    Find 1-3 most relevant sponsor IDs that would likely be interested in this project.
    Return ONLY a JSON array of strings (the IDs).
  `;

  try {
    const response = await ai.models.generateContent({
      model: 'gemini-3-flash-preview',
      contents: prompt,
      config: {
        systemInstruction: systemPrompt,
        responseMimeType: "application/json",
        responseSchema: {
          type: Type.ARRAY,
          items: { type: Type.STRING }
        }
      }
    });
    return JSON.parse(response.text || "[]");
  } catch (error) {
    console.error("AI Matching Error:", error);
    return [];
  }
};

/**
 * 사용자 쿼리에 기반하여 동아리를 검색합니다.
 */
export const searchClubsAI = async (query: string, clubsData: any[]) => {
  const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });
  
  const prompt = `
    Based on the following user query: "${query}"
    And the club data provided: ${JSON.stringify(clubsData.map(c => ({ id: c.id, name: c.name, description: c.description, tags: c.tags })))}
    
    Find the most relevant club IDs. Return ONLY a JSON array of strings containing the IDs.
  `;

  try {
    const response = await ai.models.generateContent({
      model: 'gemini-3-flash-preview',
      contents: prompt,
      config: {
        responseMimeType: "application/json",
        responseSchema: {
          type: Type.ARRAY,
          items: { type: Type.STRING }
        }
      }
    });
    return JSON.parse(response.text || "[]");
  } catch (error) {
    console.error("AI Search Error:", error);
    return [];
  }
};
