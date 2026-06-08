import { TeaKnowledge } from '../types';

export const TEA_KNOWLEDGE_LIST: TeaKnowledge[] = [
  {
    id: 'k1',
    title: '茶之始祖：神农尝百草',
    content: '《神农本草经》中提到：“神农尝百草，日遇七十二毒，得荼而解之。”这里的“荼”就是古代用于称呼茶的字眼。最初，茶被古人作为药用，后来才演变为日常饮品。',
    source: '《神农本草经》'
  },
  {
    id: 'k2',
    title: '陆羽与第一部专著《茶经》',
    content: '唐代陆羽（公元733-804年）精通茶道，写下了世界上第一部关于茶的专门著作《茶经》。他被世人尊称为“茶圣”。《茶经》全面阐述了茶的起源、采摘、制作、器具、冲泡和品饮。',
    source: '《茶经》'
  },
  {
    id: 'k3',
    title: '水为茶之母，器为茶之父',
    content: '明代许次纾在《茶疏》中写道：“精茗蕴香，借水而发，无水不可与论茶也。”好水对引出茶香至关重要。古人推崇天然泉水，而冲泡不同茶叶，需要选用透气性各异的特制茶具。',
    source: '《茶疏》'
  },
  {
    id: 'k4',
    title: '什么是“凤凰单丛”的香型？',
    content: '凤凰单丛因其香气极其丰富多变而闻名，被称为“茶中香水”。它不仅香气高，而且有十大香型，如蜜兰香、黄栀香、芝兰香、玉兰香、肉桂香、姜花香等，皆纯天然发育，令人赞叹。',
    source: '潮州工夫茶志'
  },
  {
    id: 'k5',
    title: '紫砂壶为什么被称为泡茶利器？',
    content: '紫砂壶因其独特的“双重气孔结构”，具有良好的透气性，能“吸附茶香，吸收茶油”，泡茶不易馊、不夺茶真香。名家紫砂壶经长期泡茶滋润，光泽内敛、温润如玉，极富灵性。',
    source: '阳羡茗壶系'
  },
  {
    id: 'k6',
    title: '干活喝茶，静心品茗：古人的三种茶境',
    content: '茶境分三：一曰“喝茶”，解渴也，大口畅饮；二曰“品茶”，会友也，品鉴滋味谈笑风生；三曰“禅茶”，独坐也，静观茶叶沉浮，体会人生起落。',
    source: '茶道通诠'
  },
  {
    id: 'k7',
    title: '红茶与黑茶的根本区别：发酵形式',
    content: '红茶是“全发酵茶”，全靠茶叶自身的酶促进氧化，发酵在制作过程中就已完成（内源性发酵）；黑茶是“后发酵茶”，依靠渥堆过程中的微生物活动进行漫长转化（外源性微生物发酵），且越放越陈。',
    source: '现代茶分类学'
  },
  {
    id: 'k8',
    title: '白茶“一年茶、三年药、七年宝”',
    content: '白茶在存放过程中，内含的活性酶会持续起催化作用，黄酮类化合物、茶多酚随年份递增逐步转化，苦涩味降低，茶汤逐渐变得饱满香甜。陈年老白茶在中国传统中常被用来退烧散热或清热降火。',
    source: '白茶陈化理论'
  },
  {
    id: 'k9',
    title: '工夫茶与功夫茶的区别',
    content: '“工夫”指手工、精细的时间，如发酵工夫，特指制茶与茶叶级别（如闽红工夫）；“功夫”指泡茶的手艺与本领（如潮汕功夫茶）。泡茶需要时间的沉淀与手法熟练，方能煮出一杯真滋味。',
    source: '功夫茶文化考'
  },
  {
    id: 'k10',
    title: '春茶为什么更加鲜美？',
    content: '经过一个冬天的休眠与养分蓄积，春季温和的气候使茶树合成丰富的氨基酸（鲜爽感的主要来源），同时茶多酚（苦涩感的主要来源）含量较低，故春茶往往口感细腻鲜爽。',
    source: '茶树生理生态学'
  }
];

// Seedable pseudo-random to get index based on day of year
export function getDailyChoice<T>(list: T[]): T {
  const d = new Date();
  const index = (d.getFullYear() + d.getMonth() * d.getDate() + d.getDate() + 7) % list.length;
  return list[index];
}

export function getRandomKnowledge(): TeaKnowledge {
  const randIdx = Math.floor(Math.random() * TEA_KNOWLEDGE_LIST.length);
  return TEA_KNOWLEDGE_LIST[randIdx];
}
