import React, { useState } from 'react';
import { Tea, TeaKnowledge, TimerRecord, GameRecord, UserSettings } from '../types';
import { TEA_DATABASE } from '../data/teaDatabase';
import { TEA_KNOWLEDGE_LIST } from '../data/teaKnowledge';
import { playClickSound } from '../utils/audio';
import { AgreementModal, PrivacyPolicyContent } from './PrivacyModal';
import { 
  Heart, 
  Settings, 
  Info, 
  Trash2, 
  Volume2, 
  VolumeX, 
  Search,  
  MapPin, 
  Sparkles,
  BookOpen,
  Coffee,
  RotateCcw,
  Check,
  Shield,
  X
} from 'lucide-react';

interface MyProfileViewProps {
  onNavigate: (tab: 'encyclopedia' | 'tools' | 'game' | 'my') => void;
  onSelectTeaEncyclopedia: (teaId: string) => void;
  favorites: { teas: string[]; knowledge: string[] };
  onToggleFavoriteTea: (teaId: string) => void;
  onToggleFavoriteKnowledge: (knowledgeId: string) => void;
  onClearAllFavorites: () => void;
  timerHistory: TimerRecord[];
  gameHistory: GameRecord[];
  onClearHistory: () => void;
  settings: UserSettings;
  onUpdateSettings: (newSettings: Partial<UserSettings>) => void;
}

type MySubTab = 'favs' | 'settings' | 'about';

export const MyProfileView: React.FC<MyProfileViewProps> = ({
  onNavigate,
  onSelectTeaEncyclopedia,
  favorites,
  onToggleFavoriteTea,
  onToggleFavoriteKnowledge,
  onClearAllFavorites,
  timerHistory,
  gameHistory,
  onClearHistory,
  settings,
  onUpdateSettings,
}) => {
  const [activeSegment, setActiveSegment] = useState<MySubTab>('favs');
  
  // Search state inside Favorites
  const [favSearchQuery, setFavSearchQuery] = useState('');
  
  // Confirms state to prevent accidental destructions
  const [showClearFavsConfirm, setShowClearFavsConfirm] = useState(false);
  const [showClearHistoryConfirm, setShowClearHistoryConfirm] = useState(false);

  // Toggle index for unfolding game history cards
  const [unfoldedGameId, setUnfoldedGameId] = useState<string | null>(null);

  // Privacy Policy States
  const [showPrivacyModal, setShowPrivacyModal] = useState(false);

  // Retrieve actual objects
  const favoritedTeas = favorites.teas
    .map(id => TEA_DATABASE.find(t => t.id === id))
    .filter((t): t is Tea => t !== undefined);

  const favoritedKnowledge = favorites.knowledge
    .map(id => TEA_KNOWLEDGE_LIST.find(k => k.id === id))
    .filter((k): k is TeaKnowledge => k !== undefined);

  // Filtered lists
  const filteredFavTeas = favoritedTeas.filter(t => 
    t.name.toLowerCase().includes(favSearchQuery.toLowerCase()) ||
    t.category.toLowerCase().includes(favSearchQuery.toLowerCase())
  );

  const filteredFavKnowledge = favoritedKnowledge.filter(k =>
    k.title.toLowerCase().includes(favSearchQuery.toLowerCase()) ||
    k.content.toLowerCase().includes(favSearchQuery.toLowerCase())
  );

  const handleToggleUnfoldGame = (id: string) => {
    playClickSound(settings.soundEnabled);
    setUnfoldedGameId(prev => prev === id ? null : id);
  };

  // Human timestamp formatter helper
  const formatTime = (ts: number) => {
    const d = new Date(ts);
    return `${d.getMonth() + 1}月${d.getDate()}日 ${d.getHours().toString().padStart(2, '0')}:${d.getMinutes().toString().padStart(2, '0')}`;
  };

  return (
    <div className="space-y-5 pb-20 animate-fade-in" id="profile_view_viewport">
      
      {/* 👤 Custom Profile Header Display */}
      <div 
        className="rounded-2xl p-6 bg-gradient-to-r from-emerald-800 to-stone-900 border border-emerald-800 shadow-md relative overflow-hidden"
        id="profile_top_user_badge"
      >
        <div className="relative z-10 flex items-center gap-4">
          <div className="w-14 h-14 rounded-full bg-stone-900/20 border-2 border-white/30 backdrop-blur-md flex items-center justify-center font-serif text-2xl font-bold text-white">
            茗
          </div>
          <div className="space-y-1">
            <h2 className="font-serif text-lg font-bold tracking-wide text-white">雅鉴茶人</h2>
            <p className="text-[11px] text-emerald-100 italic">
              茗香有序，茶经随心
            </p>
          </div>
        </div>

        {/* Floating Background vector decoration */}
        <div className="absolute top-0 right-0 p-4 opacity-5 pointer-events-none select-none">
          <Coffee className="w-36 h-36" />
        </div>
      </div>

      {/* 🧭 Top sub-segment menu */}
      <div 
        className="grid grid-cols-3 gap-1 p-1 bg-stone-900 rounded-xl text-center text-xs font-medium"
        id="profile_sub_menu"
      >
        {[
          { id: 'favs', label: '我的收藏', icon: Heart },
          { id: 'settings', label: '系统设置', icon: Settings },
          { id: 'about', label: '关于茶经', icon: Info },
        ].map(seg => {
          const matched = activeSegment === seg.id;
          const IconComponent = seg.icon;
          return (
            <button
              key={seg.id}
              onClick={() => {
                playClickSound(settings.soundEnabled);
                setActiveSegment(seg.id as MySubTab);
              }}
              className={`flex flex-col items-center gap-1.5 py-2.5 rounded-lg transition-all duration-200 ${
                matched
                  ? 'bg-stone-800 text-emerald-400 font-bold shadow-3xs'
                  : 'text-stone-400 hover:text-stone-200'
              }`}
            >
              <IconComponent className="w-4 h-4" />
              <span>{seg.label}</span>
            </button>
          );
        })}
      </div>

      {/* =========================================================================
         PANEL 1: MY FAVORITES (我的收藏)
         ========================================================================= */}
      {activeSegment === 'favs' && (
        <div className="space-y-4 animate-fade-in animate-duration-200" id="profile_tab_favs">
          
          {/* Quick Search box for favorites */}
          <div className="relative" id="fav_search_bar_container">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-stone-400" />
            <input
              type="text"
              placeholder="在我的收藏中搜索..."
              value={favSearchQuery}
              onChange={(e) => setFavSearchQuery(e.target.value)}
              className="w-full pl-9 pr-8 py-2 rounded-xl text-xs bg-stone-900 border border-stone-800 text-stone-100 focus:outline-hidden"
            />
          </div>

          <div className="space-y-4" id="favs_list_wrapper">
            
            {/* Category A: Favorited Teas */}
            <div className="space-y-2">
              <div className="flex justify-between items-center px-1">
                <span className="font-serif text-button text-xs font-bold text-stone-200 flex items-center gap-1">
                  <span className="w-1.5 h-3.5 bg-emerald-500 rounded-full"></span>
                  收藏的茶品 ({filteredFavTeas.length} 款)
                </span>
              </div>

              {filteredFavTeas.length === 0 ? (
                <div className="text-center py-6 px-4 rounded-xl border border-dashed border-stone-700 bg-stone-800/50 text-stone-400 text-xs">
                  {favSearchQuery ? '无匹配收藏茶品' : '尚未收藏任何茶种，可前往“茶百科”阅读时点击心形标志。'}
                </div>
              ) : (
                <div className="grid grid-cols-1 gap-2" id="fav_teas_deck">
                  {filteredFavTeas.map(tea => {
                    return (
                      <div
                        key={tea.id}
                        className="p-3 bg-stone-800 rounded-lg border border-stone-700 flex justify-between items-center group hover:border-emerald-600/30 transition-all duration-200"
                        id={`fav_tea_item_${tea.id}`}
                      >
                        <div 
                          onClick={() => {
                            playClickSound(settings.soundEnabled);
                            onSelectTeaEncyclopedia(tea.id);
                          }}
                          className="cursor-pointer space-y-1.5 select-none"
                        >
                          <div className="flex items-center gap-1.5">
                            <span className="text-[9px] bg-stone-700 text-stone-300 px-1.5 py-0.2 rounded">
                              {tea.category}
                            </span>
                            <span className="text-xs font-medium text-stone-100 group-hover:text-emerald-400 transition-colors">
                              {tea.name}
                            </span>
                          </div>
                          <p className="text-[10px] text-stone-400 flex items-center gap-0.5 truncate max-w-xs">
                            <MapPin className="w-3 h-3 shrink-0" /> {tea.origin.split('（')[0]}
                          </p>
                        </div>

                        <button
                          onClick={() => {
                            playClickSound(settings.soundEnabled);
                            onToggleFavoriteTea(tea.id);
                          }}
                          className="p-2 text-rose-500 hover:bg-rose-50 hover:bg-rose-950/20 rounded-full transition-colors"
                          title="取消收藏"
                        >
                          <Heart className="w-4 h-4 fill-current animate-pulse" />
                        </button>
                      </div>
                    );
                  })}
                </div>
              )}
            </div>

            {/* Aggregate Clear Buttons */}
            {(favoritedTeas.length > 0 || favoritedKnowledge.length > 0) && (
              <div className="pt-4 border-t border-dashed border-stone-800 border-stone-800 flex justify-center">
                {showClearFavsConfirm ? (
                  <div className="p-3 bg-rose-500/5 rounded-xl border border-rose-500/10 text-center w-full max-w-xs space-y-2">
                    <p className="text-[10px] text-rose-850 text-rose-400 font-semibold">确认要批量清空全部收藏的数据吗？此操作无法挽回</p>
                    <div className="flex gap-2 justify-center">
                      <button
                        onClick={() => setShowClearFavsConfirm(false)}
                        className="px-3 py-1 bg-stone-200 hover:bg-stone-300 text-stone-300 text-[10px] font-bold rounded"
                      >
                        保留
                      </button>
                      <button
                        onClick={() => {
                          playClickSound(settings.soundEnabled);
                          onClearAllFavorites();
                          setShowClearFavsConfirm(false);
                        }}
                        className="px-3 py-1 bg-rose-600 hover:bg-rose-700 text-white text-[10px] font-bold rounded"
                      >
                        狠心清空
                      </button>
                    </div>
                  </div>
                ) : (
                  <button
                    onClick={() => setShowClearFavsConfirm(true)}
                    className="flex items-center gap-1 text-[11px] text-stone-400 hover:text-rose-650 transition-colors"
                    id="btn_purge_favorites"
                  >
                    <Trash2 className="w-3.5 h-3.5" /> 清空全部收藏记录
                  </button>
                )}
              </div>
            )}

          </div>
        </div>
      )}

      {/* =========================================================================
         PANEL 3: SYSTEM PREFERENCE SETTINGS (系统设置)
         ========================================================================= */}
      {activeSegment === 'settings' && (
        <div className="space-y-4 animate-fade-in animate-duration-200" id="profile_tab_settings">
          <div className="p-4 rounded-xl bg-stone-900 bg-stone-900 border border-stone-800 border-stone-800 space-y-4 shadow-3xs">
            <h3 className="font-serif text-sm font-bold text-stone-100 text-stone-100 pb-2 border-b border-stone-800 border-stone-850">
              设置偏好状态
            </h3>

            {/* Audio switch toggle */}
            <div className="flex justify-between items-center py-1">
              <div className="space-y-0.5">
                <span className="text-xs font-bold text-stone-200 text-stone-200">禅钟冲完铃声及按键反馈音</span>
                <p className="text-[10px] text-stone-400 text-stone-400">计时结束或按钮交互时播放温馨音律</p>
              </div>

              <button
                onClick={() => {
                  playClickSound(!settings.soundEnabled);
                  onUpdateSettings({ soundEnabled: !settings.soundEnabled });
                }}
                className={`py-1.5 px-3.5 rounded-lg text-xs font-bold font-serif flex items-center gap-1 border transition-all ${
                  settings.soundEnabled
                    ? 'bg-emerald-50 text-emerald-800 border-emerald-300'
                    : 'bg-stone-950 text-stone-405 border-stone-800'
                }`}
                id="btn_toggle_audio"
              >
                {settings.soundEnabled ? (
                  <>
                    <Volume2 className="w-4 h-4 text-emerald-600 animate-pulse" />
                    <span>音效：已开</span>
                  </>
                ) : (
                  <>
                    <VolumeX className="w-4 h-4" />
                    <span>音效：已静</span>
                  </>
                )}
              </button>
            </div>

            {/* Privacy Policy Toggle Button */}
            <div className="flex justify-between items-center py-1 border-t border-stone-800 border-stone-850 pt-3">
              <div className="space-y-0.5">
                <span className="text-xs font-bold text-stone-200 text-stone-200">应用隐私政策条款</span>
                <p className="text-[10px] text-stone-400 text-stone-400">查阅关于本应用的数据存储与自主权说明</p>
              </div>

              <button
                onClick={() => {
                  playClickSound(settings.soundEnabled);
                  setShowPrivacyModal(true);
                }}
                className="py-1.5 px-3.5 rounded-lg text-xs font-bold font-serif flex items-center gap-1.5 border border-stone-800 border-stone-800 bg-stone-950 bg-stone-900 text-stone-300 text-stone-300 hover:bg-stone-800 hover:bg-stone-800 transition-all shadow-3xs"
                id="btn_view_privacy"
              >
                <Shield className="w-3.5 h-3.5 text-emerald-600 text-emerald-400" />
                <span>隐私政策</span>
              </button>
            </div>



          </div>
        </div>
      )}

      {/* =========================================================================
         PANEL 4: ABOUT APP PHILOSOPHY (关于页面)
         ========================================================================= */}
      {activeSegment === 'about' && (
        <div className="space-y-4 animate-fade-in animate-duration-200" id="profile_tab_about">
          <div className="p-6 rounded-2xl bg-stone-900 bg-stone-900 border border-stone-800 border-stone-800 space-y-4 shadow-sm text-center">
            
            <div className="flex justify-center mb-1">
              <div className="w-16 h-16 rounded-2xl bg-emerald-50 bg-emerald-950/20 text-emerald-700 text-emerald-400 flex items-center justify-center font-serif text-3xl font-extrabold shadow-3xs border border-emerald-100 border-emerald-900/60">
                学
              </div>
            </div>

            <div className="space-y-1">
              <h3 className="font-serif text-lg font-bold text-stone-100 text-stone-100">茗序茶经</h3>
              <p className="text-xs text-stone-400 font-mono">版本：v1.0</p>
            </div>

            <p className="text-stone-605 text-stone-350 text-xs leading-relaxed text-left p-4 bg-stone-950 bg-stone-950/30 rounded-xl border border-stone-110 border-dashed">
              《茗序茶经》是在陆羽《茶经》精神启发下开发的一款茶学修行工具。
              我们立志推崇纯粹自然、无打扰的茶汤时光。愿这一杯清茶，在快节奏的现代生活中，带给您三分钟安宁与祥和。
            </p>

            <div className="text-[10px] text-stone-400 mt-4 italic font-serif">
              “茗香有序，茶经随心。”
            </div>
          </div>
        </div>
      )}

      {/* 🔒 PRIVACY POLICY MODAL OVERLAY (直接显示隐私政策内容) */}
      {showPrivacyModal && (
        <AgreementModal
          onClose={() => {
            playClickSound(settings.soundEnabled);
            setShowPrivacyModal(false);
          }}
          title="隐私政策"
          content={<PrivacyPolicyContent />}
        />
      )}

    </div>
  );
};
