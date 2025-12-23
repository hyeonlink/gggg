import React, { useState, useEffect } from 'react';
import Navbar from './components/Navbar.tsx';
import Home from './pages/Home.tsx';
import Clubs from './pages/Clubs.tsx';
import ClubProfile from './pages/ClubProfile.tsx';
import AIAssistant from './pages/AIAssistant.tsx';
import Ranking from './pages/Ranking.tsx';
import Sponsors from './pages/Sponsors.tsx';
import ClubRegistration from './pages/ClubRegistration.tsx';
import AdminDashboard from './pages/AdminDashboard.tsx';
import Auth from './pages/Auth.tsx';
import Landing from './pages/Landing.tsx';
import { MOCK_CLUBS, MOCK_FEED_POSTS, MOCK_SPONSORS } from './constants.tsx';
import { Club, FeedPost, Sponsor } from './types.ts';
import { supabase } from './lib/supabase.ts';

const App: React.FC = () => {
  const [showLanding, setShowLanding] = useState(true);
  const [currentPage, setCurrentPage] = useState('HOME');
  const [selectedClubId, setSelectedClubId] = useState<string | null>(null);
  
  // Data States initialized with Mock data for instant offline-first experience
  const [clubs, setClubs] = useState<Club[]>(MOCK_CLUBS);
  const [posts, setPosts] = useState<FeedPost[]>(MOCK_FEED_POSTS);
  const [sponsors, setSponsors] = useState<Sponsor[]>(MOCK_SPONSORS);
  const [pendingClubs, setPendingClubs] = useState<Club[]>([]);
  const [likedPostIds, setLikedPostIds] = useState<Set<string>>(new Set());
  
  const [isAdminLoggedIn, setIsAdminLoggedIn] = useState(false);
  const [loading, setLoading] = useState(true);
  const [currentUser, setCurrentUser] = useState<any>(null);

  useEffect(() => {
    const initData = async () => {
      setLoading(true);
      try {
        // 1. Auth Session Check
        try {
          const { data: sessionData } = await supabase.auth.getSession();
          if (sessionData?.session?.user) {
            setCurrentUser(sessionData.session.user);
          }
        } catch (e) { console.debug("Supabase Auth unreachable", e); }

        // 2. Fetch Clubs
        try {
          const { data: clubsData, error: clubsError } = await supabase
            .from('clubs')
            .select('*')
            .eq('verification_status', 'VERIFIED');
          
          if (!clubsError && clubsData && clubsData.length > 0) {
            setClubs(clubsData.map(c => ({
              id: c.id,
              name: c.name,
              university: (c.university as any) || 'OTHER',
              category: c.category,
              description: c.description,
              longDescription: c.long_description,
              logo: c.logo_url,
              coverImage: c.cover_url,
              location: c.location,
              memberCount: c.member_count || 0,
              tags: c.tags || [],
              angelScore: c.angel_score || 0,
              totalFunding: Number(c.total_funding || 0),
              verificationStatus: c.verification_status,
              projects: [] 
            })));
          }
        } catch (e) { console.debug("Clubs fetch failed", e); }

        // 3. Fetch Posts
        try {
          const { data: postsData, error: postsError } = await supabase
            .from('posts')
            .select(`
              *,
              clubs (name, logo_url, university)
            `)
            .order('created_at', { ascending: false });

          if (!postsError && postsData && postsData.length > 0) {
            const formattedPosts = postsData.map(p => ({
              id: p.id,
              clubId: p.club_id,
              clubName: (p.clubs as any)?.name || 'Unknown',
              clubLogo: (p.clubs as any)?.logo_url || 'https://picsum.photos/200',
              university: (p.clubs as any)?.university || 'Campus',
              content: p.content,
              image: p.image_url,
              createdAt: p.created_at ? new Date(p.created_at).toLocaleDateString() : 'Unknown',
              likes: p.likes || 0,
              comments: p.comments || 0,
              type: p.type || 'UPDATE'
            }));
            setPosts(formattedPosts as any);
          }
        } catch (e) { console.debug("Posts fetch failed", e); }

        // 4. Fetch Sponsors
        try {
          const { data: sponsorsData, error: sponsorsError } = await supabase.from('sponsors').select('*');
          if (!sponsorsError && sponsorsData && sponsorsData.length > 0) {
            setSponsors(sponsorsData.map(s => ({
              id: s.id,
              name: s.name,
              email: s.email || '',
              type: s.type || 'INDIVIDUAL',
              description: s.description || '',
              interest: s.interest_tags || [],
              totalDonated: Number(s.total_donated || 0),
              logo: s.logo_url || 'https://picsum.photos/100',
              isPartner: s.is_partner || false
            })));
          }
        } catch (e) { console.debug("Sponsors fetch failed", e); }

        // 5. Fetch Pending
        try {
          const { data: pendingData } = await supabase
            .from('clubs')
            .select('*')
            .eq('verification_status', 'PENDING');
          if (pendingData) setPendingClubs(pendingData as any);
        } catch (e) { console.debug("Pending clubs fetch failed", e); }

      } catch (err) {
        console.warn("Global init data error:", err);
      } finally {
        setLoading(false);
      }
    };

    initData();
  }, []);

  const navigateTo = (page: string) => {
    setCurrentPage(page);
    setSelectedClubId(null);
    window.scrollTo(0, 0);
  };

  const selectClub = (id: string) => {
    setSelectedClubId(id);
    setCurrentPage('CLUB_PROFILE');
    window.scrollTo(0, 0);
  };

  const handleLikePost = async (postId: string) => {
    const isCurrentlyLiked = likedPostIds.has(postId);
    const delta = isCurrentlyLiked ? -1 : 1;

    setLikedPostIds(prev => {
      const next = new Set(prev);
      if (isCurrentlyLiked) next.delete(postId);
      else next.add(postId);
      return next;
    });

    setPosts(currentPosts => currentPosts.map(p => {
      if (p.id === postId) return { ...p, likes: Math.max(0, p.likes + delta) };
      return p;
    }));

    try {
      const { data: postData } = await supabase.from('posts').select('likes').eq('id', postId).single();
      if (postData) {
        await supabase
          .from('posts')
          .update({ likes: Math.max(0, postData.likes + delta) })
          .eq('id', postId);
      }
    } catch (err) {
      console.debug("Failed to update likes in DB", err);
    }
  };

  const handleAddPost = async (newPostData: Omit<FeedPost, 'id' | 'createdAt' | 'likes' | 'comments'>) => {
    try {
      const { data, error } = await supabase.from('posts').insert([{
        club_id: newPostData.clubId,
        content: newPostData.content,
        image_url: newPostData.image,
        type: newPostData.type,
        likes: 0,
        comments: 0
      }]).select(`
        *,
        clubs (name, logo_url, university)
      `);
      
      if (error) throw error;

      if (data && data[0]) {
        const savedPost: FeedPost = {
          id: data[0].id,
          clubId: data[0].club_id,
          clubName: (data[0].clubs as any)?.name,
          clubLogo: (data[0].clubs as any)?.logo_url,
          university: (data[0].clubs as any)?.university,
          content: data[0].content,
          image: data[0].image_url,
          createdAt: '방금 전',
          likes: 0,
          comments: 0,
          type: data[0].type as any
        };
        setPosts(prev => [savedPost, ...prev]);
      } else {
        throw new Error("No data returned");
      }
    } catch (err) {
      console.warn("Post Insert Error (using fallback):", err);
      const fallbackPost: FeedPost = {
        id: Math.random().toString(),
        clubId: newPostData.clubId,
        clubName: newPostData.clubName,
        clubLogo: newPostData.clubLogo,
        university: newPostData.university,
        content: newPostData.content,
        image: newPostData.image,
        createdAt: '방금 전',
        likes: 0,
        comments: 0,
        type: newPostData.type as any
      };
      setPosts(prev => [fallbackPost, ...prev]);
    }
  };

  const handleApproveClub = async (clubId: string) => {
    try {
      const { error } = await supabase
        .from('clubs')
        .update({ verification_status: 'VERIFIED' })
        .eq('id', clubId);
      
      if (error) throw error;
      
      const approved = pendingClubs.find(c => c.id === clubId);
      if (approved) {
        setClubs(prev => [...prev, { ...approved, verificationStatus: 'VERIFIED' } as any]);
        setPendingClubs(prev => prev.filter(c => c.id !== clubId));
      }
    } catch (err) {
      console.error("Approval Error:", err);
      alert("서버 연결에 실패했습니다. 잠시 후 다시 시도해주세요.");
    }
  };

  const renderPage = () => {
    if (currentPage === 'ADMIN_DASHBOARD') {
      if (!isAdminLoggedIn) {
        setCurrentPage('HOME');
        return <Home onSelectClub={selectClub} onLikePost={handleLikePost} likedPostIds={likedPostIds} customPosts={posts} />;
      }
      return (
        <AdminDashboard 
          pendingClubs={pendingClubs} 
          allSponsors={sponsors} 
          onApprove={handleApproveClub} 
          onReject={() => {}} 
          onLogout={() => {
            setIsAdminLoggedIn(false);
            navigateTo('HOME');
          }} 
        />
      );
    }

    if (currentPage === 'AUTH') {
      return <Auth onAuthSuccess={(isAdmin) => {
        if (isAdmin) {
          setIsAdminLoggedIn(true);
          navigateTo('ADMIN_DASHBOARD');
        } else {
          navigateTo('HOME');
        }
      }} />;
    }

    if (selectedClubId && currentPage === 'CLUB_PROFILE') {
      const club = clubs.find(c => c.id === selectedClubId);
      if (club) return <ClubProfile club={club} onAddPost={handleAddPost} allPosts={posts} />;
    }

    switch (currentPage) {
      case 'HOME':
        return <Home onSelectClub={selectClub} onLikePost={handleLikePost} likedPostIds={likedPostIds} customPosts={posts} />;
      case 'CLUBS':
        return <Clubs onSelectClub={selectClub} customClubs={clubs} />;
      case 'RANKING':
        return <Ranking onSelectClub={selectClub} customClubs={clubs} />;
      case 'SPONSORS':
        return <Sponsors customSponsors={sponsors} />;
      case 'AI_LAB':
        return <AIAssistant />;
      case 'REGISTER_CLUB':
        return <ClubRegistration onRegister={() => navigateTo('HOME')} />;
      default:
        return <Home onSelectClub={selectClub} onLikePost={handleLikePost} likedPostIds={likedPostIds} customPosts={posts} />;
    }
  };

  if (showLanding) {
    return <Landing onStart={() => setShowLanding(false)} />;
  }

  return (
    <div className="min-h-screen flex flex-col selection:bg-white selection:text-black bg-black">
      {currentPage !== 'ADMIN_DASHBOARD' && (
        <Navbar onNavigate={navigateTo} currentPage={currentPage} />
      )}
      <main className="flex-grow">
        {renderPage()}
      </main>
    </div>
  );
};

export default App;
