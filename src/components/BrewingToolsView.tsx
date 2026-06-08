import React, { useState, useEffect, useRef } from 'react';
import { Tea, Utensil, StorageGuide, TimerRecord, UserSettings } from '../types';
import { TEA_DATABASE } from '../data/teaDatabase';
import { TEA_UTENSILS } from '../data/teaUtensils';
import { STORAGE_GUIDES } from '../data/storageGuide';
import { playClickSound, playZenChime } from '../utils/audio';
import { 
  Timer, 
  Thermometer, 
  Coffee, 
  Archive, 
  Play, 
  Pause, 
  RotateCcw, 
  Plus, 
  Minus, 
  Check, 
  AlertTriangle, 
  Flame, 
  Bookmark, 
  Layers, 
  Compass,
  ArrowRight,
  Info
} from 'lucide-react';

interface BrewingToolsViewProps {
  onNavigate: (tab: 'encyclopedia' | 'tools' | 'game' | 'my') => void;
  onSelectTeaEncyclopedia: (teaId: string) => void;
  onAddTimerRecord: (record: TimerRecord) => void;
  prepopulatedTeaId: string | null;
  onClearPrepopulatedTeaId: () => void;
  settings: UserSettings;
}

type ToolSubTab = 'timer' | 'temp' | 'utensils' | 'storage';

export const BrewingToolsView: React.FC<BrewingToolsViewProps> = ({
  onNavigate,
  onSelectTeaEncyclopedia,
  onAddTimerRecord,
  prepopulatedTeaId,
  onClearPrepopulatedTeaId,
  settings,
}) => {
  const [activeSubTab, setActiveSubTab] = useState<ToolSubTab>('timer');

  // Timer Specific States
  const [selectedTea, setSelectedTea] = useState<Tea>(TEA_DATABASE[0]);
  const [activeBrewIndex, setActiveBrewIndex] = useState<number>(1); // 1-indexed (1st, 2nd, 3rd, 4th)
  const [timeLeft, setTimeLeft] = useState<number>(15); // in seconds
  const [totalTimePreset, setTotalTimePreset] = useState<number>(15); // for progress bar
  const [isTimerRunning, setIsTimerRunning] = useState<boolean>(false);
  const [isTimerDone, setIsTimerDone] = useState<boolean>(false);

  const timerIntervalRef = useRef<NodeJS.Timeout | null>(null);

  const onClearPrepopulatedTeaIdRef = useRef(onClearPrepopulatedTeaId);
  useEffect(() => {
    onClearPrepopulatedTeaIdRef.current = onClearPrepopulatedTeaId;
  }, [onClearPrepopulatedTeaId]);

  const onAddTimerRecordRef = useRef(onAddTimerRecord);
  useEffect(() => {
    onAddTimerRecordRef.current = onAddTimerRecord;
  }, [onAddTimerRecord]);

  // Parse prepopulated state when it is active
  useEffect(() => {
    if (prepopulatedTeaId) {
      const match = TEA_DATABASE.find(t => t.id === prepopulatedTeaId);
      if (match) {
        setSelectedTea(match);
        setActiveBrewIndex(1);
        const presetTime = match.brewing.steepTimes[0] || 15;
        setTimeLeft(presetTime);
        setTotalTimePreset(presetTime);
        setIsTimerRunning(false);
        setIsTimerDone(false);
        setActiveSubTab('timer'); // Switch to timer sub-tab
      }
      onClearPrepopulatedTeaIdRef.current();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [prepopulatedTeaId]);

  // Load times based on selected tea & active brew index
  useEffect(() => {
    // If timer is not running, update times when selection change
    if (!isTimerRunning) {
      const idx = activeBrewIndex - 1;
      const initialPreset = selectedTea.brewing.steepTimes[idx] || 15;
      setTimeLeft(initialPreset);
      setTotalTimePreset(initialPreset);
      setIsTimerDone(false);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [selectedTea.id, activeBrewIndex, isTimerRunning]);

  // Main Timer Countdown loop
  useEffect(() => {
    if (isTimerRunning) {
      timerIntervalRef.current = setInterval(() => {
        setTimeLeft(prev => {
          if (prev <= 1) {
            if (timerIntervalRef.current) clearInterval(timerIntervalRef.current);
            return 0;
          }
          return prev - 1;
        });
      }, 1000);
    } else {
      if (timerIntervalRef.current) clearInterval(timerIntervalRef.current);
    }

    return () => {
      if (timerIntervalRef.current) clearInterval(timerIntervalRef.current);
    };
  }, [isTimerRunning]);

  // Handle countdown completed side effects safely which runs post-render
  useEffect(() => {
    if (isTimerRunning && timeLeft === 0) {
      setIsTimerRunning(false);
      setIsTimerDone(true);
      playZenChime(settings.soundEnabled);

      const newRecord: TimerRecord = {
        id: 'tr_' + Date.now() + '_' + Math.random().toString(36).substring(2, 7),
        teaName: selectedTea.name,
        teaCategory: selectedTea.category,
        brewIndex: activeBrewIndex,
        duration: totalTimePreset,
        timestamp: Date.now()
      };
      onAddTimerRecordRef.current(newRecord);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [timeLeft, isTimerRunning]);

  // Handlers for timer controls
  const handleToggleTimer = () => {
    playClickSound(settings.soundEnabled);
    if (isTimerDone) {
      // If completed, click play will restart it
      setTimeLeft(totalTimePreset);
      setIsTimerDone(false);
      setIsTimerRunning(true);
    } else {
      setIsTimerRunning(!isTimerRunning);
    }
  };

  const handleResetTimer = () => {
    playClickSound(settings.soundEnabled);
    setIsTimerRunning(false);
    setIsTimerDone(false);
    const originalPreset = selectedTea.brewing.steepTimes[activeBrewIndex - 1] || 15;
    setTimeLeft(originalPreset);
    setTotalTimePreset(originalPreset);
  };

  const handleAdjustTime = (amount: number) => {
    playClickSound(settings.soundEnabled);
    const nextVal = Math.max(1, timeLeft + amount);
    setTimeLeft(nextVal);
    if (!isTimerRunning) {
      setTotalTimePreset(nextVal);
    }
  };

  const handleQuickBrewSelect = (brewNum: number) => {
    playClickSound(settings.soundEnabled);
    if (!isTimerRunning) {
      setActiveBrewIndex(brewNum);
    }
  };

  // Switch Subtab
  const handleSubTabChange = (tab: ToolSubTab) => {
    playClickSound(settings.soundEnabled);
    setActiveSubTab(tab);
  };

  // Helper calculation for circular progress
  const progressPercent = totalTimePreset > 0 ? (timeLeft / totalTimePreset) * 100 : 0;

  return (
    <div className="space-y-5 pb-20 animate-fade-in" id="brewing_tools_root">
      
      {/* 🚀 Header */}
      <div>
        <h2 className="font-serif text-xl font-bold text-stone-900 dark:text-stone-100 flex items-center gap-1.5">
          <span>等时光烹茶</span>
          <span className="text-xs font-sans font-normal text-emerald-800 dark:text-emerald-400 bg-emerald-50 dark:bg-emerald-950/30 px-2 py-0.5 rounded">
            实用泡茶工具箱
          </span>
        </h2>
        <p className="text-xs text-stone-500 dark:text-stone-400 mt-1">
          精准温控、智慧定时、匠人茶器和储新指南，一切皆在手中。
        </p>
      </div>

      {/* 🎛️ Navigation Segment Controls */}
      <div 
        className="grid grid-cols-4 gap-1 p-1 bg-stone-100 dark:bg-stone-900 rounded-xl text-center"
        id="tool_sub_tab_navigation"
      >
        <button
          onClick={() => handleSubTabChange('timer')}
          className={`flex flex-col items-center gap-1 py-2 rounded-lg text-xs font-medium transition-all duration-200 ${
            activeSubTab === 'timer'
              ? 'bg-white dark:bg-stone-800 text-emerald-700 dark:text-emerald-400 shadow-2xs'
              : 'text-stone-500 dark:text-stone-400 hover:text-stone-800 hover:bg-white/40'
          }`}
          id="btn_subtab_timer"
        >
          <Timer className="w-4 h-4" />
          <span>智能计时</span>
        </button>

        <button
          onClick={() => handleSubTabChange('temp')}
          className={`flex flex-col items-center gap-1 py-2 rounded-lg text-xs font-medium transition-all duration-200 ${
            activeSubTab === 'temp'
              ? 'bg-white dark:bg-stone-800 text-amber-700 dark:text-amber-400 shadow-2xs'
              : 'text-stone-500 dark:text-stone-400 hover:text-stone-850 hover:bg-white/40'
          }`}
          id="btn_subtab_temp"
        >
          <Thermometer className="w-4 h-4" />
          <span>水温指南</span>
        </button>

        <button
          onClick={() => handleSubTabChange('utensils')}
          className={`flex flex-col items-center gap-1 py-2 rounded-lg text-xs font-medium transition-all duration-200 ${
            activeSubTab === 'utensils'
              ? 'bg-white dark:bg-stone-800 text-teal-700 dark:text-teal-400 shadow-2xs'
              : 'text-stone-500 dark:text-stone-400 hover:text-stone-850 hover:bg-white/40'
          }`}
          id="btn_subtab_utensils"
        >
          <Coffee className="w-4 h-4" />
          <span>茶具百科</span>
        </button>

        <button
          onClick={() => handleSubTabChange('storage')}
          className={`flex flex-col items-center gap-1 py-2 rounded-lg text-xs font-medium transition-all duration-200 ${
            activeSubTab === 'storage'
              ? 'bg-white dark:bg-stone-800 text-orange-700 dark:text-orange-400 shadow-2xs'
              : 'text-stone-500 dark:text-stone-400 hover:text-stone-850 hover:bg-white/40'
          }`}
          id="btn_subtab_storage"
        >
          <Archive className="w-4 h-4" />
          <span>存茶指南</span>
        </button>
      </div>

      {/* =========================================================================
         SUB PANEL 1: SMART BREWING TIMER (智能泡茶计时器)
         ========================================================================= */}
      {activeSubTab === 'timer' && (
        <div className="space-y-5 animate-fade-in" id="timer_panel_container">
          
          {/* Controls: Choose Tea Selector */}
          <div className="p-4 rounded-xl bg-white dark:bg-stone-900 border border-stone-100 dark:border-stone-805 space-y-3 shadow-3xs">
            <label className="block text-xs font-serif font-bold text-stone-700 dark:text-stone-350">
              选择冲泡茶叶品种
            </label>
            <select
              value={selectedTea.id}
              disabled={isTimerRunning}
              onChange={(e) => {
                const tea = TEA_DATABASE.find(t => t.id === e.target.value);
                if (tea) {
                  playClickSound(settings.soundEnabled);
                  setSelectedTea(tea);
                  setActiveBrewIndex(1);
                  setIsTimerDone(false);
                }
              }}
              className="w-full text-sm py-2 px-3.5 rounded-lg border border-stone-200 dark:border-stone-800 bg-stone-50 dark:bg-stone-950 text-stone-800 dark:text-stone-150 focus:outline-hidden disabled:opacity-50"
              id="timer_tea_selector"
            >
              {TEA_DATABASE.map(tea => (
                <option key={tea.id} value={tea.id}>
                  【{tea.category}】{tea.name}
                </option>
              ))}
            </select>
          </div>

          {/* Quick brew selection index (First, Second, Third, Fourth) */}
          <div className="space-y-2">
            <span className="block text-xs font-serif font-bold text-stone-700 dark:text-stone-350">
              当前冲泡轮数 (泡数越长，茶叶溶出度越低，用时加长)
            </span>
            <div className="grid grid-cols-4 gap-2 text-center" id="brew_index_buttons_row">
              {[1, 2, 3, 4].map(idx => {
                const isActive = activeBrewIndex === idx;
                const standardTime = selectedTea.brewing.steepTimes[idx - 1] || 15;
                return (
                  <button
                    key={idx}
                    disabled={isTimerRunning}
                    onClick={() => handleQuickBrewSelect(idx)}
                    className={`py-2.5 rounded-xl border transition-all duration-200 flex flex-col items-center justify-center gap-0.5 ${
                      isActive
                        ? 'bg-emerald-50 dark:bg-emerald-950/30 border-emerald-500 text-emerald-800 dark:text-emerald-400 font-bold'
                        : 'bg-white dark:bg-stone-900 border-stone-150 dark:border-stone-800 text-stone-500 dark:text-stone-400 hover:bg-stone-50 disabled:opacity-50'
                    }`}
                    id={`btn_brew_index_${idx}`}
                  >
                    <span className="text-[10px]">第 {idx} 泡</span>
                    <span className="text-xs font-mono">{standardTime}s</span>
                  </button>
                );
              })}
            </div>
          </div>

          {/* Core Interactive Countdown clock visualization */}
          <div 
            className="p-6 rounded-2xl bg-white dark:bg-stone-900 border border-stone-100 dark:border-stone-805 space-y-6 shadow-sm text-center flex flex-col items-center relative overflow-hidden"
            id="countdown_interactive_container"
          >
            {/* Visual background wavy leaf indicator depending on completion status */}
            <div className="absolute top-0 left-0 right-0 h-1 bg-stone-100 dark:bg-stone-800">
              <div 
                className="bg-emerald-600 dark:bg-emerald-400 h-full transition-all duration-1000"
                style={{ width: `${progressPercent}%` }}
              ></div>
            </div>

            {/* Simulated Glass/Teapot Vessel layout with steam if running */}
            <div className="relative flex items-center justify-center w-40 h-40" id="timer_ring_vessel">
              
              {/* Steaming floating particles */}
              {isTimerRunning && (
                <div className="absolute -top-4 w-12 flex justify-around animate-bounce text-emerald-300 dark:text-emerald-500 opacity-60">
                  <span className="block w-1.5 h-4 bg-emerald-400/30 dark:bg-emerald-400/25 rounded-full animate-pulse"></span>
                  <span className="block w-1.5 h-6 bg-emerald-500/35 dark:bg-emerald-400/20 rounded-full animate-pulse delay-200"></span>
                  <span className="block w-1.5 h-4 bg-emerald-400/30 dark:bg-emerald-400/25 rounded-full animate-pulse delay-400"></span>
                </div>
              )}

              {/* Progress ring or core state circle */}
              <div className={`p-4 rounded-full border-4 flex flex-col items-center justify-center w-36 h-36 border-dashed transition-colors duration-500 ${
                isTimerRunning 
                  ? 'border-emerald-500 dark:border-emerald-400 animate-spin-slow' 
                  : isTimerDone 
                    ? 'border-rose-500 bg-rose-50/20' 
                    : 'border-stone-200 dark:border-stone-800'
              }`}>
                {/* Timer text inside center */}
                <div className="text-center select-none" id="countdown_clock_numbers">
                  <span className="block font-mono text-4xl font-extrabold text-stone-850 dark:text-stone-100">
                    {timeLeft}
                  </span>
                  <span className="text-[10px] uppercase font-mono tracking-wider text-stone-400 dark:text-stone-350">
                    {isTimerDone ? '茶汤已好' : isTimerRunning ? '萃取中' : '静候开汤'}
                  </span>
                </div>
              </div>
            </div>

            {/* Manual micro adjust times */}
            <div className="flex gap-4 items-center justify-center text-xs" id="fine_adjustment_row">
              <button
                disabled={isTimerRunning}
                onClick={() => handleAdjustTime(-5)}
                className="flex items-center gap-0.5 px-3 py-1.5 rounded-lg border border-stone-200 dark:border-stone-800 text-stone-600 dark:text-stone-350 hover:bg-stone-50 disabled:opacity-40"
              >
                <Minus className="w-3.5 h-3.5" /> 5s
              </button>

              <span className="text-[11px] text-stone-500 dark:text-stone-350">微调秒数</span>

              <button
                disabled={isTimerRunning}
                onClick={() => handleAdjustTime(5)}
                className="flex items-center gap-0.5 px-3 py-1.5 rounded-lg border border-stone-200 dark:border-stone-800 text-stone-600 dark:text-stone-350 hover:bg-stone-50 disabled:opacity-40"
              >
                <Plus className="w-3.5 h-3.5" /> 5s
              </button>
            </div>

            {/* Brewing action buttons: start, pause, reset */}
            <div className="flex gap-3 justify-center w-full max-w-xs" id="brewing_core_action_buttons">
              <button
                onClick={handleResetTimer}
                className="grow flex items-center justify-center gap-1.5 py-3.5 border border-stone-200 dark:border-stone-800 text-stone-700 dark:text-stone-300 font-semibold rounded-xl text-xs hover:bg-stone-100/50 active:scale-95 transition-all"
                id="timer_reset_btn"
              >
                <RotateCcw className="w-4 h-4" />
                重置
              </button>

              <button
                onClick={handleToggleTimer}
                className={`grow-[2.5] flex items-center justify-center gap-2 py-3.5 font-bold rounded-xl text-xs active:scale-95 transition-all shadow-sm ${
                  isTimerRunning
                    ? 'bg-stone-800 dark:bg-stone-700 hover:bg-stone-900 text-white'
                    : isTimerDone
                      ? 'bg-rose-600 hover:bg-rose-700 text-white'
                      : 'bg-emerald-600 hover:bg-emerald-700 dark:bg-emerald-500 dark:hover:bg-emerald-600 text-white'
                }`}
                id="timer_primary_action_btn"
              >
                {isTimerRunning ? (
                  <>
                    <Pause className="w-4 h-4" /> 暂停计时
                  </>
                ) : isTimerDone ? (
                  <>
                    <Play className="w-4 h-4" /> 重新再次
                  </>
                ) : (
                  <>
                    <Play className="w-4 h-4" /> 开始冲泡
                  </>
                )}
              </button>
            </div>
            
            {/* Quick specifications reminder */}
            <div className="text-[11px] text-stone-400 dark:text-stone-350 mt-2 italic flex items-center gap-1 bg-stone-50 dark:bg-stone-950/20 px-3.5 py-1.5 rounded-lg">
              <Info className="w-3.5 h-3.5 text-stone-400" />
              <span>本轮标准冲泡常数：投茶约 {selectedTea.brewing.teaAmount} | 适配器皿 【{selectedTea.brewing.preferredUtensil}】 | 水温 {selectedTea.brewing.tempMin}-{selectedTea.brewing.tempMax}°C</span>
            </div>
          </div>
        </div>
      )}

      {/* =========================================================================
         SUB PANEL 2: OPTIMAL TEMPERATURE CALIBRATION GUIDE (水温指南)
         ========================================================================= */}
      {activeSubTab === 'temp' && (
        <div className="space-y-4 animate-fade-in" id="temperature_panel_container">
          <div className="p-4 rounded-xl bg-white dark:bg-stone-900 border border-stone-100 dark:border-stone-805 space-y-3 shadow-3xs">
            <h3 className="font-serif text-sm font-bold text-stone-850 dark:text-stone-100 flex items-center gap-1.5">
              <Thermometer className="w-4.5 h-4.5 text-amber-500" /> 中国全茶科标准冲洗水温对照表
            </h3>
            <p className="text-xs text-stone-500 leading-relaxed">
              水温的高低对茶叶生化合物析出速度及多酚氧化反应有绝对性作用。低温（75-85°C）护持嫩叶鲜爽，高温（95-100°C）穿透坚韧，老成茶香随之绽放。
            </p>
          </div>

          <div className="space-y-3" id="temperature_records_container">
            {TEA_DATABASE.map(tea => {
              // Create dynamic indicator of water temp range
              const tempRange = tea.brewing.tempMin;
              const ratioPercent = ((tempRange - 70) / (100 - 70)) * 100;

              return (
                <div
                  key={tea.id}
                  onClick={() => {
                    playClickSound(settings.soundEnabled);
                    onSelectTeaEncyclopedia(tea.id);
                  }}
                  className="cursor-pointer group flex flex-col p-3.5 rounded-xl border border-stone-150 dark:border-stone-800 bg-white dark:bg-stone-900 hover:border-emerald-600/20 hover:shadow-2xs transition-all duration-200"
                  id={`temp_guide_row_${tea.id}`}
                >
                  <div className="flex justify-between items-center mb-1.5">
                    <span className="font-serif text-xs font-bold text-stone-800 dark:text-stone-200 group-hover:text-emerald-700 dark:group-hover:text-emerald-400 flex items-center gap-1">
                      {tea.name}
                      <span className="text-[10px] font-sans font-normal text-stone-400">({tea.category})</span>
                    </span>
                    <span className="font-mono text-xs font-bold text-amber-600 dark:text-amber-400">
                      {tea.brewing.tempMin}°C - {tea.brewing.tempMax}°C
                    </span>
                  </div>

                  {/* Temperature Bar representation */}
                  <div className="w-full h-2 bg-stone-100 dark:bg-stone-950 rounded-full overflow-hidden relative">
                    <div 
                      className="absolute top-0 bottom-0 bg-gradient-to-r from-amber-400 to-rose-600 rounded-full"
                      style={{
                        left: `${Math.max(0, ratioPercent - 10)}%`,
                        width: `${Math.min(100, Math.max(25, ((tea.brewing.tempMax - tea.brewing.tempMin) / 30) * 100))}%`
                      }}
                    ></div>
                  </div>

                  <div className="flex justify-between text-[9px] text-stone-400 dark:text-stone-350 mt-1.5">
                    <span>
                      推荐配比 1 : {tea.brewing.teaWaterRatio.split(':')?.[1] || '50'} ({tea.brewing.teaAmount})
                    </span>
                    <span className="flex items-center gap-0.5 text-stone-500 dark:text-stone-400 group-hover:text-emerald-700 dark:group-hover:text-emerald-400">
                      查看茶品详情 <ArrowRight className="w-2.5 h-2.5" />
                    </span>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      )}

      {/* =========================================================================
         SUB PANEL 3: TRADITIONAL TEAWARE ENCYCLOPEDIA (茶具百科)
         ========================================================================= */}
      {activeSubTab === 'utensils' && (
        <div className="space-y-4 animate-fade-in" id="utensils_panel_container">
          
          <div className="grid grid-cols-1 gap-4" id="utensils_list_grid">
            {TEA_UTENSILS.map(utensil => {
              // Custom badge for teaware tag matching
              return (
                <div
                  key={utensil.id}
                  className="p-4 rounded-xl bg-white dark:bg-stone-900 border border-stone-150 dark:border-stone-800 space-y-3 hover:shadow-2xs transition-all duration-200"
                  id={`utensil_card_${utensil.id}`}
                >
                  <div className="flex justify-between items-center border-b border-stone-100 dark:border-stone-850 pb-2">
                    <h3 className="font-serif text-base font-bold text-stone-900 dark:text-stone-100 flex items-center gap-1.5">
                      <span className="w-1.5 h-4 bg-teal-600 rounded-full"></span>
                      {utensil.name}
                    </h3>
                    <span className="text-[10px] bg-teal-50 dark:bg-teal-950/20 text-teal-800 dark:text-teal-400 border border-teal-200 dark:border-teal-900/30 px-2 py-0.5 rounded font-medium">
                      品茶雅器
                    </span>
                  </div>

                  <div className="space-y-2 text-xs">
                    <div>
                      <p className="font-semibold text-stone-700 dark:text-stone-300">用途主治 / 释义：</p>
                      <p className="text-stone-605 dark:text-stone-400 leading-relaxed text-[11px] mt-0.5">{utensil.use}</p>
                    </div>

                    <div>
                      <p className="font-semibold text-stone-700 dark:text-stone-300">使用及执拿手势：</p>
                      <p className="text-stone-605 dark:text-stone-400 leading-relaxed text-[11px] mt-0.5">{utensil.method}</p>
                    </div>

                    <div>
                      <p className="font-semibold text-stone-700 dark:text-stone-300">完美适配茶科：</p>
                      <div className="flex flex-wrap gap-1 mt-1">
                        {utensil.suitableTeas.map((t, idx) => (
                          <span key={idx} className="px-2 py-0.2 rounded bg-stone-100 dark:bg-stone-800 text-stone-650 dark:text-stone-350 text-[10px] font-mono">
                            {t}
                          </span>
                        ))}
                      </div>
                    </div>

                    <div className="p-2.5 rounded-lg bg-teal-500/5 dark:bg-teal-950/10 border border-teal-500/10 text-[11px] text-stone-600 dark:text-stone-350">
                      <span className="font-semibold text-teal-800 dark:text-teal-400 block mb-0.5">⚠️ 使用注意事项：</span>
                      {utensil.notes}
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      )}

      {/* =========================================================================
         SUB PANEL 4: TEA STORAGE GUIDANCE HANDBOOK (存茶指南)
         ========================================================================= */}
      {activeSubTab === 'storage' && (
        <div className="space-y-4 animate-fade-in" id="storage_panel_container">
          
          <div className="p-4 rounded-xl bg-white dark:bg-stone-900 border border-stone-100 dark:border-stone-850 space-y-3 shadow-3xs">
            <h3 className="font-serif text-sm font-bold text-stone-850 dark:text-stone-100 flex items-center gap-1.5">
              <Archive className="w-4.5 h-4.5 text-orange-600" /> 年份沉淀：家庭储茶标准守则
            </h3>
            <p className="text-xs text-stone-500 leading-relaxed">
              茶叶具有极高的物理吸水与吸异味性（含有大量疏松的多孔状结构及强吸收性茶多酚成分）。一旦保存不妥，极易变黄、受潮或走香变酸。
            </p>
          </div>

          <div className="grid grid-cols-1 gap-4" id="storage_details_grid">
            {STORAGE_GUIDES.map((guide, idx) => {
              return (
                <div
                  key={idx}
                  className="p-4 rounded-xl bg-white dark:bg-stone-900 border border-stone-150 dark:border-stone-800 space-y-3"
                  id={`storage_guide_${idx}`}
                >
                  <div className="flex justify-between items-center border-b border-stone-100 dark:border-stone-850 pb-2">
                    <h4 className="font-serif text-sm font-bold text-stone-900 dark:text-stone-100">
                      {guide.category} 储存标准
                    </h4>
                    <span className="text-[10px] uppercase font-mono bg-amber-500/10 text-amber-700 dark:bg-amber-950/20 dark:text-amber-400 px-2 py-0.5 rounded">
                      存新藏老
                    </span>
                  </div>

                  <div className="grid grid-cols-2 gap-2 text-xs mb-1">
                    <div className="p-2.5 rounded bg-stone-50 dark:bg-stone-950/20 border border-stone-100 dark:border-stone-850">
                      <p className="text-[10px] text-stone-400 dark:text-stone-350">最佳温控指标</p>
                      <p className="font-semibold text-stone-700 dark:text-stone-300 mt-0.5">{guide.temp}</p>
                    </div>
                    <div className="p-2.5 rounded bg-stone-50 dark:bg-stone-950/20 border border-stone-100 dark:border-stone-850">
                      <p className="text-[10px] text-stone-400 dark:text-stone-350">推荐相对湿度</p>
                      <p className="font-semibold text-stone-700 dark:text-stone-300 mt-0.5">{guide.humidity}</p>
                    </div>
                  </div>

                  <div className="space-y-3 text-xs">
                    <div>
                      <p className="font-semibold text-stone-700 dark:text-stone-300">【核心存放工艺方案】</p>
                      <p className="text-stone-605 dark:text-stone-350 leading-relaxed text-[11px] mt-0.5">{guide.method}</p>
                    </div>

                    <div>
                      <p className="font-semibold text-stone-700 dark:text-stone-300">【关键储存准则】</p>
                      <ul className="list-disc pl-4 space-y-1 mt-1 text-[11px] text-stone-605 dark:text-stone-400">
                        {guide.milestones.map((m, mIdx) => (
                          <li key={mIdx}>{m}</li>
                        ))}
                      </ul>
                    </div>

                    <div className="p-3 bg-rose-500/5 rounded-lg border border-rose-500/10 text-[11px] text-rose-800 dark:text-rose-400">
                      <span className="font-bold block mb-1 flex items-center gap-1">
                        <AlertTriangle className="w-3.5 h-3.5" /> 绝对存茶安全红线避忌：
                      </span>
                      {guide.taboos}
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      )}

    </div>
  );
};
