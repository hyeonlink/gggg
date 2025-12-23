
import { GoogleGenAI, Type } from "@google/genai";
import { supabase } from "../lib/supabase.ts";

/**
 * [AI Data Grounding]
 * Supabase DB에서 최신 후원자 데이터를 가져와 Gemini에게 전달합니다.
 */
export const matchSponsorsAI = async (params: {
  targetQuery: string;
  messageContent: string;
  clubName: string;
}) => {
  const { targetQuery, messageContent, clubName } = params;
  const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });
  
  // 1. Fetch Real Sponsors from Supabase instead of relying on passed params
  const { data: sponsorsData } = await supabase
    .from('sponsors')
    .select('id, name, email, description, interest_tags, type');

  if (!sponsorsData || sponsorsData.length === 0) return [];

  const systemInstruction = `당신은 '엔젤캠퍼스'의 지능형 이메일 아웃리치 매칭 엔진입니다. 
  사용자의 요구사항(targetQuery)과 실제 발송될 이메일 본문(messageContent)을 분석하여, 
  가장 높은 응답률을 보일 최적의 엔젤(후원자)을 데이터베이스에서 선별하는 것이 임무입니다.
  
  선별 기준:
  1. targetQuery에 기술된 페르소나와 후원자의 프로필 유사도.
  2. messageContent 프로젝트와 후원자 전문 분야 일치도.
  3. 후원자 유형과 요청 규모 적합성.
  
  반드시 제공된 데이터베이스의 ID만 사용하세요.`;

  const prompt = `
    [발신 동아리]: ${clubName}
    [검색 타겟 쿼리]: "${targetQuery}"
    [발송될 이메일 본문]: "${messageContent.substring(0, 800)}"
    
    [후원자 데이터베이스]: ${JSON.stringify(sponsorsData)}
    
    위 데이터베이스에서 가장 부합하는 후원자 ID를 최대 3명까지 엄선하여 JSON 배열 ["id1", "id2"] 형식으로만 응답하세요.
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

export const searchClubsAI = async (query: string, clubsData: any[]) => {
  const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });
  const prompt = `
    사용자 검색어: "${query}"
    동아리 데이터: ${JSON.stringify(clubsData.map(c => ({ id: c.id, name: c.name, description: c.description, tags: c.tags })))}
    
    검색어와 문맥적으로 가장 잘 어울리는 동아리 ID들을 추출하여 JSON 배열(["id1", "id2"]) 형태로 반환하세요.
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
