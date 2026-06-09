import React, { useState, useEffect } from 'react';
import { 
  EncyclopediaView 
} from './components/EncyclopediaView';
import { 
  BrewingToolsView 
} from './components/BrewingToolsView';
import { 
  GameView 
} from './components/GameView';
import { 
  MyProfileView 
} from './components/MyProfileView';
import { 
  PrivacyModal, 
  DeclineModal 
} from './components/PrivacyModal';
import { 
  TimerRecord, 
  GameRecord, 
  UserSettings 
} from './types';
import { playClickSound } from './utils/audio';
import { 
  Compass, 
  Timer, 
  Gamepad2, 
  User, 
  Coffee,
  CheckCircle2
} from 'lucide-react';

export default function App() {
  // Privacy Policy States
  const [showPrivacyModal, setShowPrivacyModal] = useState<boolean>(() => {
    try {
      const accepted = localStorage.getItem('mx_privacy_accepted');
      return !accepted;
    } catch {
      return true;
    }
  });
  const [showAgreementModal, setShowAgreementModal] = useState<string | null>(null);
  const [showDeclineModal, setShowDeclineModal] = useState<boolean>(false);

  // 1. Core Navigation Tabs
  const [currentTab, setCurrentTab] = useState<'encyclopedia' | 'tools' | 'game' | 'my'>('encyclopedia');

  // 2. Cross-view Prepopulation States
  const [selectedTeaForEncyclopedia, setSelectedTeaForEncyclopedia] = useState<string | null>(null);
  const [selectedTeaForTimer, setSelectedTeaForTimer] = useState<string | null>(null);
  const [selectedTeaForGame, setSelectedTeaForGame] = useState<string | null>(null);

  // 3. Persistent Cached States with defaults
  const [favorites, setFavorites] = useState<{ teas: string[]; knowledge: string[] }>(() => {
    try {
      const cached = localStorage.getItem('mx_favorites');
      return cached ? JSON.parse(cached) : { teas: [], knowledge: [] };
    } catch {
      return { teas: [], knowledge: [] };
    }
  });

  const [recentViews, setRecentViews] = useState<string[]>(() => {
    try {
      const cached = localStorage.getItem('mx_recent_views');
      return cached ? JSON.parse(cached) : [];
    } catch {
      return [];
    }
  });

  const [timerHistory, setTimerHistory] = useState<TimerRecord[]>(() => {
    try {
      const cached = localStorage.getItem('mx_timer_history');
      return cached ? JSON.parse(cached) : [];
    } catch {
      return [];
    }
  });

  const [gameHistory, setGameHistory] = useState<GameRecord[]>(() => {
    try {
      const cached = localStorage.getItem('mx_game_history');
      return cached ? JSON.parse(cached) : [];
    } catch {
      return [];
    }
  });

  const [settings, setSettings] = useState<UserSettings>(() => {
    try {
      const cached = localStorage.getItem('mx_settings');
      if (cached) {
        const parsed = JSON.parse(cached);
        // 强制使用深色模式
        return { ...parsed, theme: 'dark' };
      }
      return { soundEnabled: true, theme: 'dark' };
    } catch {
      return { soundEnabled: true, theme: 'dark' };
    }
  });

  // 4. Lightweight Success Toast Overlays ("操作成功轻量化文字提示，无弹窗打扰")
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  const showToast = (message: string) => {
    setToastMessage(message);
    const timer = setTimeout(() => {
      setToastMessage(null);
    }, 2000);
    return () => clearTimeout(timer);
  };

  // Sync state modifications to Local Storage
  useEffect(() => {
    localStorage.setItem('mx_favorites', JSON.stringify(favorites));
  }, [favorites]);

  useEffect(() => {
    localStorage.setItem('mx_recent_views', JSON.stringify(recentViews));
  }, [recentViews]);

  useEffect(() => {
    localStorage.setItem('mx_timer_history', JSON.stringify(timerHistory));
  }, [timerHistory]);

  useEffect(() => {
    localStorage.setItem('mx_game_history', JSON.stringify(gameHistory));
  }, [gameHistory]);

  useEffect(() => {
    localStorage.setItem('mx_settings', JSON.stringify(settings));
  }, [settings]);

  // Core Actions
  const handleNavigate = (tab: 'encyclopedia' | 'tools' | 'game' | 'my') => {
    playClickSound(settings.soundEnabled);
    setCurrentTab(tab);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleSelectTeaForEncyclopedia = (teaId: string) => {
    setSelectedTeaForEncyclopedia(teaId);
    handleNavigate('encyclopedia');
  };

  const handleSelectTeaForTimer = (teaId: string) => {
    setSelectedTeaForTimer(teaId);
    handleNavigate('tools');
  };

  const handleSelectTeaForGame = (teaId: string) => {
    setSelectedTeaForGame(teaId);
    handleNavigate('game');
  };

  const handleToggleFavoriteTea = (teaId: string) => {
    setFavorites(prev => {
      const exists = prev.teas.includes(teaId);
      const nextTeas = exists 
        ? prev.teas.filter(id => id !== teaId)
        : [...prev.teas, teaId];
      
      showToast(exists ? '已取消收藏此茶品' : '已成功收藏此茶品，可于“我的”中查看');
      return { ...prev, teas: nextTeas };
    });
  };

  const handleToggleFavoriteKnowledge = (knowledgeId: string) => {
    setFavorites(prev => {
      const exists = prev.knowledge.includes(knowledgeId);
      const nextKnowledge = exists
        ? prev.knowledge.filter(id => id !== knowledgeId)
        : [...prev.knowledge, knowledgeId];

      showToast(exists ? '已取消收藏此碎金' : '已成功收藏此茶学碎金，可于“我的”中查看');
      return { ...prev, knowledge: nextKnowledge };
    });
  };

  const handleClearAllFavorites = () => {
    setFavorites({ teas: [], knowledge: [] });
    showToast('所有收藏数据均已安全清空');
  };

  const handleAddRecentView = (teaId: string) => {
    setRecentViews(prev => {
      const filtered = prev.filter(id => id !== teaId);
      const nextViews = [teaId, ...filtered].slice(0, 3); // cap at 3 viewed items
      return nextViews;
    });
  };

  const handleAddTimerRecord = (record: TimerRecord) => {
    setTimerHistory(prev => [record, ...prev]);
    showToast(`冲泡完成！标准冲泡记录已录入`);
  };

  const handleAddGameRecord = (record: GameRecord) => {
    setGameHistory(prev => [record, ...prev]);
    showToast(`一泡茶毕！已录入司茗院考核宗卷`);
  };

  const handleClearHistory = () => {
    setTimerHistory([]);
    setGameHistory([]);
    showToast('所有开汤定时及游玩考核记录均已清空');
  };

  const handleUpdateSettings = (newSettings: Partial<UserSettings>) => {
    setSettings(prev => ({ ...prev, ...newSettings }));
  };

  // Privacy Policy Handlers
  const handlePrivacyAccept = () => {
    localStorage.setItem('mx_privacy_accepted', 'true');
    setShowPrivacyModal(false);
    showToast('欢迎使用茗序茶经');
  };

  const handlePrivacyDecline = () => {
    setShowDeclineModal(true);
  };

  const handleDeclineCancel = () => {
    setShowDeclineModal(false);
  };

  const handleDeclineConfirm = () => {
    // Show a message that user can't use the app
    alert('您已拒绝隐私政策，将无法使用本应用。如需使用，请重新安装应用并同意隐私政策。');
    // In a real app, you might want to close the app or redirect
  };

  const handleOpenAgreement = () => {
    setShowAgreementModal(prev => prev === 'agreement' ? null : 'agreement');
  };

  const handleOpenPrivacy = () => {
    setShowAgreementModal(prev => prev === 'privacy' ? null : 'privacy');
  };

  return (
    <div className="dark" id="app_root_theme_wrapper">
      <div 
        className="min-h-screen font-sans antialiased text-stone-200 bg-stone-950 flex flex-col justify-between"
        id="app_main_canvas"
      >
        
        {/* 🏷️ Top Global Branding Header Bar */}
        <header 
          className="sticky top-0 z-30 bg-stone-900/80 backdrop-blur-md border-b border-stone-850 px-6 py-3.5 flex justify-between items-center"
          id="global_header"
        >
          <div className="flex items-center gap-2">
            <div className="p-1.5 bg-emerald-600 text-white rounded-lg flex items-center justify-center shadow-3xs">
              <Coffee className="w-4 h-4" />
            </div>
            <span className="font-serif text-lg font-bold tracking-widest text-stone-100">
              茗序茶经
            </span>
          </div>

          <div className="text-[10px] font-medium font-serif text-emerald-400 bg-emerald-950/30 px-2.5 py-1 rounded-full">
            茗香有序 · 茶经随心
          </div>
        </header>

        {/* 📦 Main Dynamic Scroll Container (Centered beautifully with Desktop limit) */}
        <main className="w-full max-w-2xl mx-auto px-4 pt-5 pb-28 flex-1">
          {currentTab === 'encyclopedia' && (
            <EncyclopediaView
              onNavigate={handleNavigate}
              onSelectTeaTimer={handleSelectTeaForTimer}
              onSelectTeaGame={handleSelectTeaForGame}
              onAddRecentView={handleAddRecentView}
              favorites={favorites}
              onToggleFavoriteTea={handleToggleFavoriteTea}
              selectedTeaId={selectedTeaForEncyclopedia}
              onClearSelectedTeaId={() => setSelectedTeaForEncyclopedia(null)}
              settings={settings}
            />
          )}

          {currentTab === 'tools' && (
            <BrewingToolsView
              onNavigate={handleNavigate}
              onSelectTeaEncyclopedia={handleSelectTeaForEncyclopedia}
              onAddTimerRecord={handleAddTimerRecord}
              prepopulatedTeaId={selectedTeaForTimer}
              onClearPrepopulatedTeaId={() => setSelectedTeaForTimer(null)}
              settings={settings}
            />
          )}

          {currentTab === 'game' && (
            <GameView
              onNavigate={handleNavigate}
              onAddGameRecord={handleAddGameRecord}
              prepopulatedTeaId={selectedTeaForGame}
              onClearPrepopulatedTeaId={() => setSelectedTeaForGame(null)}
              settings={settings}
            />
          )}

          {currentTab === 'my' && (
            <MyProfileView
              onNavigate={handleNavigate}
              onSelectTeaEncyclopedia={handleSelectTeaForEncyclopedia}
              favorites={favorites}
              onToggleFavoriteTea={handleToggleFavoriteTea}
              onToggleFavoriteKnowledge={handleToggleFavoriteKnowledge}
              onClearAllFavorites={handleClearAllFavorites}
              timerHistory={timerHistory}
              gameHistory={gameHistory}
              onClearHistory={handleClearHistory}
              settings={settings}
              onUpdateSettings={handleUpdateSettings}
            />
          )}
        </main>

        {/* ⏱️ Lightweight success Toast Alerts Overlay */}
        {toastMessage && (
          <div 
            className="fixed bottom-24 left-1/2 -translate-x-1/2 z-50 py-2.5 px-4 rounded-xl shadow-md bg-stone-800 text-white text-xs font-medium flex items-center gap-2 border border-stone-700 animate-slide-in-down"
            id="global_floating_toast"
          >
            <CheckCircle2 className="w-4 h-4 text-emerald-400" />
            <span>{toastMessage}</span>
          </div>
        )}

        {/* 📱 Bottom Fixed Navigation Menu Bar (4 fixed tabs) */}
        <nav 
          className="fixed bottom-0 left-0 right-0 mx-auto max-w-2xl z-40 bg-stone-900/98 backdrop-blur-md border-t border-stone-850 px-4 py-2.5 flex justify-around shadow-lg rounded-t-2xl"
          id="global_bottom_navigation"
        >
          {[
            { id: 'encyclopedia', label: '茶叶百科', icon: Compass },
            { id: 'tools', label: '泡茶工具', icon: Timer },
            { id: 'game', label: '泡茶游戏', icon: Gamepad2 },
            { id: 'my', label: '关于我的', icon: User },
          ].map(tab => {
            const matched = currentTab === tab.id;
            const IconComponent = tab.icon;
            return (
              <button
                key={tab.id}
                onClick={() => handleNavigate(tab.id as any)}
                className={`flex flex-col items-center justify-center gap-1 py-1.5 px-3 rounded-xl transition-all duration-300 active:scale-90 ${
                  matched
                    ? 'text-emerald-400 bg-emerald-400/5 font-semibold'
                    : 'text-stone-500 hover:text-stone-300'
                }`}
                id={`nav_btn_${tab.id}`}
              >
                <IconComponent className={`w-4.5 h-4.5 transition-transform duration-300 ${matched ? 'scale-115 text-emerald-400' : ''}`} />
                <span className="text-[10px] tracking-wide">{tab.label}</span>
              </button>
            );
          })}
        </nav>

        {/* Privacy Policy Modal */}
        {showPrivacyModal && (
          <PrivacyModal
            onAccept={handlePrivacyAccept}
            onDecline={handlePrivacyDecline}
            showAgreementModal={showAgreementModal}
            onOpenAgreement={handleOpenAgreement}
            onOpenPrivacy={handleOpenPrivacy}
          />
        )}

        {/* Decline Confirmation Modal */}
        {showDeclineModal && (
          <DeclineModal
            onCancel={handleDeclineCancel}
            onConfirm={handleDeclineConfirm}
          />
        )}

      </div>
    </div>

  );
}
