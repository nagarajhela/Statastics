import { TopicTemplate } from '../types/topic';

export const TOPICS_PART_2: TopicTemplate[] = [
  // =========================================================================
  // E) FREQUENCY DISTRIBUTION & PLOT
  // =========================================================================
  {
    id: "frequency_distribution",
    title: "Frequency Distribution, Histogram & Frequency Polygon",
    section: "Frequency Distribution & Plot",
    sectionCode: "E",
    whatIsIt: {
      summary: "A Frequency Table groups numbers into bins and counts the tally marks in each bin. A Histogram turns those tallies into touching bars, and a Frequency Polygon connects the bar midpoints with a line.",
      analogy: "Imagine sorting your Lego bricks by color or size into plastic buckets. The bucket label is the 'Bin', the number of bricks inside each bucket is the 'Frequency', and drawing towers for each bucket gives you a 'Histogram'!",
      explanation: [
        "Why do we bin data? If you have 10,000 different prices, looking at raw numbers is overwhelming. Grouping them (e.g. ₹0-500, ₹501-1000) makes the pattern obvious at a glance.",
        "Histogram bars TOUCH each other! Unlike bar charts for separate categories (Apples, Oranges), continuous numbers flow seamlessly from 0 to 500, then 501 to 1000 with no gaps.",
        "A Frequency Polygon places a dot at the rooftop center of each bar and connects them with a straight line, making it easy to compare two distributions on the same plot."
      ]
    },
    realLifeUseCases: [
      "Customer Age Profiling: Netflix grouping subscribers into age brackets (18-24, 25-34, 35-49, 50+) to decide which movies to license.",
      "Salary distributions: Government labor departments publishing wage bracket histograms to study the middle class.",
      "Call center queue times: Phone companies checking how many callers wait 0-2 mins, 2-5 mins, or 5-10 mins.",
      "School grading scales: Converting percentage scores into Letter Grade frequency bins (90-100: A, 80-89: B, etc.)."
    ],
    mlUseCases: [
      "Data Exploration (EDA): The very first step in any machine learning project is plotting histograms of all numeric features to check for skewness, multiple peaks, or outliers.",
      "Histogram Gradient Boosting (LightGBM / HistGradientBoostingClassifier): Modern super-fast gradient boosting packages bin continuous numbers into 256 discrete histogram bins to speed up training by 10x!",
      "Data Drift Detection: Comparing the frequency distribution of production data vs training data using Population Stability Index (PSI) to see if customer habits changed."
    ],
    formula: {
      latex: "\\text{Relative Frequency} = \\frac{\\text{Bin Frequency } (f_i)}{n} \\times 100\\%",
      description: "Bin Width = (Max - Min) / Number of Bins. Relative frequency tells you what percentage of rows fell into each bin.",
      symbolExplanations: [
        { symbol: "f_i", meaning: "Frequency count (number of items falling into bin i)." },
        { symbol: "n", meaning: "Total sample size (20 items)." },
        { symbol: "\\text{Bin Width}", meaning: "The size or span of each numeric bucket." }
      ]
    },
    manualCalculation: {
      table1Title: "Table 1: Online Store Sales — Price Bins (Tally Table)",
      table1Steps: [
        "Let's choose 4 price bins of width ₹1,000 (from ₹0 to ₹4,000):",
        "Bin 1 [₹0 to ₹500]: 80, 100, 120, 150, 200, 250, 300, 350, 450, 500 -> Tally: 10 items (50.0%)",
        "Bin 2 [₹501 to ₹1,000]: 550, 650, 800, 900 -> Tally: 4 items (20.0%)",
        "Bin 3 [₹1,001 to ₹2,000]: 1400, 1600, 1800 -> Tally: 3 items (15.0%)",
        "Bin 4 [₹2,001 to ₹3,500]: 2400, 2500, 3200 -> Tally: 3 items (15.0%)",
        "Total Count: 10 + 4 + 3 + 3 = 20 items (100.0%)"
      ],
      table1Result: "Highest frequency bin is ₹0-₹500 holding 50% of all store inventory!",
      table2Title: "Table 2: Cricket Player Stats — Runs Scored Bins",
      table2Steps: [
        "Let's group the 20 scores into 4 clean 15-run bins:",
        "Bin 1 [30 to 45 runs]: 35, 40, 40, 45, 45 -> Tally: 5 players (25.0%)",
        "Bin 2 [46 to 60 runs]: 50, 50, 55, 55, 60, 60 -> Tally: 6 players (30.0%)",
        "Bin 3 [61 to 75 runs]: 65, 65, 65, 70, 70, 75 -> Tally: 6 players (30.0%)",
        "Bin 4 [76 to 90 runs]: 80, 85, 90 -> Tally: 3 players (15.0%)",
        "Total Count: 5 + 6 + 6 + 3 = 20 players (100.0%)"
      ],
      table2Result: "The middle bins (46 to 75 runs) hold 12 out of 20 players (60% of all batsmen)!"
    },
    pythonCalculation: {
      code: `import pandas as pd
import numpy as np

# Create frequency table using pandas pd.cut() and .value_counts()
price_bins = [0, 500, 1000, 2000, 3500]
price_freq = pd.cut(df_sales['Price'], bins=price_bins).value_counts().sort_index()

runs_bins = [30, 45, 60, 75, 95]
runs_freq = pd.cut(df_cricket['Runs_Scored'], bins=runs_bins).value_counts().sort_index()

print("--- TABLE 1: PRICE FREQUENCY TABLE ---")
print(price_freq)
print("\\n--- TABLE 2: CRICKET RUNS FREQUENCY TABLE ---")
print(runs_freq)
`,
      lineByLineExplanation: [
        { line: "pd.cut(df_sales['Price'], bins=price_bins)", explanation: "Sorts each product price into its corresponding bin boundary." },
        { line: ".value_counts().sort_index()", explanation: "Tallies up the number of items in each bucket and sorts them in order." },
        { line: "print(...)", explanation: "Displays the frequency count for each range." }
      ],
      expectedOutput: `--- TABLE 1: PRICE FREQUENCY TABLE ---\n(0, 500]        10\n(500, 1000]      4\n(1000, 2000]     3\n(2000, 3500]     3\n\n--- TABLE 2: CRICKET RUNS FREQUENCY TABLE ---\n(30, 45]     5\n(45, 60]     6\n(60, 75]     6\n(75, 95]     3`
    },
    pythonChart: {
      chartType: "Histogram with Frequency Polygon Overlay",
      code: `import matplotlib.pyplot as plt
import numpy as np

plt.figure(figsize=(9, 4.5))

# Compute histogram values
counts, bin_edges, _ = plt.hist(df_cricket['Runs_Scored'], bins=[30, 45, 60, 75, 95], 
                                color='#93c5fd', edgecolor='#1e3a8a', alpha=0.7, 
                                label='Histogram (Bars)')

# Calculate bin centers for the Frequency Polygon line
bin_centers = 0.5 * (bin_edges[:-1] + bin_edges[1:])

# Plot the Frequency Polygon (line connecting rooftop centers)
plt.plot(bin_centers, counts, marker='o', color='#1d4ed8', linewidth=2.5, 
         label='Frequency Polygon (Line)')

plt.title('Cricket Runs: Histogram + Frequency Polygon')
plt.xlabel('Runs Scored')
plt.ylabel('Number of Players')
plt.legend()
plt.tight_layout()
plt.show()
`,
      lineByLineExplanation: [
        { line: "plt.hist(...)", explanation: "Draws the touching histogram columns representing the player tallies in each bin." },
        { line: "bin_centers = 0.5 * (bin_edges[:-1] + ...)", explanation: "Finds the exact midpoint on the roof of each bar." },
        { line: "plt.plot(bin_centers, counts, marker='o')", explanation: "Connects the midpoints with a dark blue line to create the Frequency Polygon." }
      ],
      howToReadLikeA10YearOld: "The blue boxes show how many players ended up in each score bucket. The dark blue line with dots on top is the Frequency Polygon — it's like a roller coaster track connecting the tops of the buildings. Notice how the track climbs up in the middle (where most players score between 45 and 75) and dips at the extreme ends!",
      interactiveChartType: "polygon"
    },
    comparisonInsight: {
      comparisonText: "In Table 1, the frequency distribution is lopsided: half of all products (10 items) are concentrated in the lowest bucket under ₹500, with a dwindling trickle in higher brackets (classic 'long-tail' commercial retail). In Table 2, the cricket scores form a classic symmetrical mound: low counts at the extremes (30-45 and 76-90) and high twin counts (6 and 6) in the central sweet spot (46-75 runs).",
      keyTakeaway: "Histograms let your eyes see the whole shape of your data in 2 seconds — whether it's a balanced hill or a landslide toward one side."
    }
  },

  // =========================================================================
  // F) COVARIANCE AND CORRELATION
  // =========================================================================
  {
    id: "covariance_correlation",
    title: "Covariance & Correlation Coefficient (Pearson's r)",
    section: "Covariance and Correlation",
    sectionCode: "F",
    whatIsIt: {
      summary: "Covariance measures if two variables move in the same direction. Correlation (Pearson's r) measures the exact strength of that linear relationship on a tidy scale from -1.0 to +1.0.",
      analogy: "Imagine a seesaw! If you push down on Price and Units Sold goes UP on the other side, they move in opposite directions (Negative Correlation!). If studying more hours makes your test score go UP together, they move in the same direction (Positive Correlation!).",
      explanation: [
        "Why Covariance is hard to interpret: If you measure Price in ₹ and Units Sold in single items, Covariance has weird units like 'Rupee-Units' (-16,421!). Is that big or small? Nobody knows!",
        "Correlation (Pearson's r) fixes this: It standardizes covariance by dividing by both standard deviations, trapping the answer strictly between -1.0 and +1.0.",
        "+1.0 = Perfect positive line (when X rises, Y always rises).",
        "0.0 = Zero linear connection (pure random scatter).",
        "-1.0 = Perfect negative line (when X rises, Y drops proportionally)."
      ]
    },
    realLifeUseCases: [
      "Retail Pricing: Supermarkets test how raising the price of butter impacts the quantity of packs sold.",
      "Health & Fitness: Tracking the correlation between daily step counts and resting heart rate (negative correlation — more steps equals lower resting heart rate).",
      "Real Estate: Correlation between square footage of an apartment and monthly rent.",
      "Automotive: Correlation between vehicle weight and fuel efficiency (miles per gallon)."
    ],
    mlUseCases: [
      "Multicollinearity Removal: If two input features have r > 0.90 (e.g. 'Height in Inches' and 'Height in Centimeters'), they provide redundant information and destabilize linear models. We drop one!",
      "Feature Selection: Computing the correlation between each feature and the target label to pick the most informative predictors.",
      "Correlation Matrix & Heatmap: Standard visual diagnostics generated before training any regression model to spot dependencies."
    ],
    formula: {
      latex: "r = \\frac{\\text{Cov}(X, Y)}{s_X s_Y} = \\frac{\\sum_{i=1}^{n} (x_i - \\bar{x})(y_i - \\bar{y})}{\\sqrt{\\sum_{i=1}^{n} (x_i - \\bar{x})^2 \\sum_{i=1}^{n} (y_i - \\bar{y})^2}}",
      description: "Pearson's r is the covariance divided by the product of both standard deviations. It has no units and is always between -1 and +1.",
      symbolExplanations: [
        { symbol: "r", meaning: "Pearson's correlation coefficient (-1.0 ≤ r ≤ +1.0)." },
        { symbol: "\\text{Cov}(X, Y)", meaning: "Sample Covariance: \\frac{1}{n-1}\\sum (x_i - \\bar{x})(y_i - \\bar{y})." },
        { symbol: "s_X, s_Y", meaning: "Standard deviation of variable X and variable Y." }
      ]
    },
    manualCalculation: {
      table1Title: "Table 1: Online Store Sales — Price (X) vs Units_Sold (Y)",
      table1Steps: [
        "We know: Mean Price = 915.0, Mean Units Sold = 44.0, Std Dev Price s_X ≈ 925.15, Std Dev Units s_Y ≈ 25.47",
        "Step 1: Calculate (Price - 915) * (Units - 44) for each product:",
        "For Wireless Mouse: (800 - 915) * (45 - 44) = (-115) * (+1) = -115",
        "For Keyboard: (2500 - 915) * (18 - 44) = (+1585) * (-26) = -41,210",
        "For Gel Pen: (80 - 915) * (100 - 44) = (-835) * (+56) = -46,760",
        "For Smartwatch: (3200 - 915) * (12 - 44) = (+2285) * (-32) = -73,120",
        "Notice almost every product produces a negative product because cheap items sell a lot and expensive items sell few!",
        "Step 2: Sum of all cross-products = -312,000",
        "Step 3: Sample Covariance = -312,000 / 19 ≈ -16,421.05",
        "Step 4: Pearson r = Cov(X,Y) / (s_X * s_Y) = -16,421.05 / (925.15 * 25.47) ≈ -0.70"
      ],
      table1Result: "Sample Covariance = -16,421.05 | Pearson r ≈ -0.70 (Strong Negative Correlation!)",
      table2Title: "Table 2: Cricket Player Stats — Runs_Scored (X) vs Strike_Rate (Y)",
      table2Steps: [
        "We know: Mean Runs = 60.0, Mean Strike Rate = 141.28, Std Dev Runs s_X ≈ 15.47, Std Dev Strike Rate s_Y ≈ 16.32",
        "Step 1: Calculate cross-products (Runs - 60) * (Strike_Rate - 141.28) for all 20 players:",
        "Suryakumar Yadav: (70 - 60) * (175.4 - 141.28) = (+10) * (+34.12) = +341.2",
        "Rohit Sharma: (90 - 60) * (145.2 - 141.28) = (+30) * (+3.92) = +117.6",
        "Joe Root: (60 - 60) * (112.5 - 141.28) = (0) * (-28.78) = 0.0",
        "Glenn Maxwell: (65 - 60) * (168.0 - 141.28) = (+5) * (+26.72) = +133.6",
        "Steve Smith: (45 - 60) * (118.5 - 141.28) = (-15) * (-22.78) = +341.7",
        "Step 2: Sum of cross-products = +1,634.5",
        "Step 3: Covariance = 1,634.5 / 19 ≈ +86.03",
        "Step 4: Pearson r = 86.03 / (15.47 * 16.32) ≈ +0.34"
      ],
      table2Result: "Sample Covariance = +86.03 | Pearson r ≈ +0.34 (Moderate Positive Correlation)"
    },
    pythonCalculation: {
      code: `import pandas as pd

# Calculate Covariance and Pearson Correlation using pandas
cov_sales = df_sales['Price'].cov(df_sales['Units_Sold'])
corr_sales = df_sales['Price'].corr(df_sales['Units_Sold'])

cov_cricket = df_cricket['Runs_Scored'].cov(df_cricket['Strike_Rate'])
corr_cricket = df_cricket['Runs_Scored'].corr(df_cricket['Strike_Rate'])

print(f"Table 1: Covariance = {cov_sales:,.2f}  |  Pearson r = {corr_sales:+.2f}")
print(f"Table 2: Covariance = {cov_cricket:,.2f}    |  Pearson r = {corr_cricket:+.2f}")
`,
      lineByLineExplanation: [
        { line: "df_sales['Price'].cov(...)", explanation: "Computes sample covariance between Price and Units Sold." },
        { line: "df_sales['Price'].corr(...)", explanation: "Computes Pearson's r correlation coefficient directly." },
        { line: "print(...)", explanation: "Prints out covariance and correlation." }
      ],
      expectedOutput: `Table 1: Covariance = -16,421.05  |  Pearson r = -0.70\nTable 2: Covariance = 86.03    |  Pearson r = +0.34`
    },
    pythonChart: {
      chartType: "Scatter Plot with Annotated Regression Trendline",
      code: `import matplotlib.pyplot as plt
import seaborn as sns

plt.figure(figsize=(9, 4.5))
# Scatter plot with regression line for Table 1
sns.regplot(x=df_sales['Price'], y=df_sales['Units_Sold'], 
            color='#6366f1', scatter_kws={'s': 70}, line_kws={'color': '#ef4444', 'linewidth': 2})

# Annotate correlation on the plot
plt.text(1800, 85, f"Pearson r = -0.70\\n(Strong Negative Correlation!)", 
         fontsize=11, bbox=dict(boxstyle='round,pad=0.5', facecolor='#fee2e2', edgecolor='#ef4444'))

plt.title("Online Store: As Price Rises, Units Sold Drops Down!")
plt.xlabel("Price in ₹")
plt.ylabel("Units Sold")
plt.tight_layout()
plt.show()
`,
      lineByLineExplanation: [
        { line: "sns.regplot(...)", explanation: "Draws every data point as a dot and fits the best-fitting linear trendline." },
        { line: "plt.text(1800, 85, ...)", explanation: "Draws an informational callout box with the correlation coefficient on the chart." }
      ],
      howToReadLikeA10YearOld: "Look at the dots and the red line! The line goes downhill from left to right like a playground slide. Cheap items on the left have dots way up high (lots of sales). Expensive items on the right have dots down low (fewer sales). Because it goes downhill, we put a minus sign in front: r = -0.70!",
      interactiveChartType: "scatter"
    },
    comparisonInsight: {
      comparisonText: "In Table 1, Price and Units Sold have an r of -0.70 — a strong downward trend that matches basic economics (higher price dampens demand). In Table 2, Runs Scored and Strike Rate have an r of +0.34 — a mild positive relationship, showing that batsmen who stay at the crease longer tend to accelerate their scoring rate, but the relationship has plenty of exceptions (e.g. anchor batsmen like Joe Root who score 60 runs at a patient strike rate).",
      keyTakeaway: "Correlation measures the strength and direction of a straight-line trend. Remember the golden tutor rule: Correlation does NOT automatically mean causation!"
    }
  },

  // =========================================================================
  // G) INFERENTIAL STATISTICS (INTRO)
  // =========================================================================
  {
    id: "inferential_intro",
    title: "Inferential Statistics: Population vs Sample & Standard Error",
    section: "Inferential Statistics (Intro)",
    sectionCode: "G",
    whatIsIt: {
      summary: "Descriptive statistics only describes the numbers you currently have in front of you. Inferential statistics uses a small sample to make confident guesses about the entire huge population you can't see!",
      analogy: "Imagine a chef cooking a massive 50-liter pot of soup. The chef does NOT drink all 50 liters to see if it's salty! The chef stirs the pot, tastes ONE single spoonful, and knows whether the whole pot needs salt. The whole pot is the Population. The single spoon is the Sample!",
      explanation: [
        "Population (N): Every single person or item in existence that you care about (e.g. all 1.4 billion people in India, or all 500,000 products Amazon sells).",
        "Sample (n): The small group you actually measured (e.g. our 20 products or our 20 cricket players).",
        "Sampling Error: Every spoon of soup might taste slightly different. Sampling Error is the natural wiggle room between different samples.",
        "Standard Error (SE): The standard deviation of those sample averages! It tells you how much your sample spoon is likely to bounce around the true pot average."
      ]
    },
    realLifeUseCases: [
      "Election Polling: Polling 1,500 voters to predict who will win an election of 100 million citizens.",
      "COVID Vaccine Trials: Testing a vaccine on 40,000 volunteers to decide if it's safe for 8 billion humans.",
      "Industrial Quality Testing: Testing 10 lightbulbs from a batch of 100,000 to check how many hours they last before shipping.",
      "Wildlife Ecology: Catching and tagging 50 dolphins to estimate the total dolphin population in the ocean."
    ],
    mlUseCases: [
      "Train/Test Splits: Your training dataset is just a sample of all future data. Inferential rules tell us whether model accuracy on the test sample will generalize to the real world.",
      "Confidence Intervals for Model Metrics: Instead of just saying 'Accuracy is 88%', professional ML engineers report 'Accuracy is 88% ± 1.8% (95% CI)' using Standard Error.",
      "A/B Testing: Running inferential tests to verify whether a new AI recommendation model genuinely increased user clicks or if the uptick was just dumb luck."
    ],
    formula: {
      latex: "\\text{Standard Error (SE)} = \\frac{s}{\\sqrt{n}}",
      description: "Standard Error equals the sample standard deviation divided by the square root of sample size n.",
      symbolExplanations: [
        { symbol: "\\text{SE}", meaning: "Standard Error of the Mean." },
        { symbol: "s", meaning: "Sample standard deviation (spread of the individual items)." },
        { symbol: "n", meaning: "Sample size (count of items in our sample)." },
        { symbol: "\\sqrt{n}", meaning: "As sample size n grows bigger, the denominator grows, which makes SE shrink! Bigger samples give much more precise estimates." }
      ]
    },
    manualCalculation: {
      table1Title: "Table 1: Online Store Sales — Price Standard Error (n = 20)",
      table1Steps: [
        "We know: Sample Std Dev s ≈ ₹925.15, Sample size n = 20",
        "Step 1: Calculate sqrt(n) = sqrt(20) ≈ 4.4721",
        "Step 2: Divide s by sqrt(n): 925.15 / 4.4721 ≈ 206.87",
        "Interpretation: If we repeated this sample with another 20 products, the sample average would typically wobble by about ±₹207."
      ],
      table1Result: "Standard Error of Mean Price = ₹206.87",
      table2Title: "Table 2: Cricket Player Stats — Runs Standard Error (n = 20)",
      table2Steps: [
        "We know: Sample Std Dev s ≈ 15.47 runs, Sample size n = 20",
        "Step 1: Calculate sqrt(n) = sqrt(20) ≈ 4.4721",
        "Step 2: Divide s by sqrt(n): 15.47 / 4.4721 ≈ 3.46",
        "Interpretation: If we sampled 20 other matches from these teams, the average score would typically wobble by only ±3.46 runs."
      ],
      table2Result: "Standard Error of Mean Runs = 3.46 runs"
    },
    pythonCalculation: {
      code: `import pandas as pd
from scipy import stats
import numpy as np

# Standard Error using scipy.stats.sem()
se_price = stats.sem(df_sales['Price'])
se_runs = stats.sem(df_cricket['Runs_Scored'])

print(f"Table 1 Price SE: ±₹{se_price:.2f} (Mean: ₹{df_sales['Price'].mean():.2f})")
print(f"Table 2 Runs SE:  ±{se_runs:.2f} runs (Mean: {df_cricket['Runs_Scored'].mean():.2f})")
`,
      lineByLineExplanation: [
        { line: "from scipy import stats", explanation: "Imports the scientific statistics library in Python." },
        { line: "stats.sem(...)", explanation: "Computes the Standard Error of the Mean (s / sqrt(n))." },
        { line: "print(...)", explanation: "Displays the error margin around the sample averages." }
      ],
      expectedOutput: `Table 1 Price SE: ±₹206.87 (Mean: ₹915.00)\nTable 2 Runs SE:  ±3.46 runs (Mean: 60.00)`
    },
    pythonChart: {
      chartType: "Sample Mean with 95% Confidence Interval Error Bars",
      code: `import matplotlib.pyplot as plt

plt.figure(figsize=(8, 4))
means = [df_sales['Price'].mean() / 15, df_cricket['Runs_Scored'].mean()]
errors = [206.87 / 15, 3.46]
labels = ['Price (scaled /15)', 'Cricket Runs']

plt.errorbar(labels, means, yerr=errors, fmt='o', color='#0284c7', 
             ecolor='#ef4444', elinewidth=3, capsize=8, markersize=8)
plt.title("Sample Estimates with Standard Error Margins (The Soup Spoon Precision)")
plt.ylabel("Estimated Metric")
plt.grid(True, linestyle='--', alpha=0.5)
plt.tight_layout()
plt.show()
`,
      lineByLineExplanation: [
        { line: "plt.errorbar(...)", explanation: "Plots the center point with vertical T-shaped error bars showing the confidence spread." },
        { line: "capsize=8", explanation: "Adds clean horizontal end caps to the error bar lines." }
      ],
      howToReadLikeA10YearOld: "The blue dot is our best guess from our spoon. The red antennas sticking above and below the dot show the wiggle room! If the antenna is short, our guess is super reliable. If the antenna is tall, our spoon had too much randomness and we need a bigger spoon (larger sample size)!",
      interactiveChartType: "bar"
    },
    comparisonInsight: {
      comparisonText: "For Table 1, the Standard Error is ₹206.87 on a mean of ₹915.00 (a roughly 23% margin of wobble). Because price variance is so huge, our 20-product spoon leaves noticeable uncertainty about the true store-wide average. For Table 2, the Standard Error is only 3.46 runs on a mean of 60.00 (less than 6% margin). A 20-player sample gives an exceptionally tight, reliable estimate of international batting averages.",
      keyTakeaway: "To cut your Standard Error in half, you must quadruple your sample size (because of the square root of n in the denominator)."
    }
  },

  // =========================================================================
  // H) CENTRAL LIMIT THEOREM (CLT)
  // =========================================================================
  {
    id: "clt",
    title: "Central Limit Theorem (The 'Magic Rule' of Statistics)",
    section: "Central Limit Theorem (CLT)",
    sectionCode: "H",
    whatIsIt: {
      summary: "No matter how weird, crooked, or skewed your original population data is, if you take repeated random samples and calculate their averages, those averages will ALWAYS form a perfect bell curve (Normal Distribution)!",
      analogy: "Imagine a crazy carnival game with a wonky roulette wheel where numbers 1 and 100 hit all the time, and middle numbers never hit (super crooked!). If you spin it 30 times and take the average, then do that again 1,000 times, the averages will magically bunch up into a smooth, gentle bell curve right in the middle around 50! Nature's magic trick!",
      explanation: [
        "Why is CLT called the 'Magic Rule'? Because the original data does NOT need to be a bell curve at all! It can be flat, U-shaped, or heavily skewed.",
        "As long as sample size n is reasonably large (usually n ≥ 30, though even n = 15 shows the magic), the sampling distribution of the mean is Gaussian (Normal).",
        "The center of this bell curve will be the TRUE population mean, and its width will be the Standard Error (σ / sqrt(n))."
      ]
    },
    realLifeUseCases: [
      "Insurance Risk: Individual insurance claims are wildly unpredictable (most are ₹0, a few are ₹5,000,000). But the average claim across 50,000 policyholders is completely predictable thanks to CLT!",
      "Casino House Edge: A single game of blackjack is pure chaos. But the average payout across 1,000,000 games forms a razor-sharp bell curve guaranteeing the casino makes its steady 2% profit.",
      "Factory Quality Assurance: Testing daily sample batches of chocolate bars to guarantee that 99.7% of boxes meet the net weight promise.",
      "Census estimations: Predicting national demographic trends without having to knock on every single citizen's door."
    ],
    mlUseCases: [
      "Why Linear Regression Works: The Gauss-Markov theorem relies on CLT to prove that coefficients are normally distributed, allowing us to compute p-values and confidence intervals for machine learning weights.",
      "Bootstrapping & Bagging (Random Forest): Random Forests draw hundreds of bootstrap sample subsets and average their predictions. CLT guarantees that the ensemble average has lower variance than any single tree!",
      "Monte Carlo Simulations: Simulating thousands of random future scenarios (in robotics, reinforcement learning, or financial risk) and relying on CLT to converge to the expected reward."
    ],
    formula: {
      latex: "\\bar{X}_n \\sim \\mathcal{N}\\left(\\mu, \\; \\frac{\\sigma^2}{n}\\right) \\quad \\text{as } n \\to \\infty",
      description: "The distribution of sample means approaches a Normal distribution with center μ and variance σ²/n as sample size n grows.",
      symbolExplanations: [
        { symbol: "\\bar{X}_n", meaning: "The distribution of sample means." },
        { symbol: "\\sim", meaning: "Math symbol for: 'is distributed according to'." },
        { symbol: "\\mathcal{N}(\\mu, \\sigma^2/n)", meaning: "A Normal (Gaussian) bell curve centered at the true mean μ with spread compressed by \\sqrt{n}." },
        { symbol: "n \\to \\infty", meaning: "As your sample size grows larger, the bell shape becomes sharper and purer." }
      ]
    },
    manualCalculation: {
      table1Title: "Demonstrating CLT on Table 1's Skewed Prices (Manual Simulation)",
      table1Steps: [
        "Recall Table 1 prices: heavily skewed (+1.18 skew), with prices from ₹80 to ₹3,200.",
        "Let's manually draw 3 random samples of size n = 5 products and calculate their means:",
        "Sample 1: [80, 250, 500, 1400, 2400] -> Mean 1 = (80 + 250 + 500 + 1400 + 2400) / 5 = 4,630 / 5 = 926.0",
        "Sample 2: [100, 350, 650, 900, 1800] -> Mean 2 = (100 + 350 + 650 + 900 + 1800) / 5 = 3,800 / 5 = 760.0",
        "Sample 3: [120, 200, 800, 1600, 2500] -> Mean 3 = (120 + 200 + 800 + 1600 + 2500) / 5 = 5,220 / 5 = 1,044.0",
        "Notice: While individual prices ranged from ₹80 to ₹3,200, the sample averages [760, 926, 1044] immediately clustered right around the true mean of ₹915!"
      ],
      table1Result: "Sample averages cluster closely around the true mean (₹915), shedding the extreme wildness of single items!",
      table2Title: "Demonstrating CLT on Table 2's Cricket Runs",
      table2Steps: [
        "Let's draw 3 random samples of size n = 5 players:",
        "Sample 1: [35, 50, 60, 70, 85] -> Mean = (300) / 5 = 60.0",
        "Sample 2: [40, 45, 65, 65, 80] -> Mean = (295) / 5 = 59.0",
        "Sample 3: [45, 55, 60, 70, 90] -> Mean = (320) / 5 = 64.0",
        "All 3 sample averages landed between 59 and 64 runs — extraordinarily tight around the true 60.0 average!"
      ],
      table2Result: "Cricket sample means cluster tightly within ±3 runs of the center 60.0."
    },
    pythonCalculation: {
      code: `import numpy as np
import pandas as pd

# Set random seed so results are reproducible
np.random.seed(42)

# Take 1,000 random samples of size n=10 from Table 1's skewed Price column
sample_means = []
prices = df_sales['Price'].values

for _ in range(1000):
    sample = np.random.choice(prices, size=10, replace=True)
    sample_means.append(sample.mean())

sample_means = np.array(sample_means)

print(f"Original Price Skewness:        {df_sales['Price'].skew():+.2f} (Crooked!)")
print(f"Sample Means Skewness (1000x): {pd.Series(sample_means).skew():+.2f} (Near Zero = Bell Curve!)")
print(f"True Population Mean:          ₹{df_sales['Price'].mean():.2f}")
print(f"Average of All 1000 Means:     ₹{sample_means.mean():.2f}")
`,
      lineByLineExplanation: [
        { line: "np.random.choice(prices, size=10, replace=True)", explanation: "Draws 10 random product prices with replacement from our table." },
        { line: "sample_means.append(sample.mean())", explanation: "Calculates the average price of that sample and saves it to our list." },
        { line: "pd.Series(sample_means).skew()", explanation: "Calculates skewness of the 1,000 averages — watch it vanish toward zero!" }
      ],
      expectedOutput: `Original Price Skewness:        +1.18 (Crooked!)\nSample Means Skewness (1000x): +0.28 (Near Zero = Bell Curve!)\nTrue Population Mean:          ₹915.00\nAverage of All 1000 Means:     ₹912.45`
    },
    pythonChart: {
      chartType: "Before vs After CLT Bell Curve Transformation",
      code: `import matplotlib.pyplot as plt
import seaborn as sns

fig, axes = plt.subplots(1, 2, figsize=(11, 4.2))

# Left: Raw Skewed Data
sns.histplot(df_sales['Price'], ax=axes[0], bins=8, color='#f87171', kde=True)
axes[0].set_title("BEFORE: Raw Product Prices\\n(Lopsided Skewed Mountain)")
axes[0].set_xlabel("Price in ₹")

# Right: The Magic of CLT on 1,000 Sample Means
sns.histplot(sample_means, ax=axes[1], bins=25, color='#34d399', kde=True)
axes[1].axvline(915, color='#047857', linestyle='--', linewidth=2, label='True Mean ₹915')
axes[1].set_title("AFTER CLT: 1,000 Sample Means\\n(Magical Symmetrical Bell Curve!)")
axes[1].set_xlabel("Sample Mean Price in ₹")
axes[1].legend()

plt.tight_layout()
plt.show()
`,
      lineByLineExplanation: [
        { line: "sns.histplot(..., color='#f87171')", explanation: "Plots the red raw prices: uneven, skewed, and lumpy." },
        { line: "sns.histplot(sample_means, color='#34d399')", explanation: "Plots the 1,000 sample means: notice how a perfect smooth green bell curve pops out!" }
      ],
      howToReadLikeA10YearOld: "Look at the red picture on the left: it's all messy and leaning like a crumbling tower. Now look at the green picture on the right: when you take averages of small groups 1,000 times, the mess turns into a gorgeous, smooth symmetrical bell! That's why scientists call it the magic theorem.",
      interactiveChartType: "bell"
    },
    comparisonInsight: {
      comparisonText: "Even though Table 1's prices were strongly skewed (+1.18) with prices clustering near ₹100 and stretching to ₹3,200, the distribution of 1,000 sample means has a skewness of only +0.28 — almost completely normal! In Table 2, where cricket runs were already symmetrical, CLT makes the distribution of sample means razor-sharp around 60.0 runs.",
      keyTakeaway: "CLT is the foundation of almost all statistical hypothesis testing (Z-test, T-test, ANOVA). Because sample means are normally distributed, we can calculate precise probabilities!"
    }
  }
];
