
import { GoogleGenAI, Type } from "@google/genai";

/**
 * 사용자가 입력한 '찾는 후원자 상'과 '메시지 내용'을 바탕으로
 * 전체 후원자 DB에서 가장 적합한 1~3명을 정밀 타겟팅합니다.
 */
export const matchSponsorsAI = async (params: {
  targetQuery: string; // "어떤 사람을 찾는지"에 대한 설명
  messageContent: string; // 실제 보낼 내용
  clubName: string;
}, sponsorsData: any[]) => {
  const { targetQuery, messageContent, clubName } = params;
  const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });
  
  const systemInstruction = `당신은 '엔젤캠퍼스'의 지능형 이메일 아웃리치 매칭 엔진입니다. 
  사용자의 요구사항(targetQuery)과 실제 발송될 이메일 본문(messageContent)을 분석하여, 
  가장 높은 응답률을 보일 최적의 엔젤(후원자)을 데이터베이스에서 선별하는 것이 임무입니다.
  
  선별 기준:
  1. targetQuery에 기술된 페르소나와 후원자의 프로필(interest, description) 유사도.
  2. messageContent에 담긴 프로젝트의 성격과 후원자의 전문 분야 일치도.
  3. 후원자의 유형(INDIVIDUAL/CORPORATE)과 요청 내용의 규모 적합성.
  
  단순한 키워드 매칭을 넘어, 문맥적인 의도를 파악하여 가장 성공 가능성이 높은 상대를 고르세요.`;

  const prompt = `
    [발신 동아리]: ${clubName}
    [검색 타겟 쿼리]: "${targetQuery}"
    [발송될 이메일 본문]: "${messageContent.substring(0, 800)}"
    
    [후원자 데이터베이스]: ${JSON.stringify(sponsorsData.map(s => ({ 
      id: s.id, 
      name: s.name, 
      email: s.email,
      description: s.description, 
      interest: s.interest,
      type: s.type 
    })))}
    
    위 데이터베이스에서 검색 타겟 쿼리와 이메일 본문에 가장 부합하는 후원자 ID를 최대 3명까지 엄선하세요. 
    반드시 리스트에 실존하는 ID만 반환하며, JSON 배열 ["id1", "id2"] 형식으로만 응답하세요.
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
