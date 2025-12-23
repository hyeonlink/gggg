
import { GoogleGenAI, Type } from "@google/genai";
import { supabase } from "../lib/supabase.ts";

/**
 * [AI Data Grounding]
 * Fetches real sponsor data from Supabase and passes it to Gemini 3 Flash.
 */
export const matchSponsorsAI = async (params: {
  targetQuery: string;
  messageContent: string;
  clubName: string;
}) => {
  const { targetQuery, messageContent, clubName } = params;
  const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });
  
  // 1. Fetch live sponsor data from Supabase
  const { data: sponsorsData } = await supabase
    .from('sponsors')
    .select('id, name, email, description, interest_tags, type');

  if (!sponsorsData || sponsorsData.length === 0) return [];

  const systemInstruction = `당신은 '엔젤캠퍼스'의 지능형 매칭 엔진입니다. 
  동아리의 타겟팅 요구사항(targetQuery)과 이메일 본문(messageContent)을 분석하여, 
  DB에서 가장 적합한 후원자를 선별하세요.
  
  선별 기준:
  1. targetQuery에 기술된 관심사와 후원자의 interest_tags 일치도.
  2. 이메일 본문의 목적과 후원자의 전문 분야(description) 유사성.
  
  반드시 제공된 데이터베이스의 ID만 반환하세요.`;

  const prompt = `
    [발신 동아리]: ${clubName}
    [타겟팅 요구사항]: "${targetQuery}"
    [이메일 본문]: "${messageContent.substring(0, 500)}"
    
    [후원자 데이터베이스]: ${JSON.stringify(sponsorsData)}
    
    위 데이터베이스에서 가장 부합하는 후원자 ID를 최대 3명까지 JSON 배열 ["id1", "id2"] 형식으로만 응답하세요.
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
 * Searches for clubs based on context using Gemini analysis.
 */
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
