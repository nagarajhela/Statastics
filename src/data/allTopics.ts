import { TopicTemplate } from '../types/topic';
import { TOPICS_PART_1 } from './topics_part1';
import { TOPICS_PART_2 } from './topics_part2';
import { TOPICS_PART_3 } from './topics_part3';

export const ALL_TOPICS: TopicTemplate[] = [
  ...TOPICS_PART_1,
  ...TOPICS_PART_2,
  ...TOPICS_PART_3
];

export interface SectionGroup {
  id: string;
  name: string;
  code: string;
  description: string;
  topicIds: string[];
}

export const SECTION_GROUPS: SectionGroup[] = [
  {
    id: "step0_datasets",
    name: "Step 0 — Fixed Datasets",
    code: "0",
    description: "The two fixed reference tables (Online Store Sales & Cricket Player Stats) used throughout the entire notebook.",
    topicIds: []
  },
  {
    id: "step1_intro",
    name: "Step 1 — Beginner Introduction",
    code: "1",
    description: "What is Statistics, Descriptive vs Inferential, and Complete Table of Contents.",
    topicIds: []
  },
  {
    id: "sec_a",
    name: "A) Measures of Central Tendency",
    code: "A",
    description: "Finding the center of your data: Mean, Median, and Mode.",
    topicIds: ["mean", "median", "mode"]
  },
  {
    id: "sec_b",
    name: "B) Measures of Variability",
    code: "B",
    description: "Measuring data dispersion and spread: Range, MAD, Variance, and Standard Deviation.",
    topicIds: ["range", "mad", "variance", "std_dev"]
  },
  {
    id: "sec_c",
    name: "C) Measures of Shape",
    code: "C",
    description: "Asymmetry and tail stretch: Skewness (Positive, Negative, Zero/Normal).",
    topicIds: ["skewness"]
  },
  {
    id: "sec_d",
    name: "D) Percentiles & Boxplot",
    code: "D",
    description: "Quartiles (Q1, Q2, Q3), Interquartile Range (IQR), and John Tukey's Boxplot outlier fences.",
    topicIds: ["percentiles_iqr"]
  },
  {
    id: "sec_e",
    name: "E) Frequency Distribution & Plot",
    code: "E",
    description: "Tally tables, touching Histogram bars, and Frequency Polygon overlays.",
    topicIds: ["frequency_distribution"]
  },
  {
    id: "sec_f",
    name: "F) Covariance and Correlation",
    code: "F",
    description: "Direction and strength of relationships: Covariance, Pearson's r, and Scatter plot trendlines.",
    topicIds: ["covariance_correlation"]
  },
  {
    id: "sec_g",
    name: "G) Inferential Statistics (Intro)",
    code: "G",
    description: "Population vs Sample soup spoon analogy, Sampling Distribution, and Standard Error.",
    topicIds: ["inferential_intro"]
  },
  {
    id: "sec_h",
    name: "H) Central Limit Theorem (CLT)",
    code: "H",
    description: "Nature's magic rule: Why sample means always form a normal bell curve.",
    topicIds: ["clt"]
  },
  {
    id: "sec_i",
    name: "I) Hypothesis Testing (Intro)",
    code: "I",
    description: "Courtroom trial analogy, H0 vs H1, p-values, alpha=0.05, and Type I vs Type II errors.",
    topicIds: ["hypothesis_testing_intro"]
  },
  {
    id: "sec_j",
    name: "J) Z-Test",
    code: "J",
    description: "Testing means when population standard deviation is known or sample size is large.",
    topicIds: ["z_test"]
  },
  {
    id: "sec_k",
    name: "K) T-Test",
    code: "K",
    description: "Small-sample comparisons with unknown variance: One-sample, Independent (India vs Aus), and Paired.",
    topicIds: ["t_test"]
  },
  {
    id: "sec_l",
    name: "L) Chi-Square Test",
    code: "L",
    description: "Categorical independence and fair dice analogy: Testing Category vs Sales Tier.",
    topicIds: ["chi_square_test"]
  },
  {
    id: "step4_summary",
    name: "Step 4 — Final Summary & Decision Flowchart",
    code: "4",
    description: "Master comparison table, interactive 'Which Test Should I Use?' decision guide, and recap story.",
    topicIds: []
  }
];
