
import { Club, CommunityPost, Sponsor, FeedPost } from './types.ts';

export const MOCK_CLUBS: Club[] = [
  {
    id: '1',
    name: '스누 해커스 (SNU Hackers)',
    university: 'SNU',
    category: 'IT/코딩',
    description: '서울대학교 최고의 화이트해커 및 보안 전문가 모임',
    longDescription: '우리는 보안과 개발의 경계를 허무는 기술 중심의 커뮤니티입니다. 매년 정기 해커톤을 개최하며 실전 보안 기술을 연구합니다.',
    logo: 'https://picsum.photos/seed/snu1/200/200',
    coverImage: 'https://images.unsplash.com/photo-1550751827-4bd374c3f58b?q=80&w=1200&auto=format&fit=crop',
    location: '서울대학교 관악캠퍼스',
    memberCount: 45,
    tags: ['보안', '코딩', '해커톤'],
    projects: [
      {
        id: 'p1',
        title: '2024 SNU 글로벌 보안 컨퍼런스',
        description: '차세대 보안 리더들을 위한 대규모 컨퍼런스 개최 후원 요청',
        goalAmount: 10000000,
        currentAmount: 7200000,
        imageUrl: 'https://images.unsplash.com/photo-1517245386807-bb43f82c33c4?q=80&w=800&auto=format&fit=crop',
        status: 'ACTIVE',
        reports: [],
        rewards: [
          { id: 'r1', title: '컨퍼런스 VIP 패스', minAmount: 50000, description: '앞좌석 우선 배정 및 공식 굿즈' }
        ]
      }
    ],
    angelScore: 985,
    totalFunding: 24500000
  },
  {
    id: '2',
    name: '연세 재즈 (Yonsei Jazz)',
    university: 'YONSEI',
    category: '음악/예술',
    description: '연세의 밤을 연주하는 정통 재즈 앙상블',
    longDescription: '블루지한 감성부터 모던 재즈까지, 연세대학교를 대표하는 유서 깊은 재즈 동아리입니다.',
    logo: 'https://picsum.photos/seed/yonsei1/200/200',
    coverImage: 'https://images.unsplash.com/photo-1415201364774-f6f0bb35f28f?q=80&w=1200&auto=format&fit=crop',
    location: '연세대학교 신촌캠퍼스',
    memberCount: 32,
    tags: ['재즈', '공연', '앙상블'],
    projects: [],
    angelScore: 840,
    totalFunding: 12000000
  },
  {
    id: '3',
    name: '고대 응원단 서포터즈',
    university: 'KOREA',
    category: '스포츠',
    description: '민족 고대의 열정, 응원 문화의 리더',
    longDescription: '응원 문화의 정수를 보여주는 고려대학교 응원단입니다.',
    logo: 'https://picsum.photos/seed/korea1/200/200',
    coverImage: 'https://images.unsplash.com/photo-1540747913346-19e32dc3e97e?q=80&w=1200&auto=format&fit=crop',
    location: '고려대학교 안암캠퍼스',
    memberCount: 120,
    tags: ['열정', '응원', '전통'],
    projects: [],
    angelScore: 920,
    totalFunding: 18000000
  }
];

export const MOCK_FEED_POSTS: FeedPost[] = [
  {
    id: 'f1',
    clubId: '1',
    clubName: '스누 해커스',
    clubLogo: 'https://picsum.photos/seed/snu1/200/200',
    university: '서울대학교',
    content: '드디어 2024 SNU 글로벌 보안 컨퍼런스의 1차 라인업이 확정되었습니다! 이번 컨퍼런스를 위해 후원해주신 엔젤님들 덕분에 해외 유명 연사 3분을 모실 수 있게 되었습니다. 6월 15일, 관악에서 뵙겠습니다.',
    image: 'https://images.unsplash.com/photo-1550751827-4bd374c3f58b?q=80&w=1200&auto=format&fit=crop',
    createdAt: '2시간 전',
    likes: 124,
    comments: 18,
    type: 'REPORT',
    projectId: 'p1'
  },
  {
    id: 'f2',
    clubId: '2',
    clubName: '연세 재즈',
    clubLogo: 'https://picsum.photos/seed/yonsei1/200/200',
    university: '연세대학교',
    content: '이번 주 금요일 신촌역 광장에서 버스킹을 진행합니다. 겨울 정기 공연을 위한 마지막 리허설이기도 합니다. 지나가다 들러서 저희의 선율을 즐겨주세요!',
    image: 'https://images.unsplash.com/photo-1511192336575-5a79af67a629?q=80&w=1200&auto=format&fit=crop',
    createdAt: '5시간 전',
    likes: 86,
    comments: 4,
    type: 'UPDATE'
  },
  {
    id: 'f3',
    clubId: '3',
    clubName: '고대 응원단 서포터즈',
    clubLogo: 'https://picsum.photos/seed/korea1/200/200',
    university: '고려대학교',
    content: '신입 단원 오리엔테이션 현장입니다! 붉은 함성의 주인공이 될 40명의 새로운 얼굴들을 환영해주세요. 엔젤님들의 후원으로 단복 셋팅이 완료되었습니다.',
    image: 'https://images.unsplash.com/photo-1540747913346-19e32dc3e97e?q=80&w=1200&auto=format&fit=crop',
    createdAt: '1일 전',
    likes: 230,
    comments: 21,
    type: 'UPDATE'
  }
];

export const MOCK_SPONSORS: Sponsor[] = [
  {
    id: 's1',
    name: '김엔젤',
    type: 'INDIVIDUAL',
    description: 'IT 스타트업 창업가로서 열정 있는 공대 동아리들을 후원합니다.',
    interest: ['보안', 'AI', '창업'],
    totalDonated: 15000000,
    logo: 'https://picsum.photos/seed/angel1/100/100',
    isPartner: false
  },
  {
    id: 's2',
    name: '현대자동차 테크팀',
    type: 'CORPORATE',
    description: '미래 모빌리티를 연구하는 동아리들과 파트너십을 맺고 있습니다.',
    interest: ['자율주행', '로보틱스', '임베디드'],
    totalDonated: 50000000,
    logo: 'https://picsum.photos/seed/h-logo/100/100',
    isPartner: true
  }
];

export const MOCK_POSTS: CommunityPost[] = [
  {
    id: '1',
    author: '스누해커스_회장',
    authorRole: 'CLUB',
    title: '동아리 후원금 투명하게 공개하는 법',
    content: '엔젤캠퍼스 플랫폼을 쓰면서 가장 좋았던 건...',
    createdAt: '2024-05-20',
    views: 1542,
    likes: 89,
    comments: 15
  }
];
