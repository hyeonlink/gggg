
import React, { useState } from 'react';
import { matchSponsorsAI } from '../services/geminiService.ts';
import { MOCK_SPONSORS } from '../constants.tsx';
import { Sponsor } from '../types.ts';

const AIAssistant: React.FC = () => {
  const [loading, setLoading] = useState(false);
  const [step, setStep] = useState<'IDLE' | 'MATCHING' | 'SENT'>('IDLE');
  const [matchedSponsors, setMatchedSponsors] = useState<Sponsor[]>([]);
  const [automationLogs, setAutomationLogs] = useState<string[]>([]);
  
  // 가입된 동아리 관리자 이메일 (세션 데이터 시뮬레이션)
  const adminEmail = "club.admin@snu.ac.kr";

  const [formData, setFormData] = useState({
    clubName: '스누 해커스',
    targetQuery: '',
    messageContent: '',
  });

  const addLog = (msg: string) => {
    setAutomationLogs(prev => [...prev, `[${new Date().toLocaleTimeString()}] ${msg}`]);
  };

  const handleAutomatedEmailOutreach = async () => {
    if (!formData.targetQuery.trim()) {
      alert('어떤 후원자를 찾고 있는지 타겟팅 조건을 입력해주세요.');
      return;
    }
    if (!formData.messageContent.trim()) {
      alert('전송할 메시지 내용을 입력해주세요.');
      return;
    }

    setLoading(true);
    setStep('MATCHING');
    setAutomationLogs([]);
    addLog("AI Outreach Engine Initializing...");
    addLog(`Sender identified as: ${admin