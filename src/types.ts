/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

export interface BrewingParams {
  tempMin: number;
  tempMax: number;
  teaAmount: string; // e.g., '3g' or '5g' or '7-8g'
  steepTimes: number[]; // e.g. [15, 20, 25, 35] in seconds for each brew
  preferredUtensil: string; // e.g. '盖碗', '紫砂壶', '玻璃杯'
  teaWaterRatio: string; // e.g., '1:50' or '1:20'
}

export interface Tea {
  id: string;
  name: string;
  category: '绿茶' | '红茶' | '乌龙茶' | '白茶' | '黄茶' | '黑茶' | '普洱' | '花茶';
  brief: string;
  origin: string;
  craft: string;
  taste: string;
  brewing: BrewingParams;
  storage: string;
  storageTaboos: string;
  scenes: string[]; // suitable scenarios
}

export interface TeaKnowledge {
  id: string;
  title: string;
  content: string;
  source: string;
}

export interface Utensil {
  id: string;
  name: string;
  use: string;
  method: string;
  suitableTeas: string[];
  notes: string;
  image?: string;
}

export interface StorageGuide {
  category: string;
  method: string;
  temp: string;
  humidity: string;
  milestones: string[]; // Key aspects like 密封、避光 etc.
  taboos: string;
}

export interface TimerRecord {
  id: string;
  teaName: string;
  teaCategory: string;
  brewIndex: number; // 1, 2, 3, 4
  duration: number; // seconds
  timestamp: number;
}

export interface GameRecord {
  id: string;
  teaName: string;
  utensil: string;
  temp: number;
  amount: string;
  steepTime: number;
  score: number;
  rating: '完美' | '良好' | '一般' | '略有失误';
  feedback: string;
  timestamp: number;
}

export interface UserSettings {
  soundEnabled: boolean;
  theme: 'light' | 'dark';
}
