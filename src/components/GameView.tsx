import React, { useState, useEffect, useRef } from 'react';
import { Tea, GameRecord, UserSettings } from '../types';
import { TEA_DATABASE } from '../data/teaDatabase';
import { playClickSound, playZenChime } from '../utils/audio';
import { 
  Gamepad2, 
  Flame, 
  RotateCcw, 
  CheckCircle,
  HelpCircle,
  Award,
  ChevronRight,
  ChevronLeft,
  Settings,
  Scale,
  Clock,
  Coffee,
  Sparkles,
  AlertCircle,
  AlertTriangle,
  Lightbulb,
  Timer
} from 'lucide-react';

interface GameViewProps {
  onNavigate: (tab: 'encyclopedia' | 'tools' | 'game' | 'my') => void;
  onAddGameRecord: (record: GameRecord) => void;
  prepopulatedTeaId: string | null;
  onClearPrepopulatedTeaId: () => void;
  settings: UserSettings;
}

type StepID = 'tea' | 'utensil' | 'temp' | 'amount' | 'duration' | 'brewing' | 'result';

export const GameView: React.FC<GameViewProps> = ({
  onNavigate,
  onAddGameRecord,
  prepopulatedTeaId,
  onClearPrepopulatedTeaId,
  settings,
}) => {
  // Game Wizards
  const [currentStep, setCurrentStep] = useState<StepID>('tea');
  
  // Selected Inputs
  const [selectedTea, setSelectedTea] = useState<Tea>(TEA_DATABASE[0]);
  const [selectedUtensil, setSelectedUtensil] = useState<string>('盖碗');
  const [selectedTemp, setSelectedTemp] = useState<number>(85);
  const [selectedAmount, setSelectedAmount] = useState<number>(5); // in grams
  const [selectedDuration, setSelectedDuration] = useState<number>(15); // in seconds

  // Brewing animation state
  const [brewProgress, setBrewProgress] = useState<number>(0);

  // Result state
  const [gameResult, setGameResult] = useState<{
    score: number;
    rating: GameRecord['rating'];
    utensilMsg: string;
    tempMsg: string;
    amountMsg: string;
    durationMsg: string;
    advice: string;
  } | null>(null);

  const onClearPrepopulatedTeaIdRef = useRef(onClearPrepopulatedTeaId);
  useEffect(() => {
    onClearPrepopulatedTeaIdRef.current = onClearPrepopulatedTeaId;
  }, [onClearPrepopulatedTeaId]);

  // Parse prepopulated presets
  useEffect(() => {
    if (prepopulatedTeaId) {
      const match = TEA_DATABASE.find(t => t.id === prepopulatedTeaId);
      if (match) {
        setSelectedTea(match);
        // Default warm pre-sets
        setSelectedUtensil(match.brewing.preferredUtensil || '盖碗');
        setSelectedTemp(Math.round((match.brewing.tempMin + match.brewing.tempMax) / 2));
        const amountNum = parseInt(match.brewing.teaAmount) || 5;
        setSelectedAmount(amountNum);
        setSelectedDuration(match.brewing.steepTimes[0] || 15);
        setCurrentStep('utensil'); // Start directly at step 2 since tea is chosen!
      }
      onClearPrepopulatedTeaIdRef.current();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [prepopulatedTeaId]);

  // Handle Brewing State Animation Interval
  useEffect(() => {
    let animId: NodeJS.Timeout;
    if (currentStep === 'brewing') {
      setBrewProgress(0);
      const totalSteps = 100;
      const stepDuration = 35; // total ~3.5 seconds of cute tea brewing animation
      
      animId = setInterval(() => {
        setBrewProgress(prev => {
          if (prev >= totalSteps) {
            clearInterval(animId);
            return totalSteps;
          }
          return prev + 1;
        });
      }, stepDuration);
    }
    return () => {
      if (animId) clearInterval(animId);
    };
  }, [currentStep]);

  // Handle evaluation once brewing progress is full safely which runs post-render
  useEffect(() => {
    if (currentStep === 'brewing' && brewProgress >= 100) {
      evaluateGameResult();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [brewProgress, currentStep]);

  // Scoring Core Engine Evaluation algorithm
  const evaluateGameResult = () => {
    let rawScore = 100;
    
    // Evaluate Utensil (Max deduction: 20 points)
    let utensilDeduction = 0;
    let utensilMsg = '器具搭配极佳，尽显茶器之美。';
    
    const cat = selectedTea.category;
    if (cat === '绿茶' || cat === '黄茶') {
      if (selectedUtensil !== '玻璃杯' && selectedUtensil !== '盖碗') {
        utensilDeduction = 15;
        utensilMsg = `嫩茶忌闷！选用【${selectedUtensil}】蓄热过高，无法直接赏看芽舞，茶汤极易被闷黄变熟黄。建议首选玻璃杯或盖碗。`;
      }
    } else if (cat === '乌龙茶') {
      if (selectedUtensil !== '紫砂壶' && selectedUtensil !== '盖碗') {
        utensilDeduction = 15;
        utensilMsg = `乌龙高香需要持久温持！使用【${selectedUtensil}】导热过快，温下降严重，难以充分逼发出岩茶香。首推荐紫砂和精盖碗。`;
      }
    } else if (cat === '黑茶' || cat === '普洱') {
      if (selectedUtensil !== '紫砂壶' && selectedUtensil !== '盖碗') {
        utensilDeduction = 20;
        utensilMsg = `熟成大叶种茶需重火力！使用【${selectedUtensil}】致密无孔、散热快，极不适于黑茶后发酵的高温渗透，导致汤感寡淡。`;
      }
    } else {
      if (selectedUtensil === '玻璃杯' && (cat === '红茶' || cat === '白茶')) {
        utensilDeduction = 10;
        utensilMsg = `【${selectedUtensil}】保温欠佳，冲泡全发酵/重发酵茶类，难使深色物质均匀融汇，茶汤易偏薄偏涩。`;
      }
    }
    rawScore -= utensilDeduction;

    // Evaluate Water Temperature (Max deduction: 30 points)
    let tempDeduction = 0;
    let tempMsg = '水温拿捏精准，完美激发出该叶梢之独特香魄。';
    const minT = selectedTea.brewing.tempMin;
    const maxT = selectedTea.brewing.tempMax;

    if (selectedTemp < minT) {
      const diff = minT - selectedTemp;
      if (diff > 10) {
        tempDeduction = 25;
        tempMsg = `水温（${selectedTemp}°C）过低（标准 ${minT}-${maxT}°C）。由于热力不足，茶叶中的有机浸出物（茶多酚及芳香类油分）析出迟缓，茶汤清冷、香气不出。`;
      } else {
        tempDeduction = 12;
        tempMsg = `水温（${selectedTemp}°C）偏温和。泡茶浸出较慢，茶叶的厚重感和喉韵尚未全开，首汤偏鲜但不够饱满。`;
      }
    } else if (selectedTemp > maxT) {
      const diff = selectedTemp - maxT;
      if (diff > 5) {
        tempDeduction = 25;
        tempMsg = `水温（${selectedTemp}°C）偏炽烈（标准 ${minT}-${maxT}°C）。娇嫩的茶芽（如绿茶/黄茶）遭遇沸水直冲会被“烫熟烤熟”，导致叶绿素遭到破坏，析出过量的劣质咖啡碱与茶单宁，汤变苦涩泛黄。`;
      } else {
        tempDeduction = 10;
        tempMsg = `水温轻微偏高，对于高档芽茶，高热略显粗鲁，滋味微偏向张扬偏涩。`;
      }
    }
    rawScore -= tempDeduction;

    // Evaluate Tea Gram Weight Dosage (Max deduction: 25 points)
    let amountDeduction = 0;
    let amountMsg = '投茶量适度，茶水溶出比例平衡。';
    const standardAmount = parseInt(selectedTea.brewing.teaAmount) || 5;
    
    const diffAmt = Math.abs(selectedAmount - standardAmount);
    if (diffAmt === 0) {
      // Perfect
    } else if (diffAmt <= 2) {
      amountDeduction = 10;
      if (selectedAmount > standardAmount) {
        amountMsg = `投茶量（${selectedAmount}g）略偏多（标准约 ${standardAmount}g）。茶浓水少，滋味析出偏浓重，需要适度缩短每泡浸润时间。`;
      } else {
        amountMsg = `投茶量（${selectedAmount}g）略富余偏少。茶汤质感与水解度偏低，口感偶有水划感、寡淡。`;
      }
    } else {
      amountDeduction = 22;
      if (selectedAmount > standardAmount) {
        amountMsg = `投茶量（${selectedAmount}g）严重超标！极易产生“茶水分离”或极浓苦的药感，不仅暴殄天物，还易引起茶中单宁刮肚。`;
      } else {
        amountMsg = `投茶（${selectedAmount}g）如蜻蜓点水，茶水比极度失调，叶梢无力融汇，寡薄无味。`;
      }
    }
    rawScore -= amountDeduction;

    // Evaluate Steeping Duration (Max deduction: 25 points)
    let durationDeduction = 0;
    let durationMsg = '出汤时机臻于化境，充分萃取了茶的最佳鲜灵黄金度。';
    const standardSec = selectedTea.brewing.steepTimes[0] || 15;

    const diffSec = selectedDuration - standardSec;
    if (Math.abs(diffSec) <= 3) {
      // Perfect
    } else if (diffSec > 3) {
      if (diffSec > 15) {
        durationDeduction = 25;
        durationMsg = `闷泡时间（${selectedDuration}s）过长（首泡佳期约 ${standardSec}s）。过度的闷泡让茶叶中的可溶性涩感多酚和重单宁溢散出，茶汤完全苦涩熟闷、锁喉。`;
      } else {
        durationDeduction = 12;
        durationMsg = `闷泡偏长，汤质较为醇浓，但带上了由于浸泡过饱产生的单调感，香度有所下沉。`;
      }
    } else {
      if (selectedDuration < 8) {
        durationDeduction = 20;
        durationMsg = `出水过急（${selectedDuration}s，建议首泡 ${standardSec}s）。茶叶内质甚至还尚未完全舒展和渗透润泽，导致这碗茶形同白水。`;
      } else {
        durationDeduction = 10;
        durationMsg = `萃取度不饱足，入口虽然极其鲜甜灵动，但茶体显得轻浮不实。`;
      }
    }
    rawScore -= durationDeduction;

    // Boundary cap score [0, 100]
    const finalScore = Math.min(100, Math.max(10, rawScore));

    // Map Rating
    let rating: GameRecord['rating'] = '一般';
    if (finalScore >= 90) rating = '完美';
    else if (finalScore >= 75) rating = '良好';
    else if (finalScore >= 60) rating = '一般';
    else rating = '略有失误';

    // Formulate a beautiful summary piece of advisory
    let advice = '多加磨练，必成高人！';
    if (rating === '完美') {
      advice = `太棒了！您选择的方案（${selectedUtensil} + ${selectedTemp}°C）完全契合中国国家高级评茶茶法规范。冲泡出的【${selectedTea.name}】汤色亮丽、香气扑鼻，滋味鲜爽生津、喉韵十足。实为茶中上品佳汤。`;
    } else if (rating === '良好') {
      advice = `极具潜质！冲泡滋味总体十分怡人，细节略有提升点：下次可尝试针对【${selectedTea.name}】的特性，严格调节水温或微调投茶配比。继续探索探索。`;
    } else if (rating === '一般') {
      advice = `略有生涩。茶叶的色、香、味因参数错位出现部分失调。请谨记：高级娇嫩茶绿黄不宜高火煮水，陈年铁骨黑红乌龙不可轻火冷泡。`;
    } else {
      advice = `本次搭配由于数项偏差产生“闷黄灼伤”或“低温未开”的硬伤。请多对照左侧的【智能计时器】与百科参数，再试一次，必能在下回冲出一壶圆润满意的茗茶！`;
    }

    setGameResult({
      score: finalScore,
      rating,
      utensilMsg,
      tempMsg,
      amountMsg,
      durationMsg,
      advice
    });

    // Save final record to parent component
    const gameRecord: GameRecord = {
      id: 'gr_' + Date.now() + '_' + Math.random().toString(36).substring(2, 7),
      teaName: selectedTea.name,
      utensil: selectedUtensil,
      temp: selectedTemp,
      amount: `${selectedAmount}g`,
      steepTime: selectedDuration,
      score: finalScore,
      rating,
      feedback: advice,
      timestamp: Date.now()
    };
    onAddGameRecord(gameRecord);

    playZenChime(settings.soundEnabled);
    setCurrentStep('result');
  };

  const handleNextStep = () => {
    playClickSound(settings.soundEnabled);
    if (currentStep === 'tea') setCurrentStep('utensil');
    else if (currentStep === 'utensil') setCurrentStep('temp');
    else if (currentStep === 'temp') setCurrentStep('amount');
    else if (currentStep === 'amount') setCurrentStep('duration');
    else if (currentStep === 'duration') setCurrentStep('brewing');
  };

  const handlePrevStep = () => {
    playClickSound(settings.soundEnabled);
    if (currentStep === 'utensil') setCurrentStep('tea');
    else if (currentStep === 'temp') setCurrentStep('utensil');
    else if (currentStep === 'amount') setCurrentStep('temp');
    else if (currentStep === 'duration') setCurrentStep('amount');
  };

  const resetGame = () => {
    playClickSound(settings.soundEnabled);
    setCurrentStep('tea');
    setGameResult(null);
    setBrewProgress(0);
    // Reload defaults
    setSelectedUtensil(selectedTea.brewing.preferredUtensil || '盖碗');
    setSelectedTemp(Math.round((selectedTea.brewing.tempMin + selectedTea.brewing.tempMax) / 2));
    const amountNum = parseInt(selectedTea.brewing.teaAmount) || 5;
    setSelectedAmount(amountNum);
    setSelectedDuration(selectedTea.brewing.steepTimes[0] || 15);
  };

  // Color mappings
  const ratingThemes = {
    '完美': { bg: 'bg-emerald-50 dark:bg-emerald-950/20', text: 'text-emerald-700 dark:text-emerald-400', border: 'border-emerald-250', shadow: 'shadow-emerald-100/40 text-emerald-600' },
    '良好': { bg: 'bg-teal-50 dark:bg-teal-950/20', text: 'text-teal-750 dark:text-teal-400', border: 'border-teal-200', shadow: 'shadow-teal-100/40 text-teal-600' },
    '一般': { bg: 'bg-amber-50 dark:bg-amber-950/20', text: 'text-amber-700 dark:text-amber-400', border: 'border-amber-250', shadow: 'shadow-amber-100/40 text-amber-600' },
    '略有失误': { bg: 'bg-rose-50 dark:bg-rose-950/20', text: 'text-rose-700 dark:text-rose-400', border: 'border-rose-250', shadow: 'shadow-rose-100/40 text-rose-600' },
  };

  const activeTheme = gameResult ? ratingThemes[gameResult.rating] : ratingThemes['一般'];

  return (
    <div className="space-y-5 pb-20 animate-fade-in" id="game_panel_viewport">
      
      {/* Header Banner */}
      <div>
        <h2 className="font-serif text-xl font-bold text-stone-900 dark:text-stone-100 flex items-center gap-1.5">
          <span>茶圣试炼场</span>
          <span className="text-xs font-sans font-normal text-teal-800 dark:text-teal-400 bg-teal-50 dark:bg-teal-950/30 px-2 py-0.5 rounded">
            泡茶模拟小游戏
          </span>
        </h2>
        <p className="text-xs text-stone-500 dark:text-stone-400 mt-1">
          遵循中国古法仪式标准，手动操刀调配参数。一招一式计算融汇契合度，斩获茶道宗师头衔。
        </p>
      </div>

      {/* =========================================================================
         STEP 1: SELECT TEA (选择茶品)
         ========================================================================= */}
      {currentStep === 'tea' && (
        <div className="space-y-4 animate-fade-in" id="game_step_tea">
          <div className="p-3 bg-stone-100/55 dark:bg-stone-900/60 rounded-xl border border-stone-200/50 flex items-center gap-2 text-xs">
            <span className="font-bold text-center bg-stone-200 dark:bg-stone-800 rounded-full w-5 h-5 flex items-center justify-center text-stone-700 dark:text-stone-300">1</span>
            <span className="text-stone-600 dark:text-stone-400">第一折：选择您打算参悟或冲洗的干茶</span>
          </div>

          <div className="grid grid-cols-2 gap-2" id="game_tea_selection_grid">
            {TEA_DATABASE.map(tea => {
              const matches = selectedTea.id === tea.id;
              return (
                <button
                  key={tea.id}
                  onClick={() => {
                    playClickSound(settings.soundEnabled);
                    setSelectedTea(tea);
                    // Match default parameters
                    setSelectedUtensil(tea.brewing.preferredUtensil);
                    const amountNum = parseInt(tea.brewing.teaAmount) || 5;
                    setSelectedAmount(amountNum);
                    setSelectedTemp(Math.round((tea.brewing.tempMin + tea.brewing.tempMax) / 2));
                    setSelectedDuration(tea.brewing.steepTimes[0] || 15);
                  }}
                  className={`p-3.5 rounded-xl border text-left transition-all duration-200 select-none ${
                    matches
                      ? 'bg-emerald-50 dark:bg-emerald-950/20 border-emerald-500 text-stone-900 dark:text-stone-100 ring-1 ring-emerald-500/10'
                      : 'bg-white dark:bg-stone-900 border-stone-150 dark:border-stone-805 text-stone-600 dark:text-stone-400 hover:bg-stone-50'
                  }`}
                >
                  <p className="text-[10px] font-mono text-emerald-700 dark:text-emerald-400 mb-0.5">{tea.category}</p>
                  <p className="font-serif font-bold text-sm tracking-wide">{tea.name}</p>
                  <p className="text-[10px] text-stone-400 dark:text-stone-500 mt-1 line-clamp-1 truncate">{tea.brief}</p>
                </button>
              );
            })}
          </div>

          <div className="pt-4 flex justify-end">
            <button
              onClick={handleNextStep}
              className="px-6 py-2.5 rounded-xl bg-emerald-700 dark:bg-emerald-600 text-white font-semibold text-xs flex items-center gap-1.5 active:scale-95 shadow-sm transition-all"
            >
              下一步：选名器
              <ChevronRight className="w-4 h-4" />
            </button>
          </div>
        </div>
      )}

      {/* =========================================================================
         STEP 2: SELECT UTENSIL (选择茶具)
         ========================================================================= */}
      {currentStep === 'utensil' && (
        <div className="space-y-4 animate-fade-in" id="game_step_utensil">
          <div className="p-3 bg-stone-100/55 dark:bg-stone-900/60 rounded-xl border border-stone-200/50 flex items-center gap-2 text-xs">
            <span className="font-bold text-center bg-stone-200 dark:bg-stone-800 rounded-full w-5 h-5 flex items-center justify-center text-stone-700 dark:text-stone-300">2</span>
            <span className="text-stone-600 dark:text-stone-300">第二折：挑选这泡【{selectedTea.name}】的冲泡器具</span>
          </div>

          <div className="grid grid-cols-1 gap-2.5" id="game_utensil_selection_grid">
            {[
              { name: '盖碗', desc: '泥制防吸味高密盖碗，万能，传温快且无杂味吸附。' },
              { name: '紫砂壶', desc: '透气温润，极温恒持。最能催化发酵茶或普洱的厚感韵味，对嫩绿茶易闷烫。' },
              { name: '玻璃杯', desc: '全透光散热快，方便直观名茶直舞。缺点是不利于陈年黑乌龙的香气高激。' },
            ].map(ut => {
              const matched = selectedUtensil === ut.name;
              return (
                <button
                  key={ut.name}
                  onClick={() => {
                    playClickSound(settings.soundEnabled);
                    setSelectedUtensil(ut.name);
                  }}
                  className={`p-4 rounded-xl border text-left transition-all duration-200 flex justify-between items-center ${
                    matched
                      ? 'bg-emerald-50 dark:bg-emerald-950/20 border-emerald-500 text-stone-900 dark:text-stone-100'
                      : 'bg-white dark:bg-stone-900 border-stone-150 dark:border-stone-800 text-stone-605 dark:text-stone-400 hover:bg-stone-50'
                  }`}
                >
                  <div className="space-y-1">
                    <p className="font-serif font-bold text-sm">{ut.name}</p>
                    <p className="text-[11px] text-stone-400 dark:text-stone-500 max-w-sm">{ut.desc}</p>
                  </div>
                  {matched && <CheckCircle className="w-5 h-5 text-emerald-600 dark:text-emerald-400 shrink-0" />}
                </button>
              );
            })}
          </div>

          <div className="pt-4 flex justify-between">
            <button
              onClick={handlePrevStep}
              className="px-5 py-2.5 rounded-xl border border-stone-200 dark:border-stone-800 text-stone-605 text-xs flex items-center gap-1 active:scale-95 transition-all"
            >
              <ChevronLeft className="w-4 h-4" />
              返回
            </button>
            <button
              onClick={handleNextStep}
              className="px-6 py-2.5 rounded-xl bg-emerald-700 dark:bg-emerald-600 text-white font-semibold text-xs flex items-center gap-1.5 active:scale-95 shadow-sm transition-all"
            >
              下一步：调水温
              <ChevronRight className="w-4 h-4" />
            </button>
          </div>
        </div>
      )}

      {/* =========================================================================
         STEP 3: SELECT TEMPERATURE (选择水温)
         ========================================================================= */}
      {currentStep === 'temp' && (
        <div className="space-y-5 animate-fade-in" id="game_step_temp">
          <div className="p-3 bg-stone-100/55 dark:bg-stone-900/60 rounded-xl border border-stone-200/50 flex items-center gap-2 text-xs">
            <span className="font-bold text-center bg-stone-200 dark:bg-stone-800 rounded-full w-5 h-5 flex items-center justify-center text-stone-700 dark:text-stone-300">3</span>
            <span className="text-stone-600 dark:text-stone-300">第三折：煮水温控度数设定</span>
          </div>

          {/* Dial controller style slider */}
          <div className="p-6 rounded-xl bg-white dark:bg-stone-900 border border-stone-150 dark:border-stone-800 space-y-6 text-center">
            <div className="space-y-1">
              <span className="text-stone-400 dark:text-stone-350 text-xs font-semibold">选定水温</span>
              <div className="text-4xl font-mono font-extrabold text-amber-600 dark:text-amber-400 flex items-center justify-center gap-1">
                <Flame className="w-8 h-8 text-amber-500 animate-pulse" />
                <span>{selectedTemp}°C</span>
              </div>
            </div>

            {/* Slider */}
            <div className="space-y-2">
              <input
                type="range"
                min="70"
                max="100"
                step="1"
                value={selectedTemp}
                onChange={(e) => setSelectedTemp(Number(e.target.value))}
                className="w-full h-2 bg-stone-100 dark:bg-stone-950 rounded-full appearance-none cursor-pointer accent-emerald-600 dark:accent-emerald-400"
              />
              <div className="flex justify-between text-[11px] font-mono text-stone-400 dark:text-stone-350">
                <span>70°C (松针嫩芽最低)</span>
                <span>85°C</span>
                <span>100°C (老陈茶沸水)</span>
              </div>
            </div>

            <div className="flex justify-center text-[11px] text-stone-500 bg-stone-50 dark:bg-stone-950 p-2 text-left rounded-lg gap-2">
              <Lightbulb className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
              <span>
                温馨提示：【{selectedTea.name}】属【{selectedTea.category}】，其茶叶娇嫩度/发酵程度决定了最佳水温度数。标准推荐水温在 {selectedTea.brewing.tempMin}-{selectedTea.brewing.tempMax}°C 之间。
              </span>
            </div>
          </div>

          <div className="pt-4 flex justify-between">
            <button
              onClick={handlePrevStep}
              className="px-5 py-2.5 rounded-xl border border-stone-200 dark:border-stone-800 text-stone-605 text-xs flex items-center gap-1 active:scale-95 transition-all"
            >
              <ChevronLeft className="w-4 h-4" />
              返回
            </button>
            <button
              onClick={handleNextStep}
              className="px-6 py-2.5 rounded-xl bg-emerald-700 dark:bg-emerald-600 text-white font-semibold text-xs flex items-center gap-1.5 active:scale-95 shadow-sm transition-all"
            >
              下一步：量茶入瓮
              <ChevronRight className="w-4 h-4" />
            </button>
          </div>
        </div>
      )}

      {/* =========================================================================
         STEP 4: SELECT TEA AMOUNT (选择投茶量)
         ========================================================================= */}
      {currentStep === 'amount' && (
        <div className="space-y-4 animate-fade-in" id="game_step_amount">
          <div className="p-3 bg-stone-100/55 dark:bg-stone-900/60 rounded-xl border border-stone-200/50 flex items-center gap-2 text-xs">
            <span className="font-bold text-center bg-stone-200 dark:bg-stone-800 rounded-full w-5 h-5 flex items-center justify-center text-stone-700 dark:text-stone-300">4</span>
            <span className="text-stone-600 dark:text-stone-350">第四折：确定投放多少克茶叶 (投茶量)</span>
          </div>

          <div className="p-6 rounded-xl bg-white dark:bg-stone-900 border border-stone-150 dark:border-stone-800 text-center space-y-6">
            <div className="space-y-1">
              <span className="text-stone-400 dark:text-stone-350 text-xs font-semibold">茶称秤重（克重）</span>
              <p className="text-4xl font-mono font-extrabold text-stone-850 dark:text-stone-100 flex items-center justify-center gap-1">
                <Scale className="w-7 h-7 text-stone-500" />
                <span>{selectedAmount} 克 (g)</span>
              </p>
            </div>

            {/* Quick choices layout */}
            <div className="grid grid-cols-4 gap-2" id="quick_grams_grid">
              {[3, 5, 7, 10].map(amt => {
                const isSelected = selectedAmount === amt;
                return (
                  <button
                    key={amt}
                    onClick={() => {
                      playClickSound(settings.soundEnabled);
                      setSelectedAmount(amt);
                    }}
                    className={`py-2 rounded-lg border text-xs font-semibold font-mono transition-all ${
                      isSelected
                        ? 'bg-emerald-50 dark:bg-emerald-950/20 border-emerald-500 text-emerald-800 dark:text-emerald-400 font-extrabold'
                        : 'bg-white dark:bg-stone-900 border-stone-150 dark:border-stone-800 text-stone-500 dark:text-stone-400 hover:bg-stone-50'
                    }`}
                  >
                    {amt} 克
                  </button>
                );
              })}
            </div>

            {/* Slider choice */}
            <input
              type="range"
              min="2"
              max="15"
              step="1"
              value={selectedAmount}
              onChange={(e) => setSelectedAmount(Number(e.target.value))}
              className="w-full h-2 bg-stone-100 dark:bg-stone-950 rounded-full appearance-none cursor-pointer accent-emerald-600 dark:accent-emerald-400"
            />

            <div className="text-[11px] text-stone-500 bg-stone-50 dark:bg-stone-950 p-2 text-left rounded-lg">
              标准官方对标量：【{selectedTea.name}】官方标准推荐投茶克重大约为 【{selectedTea.brewing.teaAmount}】 (适配茶水比【{selectedTea.brewing.teaWaterRatio}】)。
            </div>
          </div>

          <div className="pt-4 flex justify-between">
            <button
              onClick={handlePrevStep}
              className="px-5 py-2.5 rounded-xl border border-stone-200 dark:border-stone-800 text-stone-605 text-xs flex items-center gap-1 active:scale-95 transition-all"
            >
              <ChevronLeft className="w-4 h-4" />
              返回
            </button>
            <button
              onClick={handleNextStep}
              className="px-6 py-2.5 rounded-xl bg-emerald-700 dark:bg-emerald-600 text-white font-semibold text-xs flex items-center gap-1.5 active:scale-95 shadow-sm transition-all"
            >
              下一步：选时冲洗
              <ChevronRight className="w-4 h-4" />
            </button>
          </div>
        </div>
      )}

      {/* =========================================================================
         STEP 5: SELECT STEEPING DURATION (选择浸泡时长)
         ========================================================================= */}
      {currentStep === 'duration' && (
        <div className="space-y-4 animate-fade-in" id="game_step_duration">
          <div className="p-3 bg-stone-100/55 dark:bg-stone-900/60 rounded-xl border border-stone-200/50 flex items-center gap-2 text-xs">
            <span className="font-bold text-center bg-stone-200 dark:bg-stone-800 rounded-full w-5 h-5 flex items-center justify-center text-stone-700 dark:text-stone-300">5</span>
            <span className="text-stone-600 dark:text-stone-350">第五折：落水滚沸后，闷润静待时长 (浸泡秒数)</span>
          </div>

          <div className="p-6 rounded-xl bg-white dark:bg-stone-900 border border-stone-150 dark:border-stone-800 text-center space-y-6">
            <div className="space-y-1">
              <span className="text-stone-400 dark:text-stone-350 text-xs font-semibold">闷汤时钟</span>
              <p className="text-4xl font-mono font-extrabold text-stone-850 dark:text-stone-100 flex items-center justify-center gap-1">
                <Clock className="w-7 h-7 text-stone-500" />
                <span>{selectedDuration} 秒 (s)</span>
              </p>
            </div>

            {/* Quick choices rows */}
            <div className="grid grid-cols-4 gap-2" id="quick_durations_grid">
              {[10, 15, 25, 40].map(sec => {
                const isSelected = selectedDuration === sec;
                return (
                  <button
                    key={sec}
                    onClick={() => {
                      playClickSound(settings.soundEnabled);
                      setSelectedDuration(sec);
                    }}
                    className={`py-2 rounded-lg border text-xs font-semibold font-mono transition-all ${
                      isSelected
                        ? 'bg-emerald-50 dark:bg-emerald-950/20 border-emerald-500 text-emerald-800 dark:text-emerald-400 font-extrabold'
                        : 'bg-white dark:bg-stone-900 border-stone-150 dark:border-stone-800 text-stone-500 dark:text-stone-400 hover:bg-stone-50'
                    }`}
                  >
                    {sec} 秒
                  </button>
                );
              })}
            </div>

            <input
              type="range"
              min="3"
              max="90"
              step="1"
              value={selectedDuration}
              onChange={(e) => setSelectedDuration(Number(e.target.value))}
              className="w-full h-2 bg-stone-100 dark:bg-stone-950 rounded-full appearance-none cursor-pointer accent-emerald-600 dark:accent-emerald-400"
            />

            <div className="text-[11px] text-stone-500 bg-stone-50 dark:bg-stone-950 p-2 text-left rounded-lg">
              第一泡标准常数指南：【{selectedTea.name}】官方大典推荐的第 1 泡闷出时长为 【{selectedTea.brewing.steepTimes[0]}】 秒。
            </div>
          </div>

          <div className="pt-4 flex justify-between">
            <button
              onClick={handlePrevStep}
              className="px-5 py-2.5 rounded-xl border border-stone-200 dark:border-stone-800 text-stone-605 text-xs flex items-center gap-1 active:scale-95 transition-all"
            >
              <ChevronLeft className="w-4 h-4" />
              返回
            </button>
            <button
              onClick={handleNextStep}
              className="px-6 py-3 rounded-xl bg-orange-600 hover:bg-orange-700 text-white font-bold text-xs flex items-center gap-1.5 active:scale-95 shadow-sm transition-all animate-pulse"
              id="game_start_brewing_btn"
            >
              🔥 注入沸水 · 开始冲泡！
              <ChevronRight className="w-4 h-4" />
            </button>
          </div>
        </div>
      )}

      {/* =========================================================================
         STEP 6: BREWING ANIMATION SCREEN (开始冲泡过程)
         ========================================================================= */}
      {currentStep === 'brewing' && (
        <div className="p-8 rounded-2xl bg-white dark:bg-stone-900 border border-stone-105 dark:border-stone-805 shadow-md flex flex-col items-center justify-center text-center space-y-6 min-h-[300px] animate-fade-in" id="game_step_brewing">
          {/* Bubbles splashing liquid graphic container */}
          <div className="relative w-36 h-36 flex items-center justify-center" id="animation_container">
            
            {/* Animated Tea and Water pouring lines */}
            <div className="absolute inset-0 border-4 border-emerald-500/10 dark:border-emerald-400/10 rounded-full flex items-center justify-center overflow-hidden">
              <div 
                className="absolute bottom-0 left-0 right-0 bg-emerald-700/15 dark:bg-emerald-600/20 transition-all duration-300 rounded-lg flex items-center justify-center"
                style={{ height: `${brewProgress}%` }}
              >
                {/* Rolling water leaves */}
                <div className="text-xs text-emerald-600 dark:text-emerald-305 opacity-50 font-serif absolute inset-0 flex flex-wrap gap-4 items-center justify-center p-3 animate-pulse">
                  <span>🍃</span><span>🌱</span><span>🍂</span><span>🌿</span>
                </div>
              </div>
            </div>

            <Coffee className="w-16 h-16 text-emerald-700/80 dark:text-emerald-400/80 animate-bounce" />
          </div>

          <div className="space-y-1">
            <h3 className="font-serif text-lg font-bold text-stone-850 dark:text-stone-100 animate-pulse">
              一叶浮沉，时光升华...
            </h3>
            <p className="text-xs text-stone-400 dark:text-stone-500 max-w-sm">
              正在注入 {selectedTemp}°C 山泉沸水盛满 【{selectedUtensil}】 之中。共投放极鲜干茶 {selectedAmount}g。深度析出中，闷泡历时 {selectedDuration}s。
            </p>
          </div>

          <div className="w-full max-w-xs bg-stone-100 dark:bg-stone-950 h-1.5 rounded-full overflow-hidden">
            <div 
              className="bg-emerald-600 h-full"
              style={{ width: `${brewProgress}%` }}
            ></div>
          </div>
        </div>
      )}

      {/* =========================================================================
         STEP 7: SCORE EVALUATION & DIAGNOSTICS (评分结果显示)
         ========================================================================= */}
      {currentStep === 'result' && gameResult && (
        <div className="space-y-5 animate-fade-in" id="game_step_result">
          
          {/* Main Grade score card */}
          <div 
            className={`p-6 rounded-2xl border text-center space-y-4 shadow-sm relative overflow-hidden ${activeTheme.bg} ${activeTheme.border}`}
            id="score_grade_card"
          >
            {/* Background elements */}
            <div className="absolute top-0 right-0 p-8 opacity-5 pointer-events-none select-none">
              <Award className="w-40 h-40" />
            </div>

            <div className="space-y-1 relative z-10">
              <span className="text-[11px] uppercase tracking-widest font-mono text-stone-400">司茗院评分结论</span>
              
              <div className="flex justify-center items-baseline gap-1 mt-1">
                <span className="text-5xl font-mono font-black" id="score_number_display">
                  {gameResult.score}
                </span>
                <span className="text-xs text-stone-400">分</span>
              </div>

              <div className="inline-block px-4 py-1 rounded-full text-sm font-serif font-extrabold tracking-wide uppercase shadow-3xs bg-white dark:bg-stone-900 border mt-3 animate-bounce">
                等阶：{gameResult.rating}
              </div>
            </div>

            <p className="text-xs leading-relaxed text-stone-800 dark:text-stone-200 font-medium max-w-md mx-auto relative z-10 p-3 bg-white/50 dark:bg-stone-905/45 rounded-xl border border-white/40">
              {gameResult.advice}
            </p>
          </div>

          {/* Diagnostic Parameter Comparisons Checklist */}
          <div className="space-y-3" id="diagnostics_checklist">
            <h3 className="font-serif text-sm font-bold text-stone-800 dark:text-stone-150 flex items-center gap-1.5">
              <AlertCircle className="w-4.5 h-4.5 text-stone-400" /> 茶学实操诊断细则
            </h3>

            <div className="space-y-2 text-xs" id="diagnostics_rows">
              {/* Utensil check */}
              <div className="p-3 bg-white dark:bg-stone-900 rounded-xl border border-stone-150 dark:border-stone-800 flex gap-3">
                <div className={`p-2 rounded-lg shrink-0 h-9 w-9 flex items-center justify-center ${selectedUtensil === selectedTea.brewing.preferredUtensil ? 'bg-emerald-50 text-emerald-700' : 'bg-stone-50 text-stone-600'}`}>
                  <Coffee className="w-4.5 h-4.5" />
                </div>
                <div>
                  <div className="flex justify-between items-baseline mb-0.5">
                    <span className="font-bold text-stone-800 dark:text-stone-300">【茶器调配】: {selectedUtensil}</span>
                    <span className="text-[10px] text-stone-400 dark:text-stone-500">对标：{selectedTea.brewing.preferredUtensil}</span>
                  </div>
                  <p className="text-stone-605 dark:text-stone-400 text-[11px] leading-relaxed">{gameResult.utensilMsg}</p>
                </div>
              </div>

              {/* Temp check */}
              <div className="p-3 bg-white dark:bg-stone-900 rounded-xl border border-stone-150 dark:border-stone-800 flex gap-3">
                <div className={`p-2 rounded-lg shrink-0 h-9 w-9 flex items-center justify-center ${(selectedTemp >= selectedTea.brewing.tempMin && selectedTemp <= selectedTea.brewing.tempMax) ? 'bg-emerald-50 text-emerald-700' : 'bg-stone-50 text-stone-600'}`}>
                  <Flame className="w-4.5 h-4.5" />
                </div>
                <div>
                  <div className="flex justify-between items-baseline mb-0.5">
                    <span className="font-bold text-stone-800 dark:text-stone-300">【滚水冲温】: {selectedTemp}°C</span>
                    <span className="text-[10px] text-stone-400 dark:text-stone-500">对标：{selectedTea.brewing.tempMin}-{selectedTea.brewing.tempMax}°C</span>
                  </div>
                  <p className="text-stone-605 dark:text-stone-400 text-[11px] leading-relaxed">{gameResult.tempMsg}</p>
                </div>
              </div>

              {/* Amount check */}
              <div className="p-3 bg-white dark:bg-stone-900 rounded-xl border border-stone-150 dark:border-stone-800 flex gap-3">
                <div className={`p-2 rounded-lg shrink-0 h-9 w-9 flex items-center justify-center ${selectedAmount === (parseInt(selectedTea.brewing.teaAmount) || 5) ? 'bg-emerald-50 text-emerald-700' : 'bg-stone-50 text-stone-600'}`}>
                  <Scale className="w-4.5 h-4.5" />
                </div>
                <div>
                  <div className="flex justify-between items-baseline mb-0.5">
                    <span className="font-bold text-stone-800 dark:text-stone-300">【投定克重】: {selectedAmount}g</span>
                    <span className="text-[10px] text-stone-400 dark:text-stone-500">对标：{selectedTea.brewing.teaAmount}</span>
                  </div>
                  <p className="text-stone-605 dark:text-stone-400 text-[11px] leading-relaxed">{gameResult.amountMsg}</p>
                </div>
              </div>

              {/* Duration check */}
              <div className="p-3 bg-white dark:bg-stone-900 rounded-xl border border-stone-150 dark:border-stone-800 flex gap-3">
                <div className={`p-2 rounded-lg shrink-0 h-9 w-9 flex items-center justify-center ${Math.abs(selectedDuration - selectedTea.brewing.steepTimes[0]) <= 3 ? 'bg-emerald-50 text-emerald-700' : 'bg-stone-50 text-stone-600'}`}>
                  <Clock className="w-4.5 h-4.5" />
                </div>
                <div>
                  <div className="flex justify-between items-baseline mb-0.5">
                    <span className="font-bold text-stone-800 dark:text-stone-300">【候出泡时】: {selectedDuration}s</span>
                    <span className="text-[10px] text-stone-400 dark:text-stone-500">对标：{selectedTea.brewing.steepTimes[0]}s</span>
                  </div>
                  <p className="text-stone-605 dark:text-stone-400 text-[11px] leading-relaxed">{gameResult.durationMsg}</p>
                </div>
              </div>
            </div>
          </div>

          {/* Infinite repeat action */}
          <div className="flex gap-3 justify-center pt-4" id="game_completed_action_row">
            <button
              onClick={() => {
                playClickSound(settings.soundEnabled);
                onNavigate('encyclopedia');
              }}
              className="grow flex items-center justify-center gap-1 py-3 px-4 rounded-xl border border-stone-250 dark:border-stone-800 text-stone-650 bg-white hover:bg-stone-50 font-bold text-xs"
            >
              浏览其百科百科
            </button>
            <button
              onClick={resetGame}
              className="grow-[2.5] flex items-center justify-center gap-2 py-3.5 px-4 rounded-xl text-white bg-emerald-700 dark:bg-emerald-600 hover:bg-emerald-800 font-extrabold text-xs shadow-md transition-all active:scale-95"
              id="game_replay_btn"
            >
              <RotateCcw className="w-4 h-4" />
              重新搭配·再次挑战
            </button>
          </div>

        </div>
      )}

    </div>
  );
};
