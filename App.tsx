
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
  
  // States
  const [clubs, setClubs] = useState<Club[]>(MOCK_CLUBS);
  const [posts, setPosts] = useState<FeedPost[]>(MOCK_FEED_POSTS);
  const [sponsors, setSponsors] = useState<Sponsor[]>(MOCK_SPONSORS);
  const [pendingClubs, setPendingClubs] = useState<Club[]>([]);
  const [likedPostIds, setLikedPostIds] = useState<Set<string>>(new Set());
  
  const [isAdminLoggedIn, setIsAdminLoggedIn] = useState(false);
  const [loading, setLoading] = useState(true);

  // Initialize and Fetch Data
  useEffect(() => {
    const initData = async () => {
      setLoading(true);
      try {
        const { data: clubsData } = await supabase.from('clubs').select('*');
        if (clubsData && clubsData.length > 0) setClubs(clubsData);

        const { data: postsData } = await supabase.from('posts').select('*').order('created_at', { ascending: false });
        if (postsData && postsData.length > 0) {
          const formattedPosts = postsData.map(p => ({
            ...p,
            id: p.id.toString(),
            clubId: p.club_id,
            clubName: p.club_name,
            clubLogo: p.club_logo,
            createdAt: p.created_at ? new Date(p.created_at).toLocaleDateString() : '방금 전'
          }));
          setPosts(formattedPosts);
        }
      } catch (err) {
        console.error("Data Sync Error:", err);
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

  const handleLikePost = (postId: string) => {
    setLikedPostIds(prev => {
      const next = new Set(prev);
      const isCurrentlyLiked = next.has(postId);
      
      if (isCurrentlyLiked) {
        next.delete(postId);
      } else {
        next.add(postId);
      }
      
      setPosts(currentPosts => currentPosts.map(p => {
        if (p.id === postId) {
          return {
            ...p,
            likes: isCurrentlyLiked ? p.likes - 1 : p.likes + 1
          };
        }
        return p;
      }));

      return next;
    });
  };

  const handleAddPost = async (newPostData: Omit<FeedPost, 'id' | 'createdAt' | 'likes' | 'comments'>) => {
    try {
      const { data, error } = await supabase.from('posts').insert([{
        club_id: newPostData.clubId,
        club_name: newPostData.clubName,
        club_logo: newPostData.clubLogo,
        university: newPostData.university,
        content: newPostData.content,
        image: newPostData.image,
        type: newPostData.type,
        likes: 0,
        comments: 0
      }]).select();
      
      if (error) throw error;

      if (data && data[0]) {
        const savedPost: FeedPost = {
          ...newPostData,
          id: data[0].id.toString(),
          createdAt: '방금 전',
          likes: 0,
          comments: 0
        };
        setPosts(prev => [savedPost, ...prev]);
      }
    } catch (err) {
      console.error("Post Sync Error:", err);
      const tempPost: FeedPost = { ...newPostData, id: `temp-${Date.now()}`, createdAt: '방금 전', likes: 0, comments: 0 };
      setPosts(prev => [tempPost, ...prev]);
    }
  };

  const renderPage = () => {
    if (currentPage === 'ADMIN_DASHBOARD') {
      if (!isAdminLoggedIn) return <AdminLogin onLogin={() => setIsAdminLoggedIn(true)} />;
      return <AdminDashboard pendingClubs={pendingClubs} allSponsors={sponsors} onApprove={() => {}} onReject={() => {}} onLogout={() => setIsAdminLoggedIn(false)} />;
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
        return <ClubRegistration onRegister={() => {}} />;
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
                <div className="text-[10px] font-black tracking-[0.5em] text-white/20 uppercase">Syncing Data...</div>
             </div>
          </div>
        ) : renderPage()}
      </main>
    </div>
  );
};

export default App;
