import { Tea } from '../types';

export const TEA_DATABASE: Tea[] = [
  {
    id: 'xihu_longjing',
    name: '西湖龙井',
    category: '绿茶',
    brief: '西湖龙井位列中国十大名茶之首，产于浙江杭州西湖一带。以“色绿、香郁、味甘、形美”四绝闻名。扁平光滑的面，色泽翠绿泛黄。',
    origin: '浙江省杭州市西湖茶区',
    craft: '鲜叶采摘 → 摊放 → 杀青（抖炒） → 摊凉 → 双锅筛分 → 辉锅（干燥成型）',
    taste: '香气清鲜高雅，带有淡淡的蚕豆清香或炒栗香；口感鲜爽甘醇，回甘持久。',
    brewing: {
      tempMin: 80,
      tempMax: 85,
      teaAmount: '3g',
      steepTimes: [30, 45, 60, 90],
      preferredUtensil: '玻璃杯',
      teaWaterRatio: '1:50'
    },
    storage: '低温、避光、防潮、密封。最适宜存放在冰箱冷藏室（0-5℃），并双层袋密封防串味。',
    storageTaboos: '忌高温、忌潮湿、忌暴露在空气中、严禁与有异味物品同放。',
    scenes: ['清晨提神', '商务洽谈', '静心阅读']
  },
  {
    id: 'dongting_biluochun',
    name: '洞庭碧螺春',
    category: '绿茶',
    brief: '碧螺春产于江苏吴县太湖之畔的洞庭山，茶果间作，使其自带天然花果香。条索纤细，卷曲成螺，满披白毫，银绿隐翠。',
    origin: '江苏省苏州市太湖洞庭山',
    craft: '采摘（极其细嫩，只采一芽一叶初展） → 杀青 → 揉捻 → 搓团显毫 → 烘干',
    taste: '花果香极其浓郁，汤色嫩绿清澈；入口极其鲜嫩，回甘如甘露，生津迅猛。',
    brewing: {
      tempMin: 75,
      tempMax: 80,
      teaAmount: '3g',
      steepTimes: [25, 35, 50, 75],
      preferredUtensil: '玻璃杯',
      teaWaterRatio: '1:50'
    },
    storage: '高真空包装，置于冰箱冷藏。绿茶不耐保存，建议6-12个月内饮毕。',
    storageTaboos: '忌阳光直射，避潮。',
    scenes: ['春季尝鲜', '午后休闲']
  },
  {
    id: 'zhengshan_xiaozhong',
    name: '正山小种',
    category: '红茶',
    brief: '世界上最早的红茶，被称为“红茶鼻祖”。产于福建武夷山。传统工艺使用松针或松木熏焙，带有独特的松烟香与桂圆甜。',
    origin: '福建省武夷山市星村镇桐木关',
    craft: '萎凋 → 揉捻 → 发酵 → 纯干（松木熏焙） → 定型',
    taste: '熏焙型带有天然松烟香、桂圆汤香，入口甜润细腻，无丝毫苦涩，喉韵绵长。',
    brewing: {
      tempMin: 90,
      tempMax: 95,
      teaAmount: '5g',
      steepTimes: [10, 15, 25, 35],
      preferredUtensil: '盖碗',
      teaWaterRatio: '1:30'
    },
    storage: '常温密封保存。容器以紫砂罐、铁罐为优。',
    storageTaboos: '忌潮湿，严禁冷藏（红茶无需冷藏，冷藏易吸湿变质）。',
    scenes: ['暖胃下午茶', '冬日御寒', '搭配点心']
  },
  {
    id: 'jinjunmei',
    name: '金骏眉',
    category: '红茶',
    brief: '金骏眉是现代红茶的顶奢之作，由正山小种传统工艺改良而来。全部采摘武夷山国家级自然保护区内的野生茶树嫩芽，数万颗芽头方能制成一斤。',
    origin: '福建省武夷山桐木关高山茶区',
    craft: '精细采摘 → 萎凋 → 摇青 → 揉捻 → 发酵 → 烘焙',
    taste: '带有天然的花香、蜜香与果香。汤色金黄亮丽，口感清甜极度爽滑，汤中带甜。',
    brewing: {
      tempMin: 85,
      tempMax: 90,
      teaAmount: '5g',
      steepTimes: [5, 10, 18, 28],
      preferredUtensil: '盖碗',
      teaWaterRatio: '1:30'
    },
    storage: '常温下双层密封避光保存，防潮。可在阴凉干燥处长期保持香气。',
    storageTaboos: '防潮、防异味。',
    scenes: ['贵宾款待', '静心品鉴', '节日馈赠']
  },
  {
    id: 'dahongpao',
    name: '大红袍',
    category: '乌龙茶',
    brief: '大红袍是武夷岩茶的杰出代表，属半发酵乌龙茶。以独具的“岩骨花香”（岩韵）誉满全球。纯手工炭焙工艺极其考究。',
    origin: '福建省武夷山名岩区（三坑两涧）',
    craft: '萎凋 → 做青（摇青、等青交代） → 杀青 → 双揉 → 走水焙 → 拣剔 → 复焙（炭火重焙）',
    taste: '香气成熟高爽，焦糖香与熟果香交织；滋味浓醇重实，岩韵极强，杯底留香持久。',
    brewing: {
      tempMin: 95,
      tempMax: 100,
      teaAmount: '7g',
      steepTimes: [5, 12, 20, 35],
      preferredUtensil: '紫砂壶',
      teaWaterRatio: '1:15'
    },
    storage: '常温，密封，避光。岩茶适度存放（1-3年）火气退去后，口感更好。',
    storageTaboos: '严禁入冰箱冷藏，不可受潮，防止吸附杂味。',
    scenes: ['茶友雅聚', '饭后消食', '深夜灵感']
  },
  {
    id: 'tieguanyin',
    name: '铁观音',
    category: '乌龙茶',
    brief: '铁观音原产于福建安溪，以其独特的“音韵”著称。叶体肥厚，紧结沉重，色泽砂绿。清香型铁观音拥有标志性的“兰花香”。',
    origin: '福建省泉州市安溪县',
    craft: '采摘（中开面三叶） → 晒青 → 晾青 → 摇青（反覆多次） → 炒青 → 揉烘 → 包揉（揉成球状） → 焙干',
    taste: '清香型具有高雅的兰花香，汤色金黄清澈，滋味鲜爽甘醇，音韵幽长。',
    brewing: {
      tempMin: 95,
      tempMax: 100,
      teaAmount: '7g',
      steepTimes: [10, 15, 25, 40],
      preferredUtensil: '盖碗',
      teaWaterRatio: '1:15'
    },
    storage: '清香型铁观音必须存放于冷冻室（-18℃），方能锁住鲜灵的兰花香；浓香型可常温存放。',
    storageTaboos: '清香型最忌常温存放，未密封极易跑香。',
    scenes: ['提神醒脑', '家庭自饮', '功夫茶体验']
  },
  {
    id: 'baihao_yinzhen',
    name: '白毫银针',
    category: '白茶',
    brief: '白毫银针是白茶中的极品，素有“茶中美女”、“茶王”之美称。全由未展开的肥壮肥嫩茶芽制成，满披银色白毫，形似针。',
    origin: '福建省宁德福鼎市、南平政和县',
    craft: '白茶工艺极其自然：萎凋（日晒或室内萎凋） → 烘干（低温慢焙）',
    taste: '清甜鲜爽，毫香显露，带有淡淡的三叶草香和野蜜甜；汤色杏黄明亮，毫浑丰富。',
    brewing: {
      tempMin: 85,
      tempMax: 90,
      teaAmount: '3g',
      steepTimes: [25, 35, 50, 70],
      preferredUtensil: '盖碗',
      teaWaterRatio: '1:50'
    },
    storage: '“一年茶，三年药，七年宝”。白茶极其适合长期保存。常温，干燥，密封，避光，无异味。',
    storageTaboos: '切忌冰箱保存，忌水分，受潮会导致红变发酸。',
    scenes: ['夏日消暑', '老年养生', '收藏投资']
  },
  {
    id: 'baimudan',
    name: '白牡丹',
    category: '白茶',
    brief: '由一芽一叶或二叶制成，叶张展开，白毫显露，形似花朵，故得名。其等级介于白毫银针与寿眉之间，兼具饱满茶汤与悠长香气。',
    origin: '福建省福鼎市、政和县',
    craft: '仅鲜叶采摘 → 萎凋 → 烘干（无揉无炒，天然成型）',
    taste: '兼具毫香和兰花般的花香，汤色杏黄，口感比银针更为醇厚粘稠，甜度极佳。',
    brewing: {
      tempMin: 90,
      tempMax: 95,
      teaAmount: '4g',
      steepTimes: [15, 25, 40, 55],
      preferredUtensil: '盖碗',
      teaWaterRatio: '1:35'
    },
    storage: '常温密封干燥贮存。随年份增加，汤色会向琥珀红、深红转化，香溢药香、陈香。',
    storageTaboos: '阳光直射、水分超标、高湿度。',
    scenes: ['午后闲暇', '茶会品尝']
  },
  {
    id: 'junshan_yinzhen',
    name: '君山银针',
    category: '黄茶',
    brief: '中国唯一的顶级黄茶，产于湖南岳阳洞庭湖中的君山岛。其著名的特征是“黄叶黄汤”。芽头茁壮坚实，白毫完整。',
    origin: '湖南省岳阳市君山岛',
    craft: '杀青 → 抖刷 → 撒干 → 初烘 → 初包（闷黄） → 复烘 → 复包 → 足干',
    taste: '具有独特的闷黄清香，隐隐带药草香；汤色杏黄明净，入口甜爽不腻，醇厚柔和。',
    brewing: {
      tempMin: 80,
      tempMax: 85,
      teaAmount: '3g',
      steepTimes: [40, 60, 90, 120],
      preferredUtensil: '玻璃杯',
      teaWaterRatio: '1:50'
    },
    storage: '密封、常温避光。存放于铁听、陶瓷罐为好。',
    storageTaboos: '忌潮湿，避免剧烈温差导致凝聚冷凝水。',
    scenes: ['传统节日', '静心独处']
  },
  {
    id: 'anhua_heicha',
    name: '安化黑茶',
    category: '黑茶',
    brief: '安化黑茶是跨越千年的历史名茶，茶马古道的主要运输产品，因“金花益生菌”（冠突散囊菌）而享誉海外。外观乌润沉重。',
    origin: '湖南省益阳市安化县',
    craft: '杀青 → 揉捻 → 渥堆发酵 → 复揉 → 烘焙干燥（松柴暗火）',
    taste: '菌花香明显，带有独特的松香、樟香或枣香；开汤橙黄透亮，滋味醇厚甜润，陈香满口。',
    brewing: {
      tempMin: 95,
      tempMax: 100,
      teaAmount: '6g',
      steepTimes: [20, 30, 45, 70],
      preferredUtensil: '紫砂壶',
      teaWaterRatio: '1:25'
    },
    storage: '阴凉、通风、防潮、无异味。黑茶属于后发酵茶，需要微量氧气和水分与之共同成长，切忌真空密封。',
    storageTaboos: '绝对不能放塑料袋或真空存，忌冰箱冷藏。',
    scenes: ['饭后解腻', '助消化', '围炉煮茶']
  },
  {
    id: 'puer_shengcha',
    name: '普洱生茶',
    category: '普洱',
    brief: '普洱生茶采用云南大叶种晒青毛茶为原料，未经人工渥堆发酵，直接压制成型。具有极强的后转化空间，越陈越香。',
    origin: '云南省西双版纳、临沧、普洱等茶区',
    craft: '采摘 → 萎凋 → 杀青（铁锅手工炒制） → 揉捻 → 日晒干燥（晒青毛茶） → 蒸压成型',
    taste: '茶气高亢霸道，山野气韵足。新茶微带苦涩但化得极快，回甘猛烈生津源源不断。香气丰富，果香、蜜香甚至樟香。',
    brewing: {
      tempMin: 95,
      tempMax: 100,
      teaAmount: '7g',
      steepTimes: [5, 10, 20, 35],
      preferredUtensil: '盖碗',
      teaWaterRatio: '1:15'
    },
    storage: '常温避光、通风干燥、防异味。不宜绝对密封，需适量游离空气进行陈化。',
    storageTaboos: '忌入冰箱、忌暴晒、忌完全真空、忌潮湿严重。',
    scenes: ['深度茶友品鉴', '饭后刮油']
  },
  {
    id: 'puer_shucha',
    name: '普洱熟茶',
    category: '普洱',
    brief: '普洱熟茶以云南大叶种晒青毛茶为原料，经过科学的“人工渥堆发酵”工艺，使得茶叶多酚类等深度转化。性质温和温润。',
    origin: '云南省勐海茶厂、昆明茶厂等',
    craft: '晒青毛茶 → 洒水渥堆（微生物发酵，历时40-60天） → 翻堆 → 干燥 → 筛分分级',
    taste: '口感极其醇厚黏稠，质感如红酒般细腻，果甜、木香和陈香明显。无苦涩感，汤色红浓明亮，极其温暖润喉。',
    brewing: {
      tempMin: 95,
      tempMax: 100,
      teaAmount: '7g',
      steepTimes: [10, 20, 35, 55],
      preferredUtensil: '紫砂壶',
      teaWaterRatio: '1:15'
    },
    storage: '常温干燥避光保存。熟茶已发酵充分，存放更偏向品质稳定和陈香升华。',
    storageTaboos: '防异味（熟茶吸味性极强，一定要避开厨房或异味源）。',
    scenes: ['养胃润肠', '冬夜安神', '中老年保健']
  },
  {
    id: 'jasmine_tea',
    name: '茉莉龙珠',
    category: '花茶',
    brief: '茉莉龙珠（又称茉莉绣球）是将优质绿茶嫩芽手工揉捏成珠，再加入鲜活茉莉花进行多次“窨制”（花香吸附工艺），不着花瓣，却得人间第一香。',
    origin: '福建省福州市（窨制基地：广西横州）',
    craft: '茶胚制作（揉成龙珠） → 茉莉鲜花采摘 → 拌和窨花 → 散热通花 → 提花（多次窨制，通常为3-9次） → 烘干',
    taste: '茉莉花香极其鲜灵芬芳，持久不散。茶汤鲜爽甘甜，喉头充盈芬芳的花蜜感，满室飘香。',
    brewing: {
      tempMin: 85,
      tempMax: 90,
      teaAmount: '3g',
      steepTimes: [30, 45, 60, 90],
      preferredUtensil: '玻璃杯',
      teaWaterRatio: '1:50'
    },
    storage: '密封、避光、防潮。建议放在冷藏室（0-5℃）以保鲜兰花茉莉香。',
    storageTaboos: '极易跑香跑味，必须高硬度密封，忌与重味食品同放。',
    scenes: ['办公提神', '春夏季自饮', '招待新手茶友']
  },
  {
    id: 'huangshan_maofeng',
    name: '黄山毛峰',
    category: '绿茶',
    brief: '黄山毛峰产于安徽省黄山一带，由徽茶宗师创制。其叶色微黄带绿，形似雀舌，满披白毫。入杯冲泡后清香高扬，蕴含天然兰花之芬芳。',
    origin: '安徽省黄山市徽州区富溪乡',
    craft: '精细采摘（特级采一芽一叶初展） → 杀青 → 揉捻 → 烘焙干燥',
    taste: '清香幽雅带有兰花香；汤色清澈微黄；滋味鲜浓、甘甜，回甘生津十分明显。',
    brewing: {
      tempMin: 80,
      tempMax: 85,
      teaAmount: '3g',
      steepTimes: [30, 50, 70, 100],
      preferredUtensil: '玻璃杯',
      teaWaterRatio: '1:50'
    },
    storage: '双层密封袋包装，放置于0-5℃冰箱冷藏保存。',
    storageTaboos: '防潮、防异味、忌高温。',
    scenes: ['清晨润喉', '闲暇细品', '老友叙旧']
  },
  {
    id: 'luan_guapian',
    name: '六安瓜片',
    category: '绿茶',
    brief: '六安瓜片是绿茶中唯一去梗去芽、单纯以成熟单片叶片制成的名茶。产于大别山北麓，外形如瓜子，色泽宝绿，蕴含独特高火香。',
    origin: '安徽省六安市齐头山茶区',
    craft: '鲜叶采摘 → 掰茶去梗芽 → 炒生锅（杀青） → 炒熟锅 → 揉捻成形 → 烘焙炭火毛火 → 提烘拉老火',
    taste: '带有浓郁的高火熟板栗香，汤色明亮。滋味醇厚浓烈，耐泡度高，苦后生甘，回味悠长。',
    brewing: {
      tempMin: 85,
      tempMax: 90,
      teaAmount: '3g',
      steepTimes: [35, 55, 80, 110],
      preferredUtensil: '玻璃杯',
      teaWaterRatio: '1:50'
    },
    storage: '置于金属密封罐中冷藏保存。',
    storageTaboos: '切忌日光直射，避潮气，防氧化变色。',
    scenes: ['午后打盹提神', '重口味餐后解腻']
  },
  {
    id: 'qimen_hongcha',
    name: '祁门工夫',
    category: '红茶',
    brief: '世界三大高香红茶之一，自清光绪年间创制以来便风靡欧美，尤受英国王室青睐。其干茶条索细紧，带有独特的“祁门香”。',
    origin: '安徽省黄山市祁门县',
    craft: '嫩芽采摘 → 萎凋 → 揉捻 → 发酵 → 烘干 → 精制分级（筛分、抖切、拼配）',
    taste: '具有高贵持久的复合型“祁门香”，似蜜糖香又带苹果与兰花之香；汤色红亮，醇厚隽永。',
    brewing: {
      tempMin: 85,
      tempMax: 90,
      teaAmount: '5g',
      steepTimes: [15, 20, 30, 45],
      preferredUtensil: '盖碗',
      teaWaterRatio: '1:30'
    },
    storage: '常温下采用密封铁听或紫砂罐。祁门红茶在制成后半年至一年香气最为融合稳定。',
    storageTaboos: '忌潮，远离厨房及香水。',
    scenes: ['欧式下午茶', '暖胃安神', '读书听乐']
  },
  {
    id: 'dianhong_jinzhen',
    name: '滇红金针',
    category: '红茶',
    brief: '滇红金针是云南大叶种红茶的重要代表。采用纯肥壮单芽经传统和现代工艺精制而成。干茶形如金针，通体金黄毫满，金光闪烁。',
    origin: '云南省临沧市凤庆县',
    craft: '大叶种单芽采摘 → 萎凋 → 揉捻 → 科学发酵 → 烘焙定型',
    taste: '蕴含浓郁的野蜜香与香甜麦芽糖香。口感极其丰满滑润，甜度很高而不涩，金圈明显。',
    brewing: {
      tempMin: 85,
      tempMax: 90,
      teaAmount: '5g',
      steepTimes: [8, 15, 25, 35],
      preferredUtensil: '盖碗',
      teaWaterRatio: '1:30'
    },
    storage: '常温避光密封放置。',
    storageTaboos: '忌高温受潮，忌与异味重的东西同置。',
    scenes: ['寒冬取暖', '品茶会友', '送礼馈赠']
  },
  {
    id: 'fenghuang_dancong_yashixiang',
    name: '凤凰单丛·鸭屎香',
    category: '乌龙茶',
    brief: '凤凰单丛中的“顶流”香型，因种植于特定黄土壤且为防盗而得其名。实则花香袭人，干茶条索紧卷，呈黑褐色，极高香、耐泡。',
    origin: '广东省潮州市潮安区凤凰镇',
    craft: '晒青 → 晾青 → 碰青（做青，反复多次促进发酵与芬芳生成） → 杀青 → 揉捻 → 炭火多次烘焙',
    taste: '银花香极其高锐芬芳，俗称“大乌叶单丛”。入口微苦随即化开，银花甜香在口腔中瞬间炸裂，极为高爽，冷杯余香明显。',
    brewing: {
      tempMin: 95,
      tempMax: 100,
      teaAmount: '7g',
      steepTimes: [5, 8, 12, 18],
      preferredUtensil: '盖碗',
      teaWaterRatio: '1:15'
    },
    storage: '常温下在密闭性好的锡听或专用铁听中保存，不宜久晒或极冷。',
    storageTaboos: '忌潮、忌异味、忌放入冷藏室。',
    scenes: ['潮汕工夫茶会', '深夜工作提神', '聚会斗茶']
  },
  {
    id: 'dongding_wulong',
    name: '冻顶乌龙',
    category: '乌龙茶',
    brief: '台湾名茶的经典代表。产于南投县鹿谷乡冻顶山茶区。叶片肥厚，条索卷曲呈半球状（紧结）。具有中偏重发酵、重烘焙的风格。',
    origin: '台湾省南投县鹿谷乡',
    craft: '日光萎凋 → 室内萎凋 → 搅拌摇青 → 杀青 → 包揉搓压（球状成型） → 烘焙',
    taste: '汤色金黄略显偏红，带有熟果香及炭火焙火熟麦特有的浓郁香气。滋味甘醇甘润，喉韵十足。',
    brewing: {
      tempMin: 95,
      tempMax: 100,
      teaAmount: '7g',
      steepTimes: [15, 25, 40, 60],
      preferredUtensil: '紫砂壶',
      teaWaterRatio: '1:15'
    },
    storage: '密封存放于干燥常温处。',
    storageTaboos: '忌潮，不宜冷藏吸潮。',
    scenes: ['老茶友怀旧', '搭配中式点心']
  },
  {
    id: 'fuding_shoumei',
    name: '福鼎寿眉',
    category: '白茶',
    brief: '由福鼎大白茶等茶树一芽二、三叶或粗老叶制成。因其白毫显露如老翁之眉而得名。寿眉产量大、极耐转化，老饼更是药香悠长。',
    origin: '福建省宁德市福鼎市',
    craft: '鲜叶采摘 → 日晒萎凋 → 低温烘干（不炒不揉，保持天然多酚）',
    taste: '新茶花香鲜爽。经过数年转化成老寿眉后，汤色红褐，红枣香与荷叶香极佳，口感糯甜黏稠、醇厚润滑。',
    brewing: {
      tempMin: 95,
      tempMax: 100,
      teaAmount: '5g',
      steepTimes: [15, 25, 40, 60],
      preferredUtensil: '盖碗',
      teaWaterRatio: '1:30'
    },
    storage: '常温双层塑料袋并纸箱密封保存。其极佳的老化潜能能产生醇滑药香与枣香。',
    storageTaboos: '防潮最关键（水分超过7%易霉变），忌进纸盒受潮，禁放冷箱。',
    scenes: ['围炉煮老茶', '日常保健养胃', '长期保值收藏']
  },
  {
    id: 'mengding_huangya',
    name: '蒙顶黄芽',
    category: '黄茶',
    brief: '蒙山茶中的历史极品，唐代起列为贡茶。产于四川雅安名山区蒙顶山。干茶色泽微黄均整，白毫显露，形似雀舌。',
    origin: '四川省雅安市名山区蒙顶山',
    craft: '采摘单芽 → 杀青 → 初包（闷黄） → 复炒 → 复包（再闷黄） → 三炒 → 堆放 → 烘干',
    taste: '独有淡淡的焖蒸米香、豆花香；茶汤金黄透亮；口感甘甜无比，醇厚滑润，几乎无涩味。',
    brewing: {
      tempMin: 80,
      tempMax: 85,
      teaAmount: '3g',
      steepTimes: [35, 50, 75, 105],
      preferredUtensil: '玻璃杯',
      teaWaterRatio: '1:50'
    },
    storage: '密封铝箔袋，冰箱0-5℃保存。',
    storageTaboos: '热度高和水分，防止失去黄茶独有的活性。',
    scenes: ['闲适读书', '高雅自饮']
  },
  {
    id: 'wuzhou_liubaocha',
    name: '梧州六堡茶',
    category: '黑茶',
    brief: '广西历史名茶，著名的“侨销茶”。以“红、浓、陈、醇”四绝著称，且常有冠突散囊菌析出的“金花”。性温和，极耐存放。',
    origin: '广西壮族自治区梧州市苍梧县六堡镇',
    craft: '鲜叶杀青 → 揉捻 → 双蒸双堆（发酵核心） → 压制成萝（大木桶成型） → 长期于地窖、砖茶仓库中缓慢陈化',
    taste: '汤色如深红色红宝石，明亮璀璨。陈香与天然槟榔香明显。口感甜润甘醇，滑若丝质，极顺极厚。',
    brewing: {
      tempMin: 95,
      tempMax: 100,
      teaAmount: '6g',
      steepTimes: [12, 20, 35, 55],
      preferredUtensil: '紫砂壶',
      teaWaterRatio: '1:25'
    },
    storage: '放置于阴凉通风、干燥无味、远离阳光处。可用竹筐或陶罐存放。',
    storageTaboos: '绝对避潮防霉，忌塑料密封存放。',
    scenes: ['消暑去湿', '养胃通便', '餐后去滞']
  },
  {
    id: 'bingdao_shengcha',
    name: '冰岛生茶',
    category: '普洱',
    brief: '临沧普洱茶皇冠上的明珠。产于双江县勐库镇冰岛老寨。以其绝世的“冰糖甜”与纯净纯正的喉韵名震茶界。古树茶资源极为稀缺。',
    origin: '云南省临沧市双江县勐库镇冰岛老寨',
    craft: '古树鲜叶采摘 → 阴凉萎凋 → 手工大铁锅杀青 → 揉捻 → 阳光晒燥 → 传统石磨压制成饼',
    taste: '冲泡后兰香、蜜香与原始森林气息融为一体。入口极甜滑，茶汤划过喉咙时有明显冰凉通透的极强甘露回甜，持续数小时。',
    brewing: {
      tempMin: 90,
      tempMax: 95,
      teaAmount: '7g',
      steepTimes: [5, 10, 20, 35],
      preferredUtensil: '盖碗',
      teaWaterRatio: '1:15'
    },
    storage: '常温避光通风保存。冰岛生茶陈化后，冰糖甜与樟木香、药香完美融合。',
    storageTaboos: '暴晒、潮湿、吸油烟、忌冰箱。',
    scenes: ['顶尖雅聚', '收藏投资', '奢华茶会']
  },
  {
    id: 'jasmine_dabaihao',
    name: '茉莉大白毫',
    category: '花茶',
    brief: '福州茉莉花茶的杰作，选用福鼎大白茶优质烘青绿茶为茶坯，与精选天然茉莉花进行数次高等级窨制而成。白毫莹白，花香直冲九霄。',
    origin: '福建省福州市',
    craft: '精选银毫茶坯 → 茉莉伏花采摘与养护 → 七窨一提（7次换花发窨，1次提香） → 科学焙干',
    taste: '冰糖甜与浓重空灵的茉莉鲜活花香水乳交融。一口入腹，满嘴皆是清香，甜而极其鲜灵，清气回绝。',
    brewing: {
      tempMin: 80,
      tempMax: 85,
      teaAmount: '4g',
      steepTimes: [15, 25, 40, 60],
      preferredUtensil: '盖碗',
      teaWaterRatio: '1:35'
    },
    storage: '须避光、双层高阻隔铝箔密封置于冰箱0-5℃保存，方能完美封存极致花香。',
    storageTaboos: '最怕异味与暴露在常温过高空气。',
    scenes: ['待客茗饮', '舒缓情绪', '饭后清新口气']
  }
];

// Helper to get teas by category
export const getTeasByCategory = (category: Tea['category']) => {
  return TEA_DATABASE.filter(t => t.category === category);
};

// Helper to get raw tea by ID
export const getTeaById = (id: string) => {
  return TEA_DATABASE.find(t => t.id === id);
};
