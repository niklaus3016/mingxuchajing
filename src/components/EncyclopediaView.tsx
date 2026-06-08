import React, { useState, useEffect } from 'react';
import { Tea, UserSettings } from '../types';
import { TEA_DATABASE } from '../data/teaDatabase';
import { playClickSound } from '../utils/audio';
import { 
  Search, 
  MapPin, 
  Settings, 
  Heart, 
  Timer, 
  Gamepad2, 
  X, 
  Briefcase, 
  Sparkles, 
  Info,
  Layers,
  Flame,
  Scale,
  Clock,
  CupSoda,
  Home,
  Archive,
  AlertTriangle,
  Compass,
  Thermometer,
  Coffee
} from 'lucide-react';

interface EncyclopediaViewProps {
  onNavigate: (tab: 'encyclopedia' | 'tools' | 'game' | 'my') => void;
  onSelectTeaTimer: (teaId: string) => void;
  onSelectTeaGame: (teaId: string) => void;
  onAddRecentView: (teaId: string) => void;
  favorites: { teas: string[] };
  onToggleFavoriteTea: (teaId: string) => void;
  selectedTeaId: string | null;
  onClearSelectedTeaId: () => void;
  settings: UserSettings;
}

const CATEGORIES: Tea['category'][] = ['绿茶', '红茶', '乌龙茶', '白茶', '黄茶', '黑茶', '普洱', '花茶'];

export const EncyclopediaView: React.FC<EncyclopediaViewProps> = ({
  onNavigate,
  onSelectTeaTimer,
  onSelectTeaGame,
  onAddRecentView,
  favorites,
  onToggleFavoriteTea,
  selectedTeaId,
  onClearSelectedTeaId,
  settings,
}) => {
  const [selectedCategory, setSelectedCategory] = useState<Tea['category']>('绿茶');
  const [searchQuery, setSearchQuery] = useState('');
  const [activeTea, setActiveTea] = useState<Tea | null>(null);

  // Bind activeTea state to passed prop selectedTeaId
  useEffect(() => {
    if (selectedTeaId) {
      const match = TEA_DATABASE.find(t => t.id === selectedTeaId);
      if (match) {
        setActiveTea(match);
        onAddRecentView(match.id);
      }
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [selectedTeaId]);

  const handleSelectTea = (tea: Tea) => {
    playClickSound(settings.soundEnabled);
    setActiveTea(tea);
    onAddRecentView(tea.id);
  };

  const handleCloseDetail = () => {
    playClickSound(settings.soundEnabled);
    setActiveTea(null);
    onClearSelectedTeaId();
  };

  // Filter logic: category filter OR overall search match
  const filteredTeas = TEA_DATABASE.filter(tea => {
    const matchesSearch = 
      tea.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      tea.category.toLowerCase().includes(searchQuery.toLowerCase()) ||
      tea.taste.toLowerCase().includes(searchQuery.toLowerCase()) ||
      tea.origin.toLowerCase().includes(searchQuery.toLowerCase());

    if (searchQuery.trim() !== '') {
      return matchesSearch;
    } else {
      return tea.category === selectedCategory;
    }
  });

  // Color mapping based on tea categories for beautiful styles
  const categoryThemes: Record<Tea['category'], {
    primary: string;
    bg: string;
    badge: string;
    text: string;
    border: string;
  }> = {
    '绿茶': { primary: 'emerald', bg: 'bg-emerald-50 dark:bg-emerald-950/20', badge: 'bg-emerald-100 dark:bg-emerald-900/30 text-emerald-800 dark:text-emerald-300', text: 'text-emerald-700 dark:text-emerald-400', border: 'border-emerald-200 dark:border-emerald-900/40' },
    '红茶': { primary: 'rose', bg: 'bg-rose-50 dark:bg-rose-950/20', badge: 'bg-rose-100 dark:bg-rose-900/30 text-rose-800 dark:text-rose-300', text: 'text-rose-700 dark:text-rose-400', border: 'border-rose-200 dark:border-rose-900/40' },
    '乌龙茶': { primary: 'amber', bg: 'bg-amber-50 dark:bg-amber-950/20', badge: 'bg-amber-100 dark:bg-amber-900/30 text-amber-800 dark:text-amber-300', text: 'text-amber-700 dark:text-amber-400', border: 'border-amber-200 dark:border-amber-900/40' },
    '白茶': { primary: 'slate', bg: 'bg-slate-100/50 dark:bg-slate-800/30', badge: 'bg-slate-200/50 dark:bg-slate-800 text-slate-800 dark:text-slate-300', text: 'text-slate-700 dark:text-slate-400', border: 'border-slate-200 dark:border-slate-700/60' },
    '黄茶': { primary: 'yellow', bg: 'bg-yellow-50 dark:bg-yellow-950/20', badge: 'bg-yellow-105 dark:bg-yellow-905/30 text-yellow-800 dark:text-yellow-300', text: 'text-yellow-700 dark:text-yellow-400', border: 'border-yellow-200 dark:border-yellow-900/40' },
    '黑茶': { primary: 'stone', bg: 'bg-stone-105 dark:bg-stone-900/20', badge: 'bg-stone-100 dark:bg-stone-800 text-stone-800 dark:text-stone-300', text: 'text-stone-700 dark:text-stone-400', border: 'border-stone-250 dark:border-stone-800' },
    '普洱': { primary: 'orange', bg: 'bg-orange-50 dark:bg-orange-950/20', badge: 'bg-orange-100 dark:bg-orange-900/30 text-orange-850 dark:text-orange-300', text: 'text-orange-700 dark:text-orange-400', border: 'border-orange-200 dark:border-orange-900/40' },
    '花茶': { primary: 'purple', bg: 'bg-purple-50 dark:bg-purple-950/20', badge: 'bg-purple-100 dark:bg-purple-900/30 text-purple-800 dark:text-purple-300', text: 'text-purple-700 dark:text-purple-400', border: 'border-purple-200 dark:border-purple-900/40' }
  };

  const isFavorite = (id: string) => favorites.teas.includes(id);

  return (
    <div className="space-y-5 pb-20 animate-fade-in" id="encyclopedia_view_container">
      
      {/* Search Header */}
      <div className="space-y-3" id="encyclopedia_search_header">
        <div>
          <h2 className="font-serif text-xl font-bold text-stone-900 dark:text-stone-100 flex items-center gap-1.5">
            <span>茶百科</span>
          </h2>
          <p className="text-xs text-stone-500 dark:text-stone-400 mt-1">
            探寻东方茶史，饱览茶品工艺。
          </p>
        </div>

        {/* Search Input Box */}
        <div className="relative" id="tea_search_input_container">
          <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-stone-400" />
          <input
            type="text"
            placeholder="搜索茶名、产地、香气描述..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-10 pr-9 py-2 rounded-xl text-sm bg-white dark:bg-stone-900 border border-stone-200 dark:border-stone-800 text-stone-850 dark:text-stone-100 placeholder-stone-400 dark:placeholder-stone-550 focus:outline-hidden focus:ring-1 focus:ring-emerald-600 focus:border-transparent transition-all duration-200 shadow-3xs"
          />
          {searchQuery && (
            <button
              onClick={() => setSearchQuery('')}
              className="absolute right-3 top-1/2 -translate-y-1/2 p-0.5 rounded-full hover:bg-stone-100 dark:hover:bg-stone-850 text-stone-400"
            >
              <X className="w-3 h-3" />
            </button>
          )}
        </div>
      </div>

      {/* Category Filter Menu - displayed in a clean 2-row grid for easy access on mobile */}
      {searchQuery.trim() === '' ? (
        <div 
          className="grid grid-cols-4 gap-1.5 py-1.5 border-b border-stone-100 dark:border-stone-850"
          id="category_tab_bar"
        >
          {CATEGORIES.map(category => {
            const isActive = selectedCategory === category;
            const config = categoryThemes[category] || categoryThemes['绿茶'];
            return (
              <button
                key={category}
                onClick={() => {
                  playClickSound(settings.soundEnabled);
                  setSelectedCategory(category);
                }}
                className={`text-center text-xs font-medium py-2 px-1 rounded-lg border transition-all duration-250 active:scale-95 flex items-center justify-center ${
                  isActive
                    ? `${config.badge} ${config.border} shadow-3xs relative`
                    : 'bg-stone-50/50 dark:bg-stone-900/30 border-stone-150 dark:border-stone-800 text-stone-500 dark:text-stone-400 hover:bg-stone-50 dark:hover:bg-stone-850'
                }`}
                id={`cat_tab_${category}`}
              >
                {category}
              </button>
            );
          })}
        </div>
      ) : (
        <div className="text-xs text-stone-500 dark:text-stone-400 flex items-center gap-1 bg-stone-100/50 dark:bg-stone-900/30 p-2 rounded-lg">
          <Info className="w-3.5 h-3.5" />
          <span>正在搜索 “{searchQuery}” 的匹配茶叶结果：</span>
        </div>
      )}

      {/* Tea list cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3" id="tea_items_grid">
        {filteredTeas.length === 0 ? (
          <div className="col-span-full text-center py-16 px-4 bg-stone-50/50 dark:bg-stone-950/10 rounded-2xl border border-dashed border-stone-200 dark:border-stone-800">
            <Compass className="w-10 h-10 text-stone-300 dark:text-stone-700 mx-auto mb-3" />
            <p className="text-sm font-medium text-stone-700 dark:text-stone-350">未寻得匹配茶品</p>
            <p className="text-xs text-stone-400 dark:text-stone-350 mt-1">换个关键词试试，或直接在上方分类浏览</p>
          </div>
        ) : (
          filteredTeas.map(tea => {
            const config = categoryThemes[tea.category] || categoryThemes['绿茶'];
            const fav = isFavorite(tea.id);
            return (
              <div
                key={tea.id}
                onClick={() => handleSelectTea(tea)}
                className="group relative cursor-pointer block p-4 rounded-xl border border-stone-150 dark:border-stone-805 bg-white dark:bg-stone-900 hover:border-emerald-600/25 dark:hover:border-emerald-400/25 hover:shadow-xs transition-all duration-300"
                id={`tea_card_${tea.id}`}
              >
                {/* Heart Indicator */}
                {fav && (
                  <div className="absolute top-3.5 right-3.5 text-rose-500">
                    <Heart className="w-3.5 h-3.5 fill-current" />
                  </div>
                )}

                <div className="pr-6">
                  <div className="flex items-center gap-1.5 mb-1.5">
                    <span className={`px-2 py-0.2 text-[9px] font-semibold tracking-wider rounded-md border ${config.badge} ${config.border}`}>
                      {tea.category}
                    </span>
                    <span className="text-[10px] text-stone-400 dark:text-stone-350 flex items-center gap-0.5">
                      <MapPin className="w-2.5 h-2.5" /> {tea.origin.split('（')[0]}
                    </span>
                  </div>
                  
                  <h3 className="font-serif text-base font-bold text-stone-900 dark:text-stone-100 group-hover:text-emerald-700 dark:group-hover:text-emerald-400 transition-colors">
                    {tea.name}
                  </h3>
                  
                  <p className="text-stone-500 dark:text-stone-400 text-xs mt-1.5 line-clamp-2 leading-relaxed">
                    {tea.brief}
                  </p>

                  <div className="mt-3 py-2 flex items-center gap-4 text-xs font-sans border-t border-dashed border-stone-100 dark:border-stone-850">
                    <div className="flex items-center gap-1.5 text-stone-500 dark:text-stone-400">
                      <Thermometer className="w-3.5 h-3.5 text-amber-500 dark:text-amber-400" />
                      <span>适温 <span className="font-semibold text-stone-700 dark:text-stone-300">{tea.brewing.tempMin}-{tea.brewing.tempMax}°C</span></span>
                    </div>
                    <div className="flex items-center gap-1.5 text-stone-500 dark:text-stone-400">
                      <Coffee className="w-3.5 h-3.5 text-emerald-600 dark:text-emerald-400" />
                      <span>器皿 <span className="font-semibold text-stone-700 dark:text-stone-300">{tea.brewing.preferredUtensil}</span></span>
                    </div>
                  </div>
                </div>
              </div>
            );
          })
        )}
      </div>

      {/* =========================================================================
         Tea Details Immersive Overlay Drawer (Fixed & beautiful full screen on overlay)
         ========================================================================= */}
      {activeTea && (
        <div 
          className="fixed inset-0 z-50 flex justify-end bg-black/45 backdrop-blur-xs transition-opacity duration-300 animate-fade-in" 
          id="tea_details_drawer_overlay"
          onClick={handleCloseDetail}
        >
          <div 
            className="w-full max-w-lg h-full overflow-y-auto bg-stone-50 dark:bg-stone-950 p-6 shadow-2xl flex flex-col justify-between border-l border-stone-200 dark:border-stone-855 animate-slide-in-right"
            id="tea_details_drawer_body"
            onClick={(e) => e.stopPropagation()} // Prevent closing on body click
          >
            <div>
              {/* Header inside drawer */}
              <div className="flex justify-between items-start mb-4" id="drawer_header">
                <div>
                  <div className="flex items-center gap-2 mb-1.5">
                    <span className={`px-2.5 py-0.5 text-xs font-bold rounded-full border ${categoryThemes[activeTea.category]?.badge} ${categoryThemes[activeTea.category]?.border}`}>
                      {activeTea.category}
                    </span>
                    <span className="text-xs text-stone-400 flex items-center gap-0.5">
                      <MapPin className="w-3 h-3 text-stone-400" /> {activeTea.origin}
                    </span>
                  </div>
                  <h1 className="font-serif text-2xl font-bold text-stone-900 dark:text-stone-100 tracking-wide">
                    {activeTea.name}
                  </h1>
                </div>

                <div className="flex items-center gap-2" id="drawer_header_actions">
                  <button
                    onClick={() => {
                      playClickSound(settings.soundEnabled);
                      onToggleFavoriteTea(activeTea.id);
                    }}
                    className={`p-2.5 rounded-full border transition-all active:scale-90 ${
                      isFavorite(activeTea.id) 
                        ? 'bg-rose-50 dark:bg-rose-950/20 text-rose-500 border-rose-250' 
                        : 'bg-white dark:bg-stone-900 border-stone-200 dark:border-stone-800 text-stone-400'
                    }`}
                    title={isFavorite(activeTea.id) ? "取消收藏" : "加入收藏"}
                  >
                    <Heart className={`w-4 h-4 ${isFavorite(activeTea.id) ? 'fill-current' : ''}`} />
                  </button>
                  <button
                    onClick={handleCloseDetail}
                    className="p-2.5 rounded-full border border-stone-200 dark:border-stone-800 bg-white dark:bg-stone-900 text-stone-500 dark:text-stone-400 hover:bg-stone-100"
                    id="close_drawer_btn"
                  >
                    <X className="w-4 h-4" />
                  </button>
                </div>
              </div>

              {/* Main Content Sections */}
              <div className="space-y-5" id="drawer_content">
                
                {/* Brief Section */}
                <div className="p-4 rounded-xl bg-white dark:bg-stone-900 border border-stone-100 dark:border-stone-850" id="drawer_brief_card">
                  <h3 className="text-xs font-mono font-bold tracking-wider text-emerald-800 dark:text-emerald-400 uppercase mb-1.5 flex items-center gap-1.5">
                    <Sparkles className="w-3.5 h-3.5 animate-pulse" /> 茶品纪略
                  </h3>
                  <p className="text-xs leading-relaxed text-stone-650 dark:text-stone-300">
                    {activeTea.brief}
                  </p>
                </div>

                {/* Cultural Details */}
                <div className="space-y-3" id="drawer_culture_details">
                  <h3 className="font-serif text-sm font-bold text-stone-800 dark:text-stone-200 flex items-center gap-1.5">
                    <Compass className="w-4 h-4 text-stone-400" /> 文化工艺
                  </h3>
                  
                  <div className="grid grid-cols-1 gap-2.5 text-xs">
                    <div className="p-3 bg-stone-100/50 dark:bg-stone-900/40 rounded-lg border border-stone-150 dark:border-stone-850">
                      <p className="font-semibold text-stone-700 dark:text-stone-300 mb-0.5">【制作工艺】</p>
                      <p className="text-stone-605 dark:text-stone-400 leading-relaxed text-[11px]">{activeTea.craft}</p>
                    </div>

                    <div className="p-3 bg-stone-100/50 dark:bg-stone-900/40 rounded-lg border border-stone-150 dark:border-stone-850">
                      <p className="font-semibold text-stone-700 dark:text-stone-300 mb-0.5">【口感风味】</p>
                      <p className="text-stone-605 dark:text-stone-400 leading-relaxed text-[11px]">{activeTea.taste}</p>
                    </div>
                  </div>
                </div>

                {/* Official standard parameter targets */}
                <div className="space-y-3" id="drawer_brewing_parameters">
                  <h3 className="font-serif text-sm font-bold text-stone-800 dark:text-stone-200 flex items-center gap-1.5">
                    <Timer className="w-4 h-4 text-emerald-600" /> 标准冲泡茶学参数
                  </h3>

                  <div className="grid grid-cols-2 gap-2 text-xs" id="param_details_grid">
                    <div className="p-3 rounded-lg border border-stone-100 dark:border-stone-850 bg-white dark:bg-stone-900 flex items-center gap-2.5">
                      <div className="p-1.5 rounded bg-amber-50 dark:bg-amber-950/20 text-amber-700 dark:text-amber-400">
                        <Flame className="w-4.5 h-4.5" />
                      </div>
                      <div>
                        <p className="text-[10px] text-stone-400 dark:text-stone-350">适配水温</p>
                        <p className="font-sans font-bold text-stone-850 dark:text-stone-150">{activeTea.brewing.tempMin}-{activeTea.brewing.tempMax}°C</p>
                      </div>
                    </div>

                    <div className="p-3 rounded-lg border border-stone-100 dark:border-stone-850 bg-white dark:bg-stone-900 flex items-center gap-2.5">
                      <div className="p-1.5 rounded bg-lime-50 dark:bg-lime-950/20 text-lime-700 dark:text-lime-400">
                        <Scale className="w-4.5 h-4.5" />
                      </div>
                      <div>
                        <p className="text-[10px] text-stone-400 dark:text-stone-350">传统配比（投茶量）</p>
                        <p className="font-semibold text-stone-800 dark:text-stone-200">{activeTea.brewing.teaAmount} / {activeTea.brewing.teaWaterRatio}</p>
                      </div>
                    </div>

                    <div className="p-3 rounded-lg border border-stone-100 dark:border-stone-850 bg-white dark:bg-stone-900 flex items-center gap-2.5">
                      <div className="p-1.5 rounded bg-emerald-50 dark:bg-emerald-950/20 text-emerald-700 dark:text-emerald-400">
                        <CupSoda className="w-4.5 h-4.5" />
                      </div>
                      <div>
                        <p className="text-[10px] text-stone-400 dark:text-stone-350">首选茶具</p>
                        <p className="font-semibold text-stone-800 dark:text-stone-200">{activeTea.brewing.preferredUtensil}</p>
                      </div>
                    </div>

                    <div className="p-3 rounded-lg border border-stone-100 dark:border-stone-850 bg-white dark:bg-stone-900 flex items-center gap-2.5">
                      <div className="p-1.5 rounded bg-cyan-50 dark:bg-cyan-950/20 text-cyan-700 dark:text-cyan-400">
                        <Clock className="w-4.5 h-4.5" />
                      </div>
                      <div>
                        <p className="text-[10px] text-stone-400 dark:text-stone-350">冲泡时长 (1-4泡)</p>
                        <p className="font-sans font-semibold tracking-wide text-stone-850 dark:text-stone-150">{activeTea.brewing.steepTimes.map(t => `${t}s`).join(' | ')}</p>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Storage & Scenarios */}
                <div className="space-y-3" id="drawer_preservation">
                  <h3 className="font-serif text-sm font-bold text-stone-800 dark:text-stone-200 flex items-center gap-1.5">
                    <Archive className="w-4 h-4 text-amber-600" /> 仓储与适用环境
                  </h3>

                  <div className="space-y-2 text-xs">
                    <div className="p-3 rounded-xl bg-amber-500/5 dark:bg-amber-950/10 border border-amber-500/10 dark:border-amber-950/30">
                      <div className="font-medium text-amber-800 dark:text-amber-400 flex items-center gap-1.5 mb-1">
                        <Archive className="w-3.5 h-3.5 text-amber-600 dark:text-amber-400" /> 存放说明
                      </div>
                      <p className="text-stone-605 dark:text-stone-300 leading-relaxed text-[11px]">{activeTea.storage}</p>
                    </div>

                    <div className="p-3 rounded-xl bg-rose-500/5 dark:bg-rose-950/10 border border-rose-500/10 dark:border-rose-950/30">
                      <div className="font-medium text-rose-800 dark:text-rose-400 flex items-center gap-1.5 mb-1">
                        <AlertTriangle className="w-3.5 h-3.5 text-rose-600 dark:text-rose-400" /> 储存禁忌
                      </div>
                      <p className="text-stone-605 dark:text-stone-300 leading-relaxed text-[11px]">{activeTea.storageTaboos}</p>
                    </div>

                    <div className="p-3 rounded-xl bg-stone-100/50 dark:bg-stone-900 border border-stone-150 dark:border-stone-850">
                      <div className="font-medium text-stone-800 dark:text-stone-200 flex items-center gap-1.5 mb-1.5">
                        <Home className="w-3.5 h-3.5 text-stone-500" /> 适配场景
                      </div>
                      <div className="flex flex-wrap gap-1.5">
                        {activeTea.scenes.map((sc, i) => (
                          <span key={i} className="px-2 py-0.5 rounded bg-stone-200 dark:bg-stone-800 text-stone-700 dark:text-stone-300 text-[10px] font-medium border border-stone-250 dark:border-stone-750">
                            {sc}
                          </span>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>

              </div>
            </div>

            {/* Sticky Action Footer */}
            <div 
              className="mt-8 pt-4 border-t border-stone-200 dark:border-stone-850 grid grid-cols-2 gap-3" 
              id="drawer_footer_actions"
            >
              <button
                onClick={() => {
                  playClickSound(settings.soundEnabled);
                  onSelectTeaTimer(activeTea.id);
                  setActiveTea(null);
                }}
                className="flex items-center justify-center gap-2 py-3 px-4 rounded-xl text-xs font-semibold border border-emerald-600 text-emerald-800 dark:text-emerald-400 bg-emerald-50 dark:bg-emerald-950/20 active:scale-95 hover:bg-emerald-100/50 transition-all duration-200"
                id="drawer_brew_timer_btn"
              >
                <Timer className="w-4 h-4 text-emerald-700 dark:text-emerald-400" />
                载入智能计时器
              </button>
              <button
                onClick={() => {
                  playClickSound(settings.soundEnabled);
                  onSelectTeaGame(activeTea.id);
                  setActiveTea(null);
                }}
                className="flex items-center justify-center gap-2 py-3 px-4 rounded-xl text-xs font-semibold text-white bg-emerald-700 dark:bg-emerald-600 hover:bg-emerald-800 active:scale-95 transition-all duration-200 shadow-sm"
                id="drawer_brew_game_btn"
              >
                <Gamepad2 className="w-4 h-4" />
                注入小游戏挑战
              </button>
            </div>
          </div>
        </div>
      )}

    </div>
  );
};
