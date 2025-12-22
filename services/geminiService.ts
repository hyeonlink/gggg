
import { GoogleGenAI, Type } from "@google/genai";

/**
 * 프로젝트 내용과 후원자 데이터를 분석하여 가장 적합한 엔젤 후원자들을 매칭합니다.
 * 'AI 홍보실'의 핵심 엔진입니다.
 */
export const matchSponsorsAI = async (projectDetails: {
  clubName: string;
  projectTitle: string;
  description: string;
}, sponsorsData: any[]) => {
  const { clubName, projectTitle, description } = projectDetails;
  const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });
  
  const systemInstruction = `당신은 '엔젤캠퍼스(Angel Campus)'의 초정밀 매칭 AI 엔진입니다.
  대학 동아리의 프로젝트 제안서를 분석하여, 가장 후원 가능성이 높고 관심 분야가 일치하는 엔젤 후원자를 선별합니다.
  단순한 키워드 매칭을 넘어 프로젝트의 비전과 후원자의 철학적 일치도를 최우선으로 고려하세요.`;

  const prompt = `
    [발신 동아리]: ${clubName}
    [제안 프로젝트]: ${projectTitle}
    [메시지 본문]: ${description}
    
    [잠재 후원자 리스트]: ${JSON.stringify(sponsorsData.map(s => ({ id: s.id, name: s.name, description: s.description, interest: s.interest })))}
    
    위 본문의 톤앤매너와 키워드를 분석하여, 위 리스트 중 가장 적합한 1~3명의 후원자 ID만 엄선하여 JSON 배열(["id1", "id2"]) 형태로 반환하세요.
    반드시 리스트에 존재하는 ID여야 하며, 관련성이 낮다면 1명만 선택해도 무방합니다.
  `;

  try {
    const response = await ai.models.generateContent({
      model: 'gemini-3-flash-preview',
      contents: prompt,
      config: {
        systemInstruction,
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
    사용자 검색어: "${query}"
    동아리 데이터: ${JSON.stringify(clubsData.map(c => ({ id: c.id, name: c.name, description: c.description, tags: c.tags })))}
    
    검색어와 문맥적으로 가장 잘 어울리는 동아리 ID들을 추출하세요. 
    JSON 배열(["id1", "id2"]) 형태로 반환하세요.
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
