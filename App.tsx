
import React, { useState, useEffect } from 'react';
import Navbar from './components/Navbar.tsx';
import Home from './pages/Home.tsx';
import Clubs from './pages/Clubs.tsx';
import ClubProfile from './pages/ClubProfile.tsx';
import AIAssistant from './pages/AIAssistant.tsx';
import Ranking from './pages/Ranking.tsx';
import Sponsors from './pages/Sponsors.tsx';
import ClubRegistration from './pages/ClubRegistration.tsx';
import AdminLogin from './pages/AdminLogin.tsx';
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
  
  // Data States
  const [clubs, setClubs] = useState<Club[]>([]);
  const [posts, setPosts] = useState<FeedPost[]>([]);
  const [sponsors, setSponsors] = useState<Sponsor[]>([]);
  const [pendingClubs, setPendingClubs] = useState<Club[]>([]);
  const [likedPostIds, setLikedPostIds] = useState<Set<string>>(new Set());
  
  const [isAdminLoggedIn, setIsAdminLoggedIn] = useState(false);
  const [loading, setLoading] = useState(true);
  const [currentUser, setCurrentUser] = useState<any>(null);

  // Initialize and Fetch Real Data
  useEffect(() => {
    const initData = async () => {
      setLoading(true);
      try {
        // 1. Check Auth Status
        const { data: { session } } = await supabase.auth.getSession();
        setCurrentUser(session?.user ?? null);

        // 2. Fetch Verified Clubs
        const { data: clubsData } = await supabase
          .from('clubs')
          .select('*')
          .eq('verification_status', 'VERIFIED');
        
        if (clubsData && clubsData.length > 0) {
          setClubs(clubsData.map(c => ({
            ...c,
            logo: c.logo_url,
            coverImage: c.cover_url,
            longDescription: c.long_description,
            memberCount: c.member_count,
            angelScore: c.angel_score,
            totalFunding: Number(c.total_funding)
          })));
        } else {
          setClubs(MOCK_CLUBS);
        }

        // 3. Fetch Posts with Join
        const { data: postsData } = await supabase
          .from('posts')
          .select(`
            *,
            clubs (name, logo_url, university)
          `)
          .order('created_at', { ascending: false });

        if (postsData && postsData.length > 0) {
          const formattedPosts = postsData.map(p => ({
            id: p.id,
            clubId: p.club_id,
            clubName: p.clubs?.name || 'Unknown',
            clubLogo: p.clubs?.logo_url || 'https://picsum.photos/200',
            university: p.clubs?.university || 'Campus',
            content: p.content,
            image: p.image_url,
            createdAt: new Date(p.created_at).toLocaleDateString(),
            likes: p.likes || 0,
            comments: p.comments || 0,
            type: p.type
          }));
          setPosts(formattedPosts as any);
        } else {
          setPosts(MOCK_FEED_POSTS);
        }

        // 4. Fetch Sponsors
        const { data: sponsorsData } = await supabase.from('sponsors').select('*');
        if (sponsorsData && sponsorsData.length > 0) {
          setSponsors(sponsorsData.map(s => ({
            ...s,
            logo: s.logo_url,
            interest: s.interest_tags,
            totalDonated: Number(s.total_donated)
          })));
        } else {
          setSponsors(MOCK_SPONSORS);
        }

        // 5. Fetch Pending Clubs for Admin
        const { data: pendingData } = await supabase
          .from('clubs')
          .select('*')
          .eq('verification_status', 'PENDING');
        if (pendingData) setPendingClubs(pendingData as any);

      } catch (err) {
        console.error("Supabase Init Error:", err);
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
    const newLikes = isCurrentlyLiked ? -1 : 1;

    // Optimistic Update
    setLikedPostIds(prev => {
      const next = new Set(prev);
      if (isCurrentlyLiked) next.delete(postId);
      else next.add(postId);
      return next;
    });

    setPosts(currentPosts => currentPosts.map(p => {
      if (p.id === postId) return { ...p, likes: p.likes + newLikes };
      return p;
    }));

    try {
      const postToUpdate = posts.find(p => p.id === postId);
      if (postToUpdate) {
        await supabase
          .from('posts')
          .update({ likes: Math.max(0, postToUpdate.likes + newLikes) })
          .eq('id', postId);
      }
    } catch (err) {
      console.error("Like update error:", err);
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
          clubName: data[0].clubs?.name,
          clubLogo: data[0].clubs?.logo_url,
          university: data[0].clubs?.university,
          content: data[0].content,
          image: data[0].image_url,
          createdAt: '방금 전',
          likes: 0,
          comments: 0,
          type: data[0].type as any
        };
        setPosts(prev => [savedPost, ...prev]);
      }
    } catch (err) {
      console.error("Post Insert Error:", err);
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
    }
  };

  const renderPage = () => {
    if (currentPage === 'ADMIN_DASHBOARD') {
      if (!isAdminLoggedIn) return <AdminLogin onLogin={() => setIsAdminLoggedIn(true)} />;
      return (
        <AdminDashboard 
          pendingClubs={pendingClubs} 
          allSponsors={sponsors} 
          onApprove={handleApproveClub} 
          onReject={() => {}} 
          onLogout={() => setIsAdminLoggedIn(false)} 
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
        return <Ranking onSelectClub={selectClub} />;
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
        {loading && currentPage === 'HOME' ? (
          <div className="h-screen flex items-center justify-center bg-black">
             <div className="flex flex-col items-center gap-6">
                <div className="w-10 h-10 border-2 border-white/10 border-t-white rounded-full animate-spin"></div>
                <div className="text-[10px] font-black tracking-[0.5em] text-white/20 uppercase italic">Connecting to Campus Network...</div>
             </div>
          </div>
        ) : renderPage()}
      </main>
    </div>
  );
};

export default App;
