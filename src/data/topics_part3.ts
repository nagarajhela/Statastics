import { TopicTemplate } from '../types/topic';

export const TOPICS_PART_3: TopicTemplate[] = [
  // =========================================================================
  // I) HYPOTHESIS TESTING (INTRO)
  // =========================================================================
  {
    id: "hypothesis_testing_intro",
    title: "Hypothesis Testing: Null (H0) vs Alternative (H1), p-values & Errors",
    section: "Hypothesis Testing (Intro)",
    sectionCode: "I",
    whatIsIt: {
      summary: "A structured, courtroom-like detective process to decide whether a pattern in your data is real or just pure random luck.",
      analogy: "Think of a courtroom criminal trial! In law, the suspect is 'Innocent until proven guilty'. In statistics, we assume 'Nothing special happened' (Innocent = Null Hypothesis H0). The prosecutor must present overwhelming evidence (Low p-value!) to convict (Guilty = Alternative Hypothesis H1).",
      explanation: [
        "Null Hypothesis (H0): The skeptical default stance. 'There is NO difference, NO new medicine effect, NO special pattern.'",
        "Alternative Hypothesis (H1 or Ha): The detective's claim. 'There IS a genuine difference or effect!'",
        "p-value (Probability of Surprise): 'If H0 were 100% true and nothing special was happening, how often would we see data as extreme as ours by pure fluke?'",
        "Significance Level (alpha = 0.05): The agreed threshold of doubt (5%). If the chance of pure luck is less than 5% (p < 0.05), we shout: 'Reject H0!'",
        "Type I Error (False Alarm): Convicting an innocent person! (Claiming an effect exists when it doesn't). Probability = alpha.",
        "Type II Error (Missed Alarm): Letting a guilty criminal walk free! (Failing to detect a real effect). Probability = beta."
      ]
    },
    realLifeUseCases: [
      "Clinical Drug Trials: Testing whether a new cancer drug shrinks tumors faster than a placebo pill.",
      "Website A/B Testing: Checking if changing the checkout button from blue to green actually increases purchases.",
      "Education Policy: Testing if reducing classroom sizes from 30 to 20 kids genuinely improves standardized exam scores.",
      "Forensic Science: Determining if DNA found at a crime scene matches a suspect beyond reasonable doubt."
    ],
    mlUseCases: [
      "Feature Significance Testing: In linear and logistic regression, checking whether each feature's weight coefficient has p < 0.05 to prune useless features.",
      "Champion vs Challenger Model Deployment: Statistically verifying that a newly trained neural net is significantly more accurate than the old production model before swapping them.",
      "Adversarial Drift Detection: Running Kolmogorov-Smirnov hypothesis tests on incoming production data to alert engineers when data distribution has shifted."
    ],
    formula: {
      latex: "\\text{Decision Rule: } \\begin{cases} \\text{Reject } H_0 & \\text{if } p\\text{-value} < \\alpha \\; (0.05) \\\\[6pt] \\text{Fail to Reject } H_0 & \\text{if } p\\text{-value} \\ge \\alpha \\; (0.05) \\end{cases}",
      description: "Compare the p-value against alpha (0.05). If p is lower than alpha, the evidence is statistically significant.",
      symbolExplanations: [
        { symbol: "H_0", meaning: "Null hypothesis (the 'no effect' baseline assumption)." },
        { symbol: "H_1", meaning: "Alternative hypothesis (the research claim we are testing)." },
        { symbol: "p\\text{-value}", meaning: "Probability of seeing our sample result purely by chance under H0." },
        { symbol: "\\alpha = 0.05", meaning: "The 5% risk tolerance for making a Type I error." }
      ]
    },
    manualCalculation: {
      table1Title: "Table 1 Scenario: Online Store Pricing Hypothesis Setup",
      table1Steps: [
        "A business investor claims: 'The average product price in this online catalog is at least ₹1,200.'",
        "Step 1: State the Hypotheses clearly:",
        "H0 (Status Quo): Mean price μ = ₹1,200",
        "H1 (Our suspicion): Mean price μ < ₹1,200 (Prices are cheaper than claimed!)",
        "Step 2: Collect sample evidence: n = 20, Sample Mean x_bar = ₹915.00",
        "Step 3: Ask the question: Is the gap of ₹285 (1200 - 915) big enough to prove the investor wrong, or could 20 randomly picked items just happen to be cheaper by chance?",
        "We set alpha = 0.05 as our strict standard of proof."
      ],
      table1Result: "Hypothesis framework formulated: H0: μ = 1200 vs H1: μ < 1200 at α = 0.05",
      table2Title: "Table 2 Scenario: Cricket Team Rivalry Hypothesis Setup",
      table2Steps: [
        "A sports commentator claims: 'Indian players score significantly more runs than Australian players.'",
        "Step 1: State the Hypotheses:",
        "H0 (No difference): Mean runs of India μ_IND = Mean runs of Australia μ_AUS (μ_IND - μ_AUS = 0)",
        "H1 (Difference exists): μ_IND ≠ μ_AUS",
        "Step 2: Collect sample data: India sample mean = 68.0 runs (n1 = 5), Australia sample mean = 54.0 runs (n2 = 5).",
        "Step 3: Evaluate: Is the 14-run gap statistically rock-solid, or just small-sample noise?",
        "We set alpha = 0.05."
      ],
      table2Result: "Hypothesis framework formulated: H0: μ_IND = μ_AUS vs H1: μ_IND ≠ μ_AUS at α = 0.05"
    },
    pythonCalculation: {
      code: `import numpy as np

# Demonstrating Type I vs Type II Error simulation
alpha = 0.05
print("=== HYPOTHESIS TESTING DECISION MATRIX ===")
print("Reality \\ Decision        | Retain H0 (Innocent)  | Reject H0 (Guilty)")
print("-----------------------------------------------------------------")
print("H0 is TRUE (No Effect)     | Correct Decision (95%)| Type I Error (Alpha = 5%)")
print("H0 is FALSE (Effect Real)  | Type II Error (Beta)  | Correct Decision (Power: 1-Beta)")
print("=================================================================")
print(f"Alpha Threshold: {alpha} (5% significance level)")
`,
      lineByLineExplanation: [
        { line: "alpha = 0.05", explanation: "Standard scientific cutoff for statistical significance." },
        { line: "print(...)", explanation: "Prints the 2x2 decision confusion matrix connecting hypothesis testing to machine learning evaluation." }
      ],
      expectedOutput: `=== HYPOTHESIS TESTING DECISION MATRIX ===\nReality \\ Decision        | Retain H0 (Innocent)  | Reject H0 (Guilty)\n-----------------------------------------------------------------\nH0 is TRUE (No Effect)     | Correct Decision (95%)| Type I Error (Alpha = 5%)\nH0 is FALSE (Effect Real)  | Type II Error (Beta)  | Correct Decision (Power: 1-Beta)\n=================================================================\nAlpha Threshold: 0.05 (5% significance level)`
    },
    pythonChart: {
      chartType: "Critical Rejection Region Bell Curve",
      code: `import matplotlib.pyplot as plt
import numpy as np

x = np.linspace(-4, 4, 300)
y = (1 / np.sqrt(2 * np.pi)) * np.exp(-0.5 * x**2)

plt.figure(figsize=(9, 4))
plt.plot(x, y, color='#0f172a', linewidth=2)
# Shade critical rejection tails (alpha = 0.05, two-tailed: 2.5% on each side)
plt.fill_between(x, y, where=(x <= -1.96), color='#ef4444', alpha=0.6, label='Rejection Tail (2.5%)')
plt.fill_between(x, y, where=(x >= 1.96), color='#ef4444', alpha=0.6)
plt.fill_between(x, y, where=(x > -1.96) & (x < 1.96), color='#e2e8f0', alpha=0.5, label='Retain H0 Region (95%)')

plt.title("Hypothesis Testing: The Rejection Zone (alpha = 0.05)")
plt.xlabel("Standardized Test Statistic (Z or t)")
plt.legend()
plt.tight_layout()
plt.show()
`,
      lineByLineExplanation: [
        { line: "plt.fill_between(x, y, where=(x <= -1.96) ...)", explanation: "Paints the red 'guilty verdict' rejection zones on the far left and right edges." },
        { line: "plt.fill_between(..., where=(x > -1.96) & (x < 1.96))", explanation: "Paints the calm grey zone where evidence is not extreme enough to reject H0." }
      ],
      howToReadLikeA10YearOld: "Look at the big grey hill in the middle: that is the 'Normal World' where nothing unusual happened. The little red zones out on the chilly edges are the 'Surprise Danger Zones'. If your test landing spot lands in the red zone, the probability of it being an accident was less than 5%, so you shout: 'Something real is happening!'",
      interactiveChartType: "bell"
    },
    comparisonInsight: {
      comparisonText: "In Table 1, we test whether a single catalog average deviates from an external business benchmark (One-Sample Test). In Table 2, we compare two rival squads against each other (Two-Sample Test). In both cases, the foundational philosophy is identical: assume innocent (no difference) until the math proves otherwise beyond the 5% alpha threshold.",
      keyTakeaway: "A p-value is NOT the probability that your hypothesis is true. It is strictly the probability of seeing your sample results IF the null hypothesis were true."
    }
  },

  // =========================================================================
  // J) Z-TEST
  // =========================================================================
  {
    id: "z_test",
    title: "Z-Test (Known Variance or Large Samples)",
    section: "Z-Test",
    sectionCode: "J",
    whatIsIt: {
      summary: "A statistical test used to check if a sample average differs from a known population benchmark when you already know the true population standard deviation (or have a massive sample).",
      analogy: "Imagine an archery champion whose lifetime average arrow score is 80, with a known spread of 10 points. Today she shoots 20 arrows and averages 84. The Z-test calculates whether that 4-point increase was just a lucky streak or if she actually upgraded her bow!",
      explanation: [
        "When do we use a Z-test? Two strict conditions: 1) The population standard deviation (σ) is known from past history/censuses, OR 2) Sample size is large (n ≥ 30).",
        "If you don't know population σ and have a small sample, you CANNOT use a Z-test — you must use a T-test instead!",
        "The Z-score measures how many Standard Errors your sample average sits away from the claimed population mean."
      ]
    },
    realLifeUseCases: [
      "Standardized IQ or SAT Tests: IQ tests are built so population mean μ = 100 and population σ = 15 are known. A school tests 40 kids to see if their gifted program has a higher average.",
      "High-Volume Manufacturing: A bottling plant knows historical bottle fill σ = 5 mL. They sample 50 bottles from machine #3 to test if it's overfilling.",
      "Call Center SLAs: Telecom knowing nationwide average call duration σ = 90 seconds, testing if a new Bangalore branch differs.",
      "Retail catalog pricing: Checking if our current sample of product prices differs from the e-commerce industry standard."
    ],
    mlUseCases: [
      "Large-Sample A/B Testing: When tech companies (Google, Meta) run A/B tests with millions of users (n > 100,000), t-distributions converge to z-distributions, so two-proportion Z-tests are standard.",
      "Anomaly Detection: Computing Z-scores for incoming server telemetry metrics: if Z > 3.0 (more than 3 standard deviations away), trigger an automatic incident alert.",
      "Significance of Weights: In logistic regression, the Wald Test computes a Z-statistic for each feature weight to check if it significantly predicts the output."
    ],
    formula: {
      latex: "Z = \\frac{\\bar{x} - \\mu_0}{\\frac{\\sigma}{\\sqrt{n}}}",
      description: "Sample mean minus hypothesized population mean, divided by population standard error.",
      symbolExplanations: [
        { symbol: "Z", meaning: "The calculated Z-score test statistic." },
        { symbol: "\\bar{x}", meaning: "Sample mean (for Table 1 Price: ₹915.00)." },
        { symbol: "\\mu_0", meaning: "The hypothesized population mean benchmark (e.g. ₹700.00)." },
        { symbol: "\\sigma", meaning: "Known population standard deviation (e.g. historical retail σ = ₹650.00)." },
        { symbol: "\\frac{\\sigma}{\\sqrt{n}}", meaning: "Standard Error of the mean." }
      ]
    },
    manualCalculation: {
      table1Title: "Worked Example: Testing if Table 1 Average Price differs from ₹700",
      table1Steps: [
        "Setup: A retail industry report states the nationwide online average price is μ0 = ₹700 with known population σ = ₹650.",
        "Our Sample Data: n = 20 products, sample mean x_bar = ₹915.00.",
        "Step 1: State Hypotheses (Two-Tailed):",
        "H0: μ = ₹700 (Our store prices match the industry)",
        "H1: μ ≠ ₹700 (Our store prices are significantly different)",
        "Significance level α = 0.05. Critical Z-cutoffs for two-tailed α = 0.05 are ±1.96.",
        "Step 2: Calculate Standard Error:",
        "SE = σ / sqrt(n) = 650 / sqrt(20) = 650 / 4.4721 = 145.35",
        "Step 3: Calculate Z-score:",
        "Z = (915 - 700) / 145.35 = 215 / 145.35 = +1.48",
        "Step 4: Find p-value from standard normal z-table:",
        "Probability of Z ≥ 1.48 = 1 - 0.9306 = 0.0694",
        "Two-tailed p-value = 2 * 0.0694 = 0.1388 (13.88%)",
        "Step 5: Compare p-value to α = 0.05: 0.1388 > 0.05! Also, |1.48| < 1.96.",
        "Decision: FAIL TO REJECT H0."
      ],
      table1Result: "Z = +1.48, p-value = 0.139. Fail to reject H0: Not enough evidence to claim our prices differ from ₹700.",
      table2Title: "Cricket Table Context Note: Why we DO NOT use Z-test on Table 2",
      table2Steps: [
        "In Table 2, we have only n = 20 players (small sample < 30).",
        "Crucially: We do NOT know the true population standard deviation σ of all cricket players in world history!",
        "Using a Z-test here would be statistically invalid and produce false confidence.",
        "That is why William Gosset invented the T-test specifically for cases like Table 2!"
      ],
      table2Result: "Z-test conditions not met for Table 2; requires T-test (see Topic K)."
    },
    pythonCalculation: {
      code: `import numpy as np
from scipy import stats

# Table 1 Z-test calculation
sample_mean = df_sales['Price'].mean() # 915.0
hypothesized_mu = 700.0
pop_sigma = 650.0 # Given known population standard deviation
n = len(df_sales['Price']) # 20

# Calculate Z-score and two-tailed p-value
se = pop_sigma / np.sqrt(n)
z_stat = (sample_mean - hypothesized_mu) / se
p_value = 2 * (1 - stats.norm.cdf(abs(z_stat)))

print(f"Sample Mean:     ₹{sample_mean:.2f}")
print(f"Z-Statistic:     {z_stat:+.2f}")
print(f"Two-tailed p:    {p_value:.4f}")
print(f"Conclusion (α=0.05): {'REJECT H0 (Significant)' if p_value < 0.05 else 'FAIL TO REJECT H0 (Not Significant)'}")
`,
      lineByLineExplanation: [
        { line: "se = pop_sigma / np.sqrt(n)", explanation: "Calculates the standard error from known population standard deviation." },
        { line: "stats.norm.cdf(abs(z_stat))", explanation: "Uses the Cumulative Distribution Function of the standard normal curve to find probability." },
        { line: "p_value = 2 * (1 - ...)", explanation: "Multiplies by 2 because this is a two-tailed test (testing for both higher and lower differences)." }
      ],
      expectedOutput: `Sample Mean:     ₹915.00\nZ-Statistic:     +1.48\nTwo-tailed p:    0.1391\nConclusion (α=0.05): FAIL TO REJECT H0 (Not Significant)`
    },
    pythonChart: {
      chartType: "Z-Distribution with Calculated Z vs Critical Cutoffs",
      code: `import matplotlib.pyplot as plt
import numpy as np

z = np.linspace(-3.5, 3.5, 200)
pdf = (1 / np.sqrt(2 * np.pi)) * np.exp(-0.5 * z**2)

plt.figure(figsize=(9, 4.2))
plt.plot(z, pdf, color='#334155', linewidth=2)
# Shading critical rejection zones at ±1.96
plt.fill_between(z, pdf, where=(z <= -1.96) | (z >= 1.96), color='#ef4444', alpha=0.5, label='Rejection Zones (α=0.05, |Z| ≥ 1.96)')
# Plotting our calculated Z-score (+1.48)
plt.axvline(1.48, color='#6366f1', linewidth=3, linestyle='--', label='Our Test Z = +1.48 (Inside Safe Zone!)')

plt.title("Z-Test Verdict: Z = +1.48 Lands Safely in the 'Fail to Reject' Territory")
plt.xlabel("Z-Score")
plt.legend()
plt.tight_layout()
plt.show()
`,
      lineByLineExplanation: [
        { line: "plt.fill_between(..., where=(z <= -1.96) | (z >= 1.96))", explanation: "Paints the danger zones where Z must land to reject H0." },
        { line: "plt.axvline(1.48, color='#6366f1' ...)", explanation: "Draws our calculated Z-score line at +1.48, showing clearly that it missed the red zone." }
      ],
      howToReadLikeA10YearOld: "Look where the purple dashed line landed! It landed safely in the big white middle section, NOT in the red danger zones on the edges. That means our store average of ₹915 is higher than ₹700, but not high enough to prove that it isn't just an accident. So we don't reject the claim!",
      interactiveChartType: "bell"
    },
    comparisonInsight: {
      comparisonText: "Our sample mean of ₹915 was higher than the claimed ₹700 by ₹215. However, because store prices naturally fluctuate with a wide standard deviation (σ = 650), a jump of ₹215 has a ~14% chance of happening just by random luck with a small 20-item sample. Since 14% > 5%, the court acquits the null hypothesis.",
      keyTakeaway: "A big-looking difference in raw numbers is not automatically statistically significant if your data has high natural variability!"
    }
  },

  // =========================================================================
  // K) T-TEST
  // =========================================================================
  {
    id: "t_test",
    title: "T-Test (Unknown Variance & Two-Sample Group Comparison)",
    section: "T-Test",
    sectionCode: "K",
    whatIsIt: {
      summary: "The workhorse test of statistics! Used when sample sizes are small (n < 30) and population standard deviation σ is unknown. It uses the student's t-distribution, which has fatter tails to protect against small-sample error.",
      analogy: "Imagine taste-testing two pizza shops with only 5 slices each. You don't know the secret master recipe of all pizzas in the city. The T-test compares the two small plates and tells you if Pizza Shop A is genuinely tastier than Pizza Shop B, or if it was just a fluke slice!",
      explanation: [
        "Why did William Gosset invent the t-test at Guinness Brewery? Because when working with small batches of barley (n < 30), standard normal Z-tests gave way too many false alarms!",
        "Three main types of T-tests:",
        "1. One-Sample T-test: Compares 1 sample mean against a target number when σ is unknown.",
        "2. Independent Two-Sample T-test: Compares two totally separate groups (e.g. India players vs Australia players).",
        "3. Paired T-test: Compares the same group before and after a treatment (e.g. players' fitness before and after a boot camp)."
      ]
    },
    realLifeUseCases: [
      "Sports Analytics: Comparing batting averages between India and Australia to see if one team is demonstrably superior.",
      "Pharmaceuticals: Comparing blood pressure reduction between Drug Group A and Placebo Group B.",
      "E-commerce Marketing: Comparing conversion rates between mobile app users vs desktop website users.",
      "Agriculture: Comparing crop yield between fields treated with Organic Fertilizer vs Chemical Fertilizer."
    ],
    mlUseCases: [
      "Cross-Validation Model Comparison: Using a Paired T-test across 10-fold cross-validation folds to prove whether an XGBoost model is statistically better than a Random Forest.",
      "A/B Testing with Small Traffic: Startups with low daily traffic using independent two-sample t-tests to evaluate website tweaks.",
      "Feature Significance in Linear Regression: In every statsmodels summary table, the 't' and 'P>|t|' columns report exact t-tests for each feature weight."
    ],
    formula: {
      latex: "t = \\frac{\\bar{x}_1 - \\bar{x}_2}{s_p \\sqrt{\\frac{1}{n_1} + \\frac{1}{n_2}}} \\quad \\text{where } s_p^2 = \\frac{(n_1 - 1)s_1^2 + (n_2 - 1)s_2^2}{n_1 + n_2 - 2}",
      description: "Difference between group means divided by pooled standard error. Degrees of freedom df = n1 + n2 - 2.",
      symbolExplanations: [
        { symbol: "t", meaning: "The calculated t-statistic." },
        { symbol: "\\bar{x}_1, \\bar{x}_2", meaning: "Sample mean of Group 1 (India = 68.0) and Group 2 (Australia = 54.0)." },
        { symbol: "s_p^2", meaning: "Pooled sample variance (blending the variance of both groups)." },
        { symbol: "n_1, n_2", meaning: "Sample size of each squad (n1 = 5, n2 = 5)." },
        { symbol: "df = 8", meaning: "Degrees of freedom: (5 - 1) + (5 - 1) = 8." }
      ]
    },
    manualCalculation: {
      table1Title: "Table 1 Context Note: 3 Types of T-Test Summary",
      table1Steps: [
        "1. One-Sample: Compare Table 1 Price mean (915) to ₹700 using sample s instead of known σ.",
        "2. Independent Two-Sample: Compare Table 2 India vs Australia (fully worked below!).",
        "3. Paired: Compare prices before vs after a festival sale on the same 20 items."
      ],
      table1Result: "Independent Two-Sample T-test chosen for full step-by-step arithmetic below.",
      table2Title: "Worked Example: Table 2 India (n1=5) vs Australia (n2=5) Runs Scored",
      table2Steps: [
        "Data Group 1 (India): [85, 90, 55, 70, 40] -> Mean x1 = 340 / 5 = 68.0 runs.",
        "Squared deviations for India: (85-68)^2=289, (90-68)^2=484, (55-68)^2=169, (70-68)^2=4, (40-68)^2=784. Sum = 1,730. s1^2 = 1730 / 4 = 432.50.",
        "Data Group 2 (Australia): [75, 45, 65, 50, 35] -> Mean x2 = 270 / 5 = 54.0 runs.",
        "Squared deviations for Australia: (75-54)^2=441, (45-54)^2=81, (65-54)^2=121, (50-54)^2=16, (35-54)^2=361. Sum = 1,020. s2^2 = 1020 / 4 = 255.00.",
        "Step 1: Calculate Pooled Variance s_p^2:",
        "s_p^2 = (4 * 432.5 + 4 * 255.0) / (5 + 5 - 2) = (1730 + 1020) / 8 = 2750 / 8 = 343.75",
        "Step 2: Calculate Pooled Standard Error:",
        "SE = sqrt( 343.75 * (1/5 + 1/5) ) = sqrt( 343.75 * 0.40 ) = sqrt(137.5) ≈ 11.73",
        "Step 3: Calculate t-statistic:",
        "t = (68.0 - 54.0) / 11.73 = 14.0 / 11.73 = +1.19",
        "Step 4: Degrees of Freedom df = 8. Critical t value for α = 0.05 (two-tailed) is ±2.306.",
        "Step 5: Compare: |1.19| < 2.306! (Two-tailed p-value ≈ 0.267).",
        "Decision: FAIL TO REJECT H0."
      ],
      table2Result: "t = +1.19, df = 8, p-value = 0.267. Fail to reject H0: No statistically significant difference in batting performance."
    },
    pythonCalculation: {
      code: `from scipy import stats

# Filter players for India and Australia
india_runs = df_cricket[df_cricket['Team'] == 'India']['Runs_Scored']
aus_runs = df_cricket[df_cricket['Team'] == 'Australia']['Runs_Scored']

# Independent two-sample t-test (equal_var=True for standard pooled test)
t_stat, p_val = stats.ttest_ind(india_runs, aus_runs, equal_var=True)

print(f"India Mean:     {india_runs.mean():.1f} runs (n={len(india_runs)})")
print(f"Australia Mean: {aus_runs.mean():.1f} runs (n={len(aus_runs)})")
print(f"Difference:     {india_runs.mean() - aus_runs.mean():.1f} runs")
print(f"t-statistic:    {t_stat:+.2f}")
print(f"p-value:        {p_val:.4f}")
print(f"Verdict (α=0.05): {'REJECT H0 (Significant Difference)' if p_val < 0.05 else 'FAIL TO REJECT H0 (Difference could be pure luck)'}")
`,
      lineByLineExplanation: [
        { line: "india_runs = df_cricket[...]", explanation: "Filters the 5 Indian batsmen rows." },
        { line: "aus_runs = df_cricket[...]", explanation: "Filters the 5 Australian batsmen rows." },
        { line: "stats.ttest_ind(india_runs, aus_runs)", explanation: "Runs the two-sample independent t-test with pooled variance." }
      ],
      expectedOutput: `India Mean:     68.0 runs (n=5)\nAustralia Mean: 54.0 runs (n=5)\nDifference:     14.0 runs\nt-statistic:    +1.19\np-value:        0.2667\nVerdict (α=0.05): FAIL TO REJECT H0 (Difference could be pure luck)`
    },
    pythonChart: {
      chartType: "Side-by-Side Boxplot with Individual Data Strip",
      code: `import matplotlib.pyplot as plt
import seaborn as sns

plt.figure(figsize=(8, 4.5))
subset = df_cricket[df_cricket['Team'].isin(['India', 'Australia'])]

# Boxplot comparing the two teams
sns.boxplot(x='Team', y='Runs_Scored', data=subset, palette=['#38bdf8', '#facc15'], width=0.4)
# Overlay raw player dots so we see all 5 data points per team
sns.stripplot(x='Team', y='Runs_Scored', data=subset, color='#0f172a', size=8, jitter=True)

plt.title("India (Mean 68) vs Australia (Mean 54): Notice the Heavy Overlap!")
plt.ylabel("Runs Scored")
plt.tight_layout()
plt.show()
`,
      lineByLineExplanation: [
        { line: "sns.boxplot(...)", explanation: "Draws side-by-side comparison boxes for India and Australia." },
        { line: "sns.stripplot(...)", explanation: "Draws the actual player dots on top so beginners can see every single score." }
      ],
      howToReadLikeA10YearOld: "Look at the dots! Even though India's blue box is a little higher than Australia's yellow box, the dots overlap all over the place! David Warner for Australia scored 75 (higher than 3 Indian players), and Hardik Pandya for India scored 40 (lower than 3 Australian players). With only 5 players each, this 14-run gap could easily happen just by random chance on any Sunday!",
      interactiveChartType: "boxplot"
    },
    comparisonInsight: {
      comparisonText: "A rookie analyst might look at 68 runs vs 54 runs and jump to the conclusion: 'India is clearly 14 runs better!' But the T-test warns us: the p-value is 0.267 (a 26.7% probability of this gap happening by pure luck). Because sample size is small (5 per group) and batsmen scores are variable, we cannot claim statistical superiority.",
      keyTakeaway: "The T-test is your protection against jumping to false conclusions when comparing small groups with high internal variance."
    }
  },

  // =========================================================================
  // L) CHI-SQUARE TEST
  // =========================================================================
  {
    id: "chi_square_test",
    title: "Chi-Square Test (Categorical Independence & Goodness of Fit)",
    section: "Chi-Square Test",
    sectionCode: "L",
    whatIsIt: {
      summary: "A test designed for counting categories instead of measuring continuous numbers. It checks whether observed counts match what you would expect if categories were completely independent.",
      analogy: "Imagine rolling a 6-sided dice 60 times. If it's fair, you expect each number (1, 2, 3, 4, 5, 6) to appear 10 times. If number 6 appears 28 times, you get suspicious! The Chi-Square test compares your 'Observed' rolls against the 'Expected' fair rolls to prove if the dice is loaded!",
      explanation: [
        "Z-test and T-test require numbers (like rupees or runs). Chi-Square works on words, groups, and counts (like 'Electronics', 'Clothing', 'High Sales', 'Low Sales').",
        "Chi-Square Test for Independence: Tests whether two categorical variables are linked (e.g. Does product category influence whether an item becomes a top seller?).",
        "Observed (O): The real tally counts from your actual table.",
        "Expected (E): The counts you would predict by math if there were ZERO connection between the categories."
      ]
    },
    realLifeUseCases: [
      "Genetics: Gregor Mendel counting pea plants (smooth vs wrinkled seeds) to prove the laws of biological inheritance.",
      "Marketing: Testing if customer age group (Teens, Adults, Seniors) is related to preferred payment method (Cash, UPI, Credit Card).",
      "Hospital triage: Testing whether patient recovery status (Discharged vs Admitted) is independent of vaccine status.",
      "Retail Category Management: Testing if product category in Table 1 is related to high vs low sales volume."
    ],
    mlUseCases: [
      "Categorical Feature Selection (SelectKBest with chi2): Ranking categorical features by their Chi-Square score against the target class to drop irrelevant features before training classifiers.",
      "Fairness & Algorithmic Bias Auditing: Checking if loan approval rates across different demographic groups diverge significantly from expected proportions.",
      "NLP Topic Modeling: Testing word frequency distributions across document genres to discover genre-defining keywords."
    ],
    formula: {
      latex: "\\chi^2 = \\sum \\frac{(O - E)^2}{E} \\quad \\text{where } E = \\frac{\\text{Row Total} \\times \\text{Column Total}}{\\text{Grand Total}}",
      description: "Sum of squared differences between Observed (O) and Expected (E), divided by Expected. Degrees of freedom df = (Rows - 1) * (Cols - 1).",
      symbolExplanations: [
        { symbol: "\\chi^2 (\\text{Chi-Square})", meaning: "The test statistic summing up all differences between reality and expectation." },
        { symbol: "O", meaning: "Observed frequency count in each cell of the contingency table." },
        { symbol: "E", meaning: "Expected frequency count in that cell under the null hypothesis of independence." },
        { symbol: "df = (r-1)(c-1)", meaning: "Degrees of freedom: (4 categories - 1) * (2 sales brackets - 1) = 3 * 1 = 3." }
      ]
    },
    manualCalculation: {
      table1Title: "Table 1 Worked Example: Category vs Sales Volume (High ≥ 45 units vs Low < 45 units)",
      table1Steps: [
        "Let's create a 4x2 Contingency Table from our 20 products:",
        "Electronics: High=2 (Mouse:45, Cable:60), Low=3 (Keyboard:18, Speaker:25, Watch:12) -> Total = 5",
        "Grocery: High=2 (Choc:80, Tea:50), Low=3 (Rice:35, Oil:20, Almonds:40) -> Total = 5",
        "Clothing: High=2 (T-Shirt:55, Cap:45), Low=3 (Jeans:22, Shoes:15, Hoodie:28) -> Total = 5",
        "Stationery: High=3 (Notebook:70, Pen:100, Sticky:90), Low=2 (Sketch:40, Org:30) -> Total = 5",
        "Grand Totals: High = 9 products | Low = 11 products | Total = 20 products.",
        "Step 1: Calculate Expected Counts (E = Row Total * Col Total / Grand Total):",
        "Expected High for each row = 5 * 9 / 20 = 2.25",
        "Expected Low for each row = 5 * 11 / 20 = 2.75",
        "Step 2: Calculate (O - E)^2 / E for each of the 8 cells:",
        "Electronics High: (2 - 2.25)^2 / 2.25 = 0.0625 / 2.25 = 0.0278",
        "Electronics Low:  (3 - 2.75)^2 / 2.75 = 0.0625 / 2.75 = 0.0227",
        "Grocery High: (2 - 2.25)^2 / 2.25 = 0.0278 | Low: (3 - 2.75)^2 / 2.75 = 0.0227",
        "Clothing High: (2 - 2.25)^2 / 2.25 = 0.0278 | Low: (3 - 2.75)^2 / 2.75 = 0.0227",
        "Stationery High: (3 - 2.25)^2 / 2.25 = 0.5625 / 2.25 = 0.2500",
        "Stationery Low:  (2 - 2.75)^2 / 2.75 = 0.5625 / 2.75 = 0.2045",
        "Step 3: Sum all 8 cells: χ² = 0.0278*3 + 0.0227*3 + 0.2500 + 0.2045 = 0.606",
        "Step 4: Degrees of freedom df = (4-1)*(2-1) = 3*1 = 3.",
        "Critical value for df=3 at α=0.05 is 7.815. Our χ² = 0.606 is vastly smaller!",
        "p-value = 0.895. Decision: FAIL TO REJECT H0."
      ],
      table1Result: "χ² = 0.606, df = 3, p-value = 0.895. Category and Sales Volume are completely independent in this dataset.",
      table2Title: "Table 2 Cricket Analogy: How Chi-Square applies to Teams vs Win/Loss",
      table2Steps: [
        "In Table 2, we could classify teams (India, Aus, Eng, Pak) vs High Runs (≥ 60) vs Low Runs (< 60).",
        "India: High=3, Low=2 | Aus: High=2, Low=3 | Eng: High=3, Low=2 | Pak: High=3, Low=2.",
        "Just like Table 1, the observed counts hover tightly around the expected counts of 2.75 and 2.25.",
        "This confirms that no individual team is disproportionately monopolizing high or low scores."
      ],
      table2Result: "Chi-Square demonstrates independence across categorical sports groupings."
    },
    pythonCalculation: {
      code: `import pandas as pd
from scipy import stats

# Create binary sales tier: 'High' (>=45) vs 'Low' (<45)
df_sales['Sales_Tier'] = df_sales['Units_Sold'].apply(lambda x: 'High' if x >= 45 else 'Low')

# Build the 2x2 / 4x2 Contingency Table
contingency_table = pd.crosstab(df_sales['Category'], df_sales['Sales_Tier'])

# Run Chi-Square Test of Independence
chi2_stat, p_val, dof, expected = stats.chi2_contingency(contingency_table)

print("--- CONTINGENCY TABLE (OBSERVED COUNTS) ---")
print(contingency_table)
print("\\n--- CHI-SQUARE TEST RESULTS ---")
print(f"Chi-Square Statistic: {chi2_stat:.3f}")
print(f"Degrees of Freedom:   {dof}")
print(f"p-value:              {p_val:.4f}")
print(f"Conclusion (α=0.05):  {'REJECT H0 (Dependent/Linked)' if p_val < 0.05 else 'FAIL TO REJECT H0 (Independent/No Link)'}")
`,
      lineByLineExplanation: [
        { line: "pd.crosstab(df_sales['Category'], ...)", explanation: "Creates the cross-tabulated contingency grid counting rows for each pair." },
        { line: "stats.chi2_contingency(...)", explanation: "Computes the Chi-Square statistic, p-value, degrees of freedom, and expected counts matrix in one call." }
      ],
      expectedOutput: `--- CONTINGENCY TABLE (OBSERVED COUNTS) ---\nSales_Tier   High  Low\nCategory              \nClothing        2    3\nElectronics     2    3\nGrocery         2    3\nStationery      3    2\n\n--- CHI-SQUARE TEST RESULTS ---\nChi-Square Statistic: 0.606\nDegrees of Freedom:   3\np-value:              0.8950\nConclusion (α=0.05):  FAIL TO REJECT H0 (Independent/No Link)`
    },
    pythonChart: {
      chartType: "Contingency Table Heatmap & Stacked Bar Chart",
      code: `import matplotlib.pyplot as plt
import seaborn as sns

plt.figure(figsize=(7, 4))
sns.heatmap(contingency_table, annot=True, fmt='d', cmap='Blues', cbar=False, 
            annot_kws={'size': 14, 'weight': 'bold'})

plt.title("Observed Counts: Category vs High/Low Sales Tier\\n(Very Uniform Across All 4 Categories)")
plt.ylabel("Product Category")
plt.xlabel("Sales Tier")
plt.tight_layout()
plt.show()
`,
      lineByLineExplanation: [
        { line: "sns.heatmap(...)", explanation: "Draws an annotated color matrix showing the raw count inside each cell." },
        { line: "annot=True, fmt='d'", explanation: "Prints clean integer count numbers inside every cell." }
      ],
      howToReadLikeA10YearOld: "Look at the numbers in the blue squares! Clothing has 2 High and 3 Low. Electronics has 2 High and 3 Low. Grocery has 2 High and 3 Low. Stationery has 3 High and 2 Low. They are almost identical across all rows! Because the boxes look so balanced, the Chi-Square test confirms that category has zero secret effect on whether an item sells a lot or a little.",
      interactiveChartType: "contingency"
    },
    comparisonInsight: {
      comparisonText: "The Chi-Square statistic is very small (0.606) and the p-value is 0.895 (almost 90%!). This means the observed distribution is virtually identical to pure random chance under independence. Product category alone does not dictate sales volume tier in our 20-item store table.",
      keyTakeaway: "Use Z or T tests when asking 'Is the average number different?'. Use Chi-Square when asking 'Are these groups or labels related?'."
    }
  }
];
