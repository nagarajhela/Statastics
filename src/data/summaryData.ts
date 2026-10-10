import { SummaryRow, DecisionNode } from '../types/topic';

export const MASTER_COMPARISON_TABLE: SummaryRow[] = [
  {
    topic: "Mean",
    formula: "\\bar{x} = \\frac{\\sum x_i}{n}",
    usedFor: "Finding the fair-share arithmetic center of a numeric column.",
    realWorldExample: "Average shopper bill at a supermarket checkout.",
    pythonFunction: "df['Price'].mean()"
  },
  {
    topic: "Median",
    formula: "Middle value of sorted array: x_{(n+1)/2}",
    usedFor: "Finding the true center when data has extreme outliers or heavy skew.",
    realWorldExample: "Median home price in Mumbai or New York.",
    pythonFunction: "df['Price'].median()"
  },
  {
    topic: "Mode",
    formula: "\\arg\\max( \\text{Frequency}(x) )",
    usedFor: "Finding the most frequent category or recurring number.",
    realWorldExample: "Most popular shoe size stocked in a retail outlet.",
    pythonFunction: "df['Units_Sold'].mode()"
  },
  {
    topic: "Range",
    formula: "x_{\\max} - x_{\\min}",
    usedFor: "Measuring the total boundary span from bottom to top.",
    realWorldExample: "Daily temperature spread (Today's High - Low).",
    pythonFunction: "df['Price'].max() - df['Price'].min()"
  },
  {
    topic: "Mean Absolute Deviation (MAD)",
    formula: "\\frac{1}{n} \\sum |x_i - \\bar{x}|",
    usedFor: "Measuring typical distance from the center in original, human units.",
    realWorldExample: "Average minutes delivery drivers deviate from schedule.",
    pythonFunction: "(df['Price'] - df['Price'].mean()).abs().mean()"
  },
  {
    topic: "Variance",
    formula: "s^2 = \\frac{1}{n-1} \\sum (x_i - \\bar{x})^2",
    usedFor: "Measuring squared spread with heavy penalty on large errors (the engine of ML).",
    realWorldExample: "Financial portfolio risk and PCA feature preservation.",
    pythonFunction: "df['Price'].var()"
  },
  {
    topic: "Standard Deviation",
    formula: "s = \\sqrt{s^2}",
    usedFor: "The gold-standard measure of spread, expressed in original everyday units.",
    realWorldExample: "Medical laboratory healthy blood sugar ranges (±2σ).",
    pythonFunction: "df['Price'].std()"
  },
  {
    topic: "Skewness",
    formula: "\\frac{n}{(n-1)(n-2)} \\sum \\left(\\frac{x_i - \\bar{x}}{s}\\right)^3",
    usedFor: "Checking if distribution is symmetric, right-tailed, or left-tailed.",
    realWorldExample: "Household wealth distribution (positive skew).",
    pythonFunction: "df['Price'].skew()"
  },
  {
    topic: "Percentiles & IQR",
    formula: "\\text{IQR} = Q_3 - Q_1",
    usedFor: "Measuring the middle 50% spread and flagging outliers via John Tukey's 1.5x rule.",
    realWorldExample: "Child growth percentiles and SAT exam score reports.",
    pythonFunction: "df['Price'].quantile(0.75) - df['Price'].quantile(0.25)"
  },
  {
    topic: "Frequency Table & Histogram",
    formula: "\\text{Bin Count } f_i, \\quad \\text{Rel Freq} = \\frac{f_i}{n}",
    usedFor: "Grouping continuous data into buckets to visualize overall shape.",
    realWorldExample: "Customer age group breakdown for streaming apps.",
    pythonFunction: "pd.cut(df['Price'], bins).value_counts()"
  },
  {
    topic: "Covariance",
    formula: "\\text{Cov}(X,Y) = \\frac{1}{n-1}\\sum (x-\\bar{x})(y-\\bar{y})",
    usedFor: "Checking if two features move in tandem (+), opposite (-), or independently.",
    realWorldExample: "Engine horsepower vs car weight in automotive design.",
    pythonFunction: "df['Price'].cov(df['Units_Sold'])"
  },
  {
    topic: "Correlation (Pearson's r)",
    formula: "r = \\frac{\\text{Cov}(X,Y)}{s_X s_Y} \\quad (-1 \\le r \\le +1)",
    usedFor: "Standardizing covariance into a unitless strength score between -1 and +1.",
    realWorldExample: "Price vs Units Sold (r = -0.70 in Table 1).",
    pythonFunction: "df['Price'].corr(df['Units_Sold'])"
  },
  {
    topic: "Standard Error (SE)",
    formula: "\\text{SE} = \\frac{s}{\\sqrt{n}}",
    usedFor: "Quantifying how much a sample mean wiggles around the true population mean.",
    realWorldExample: "Margin of error in political election opinion polls.",
    pythonFunction: "scipy.stats.sem(df['Price'])"
  },
  {
    topic: "Central Limit Theorem (CLT)",
    formula: "\\bar{X}_n \\sim \\mathcal{N}\\left(\\mu, \\frac{\\sigma^2}{n}\\right)",
    usedFor: "Guarantees that repeated sample means form a bell curve regardless of original shape.",
    realWorldExample: "Casino house edge and Random Forest ensemble bagging.",
    pythonFunction: "[np.random.choice(data, n).mean() for _ in range(N)]"
  },
  {
    topic: "Z-Test",
    formula: "Z = \\frac{\\bar{x} - \\mu_0}{\\sigma / \\sqrt{n}}",
    usedFor: "Testing if a sample mean differs from benchmark when population σ is known or n ≥ 30.",
    realWorldExample: "High-volume factory testing bottle fill with known σ.",
    pythonFunction: "scipy.stats.norm.cdf(abs(z))"
  },
  {
    topic: "T-Test",
    formula: "t = \\frac{\\bar{x}_1 - \\bar{x}_2}{s_p \\sqrt{1/n_1 + 1/n_2}}",
    usedFor: "Comparing sample averages when population σ is unknown and sample size is small (n < 30).",
    realWorldExample: "Comparing batting average between India vs Australia.",
    pythonFunction: "scipy.stats.ttest_ind(group1, group2)"
  },
  {
    topic: "Chi-Square Test",
    formula: "\\chi^2 = \\sum \\frac{(O - E)^2}{E}",
    usedFor: "Testing if two categorical variables are linked or independent from count tallies.",
    realWorldExample: "Checking if Product Category influences High vs Low sales.",
    pythonFunction: "scipy.stats.chi2_contingency(contingency_table)"
  }
];

export const DECISION_GUIDE_NODES: DecisionNode[] = [
  {
    id: "start",
    question: "What type of data are you analyzing in your test?",
    options: [
      {
        label: "Categorical Data (Words, Labels, Tally Counts)",
        description: "e.g. Yes/No, Pass/Fail, Category, Team, Grade Letter",
        nextId: "categorical_branch"
      },
      {
        label: "Numeric / Continuous Data (Measurements, Numbers)",
        description: "e.g. Rupees, Runs, Heights, Test Scores, Voltages",
        nextId: "numeric_branch"
      }
    ]
  },
  {
    id: "categorical_branch",
    question: "What is your primary goal with these categorical counts?",
    options: [
      {
        label: "Testing if 2 categories are linked (e.g. Category vs Sales Tier)",
        result: {
          testName: "Chi-Square Test of Independence",
          why: "Use this test when you have a 2D contingency grid (cross-tabulation) and want to know if row labels are independent of column labels.",
          example: "Testing if Product Category (Electronics/Grocery) relates to High vs Low Units Sold in Table 1."
        }
      },
      {
        label: "Testing if 1 category matches a theoretical expected ratio (e.g. Fair Dice)",
        result: {
          testName: "Chi-Square Goodness of Fit Test",
          why: "Use this test to see if observed roll counts of a dice or gene frequencies diverge from expected fair percentages.",
          example: "Rolling a die 60 times and checking if each face rolled roughly 10 times."
        }
      }
    ]
  },
  {
    id: "numeric_branch",
    question: "How many sample groups are you comparing?",
    options: [
      {
        label: "1 Sample against a known target number (μ0)",
        description: "e.g. Does our store mean price differ from ₹700?",
        nextId: "one_sample_check"
      },
      {
        label: "2 Sample groups compared against each other",
        description: "e.g. Team India vs Team Australia, Drug vs Placebo",
        nextId: "two_sample_check"
      },
      {
        label: "3 or more groups simultaneously",
        description: "e.g. India vs Australia vs England vs Pakistan",
        result: {
          testName: "ANOVA (Analysis of Variance) F-Test",
          why: "When you have 3 or more groups, running repeated t-tests causes Alpha inflation (compounding false alarm risk). ANOVA tests all group means in one go!",
          example: "Comparing runs scored across all 4 cricket teams simultaneously."
        }
      }
    ]
  },
  {
    id: "one_sample_check",
    question: "Do you know the true Population Standard Deviation (σ), or is n ≥ 30?",
    options: [
      {
        label: "YES — Population σ is known (or massive sample n ≥ 30)",
        result: {
          testName: "One-Sample Z-Test",
          why: "When population standard deviation σ is known from historical records, the standard normal curve provides exact probabilities without needing t-distribution adjustment.",
          example: "Checking if Table 1 store prices differ from industry benchmark ₹700 with known σ = 650."
        }
      },
      {
        label: "NO — Population σ is unknown and sample is small (n < 30)",
        result: {
          testName: "One-Sample T-Test",
          why: "When you only have the sample standard deviation s and a small sample, Gosset's t-distribution with (n-1) degrees of freedom accounts for small-sample estimation uncertainty.",
          example: "Testing if 10 new medicine batches meet the target active ingredient purity."
        }
      }
    ]
  },
  {
    id: "two_sample_check",
    question: "Are the two groups independent or paired (before/after)?",
    options: [
      {
        label: "Independent Groups (Two separate bunches of subjects)",
        result: {
          testName: "Independent Two-Sample T-Test",
          why: "Compares the means of two distinct groups (df = n1 + n2 - 2). Use pooled variance if spreads are similar, or Welch's t-test if variances differ.",
          example: "Comparing India runs scored (n=5) vs Australia runs scored (n=5) from Table 2."
        }
      },
      {
        label: "Paired / Dependent (Same subjects measured Before & After)",
        result: {
          testName: "Paired Samples T-Test",
          why: "Subtracts each subject's 'Before' value from their 'After' value to analyze the difference column as a single sample.",
          example: "Measuring blood pressure of 20 patients Before vs After taking a medication."
        }
      }
    ]
  }
];

export const GRAND_RECAP_STORY = `
### The Grand Story of Statistics: Connecting All the Pieces 📖

Think of statistics as an epic adventure novel in four connected chapters:

1. **Chapter 1 — Descriptive Statistics (The Lens):** You start in the dark with a raw pile of numbers. Measures of **Central Tendency (Mean, Median, Mode)** shine a spotlight on where the cluster sits. Measures of **Variability (Range, MAD, Variance, Standard Deviation)** reveal how widely the numbers wander. Measures of **Shape (Skewness)** and **Percentiles (IQR, Boxplots)** show which way the tails lean and catch sneaky outliers. But up to this point, you are only describing what is right in front of you.

2. **Chapter 2 — The Bridge: Central Limit Theorem (Nature's Magic Rule):** In real life, you almost never have all the data in the universe (you only have a sample spoon from the soup pot!). The **Central Limit Theorem** is the bridge between describing a sample and understanding the world. It proves that no matter how weird or skewed the population is, sample averages always form a smooth, predictable **Normal Bell Curve**. This predictability gives us the **Standard Error** — the exact ruler of human uncertainty.

3. **Chapter 3 — Inferential Statistics & Hypothesis Testing (The Courtroom):** Now you can play detective. You establish a **Null Hypothesis ($H_0$)** representing the skeptical baseline ("nothing special happened"). You calculate a **p-value** to ask: "If $H_0$ were true, what are the odds of seeing a sample this unusual?" If the p-value is below your significance threshold ($\\alpha = 0.05$), you reject $H_0$ beyond reasonable doubt.

4. **Chapter 4 — The Decision Tools ($Z$, $t$, and $\\chi^2$):** When you know the population spread, the **$Z$-Test** gives swift clarity. When dealing with small real-world samples with unknown spread, the **$T$-Test** steps in to safely compare groups without false alarms. And when numbers turn into categories and tally marks, the **Chi-Square Test** checks whether categories are truly independent.

From calculating your first arithmetic average to deploying an A/B test or tuning a machine learning model, you are using this exact continuous thread of logic!
`;
