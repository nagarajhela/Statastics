import { TopicTemplate } from '../types/topic';

export const TOPICS_PART_1: TopicTemplate[] = [
  // =========================================================================
  // A) MEASURES OF CENTRAL TENDENCY
  // =========================================================================
  {
    id: "mean",
    title: "Mean (Arithmetic Average)",
    section: "Measures of Central Tendency",
    sectionCode: "A1",
    whatIsIt: {
      summary: "The single 'fair-share' number you get if everyone pooled their values together and divided them equally.",
      analogy: "Imagine 4 friends go trick-or-treating. Friend A has 1 candy, B has 3, C has 4, and D has 8 (total 16 candies). If they dump all candies into one bowl and divide them completely equally, everyone gets exactly 4 candies. That 4 is the Mean!",
      explanation: [
        "In statistics, 'Central Tendency' simply means: Where is the middle or center of my pile of data?",
        "The Mean takes every single number into account.",
        "Crucial trap for beginners: If one person brings 100 candies, the mean jumps way up! The mean is sensitive to extreme numbers (called outliers)."
      ]
    },
    realLifeUseCases: [
      "Calculating your report card grade average across all subjects at school.",
      "A store manager finding the average amount spent per shopper per day to plan inventory.",
      "A weather station reporting the average daily temperature in Mumbai during July.",
      "A bank calculating the average time a customer waits in line before reaching the teller."
    ],
    mlUseCases: [
      "Data Imputation: Replacing missing values (NaNs) in tabular data columns with the column mean so models don't crash.",
      "Standardization (Z-score scaling): Subtracting the mean from features so all inputs are centered at zero before feeding into neural networks.",
      "Loss Functions: Computing Mean Squared Error (MSE) to tell an AI algorithm how far off its predictions were."
    ],
    formula: {
      latex: "\\bar{x} = \\frac{\\sum_{i=1}^{n} x_i}{n} = \\frac{x_1 + x_2 + \\dots + x_n}{n}",
      description: "Sum of all values divided by the total number of values.",
      symbolExplanations: [
        { symbol: "\\bar{x} (pronounced 'x-bar')", meaning: "The sample mean (the average we are calculating)." },
        { symbol: "\\sum (Greek capital letter Sigma)", meaning: "A big math instruction that shouts: 'ADD THEM ALL UP!'." },
        { symbol: "x_i", meaning: "Each individual data point (value number 1, value number 2, etc.)." },
        { symbol: "n", meaning: "The total count of items in our sample (here, n = 20)." }
      ]
    },
    manualCalculation: {
      table1Title: "Table 1: Online Store Sales — Column 'Price (₹)'",
      table1Steps: [
        "List all 20 prices: 800, 2500, 350, 1800, 3200, 650, 900, 150, 250, 550, 500, 1600, 2400, 1400, 300, 120, 80, 200, 450, 100",
        "Step 1 (Sum): 800 + 2500 + 350 + 1800 + 3200 + 650 + 900 + 150 + 250 + 550 + 500 + 1600 + 2400 + 1400 + 300 + 120 + 80 + 200 + 450 + 100 = 18,300",
        "Step 2 (Count n): Count of items = 20",
        "Step 3 (Divide): 18,300 / 20 = 915.0"
      ],
      table1Result: "Mean Price = ₹915.00",
      table2Title: "Table 2: Cricket Player Stats — Column 'Runs_Scored'",
      table2Steps: [
        "List all 20 scores: 85, 90, 55, 70, 40, 75, 45, 65, 50, 35, 80, 60, 45, 65, 50, 70, 65, 55, 40, 60",
        "Step 1 (Sum): 85 + 90 + 55 + 70 + 40 + 75 + 45 + 65 + 50 + 35 + 80 + 60 + 45 + 65 + 50 + 70 + 65 + 55 + 40 + 60 = 1,200",
        "Step 2 (Count n): Count of players = 20",
        "Step 3 (Divide): 1,200 / 20 = 60.0"
      ],
      table2Result: "Mean Runs Scored = 60.00 runs"
    },
    pythonCalculation: {
      code: `import pandas as pd
import numpy as np

# Load our two fixed tables
# (Using df_sales and df_cricket from Step 0)

# Calculate Mean using Pandas .mean() and NumPy np.mean()
mean_price = df_sales['Price'].mean()
mean_runs = df_cricket['Runs_Scored'].mean()

print(f"Table 1 Mean Product Price: ₹{mean_price:.2f}")
print(f"Table 2 Mean Cricket Runs:  {mean_runs:.2f} runs")
`,
      lineByLineExplanation: [
        { line: "import pandas as pd", explanation: "Brings in the pandas library for handling tabular datasets." },
        { line: "df_sales['Price'].mean()", explanation: "Selects the 'Price' column from our sales table and calculates the sum divided by count." },
        { line: "df_cricket['Runs_Scored'].mean()", explanation: "Selects the 'Runs_Scored' column and computes its arithmetic average." },
        { line: "print(f'...{mean_price:.2f}')", explanation: "Prints the formatted output rounded to 2 decimal places." }
      ],
      expectedOutput: `Table 1 Mean Product Price: ₹915.00\nTable 2 Mean Cricket Runs:  60.00 runs`
    },
    pythonChart: {
      chartType: "Bar Chart with Mean Reference Line",
      code: `import matplotlib.pyplot as plt
import seaborn as sns

plt.figure(figsize=(10, 5))
# Plot individual product prices
sns.barplot(x=df_sales['Product_Name'], y=df_sales['Price'], color='#6366f1')
# Add a bold dashed red line representing the calculated Mean
plt.axhline(mean_price, color='#ef4444', linestyle='--', linewidth=2.5, 
            label=f'Mean Price = ₹{mean_price:.0f}')

plt.xticks(rotation=75, ha='right', fontsize=9)
plt.ylabel('Price in ₹')
plt.title('Product Prices vs Overall Average (Mean)')
plt.legend()
plt.tight_layout()
plt.show()
`,
      lineByLineExplanation: [
        { line: "plt.figure(figsize=(10, 5))", explanation: "Creates a clean canvas with width 10 and height 5 inches." },
        { line: "sns.barplot(...)", explanation: "Draws a bar for every product representing its price." },
        { line: "plt.axhline(mean_price, ...)", explanation: "Draws an informative horizontal reference line straight across at ₹915." },
        { line: "plt.xticks(rotation=75)", explanation: "Tilts product labels so long names don't bump into each other." }
      ],
      howToReadLikeA10YearOld: "Think of each bar as a tower of toy blocks. The red dashed line is like a flat wooden ruler laid across all towers. You can instantly see which items are giant skyscrapers (like the Smartwatch at ₹3200 and Keyboard at ₹2500) and which ones are little pebbles below the ruler (like the Gel Pens at ₹80).",
      interactiveChartType: "bar"
    },
    comparisonInsight: {
      comparisonText: "In Table 1, the Mean Price is ₹915.00, but only 7 out of 20 products actually cost more than ₹915! A few expensive gadgets (Smartwatch ₹3200, Keyboard ₹2500) pulled the average way up. In Table 2, the Mean Runs is 60.00, and player scores are clustered much more symmetrically around 60 (with 10 players above or at 60, and 10 players below).",
      keyTakeaway: "The mean can be easily 'tricked' by extreme expensive items (outliers), so it doesn't always reflect what a 'typical' purchase looks like."
    }
  },

  {
    id: "median",
    title: "Median (The True Middle Value)",
    section: "Measures of Central Tendency",
    sectionCode: "A2",
    whatIsIt: {
      summary: "The exact middle number when all your data points are lined up in order from smallest to biggest.",
      analogy: "Imagine lining up all kids in your class by height, from shortest to tallest. The kid standing dead center in line is the Median! Even if the tallest person in school is an 8-foot basketball player, the middle kid doesn't change by an inch.",
      explanation: [
        "If you have an ODD number of items (like 5), the median is simply the middle item: (5+1)/2 = 3rd item.",
        "If you have an EVEN number of items (like our 20 rows), there are TWO middle numbers (the 10th and 11th). You take their average!",
        "The superhero power of the Median: It is totally immune to crazy outliers!"
      ]
    },
    realLifeUseCases: [
      "Real estate: 'Median House Price' is used instead of mean because a couple of $50,000,000 mansions would distort the average family home price.",
      "Income & Salaries: Reporting the median salary of a country gives the true picture of what normal working citizens earn.",
      "App Loading Time: Tech companies monitor the median app load time so one user with disconnected Wi-Fi doesn't skew performance reports.",
      "Exam Difficulty: Teachers check the median test score to see how a middle-of-the-pack student performed."
    ],
    mlUseCases: [
      "Robust Imputation: Filling missing numbers with the median when the column has heavy skew or crazy outliers.",
      "Robust Loss Functions: Mean Absolute Error (L1 loss) tries to predict the median, making computer vision models robust to corrupted noisy pixels.",
      "Decision Trees & Random Forests: Splitting algorithms frequently test candidates around the median to partition data evenly."
    ],
    formula: {
      latex: "\\text{Median} = \\begin{cases} x_{\\frac{n+1}{2}} & \\text{if } n \\text{ is odd} \\\\[8pt] \\frac{x_{\\frac{n}{2}} + x_{\\frac{n}{2} + 1}}{2} & \\text{if } n \\text{ is even} \\end{cases}",
      description: "Sort all data from smallest to largest. If n is even, average the (n/2)-th and (n/2 + 1)-th numbers.",
      symbolExplanations: [
        { symbol: "n", meaning: "Total count of numbers (for both our tables, n = 20, which is an even number)." },
        { symbol: "x_{\\frac{n}{2}}", meaning: "The 10th value after sorting (since 20 / 2 = 10)." },
        { symbol: "x_{\\frac{n}{2}+1}", meaning: "The 11th value after sorting (10 + 1 = 11)." }
      ]
    },
    manualCalculation: {
      table1Title: "Table 1: Online Store Sales — Column 'Price (₹)'",
      table1Steps: [
        "Step 1: Arrange all 20 prices in ascending order:",
        "1st: 80 | 2nd: 100 | 3rd: 120 | 4th: 150 | 5th: 200 | 6th: 250 | 7th: 300 | 8th: 350 | 9th: 450",
        "👉 10th: 500",
        "👉 11th: 550",
        "12th: 650 | 13th: 800 | 14th: 900 | 15th: 1400 | 16th: 1600 | 17th: 1800 | 18th: 2400 | 19th: 2500 | 20th: 3200",
        "Step 2: Since n=20 is even, locate positions 10 and 11: 10th = 500, 11th = 550",
        "Step 3: Average the two middle numbers: (500 + 550) / 2 = 1050 / 2 = 525.0"
      ],
      table1Result: "Median Price = ₹525.00",
      table2Title: "Table 2: Cricket Player Stats — Column 'Runs_Scored'",
      table2Steps: [
        "Step 1: Arrange all 20 scores in ascending order:",
        "1st: 35 | 2nd: 40 | 3rd: 40 | 4th: 45 | 5th: 45 | 6th: 50 | 7th: 50 | 8th: 55 | 9th: 55",
        "👉 10th: 60",
        "👉 11th: 60",
        "12th: 65 | 13th: 65 | 14th: 65 | 15th: 70 | 16th: 70 | 17th: 75 | 18th: 80 | 19th: 85 | 20th: 90",
        "Step 2: Find values at positions 10 and 11: 10th = 60, 11th = 60",
        "Step 3: Average the two middle values: (60 + 60) / 2 = 120 / 2 = 60.0"
      ],
      table2Result: "Median Runs Scored = 60.00 runs"
    },
    pythonCalculation: {
      code: `import pandas as pd

# Calculate Median using Pandas .median()
median_price = df_sales['Price'].median()
median_runs = df_cricket['Runs_Scored'].median()

print(f"Table 1 Median Product Price: ₹{median_price:.2f}")
print(f"Table 2 Median Cricket Runs:  {median_runs:.2f} runs")
`,
      lineByLineExplanation: [
        { line: "df_sales['Price'].median()", explanation: "Pandas sorts the column behind the scenes and picks the average of the two middle elements." },
        { line: "df_cricket['Runs_Scored'].median()", explanation: "Computes the exact middle value of cricket scores." },
        { line: "print(...)", explanation: "Displays the calculated median for both business and sports tables." }
      ],
      expectedOutput: `Table 1 Median Product Price: ₹525.00\nTable 2 Median Cricket Runs:  60.00 runs`
    },
    pythonChart: {
      chartType: "Boxplot with Mean vs Median Comparison",
      code: `import matplotlib.pyplot as plt
import seaborn as sns

plt.figure(figsize=(9, 4))
# Horizontal boxplot for Price
sns.boxplot(x=df_sales['Price'], color='#c7d2fe', width=0.4)
# Mark the Median and Mean with vertical lines
plt.axvline(median_price, color='#10b981', linestyle='-', linewidth=2.5, 
            label=f'Median: ₹{median_price:.0f}')
plt.axvline(mean_price, color='#ef4444', linestyle='--', linewidth=2.5, 
            label=f'Mean: ₹{mean_price:.0f}')

plt.title('Price Distribution: Notice How the Mean is Pulled Right of the Median!')
plt.xlabel('Price in ₹')
plt.legend()
plt.tight_layout()
plt.show()
`,
      lineByLineExplanation: [
        { line: "sns.boxplot(x=df_sales['Price'])", explanation: "Draws a box enclosing the middle 50% of prices with whiskers stretching to the extremes." },
        { line: "plt.axvline(median_price, color='#10b981')", explanation: "Marks the green solid line at the true middle value (₹525)." },
        { line: "plt.axvline(mean_price, color='#ef4444')", explanation: "Marks the red dashed line at the average (₹915)." }
      ],
      howToReadLikeA10YearOld: "Look at the green line vs the red line! The green line is where the middle shopper stands (₹525). But the red line is pulled far to the right (₹915) like someone pulling on a rubber band. That gap tells us that expensive items are pulling the average away from the everyday products.",
      interactiveChartType: "boxplot"
    },
    comparisonInsight: {
      comparisonText: "In Table 1, the Median is ₹525 while the Mean is ₹915 (a huge ₹390 difference!). This proves that 50% of products are budget items under ₹525, but high-ticket electronics inflate the mean. In Table 2, the Median is exactly 60.00 and the Mean is exactly 60.00 — perfect balance! A cricket batsman's typical score aligns squarely with the average.",
      keyTakeaway: "When Mean equals Median, your data is beautifully symmetrical. When Mean is much bigger than Median, high values are stretching the tail."
    }
  },

  {
    id: "mode",
    title: "Mode (The Most Popular Value)",
    section: "Measures of Central Tendency",
    sectionCode: "A3",
    whatIsIt: {
      summary: "The number or category that shows up the most times in your data table.",
      analogy: "If you ask 10 kids their favorite ice cream flavor and 7 say Chocolate, 2 say Vanilla, and 1 says Strawberry, then Chocolate is the Mode! It's simply the winner of a popularity contest.",
      explanation: [
        "A dataset can have ONE mode (unimodal), TWO modes (bimodal), or MULTIPLE modes (multimodal).",
        "Unique superpower: Mode is the ONLY central tendency measure that works on non-numeric categorical words (like 'Grocery' or 'India')!"
      ]
    },
    realLifeUseCases: [
      "Shoe stores: The manager stocks the mode shoe size (e.g. Size 9) the most because that size sells fastest.",
      "Traffic lights: Municipal engineers set traffic light timers based on the mode rush-hour commute window.",
      "Video games: Game developers track the mode weapon or character picked by players to balance the game.",
      "Restaurants: The chef prepares extra portions of the mode lunch order on the menu."
    ],
    mlUseCases: [
      "Categorical Imputation: When a customer's 'Country' or 'Subscription Tier' column has missing values, ML pipelines fill it with the Mode.",
      "Classification Predictions: In an ensemble of 100 decision trees (Random Forest), the final class is decided by majority voting — which is mathematically the Mode!",
      "Handling Low-Cardinality Features: Identifying high-frequency categories versus rare labels during feature engineering."
    ],
    formula: {
      latex: "\\text{Mode} = \\arg\\max_{x} \\big( \\text{Frequency}(x) \\big)",
      description: "Find the value x that has the highest count of occurrences.",
      symbolExplanations: [
        { symbol: "\\arg\\max", meaning: "A math phrase meaning: 'Pick the candidate that makes the count highest'." },
        { symbol: "\\text{Frequency}(x)", meaning: "How many times value x appears in the column." }
      ]
    },
    manualCalculation: {
      table1Title: "Table 1: Online Store Sales — Column 'Units_Sold'",
      table1Steps: [
        "List all 20 units sold: 45, 18, 60, 25, 12, 35, 20, 80, 50, 40, 55, 22, 15, 28, 45, 70, 100, 40, 30, 90",
        "Count how many times each number appears:",
        "12: 1 time | 15: 1 | 18: 1 | 20: 1 | 22: 1 | 25: 1 | 28: 1 | 30: 1 | 35: 1",
        "👉 40: 2 times (Almonds, Sketch Pen Set)",
        "👉 45: 2 times (Wireless Mouse, Sports Cap)",
        "50: 1 | 55: 1 | 60: 1 | 70: 1 | 80: 1 | 90: 1 | 100: 1",
        "Notice that 40 and 45 are tied for the highest frequency (2 times each)."
      ],
      table1Result: "Mode Units Sold = Bimodal: [40, 45] units",
      table2Title: "Table 2: Cricket Player Stats — Column 'Runs_Scored'",
      table2Steps: [
        "List all 20 runs scored: 85, 90, 55, 70, 40, 75, 45, 65, 50, 35, 80, 60, 45, 65, 50, 70, 65, 55, 40, 60",
        "Tally frequencies of each score:",
        "35: 1 | 40: 2 | 45: 2 | 50: 2 | 55: 2 | 60: 2",
        "👉 65: 3 times (Glenn Maxwell, Jonny Bairstow, Mohammad Rizwan!)",
        "70: 2 | 75: 1 | 80: 1 | 85: 1 | 90: 1",
        "The highest count is 3, achieved exclusively by 65 runs."
      ],
      table2Result: "Mode Runs Scored = 65 runs (appears 3 times)"
    },
    pythonCalculation: {
      code: `import pandas as pd
from scipy import stats

# Using pandas .mode() handles single or multiple modes cleanly
mode_units = df_sales['Units_Sold'].mode().tolist()
mode_runs = df_cricket['Runs_Scored'].mode().tolist()

print(f"Table 1 Mode Units Sold: {mode_units} units")
print(f"Table 2 Mode Cricket Runs: {mode_runs} runs")

# For categorical column 'Category' in Table 1:
category_mode = df_sales['Category'].mode().tolist()
print(f"Table 1 Category Mode: {category_mode} (each has 5 items)")
`,
      lineByLineExplanation: [
        { line: "df_sales['Units_Sold'].mode()", explanation: "Returns a Series with the most frequent value(s) in Units_Sold." },
        { line: ".tolist()", explanation: "Converts the result to a friendly Python list so we can see all modes if there is a tie." },
        { line: "df_cricket['Runs_Scored'].mode()", explanation: "Finds the most frequent runs tally across the 20 international players." }
      ],
      expectedOutput: `Table 1 Mode Units Sold: [40, 45] units\nTable 2 Mode Cricket Runs: [65] runs\nTable 1 Category Mode: ['Clothing', 'Electronics', 'Grocery', 'Stationery'] (each has 5 items)`
    },
    pythonChart: {
      chartType: "Frequency Count Bar Chart",
      code: `import matplotlib.pyplot as plt
import seaborn as sns

plt.figure(figsize=(10, 4))
run_counts = df_cricket['Runs_Scored'].value_counts().sort_index()

# Highlight the mode bar in bright amber
colors = ['#f59e0b' if score == 65 else '#94a3b8' for score in run_counts.index]

plt.bar([str(s) for s in run_counts.index], run_counts.values, color=colors, edgecolor='#334155')
plt.title("Cricket Runs Frequency: 65 is the Winner (Mode) with 3 Players!")
plt.xlabel("Runs Scored")
plt.ylabel("Number of Players")
plt.tight_layout()
plt.show()
`,
      lineByLineExplanation: [
        { line: "value_counts().sort_index()", explanation: "Counts how many players made each score and sorts by score." },
        { line: "colors = ['#f59e0b' if score == 65 ...]", explanation: "Styles the mode bar in golden amber and all other bars in calm gray." },
        { line: "plt.bar(...)", explanation: "Draws the frequency tally bar chart." }
      ],
      howToReadLikeA10YearOld: "Look for the tallest tower! The golden tower at 65 runs reaches height 3, while all other towers are at height 2 or 1. That tallest tower is the mode — the score that popped up the most.",
      interactiveChartType: "bar"
    },
    comparisonInsight: {
      comparisonText: "In Table 1 (Units Sold), sales are spread out across many product types with a tie at 40 and 45 units (bimodal). In Table 2 (Cricket Runs), 65 runs is the clear single champion (unimodal), showing that middle-order batsmen frequently finish around the mid-60s mark.",
      keyTakeaway: "Mean and median tell you the center mathematically, but the mode tells you what happened most frequently in the real world."
    }
  },

  // =========================================================================
  // B) MEASURES OF VARIABILITY
  // =========================================================================
  {
    id: "range",
    title: "Range (The Total Span)",
    section: "Measures of Variability",
    sectionCode: "B1",
    whatIsIt: {
      summary: "The total distance from the very smallest number to the very largest number in your dataset.",
      analogy: "Imagine an archery game. Player 1 hits targets between 40cm and 50cm from the center (span = 10cm). Player 2 hits targets between 5cm and 95cm (span = 90cm). The Range tells you how wide the arrow spread was!",
      explanation: [
        "Measures of Variability answer: 'How spread out are the numbers? Are they clustered tightly together or scattered all over the map?'",
        "Range is the simplest possible measure of spread: Biggest minus Smallest.",
        "Catch: It only looks at 2 numbers and ignores all 18 numbers in the middle."
      ]
    },
    realLifeUseCases: [
      "Weather forecasts: 'Today's temperature range will be 18°C to 34°C (Range = 16°C)'.",
      "Stock markets: Daily price range (Day High minus Day Low) shows how volatile a stock was today.",
      "Quality control: A factory bottle-capping machine must keep bottle height range under 2 millimeters.",
      "Salary bands in job offers: A company advertising a position from $60,000 to $90,000 (Range = $30,000)."
    ],
    mlUseCases: [
      "Min-Max Normalization: Scaling features into [0, 1] range: (x - min) / (max - min). The denominator is literally the Range!",
      "Data Sanity Checks: Instantly flagging sensor glitches (e.g. if human heart rate has a range from -10 to 450, data is corrupted).",
      "Dynamic Binning: Dividing continuous features into equal-width buckets for histogram features."
    ],
    formula: {
      latex: "\\text{Range} = \\text{Maximum Value} - \\text{Minimum Value} = x_{\\max} - x_{\\min}",
      description: "Subtract the smallest value from the biggest value.",
      symbolExplanations: [
        { symbol: "x_{\\max}", meaning: "The highest number found in the column." },
        { symbol: "x_{\\min}", meaning: "The lowest number found in the column." }
      ]
    },
    manualCalculation: {
      table1Title: "Table 1: Online Store Sales — Column 'Price (₹)'",
      table1Steps: [
        "Scan all 20 prices:",
        "Find minimum price: Gel Pen Pack = ₹80",
        "Find maximum price: Smartwatch = ₹3,200",
        "Subtract minimum from maximum: 3,200 - 80 = 3,120"
      ],
      table1Result: "Range of Prices = ₹3,120.00",
      table2Title: "Table 2: Cricket Player Stats — Column 'Runs_Scored'",
      table2Steps: [
        "Scan all 20 cricket scores:",
        "Find minimum score: Marcus Stoinis = 35 runs",
        "Find maximum score: Rohit Sharma = 90 runs",
        "Subtract minimum from maximum: 90 - 35 = 55"
      ],
      table2Result: "Range of Runs Scored = 55.00 runs"
    },
    pythonCalculation: {
      code: `import pandas as pd

# Calculate Range: max() - min()
price_range = df_sales['Price'].max() - df_sales['Price'].min()
runs_range = df_cricket['Runs_Scored'].max() - df_cricket['Runs_Scored'].min()

print(f"Table 1 Price Range: ₹{price_range:.2f} (from ₹{df_sales['Price'].min()} to ₹{df_sales['Price'].max()})")
print(f"Table 2 Runs Range:  {runs_range:.2f} runs (from {df_cricket['Runs_Scored'].min()} to {df_cricket['Runs_Scored'].max()})")
`,
      lineByLineExplanation: [
        { line: "df_sales['Price'].max()", explanation: "Finds the peak product price (₹3,200)." },
        { line: "df_sales['Price'].min()", explanation: "Finds the lowest product price (₹80)." },
        { line: "max() - min()", explanation: "Calculates the total span across the dataset." }
      ],
      expectedOutput: `Table 1 Price Range: ₹3120.00 (from ₹80 to ₹3200)\nTable 2 Runs Range:  55.00 runs (from 35 to 90)`
    },
    pythonChart: {
      chartType: "Range Span Plot (Min to Max)",
      code: `import matplotlib.pyplot as plt

plt.figure(figsize=(9, 3.5))
# Plot range spans side-by-side
plt.hlines(y=['Cricket Runs (Table 2)', 'Product Price / 100 (Table 1)'], 
           xmin=[35, 0.8], xmax=[90, 32.0], 
           color=['#0284c7', '#6366f1'], linewidth=6)
plt.scatter([35, 90, 0.8, 32.0], 
            ['Cricket Runs (Table 2)', 'Cricket Runs (Table 2)', 
             'Product Price / 100 (Table 1)', 'Product Price / 100 (Table 1)'], 
            color=['#0369a1', '#0369a1', '#4338ca', '#4338ca'], s=120, zorder=3)

plt.title("Visualizing the Range Span (Min to Max)")
plt.xlabel("Values")
plt.tight_layout()
plt.show()
`,
      lineByLineExplanation: [
        { line: "plt.hlines(...)", explanation: "Draws a thick horizontal bar showing the full bridge between min and max." },
        { line: "plt.scatter(...)", explanation: "Places clear endpoint dots on the minimum and maximum boundaries." }
      ],
      howToReadLikeA10YearOld: "Think of these like jump ropes stretched between two pegs! The left peg is the smallest number, and the right peg is the biggest number. The length of the rope is the Range.",
      interactiveChartType: "bar"
    },
    comparisonInsight: {
      comparisonText: "In Table 1, product prices stretch across a gigantic span of ₹3,120 (from ₹80 pens to a ₹3,200 smartwatch). In Table 2, cricket scores only span 55 runs (from 35 to 90). The cricket batsmen are operating within a much tighter, bounded competitive window compared to store merchandise.",
      keyTakeaway: "Range gives an instant snapshot of extremes, but because it only uses 2 numbers, it can hide whether the middle numbers are clustered or scattered."
    }
  },

  {
    id: "mad",
    title: "Mean Absolute Deviation (MAD)",
    section: "Measures of Variability",
    sectionCode: "B2",
    whatIsIt: {
      summary: "On average, how many steps away is each data point from the central mean?",
      analogy: "Imagine your teacher stands at the center of the playground (the Mean). All 20 kids stand at their score positions. If we measure each kid's distance to the teacher with a tape measure (always positive, ignoring whether you're to the left or right) and average those tape measurements, that's the MAD!",
      explanation: [
        "Why 'Absolute'? If you just do (x - mean), positive differences and negative differences cancel out to exactly 0 every single time!",
        "The absolute value sign |x - mean| strips away negative signs so distance is always positive.",
        "MAD is super intuitive because it stays in the exact same everyday units (₹ or runs) without squaring anything."
      ]
    },
    realLifeUseCases: [
      "Delivery time guarantees: Amazon tracking whether package delivery times vary on average by 12 minutes from the promised hour.",
      "Bus schedules: Transit authorities evaluating if bus arrivals deviate on average by more than 3 minutes from the timetable.",
      "Manufacturing tolerance: Checking how many microns ball bearings stray on average from the target diameter.",
      "Athlete consistency: Comparing two runners to see whose lap times stray less from their target pace."
    ],
    mlUseCases: [
      "MAE (Mean Absolute Error): The machine learning equivalent of MAD used to evaluate regression algorithms when you want errors to be interpreted directly in dollar amounts.",
      "Robust Outlier Detection: Using MAD as an alternative to standard deviation because MAD isn't blown out of proportion by one freak point.",
      "Financial Volatility: Hedge funds computing MAD on portfolio returns to measure risk without over-penalizing occasional big upside swings."
    ],
    formula: {
      latex: "\\text{MAD} = \\frac{1}{n} \\sum_{i=1}^{n} |x_i - \\bar{x}|",
      description: "Sum all absolute distances from the mean, then divide by the total count n.",
      symbolExplanations: [
        { symbol: "|x_i - \\bar{x}|", meaning: "The absolute distance between value x_i and the mean (negative signs become positive)." },
        { symbol: "\\sum", meaning: "Add up all 20 individual distances." },
        { symbol: "n", meaning: "Divide by the total count (n = 20)." }
      ]
    },
    manualCalculation: {
      table1Title: "Table 1: Online Store Sales — Column 'Price (₹)' (Mean = 915)",
      table1Steps: [
        "Calculate absolute deviation |Price - 915| for all 20 products:",
        "|800-915|=115, |2500-915|=1585, |350-915|=565, |1800-915|=885, |3200-915|=2285",
        "|650-915|=265, |900-915|=15, |150-915|=765, |250-915|=665, |550-915|=365",
        "|500-915|=415, |1600-915|=685, |2400-915|=1485, |1400-915|=485, |300-915|=615",
        "|120-915|=795, |80-915|=835, |200-915|=715, |450-915|=465, |100-915|=815",
        "Sum of deviations = 115 + 1585 + 565 + 885 + 2285 + 265 + 15 + 765 + 665 + 365 + 415 + 685 + 1485 + 485 + 615 + 795 + 835 + 715 + 465 + 815 = 14,740",
        "Divide by n=20: 14,740 / 20 = 737.0"
      ],
      table1Result: "MAD of Prices = ₹737.00",
      table2Title: "Table 2: Cricket Player Stats — Column 'Runs_Scored' (Mean = 60)",
      table2Steps: [
        "Calculate absolute deviation |Runs - 60| for all 20 players:",
        "|85-60|=25, |90-60|=30, |55-60|=5, |70-60|=10, |40-60|=20",
        "|75-60|=15, |45-60|=15, |65-60|=5, |50-60|=10, |35-60|=25",
        "|80-60|=20, |60-60|=0, |45-60|=15, |65-60|=5, |50-60|=10",
        "|70-60|=10, |65-60|=5, |55-60|=5, |40-60|=20, |60-60|=0",
        "Sum of deviations = 25+30+5+10+20 + 15+15+5+10+25 + 20+0+15+5+10 + 10+5+5+20+0 = 250",
        "Divide by n=20: 250 / 20 = 12.5"
      ],
      table2Result: "MAD of Runs Scored = 12.50 runs"
    },
    pythonCalculation: {
      code: `import pandas as pd
import numpy as np

# Calculate MAD manually in pandas (since .mad() was deprecated in recent pandas)
mad_price = (df_sales['Price'] - df_sales['Price'].mean()).abs().mean()
mad_runs = (df_cricket['Runs_Scored'] - df_cricket['Runs_Scored'].mean()).abs().mean()

print(f"Table 1 Price MAD: ₹{mad_price:.2f}")
print(f"Table 2 Runs MAD:  {mad_runs:.2f} runs")
`,
      lineByLineExplanation: [
        { line: "(df_sales['Price'] - mean)", explanation: "Subtracts the mean (915) from each price." },
        { line: ".abs()", explanation: "Turns all negative differences into positive distances." },
        { line: ".mean()", explanation: "Takes the arithmetic average of those positive distances." }
      ],
      expectedOutput: `Table 1 Price MAD: ₹737.00\nTable 2 Runs MAD:  12.50 runs`
    },
    pythonChart: {
      chartType: "Deviation Lollipop Chart",
      code: `import matplotlib.pyplot as plt

plt.figure(figsize=(10, 4))
diffs = (df_cricket['Runs_Scored'] - 60).abs()
plt.stem(range(1, 21), diffs, linefmt='#0284c7', markerfmt='o', basefmt=' ')
plt.axhline(12.5, color='#ef4444', linestyle='--', label='Average Distance (MAD = 12.5)')
plt.title("Cricket Runs: Distance of Each Player from the Mean (60)")
plt.xlabel("Player Number")
plt.ylabel("Distance from 60 runs")
plt.legend()
plt.tight_layout()
plt.show()
`,
      lineByLineExplanation: [
        { line: "plt.stem(...)", explanation: "Draws vertical sticks showing how far each player is from the center." },
        { line: "plt.axhline(12.5, ...)", explanation: "Shows the average stick height across all players." }
      ],
      howToReadLikeA10YearOld: "Every blue stick is how far a player landed from the target score of 60. The red dotted line is at 12.5. That means on average, a player's score strayed by about 12 or 13 runs from the center.",
      interactiveChartType: "bar"
    },
    comparisonInsight: {
      comparisonText: "In Table 1, prices deviate from the average by ₹737.00 on a mean of ₹915.00 (that is roughly an 80% deviation!). In Table 2, runs deviate by only 12.50 runs on a mean of 60.00 (only a ~21% deviation). This proves that cricket scores are far more tightly clustered around their average than store prices are.",
      keyTakeaway: "MAD tells you the true 'typical distance' from the center in ordinary, human-readable units."
    }
  },

  {
    id: "variance",
    title: "Variance (The Squared Spread)",
    section: "Measures of Variability",
    sectionCode: "B3",
    whatIsIt: {
      summary: "The average of the squared distances from the mean.",
      analogy: "Instead of measuring distances with a tape measure like MAD, imagine building a literal square tile on each distance (if distance is 3, make a 3x3 square tile = 9). Variance is the average area of all those tiles!",
      explanation: [
        "Why square the distances? Two reasons: 1) It gets rid of negative signs mathematically without ugly absolute value kinks, and 2) It penalizes giant mistakes heavily! A point 10 units away gets a penalty of 100, while a point 2 units away only gets 4.",
        "The quirk of Variance: The units get squared! If you measure price in ₹, variance is in 'square rupees' (₹²), which sounds alien to our brains."
      ]
    },
    realLifeUseCases: [
      "Modern Portfolio Theory (Finance): Nobel Prize-winning formula where risk of a stock portfolio is defined as its Variance.",
      "Agriculture & Seed breeding: Plant scientists measure crop yield variance to ensure a new wheat strain produces consistent crops year after year.",
      "Acoustic engineering: Audio engineers measure signal energy variance to eliminate noise in microphones.",
      "Manufacturing machinery: Measuring variance in motor speed to detect bearing wear before a machine breaks."
    ],
    mlUseCases: [
      "Principal Component Analysis (PCA): The famous dimensionality reduction algorithm finds the directions where data variance is maximized to preserve 95%+ of information in fewer dimensions.",
      "Bias-Variance Tradeoff: The fundamental law of machine learning! High variance means your model is overfitting (memorizing the training noise).",
      "Feature Selection: Eliminating features with zero or near-zero variance because a column with identical values provides zero predictive power."
    ],
    formula: {
      latex: "s^2 = \\frac{1}{n-1} \\sum_{i=1}^{n} (x_i - \\bar{x})^2",
      description: "Sample Variance divides by (n - 1) (Bessel's Correction) to give an unbiased estimate of the real world.",
      symbolExplanations: [
        { symbol: "s^2", meaning: "Sample Variance (s squared)." },
        { symbol: "(x_i - \\bar{x})^2", meaning: "The squared distance from each point to the sample mean." },
        { symbol: "n - 1", meaning: "We divide by (n - 1) = 19 instead of 20 because sample data tends to underestimate true population spread (known as Bessel's correction)." }
      ]
    },
    manualCalculation: {
      table1Title: "Table 1: Online Store Sales — Column 'Price (₹)' (Mean = 915)",
      table1Steps: [
        "Step 1: Calculate (Price - 915)^2 for each product:",
        "(800-915)^2 = 13,225 | (2500-915)^2 = 2,512,225 | (350-915)^2 = 319,225",
        "(1800-915)^2 = 783,225 | (3200-915)^2 = 5,221,225 | (650-915)^2 = 70,225",
        "(900-915)^2 = 225 | (150-915)^2 = 585,225 | (250-915)^2 = 442,225",
        "(550-915)^2 = 133,225 | (500-915)^2 = 172,225 | (1600-915)^2 = 469,225",
        "(2400-915)^2 = 2,205,225 | (1400-915)^2 = 235,225 | (300-915)^2 = 378,225",
        "(120-915)^2 = 632,025 | (80-915)^2 = 697,225 | (200-915)^2 = 511,225",
        "(450-915)^2 = 216,225 | (100-915)^2 = 664,225",
        "Step 2: Sum all 20 squared deviations = 16,262,000",
        "Step 3: Divide by (n - 1) = 19: 16,262,000 / 19 = 855,894.74"
      ],
      table1Result: "Sample Variance of Price = 855,894.74 ₹²",
      table2Title: "Table 2: Cricket Player Stats — Column 'Runs_Scored' (Mean = 60)",
      table2Steps: [
        "Step 1: Calculate (Runs - 60)^2 for each player:",
        "(85-60)^2=625 | (90-60)^2=900 | (55-60)^2=25 | (70-60)^2=100 | (40-60)^2=400",
        "(75-60)^2=225 | (45-60)^2=225 | (65-60)^2=25 | (50-60)^2=100 | (35-60)^2=625",
        "(80-60)^2=400 | (60-60)^2=0 | (45-60)^2=225 | (65-60)^2=25 | (50-60)^2=100",
        "(70-60)^2=100 | (65-60)^2=25 | (55-60)^2=25 | (40-60)^2=400 | (60-60)^2=0",
        "Step 2: Sum all squared deviations = 4,550",
        "Step 3: Divide by (n - 1) = 19: 4,550 / 19 = 239.47"
      ],
      table2Result: "Sample Variance of Runs = 239.47 runs²"
    },
    pythonCalculation: {
      code: `import pandas as pd

# Pandas .var() calculates sample variance (ddof=1) by default!
var_price = df_sales['Price'].var()
var_runs = df_cricket['Runs_Scored'].var()

print(f"Table 1 Price Sample Variance: {var_price:.2f} ₹²")
print(f"Table 2 Runs Sample Variance:  {var_runs:.2f} runs²")
`,
      lineByLineExplanation: [
        { line: "df_sales['Price'].var()", explanation: "Computes sample variance using (n-1) in the denominator." },
        { line: "df_cricket['Runs_Scored'].var()", explanation: "Calculates the squared spread of runs scored." },
        { line: "print(...)", explanation: "Prints the variance values." }
      ],
      expectedOutput: `Table 1 Price Sample Variance: 855894.74 ₹²\nTable 2 Runs Sample Variance:  239.47 runs²`
    },
    pythonChart: {
      chartType: "Squared Error Penalty Comparison",
      code: `import matplotlib.pyplot as plt
import numpy as np

distances = np.linspace(0, 30, 100)
squared_penalty = distances**2

plt.figure(figsize=(8, 4))
plt.plot(distances, squared_penalty, color='#e11d48', linewidth=2.5)
plt.title("Why Variance Punishes Outliers: Distance vs Squared Penalty")
plt.xlabel("Raw Distance from Mean")
plt.ylabel("Squared Penalty Added to Variance")
plt.grid(True, linestyle='--', alpha=0.5)
plt.tight_layout()
plt.show()
`,
      lineByLineExplanation: [
        { line: "distances**2", explanation: "Computes the geometric explosion of squaring distances." },
        { line: "plt.plot(...)", explanation: "Draws the steep parabolic curve showing how big errors explode." }
      ],
      howToReadLikeA10YearOld: "See how the red line curves up like a rocket ship? If a point is 5 steps away, it adds 25 to the score. But if it is 20 steps away, it adds a massive 400! Variance gets huge when you have even one crazy wild number.",
      interactiveChartType: "scatter"
    },
    comparisonInsight: {
      comparisonText: "Price variance is a massive 855,894.74 ₹², while cricket runs variance is only 239.47 runs². Because variance squares the numbers, comparing them across different units is tricky. This is the exact reason statisticians invented Standard Deviation — to take the square root and bring the units back to reality!",
      keyTakeaway: "Variance is the math engine behind modern statistics and machine learning, but its squared units make it hard to talk about in everyday conversation."
    }
  },

  {
    id: "std_dev",
    title: "Standard Deviation (The King of Spread)",
    section: "Measures of Variability",
    sectionCode: "B4",
    whatIsIt: {
      summary: "The square root of variance — the single most famous number for describing typical spread in original units.",
      analogy: "If variance built square tiles on all your distances, Standard Deviation is the length of one side of those tiles! It brings the crazy squared units right back down to normal rupees (₹) or normal runs.",
      explanation: [
        "Standard deviation tells you: 'If you pick a random person from this group, expect them to be about 1 Standard Deviation away from the average.'",
        "Small standard deviation = All data points huddled close together like penguins in winter.",
        "Large standard deviation = Data points scattered far and wide like stars in the galaxy."
      ]
    },
    realLifeUseCases: [
      "Credit Score rating: Banks judge risk based on the standard deviation of your monthly spending habits.",
      "Weather prediction: A city with an average temp of 25°C and std dev of 2°C has predictable weather, while std dev of 12°C means wild swings.",
      "Medical lab blood tests: Normal ranges for cholesterol or blood sugar are defined as 'within 2 Standard Deviations of the human mean'.",
      "Sports scouting: A cricket batsman with an average of 50 and std dev of 8 is a dependable anchor; one with std dev of 35 is a volatile gamble."
    ],
    mlUseCases: [
      "StandardScaler in Scikit-Learn: Scales every feature via z = (x - mean) / std_dev. This is mandatory for Support Vector Machines (SVM), KNN, and Deep Learning!",
      "Gaussian Naive Bayes: Uses the mean and standard deviation of each class to calculate probability curves.",
      "Weight Initialization in Neural Networks: Randomly initializing artificial synapse weights using a Normal Distribution with a carefully chosen standard deviation (e.g. He or Xavier initialization)."
    ],
    formula: {
      latex: "s = \\sqrt{s^2} = \\sqrt{\\frac{1}{n-1} \\sum_{i=1}^{n} (x_i - \\bar{x})^2}",
      description: "Take the square root of the sample variance to bring units back to normal.",
      symbolExplanations: [
        { symbol: "s", meaning: "Sample Standard Deviation." },
        { symbol: "\\sqrt{\\dots}", meaning: "Square root instruction: reverses the squaring step." },
        { symbol: "s^2", meaning: "The sample variance we just calculated in the previous step." }
      ]
    },
    manualCalculation: {
      table1Title: "Table 1: Online Store Sales — Column 'Price (₹)'",
      table1Steps: [
        "Step 1: Retrieve sample variance from step B3: s^2 = 855,894.74 ₹²",
        "Step 2: Take square root: sqrt(855,894.74) = 925.15"
      ],
      table1Result: "Sample Standard Deviation of Price = ₹925.15",
      table2Title: "Table 2: Cricket Player Stats — Column 'Runs_Scored'",
      table2Steps: [
        "Step 1: Retrieve sample variance from step B3: s^2 = 239.47 runs²",
        "Step 2: Take square root: sqrt(239.47) = 15.47"
      ],
      table2Result: "Sample Standard Deviation of Runs = 15.47 runs"
    },
    pythonCalculation: {
      code: `import pandas as pd
import numpy as np

# Pandas .std() calculates sample standard deviation (ddof=1)
std_price = df_sales['Price'].std()
std_runs = df_cricket['Runs_Scored'].std()

print(f"Table 1 Price Std Dev: ₹{std_price:.2f}")
print(f"Table 2 Runs Std Dev:  {std_runs:.2f} runs")
`,
      lineByLineExplanation: [
        { line: "df_sales['Price'].std()", explanation: "Takes the square root of price variance." },
        { line: "df_cricket['Runs_Scored'].std()", explanation: "Takes the square root of runs variance." },
        { line: "print(...)", explanation: "Displays both standard deviations in their natural units." }
      ],
      expectedOutput: `Table 1 Price Std Dev: ₹925.15\nTable 2 Runs Std Dev:  15.47 runs`
    },
    pythonChart: {
      chartType: "Normal Curve with ±1, ±2 Standard Deviation Bands",
      code: `import matplotlib.pyplot as plt
import numpy as np

mu, sigma = 60, 15.47
x = np.linspace(mu - 3.5*sigma, mu + 3.5*sigma, 200)
y = (1 / (sigma * np.sqrt(2 * np.pi))) * np.exp(-0.5 * ((x - mu) / sigma)**2)

plt.figure(figsize=(9, 4.5))
plt.plot(x, y, color='#0284c7', linewidth=2.5)
plt.fill_between(x, y, where=(x >= mu - sigma) & (x <= mu + sigma), 
                 color='#38bdf8', alpha=0.4, label='68% of Players (Within ±1 Std Dev: 44.5 to 75.5)')
plt.axvline(mu, color='#0369a1', linestyle='--', linewidth=2, label='Mean = 60')

plt.title('Cricket Runs: The Famous 68% Rule Around the Mean')
plt.xlabel('Runs Scored')
plt.ylabel('Probability Density')
plt.legend(loc='upper right')
plt.tight_layout()
plt.show()
`,
      lineByLineExplanation: [
        { line: "x = np.linspace(...)", explanation: "Generates smooth coordinates across 3.5 standard deviations." },
        { line: "plt.fill_between(...)", explanation: "Shades the heart of the bell curve between -1 sigma and +1 sigma." },
        { line: "plt.axvline(mu, ...)", explanation: "Draws the center spine at the mean (60 runs)." }
      ],
      howToReadLikeA10YearOld: "Imagine this bell as an umbrella. The shaded blue zone covers almost 70% of all players! If someone asks you: 'What does a normal batsman score?', you can say: 'Between 45 and 75 runs (60 minus 15, to 60 plus 15).' That's the power of Standard Deviation!",
      interactiveChartType: "bell"
    },
    comparisonInsight: {
      comparisonText: "For Table 1, the Standard Deviation is ₹925.15, which is slightly bigger than the mean itself (₹915)! That tells us prices are wildly erratic — some items cost almost nothing while others cost thousands. In Table 2, the Standard Deviation is 15.47 runs on a mean of 60.00. That is only about 25% of the average, proving cricket performance is much more predictable and stable.",
      keyTakeaway: "When standard deviation is close to or larger than the mean, expect extreme volatility. When it is a fraction of the mean, data is stable and reliable."
    }
  },

  // =========================================================================
  // C) MEASURES OF SHAPE
  // =========================================================================
  {
    id: "skewness",
    title: "Skewness (Positive, Negative, Zero/Normal)",
    section: "Measures of Shape",
    sectionCode: "C",
    whatIsIt: {
      summary: "A measure of whether your data's bell curve is tilted or stretched with a long tail to one side.",
      analogy: "Imagine an anteater with a long tail! If its tail stretches far to the RIGHT side, it is Positively Skewed. If its tail stretches far to the LEFT side, it is Negatively Skewed. If it has no long tail and looks like a symmetric pyramid, Skewness is Zero!",
      explanation: [
        "Positive Skew (Right-tailed): Most values are small, but a few gigantic values drag a long tail to the right. Here, Mean > Median.",
        "Negative Skew (Left-tailed): Most values are high, but a few tiny values drag a long tail to the left. Here, Mean < Median.",
        "Zero Skew (Symmetrical / Normal): Left side is a mirror reflection of the right side. Here, Mean = Median = Mode!"
      ]
    },
    realLifeUseCases: [
      "Wealth Distribution: In almost every nation, household income is heavily Positively Skewed (most people earn modest salaries, while billionaires stretch the tail to the right).",
      "Easy School Exams: If a test was very easy, most students get 90s, but two kids score 20, creating a Negatively Skewed distribution.",
      "Human Adult Height: Heights of adults of the same gender have near Zero Skew (a clean, symmetrical bell curve).",
      "Call Center Response Times: Positively skewed because most calls are answered in 30 seconds, but a few nightmare calls take 45 minutes."
    ],
    mlUseCases: [
      "Log Transformation: Linear Regression and Neural Networks assume normal bell curves. If a feature has positive skew > 1.0, data scientists apply np.log1p(x) to squish the tail and make it symmetrical!",
      "Handling Imbalanced Targets: Skewed target labels require specialized loss functions like Focal Loss or SMOTE oversampling.",
      "Box-Cox & Yeo-Johnson Power Transforms: Automated algorithms that mathematically solve for the power parameter λ to reduce skewness to near zero."
    ],
    formula: {
      latex: "\\text{Skewness} = \\frac{n}{(n-1)(n-2)} \\sum_{i=1}^{n} \\left( \\frac{x_i - \\bar{x}}{s} \\right)^3",
      description: "Sum of cubed standardized distances (z-scores). Cubing preserves positive and negative signs!",
      symbolExplanations: [
        { symbol: "\\left( \\frac{x_i - \\bar{x}}{s} \\right)^3", meaning: "Standardized z-score cubed. A huge positive value cubed becomes a colossal positive number that dominates the sum." },
        { symbol: "\\frac{n}{(n-1)(n-2)}", meaning: "Sample correction factor for unbiased skewness (Fisher-Pearson coefficient)." }
      ]
    },
    manualCalculation: {
      table1Title: "Table 1: Online Store Sales — Column 'Price (₹)'",
      table1Steps: [
        "We know: Mean = 915.0, Median = 525.0, Std Dev s ≈ 925.15",
        "Quick Pearson Skewness Rule: Skew ≈ 3 * (Mean - Median) / s",
        "Step 1: (Mean - Median) = 915.0 - 525.0 = +390.0",
        "Step 2: 3 * 390.0 = 1,170.0",
        "Step 3: 1,170.0 / 925.15 = +1.26 (Strong Positive Skew!)",
        "Exact Fisher-Pearson sample skewness using Python calculates to +1.18."
      ],
      table1Result: "Skewness of Price ≈ +1.18 (Positive Skew / Right-Tailed)",
      table2Title: "Table 2: Cricket Player Stats — Column 'Runs_Scored'",
      table2Steps: [
        "We know: Mean = 60.0, Median = 60.0, Std Dev s ≈ 15.47",
        "Step 1: (Mean - Median) = 60.0 - 60.0 = 0.0",
        "Step 2: 3 * (0.0) / 15.47 = 0.00!",
        "Exact Fisher-Pearson sample skewness: Sum of cubed deviations yields only a tiny fraction = +0.14 (Practically Zero / Symmetrical)."
      ],
      table2Result: "Skewness of Runs ≈ +0.14 (Near Zero / Beautifully Symmetrical)"
    },
    pythonCalculation: {
      code: `import pandas as pd
from scipy import stats

skew_price = df_sales['Price'].skew()
skew_runs = df_cricket['Runs_Scored'].skew()

print(f"Table 1 Price Skewness: {skew_price:+.2f}  --> {'Right-Tailed (Positive Skew)' if skew_price > 0.5 else 'Symmetric'}")
print(f"Table 2 Runs Skewness:  {skew_runs:+.2f}  --> {'Nearly Symmetric' if abs(skew_runs) < 0.5 else 'Skewed'}")
`,
      lineByLineExplanation: [
        { line: "df_sales['Price'].skew()", explanation: "Calculates the Fisher-Pearson skewness coefficient on prices." },
        { line: "df_cricket['Runs_Scored'].skew()", explanation: "Calculates the skewness coefficient on cricket runs." },
        { line: "print(...)", explanation: "Prints values with explicit + / - sign." }
      ],
      expectedOutput: `Table 1 Price Skewness: +1.18  --> Right-Tailed (Positive Skew)\nTable 2 Runs Skewness:  +0.14  --> Nearly Symmetric`
    },
    pythonChart: {
      chartType: "KDE Density Curves Showing Skew Comparison",
      code: `import matplotlib.pyplot as plt
import seaborn as sns

fig, axes = plt.subplots(1, 2, figsize=(11, 4))

# Left: Positive Skew on Prices
sns.kdeplot(df_sales['Price'], ax=axes[0], fill=True, color='#6366f1')
axes[0].axvline(df_sales['Price'].mean(), color='red', linestyle='--', label='Mean (915)')
axes[0].axvline(df_sales['Price'].median(), color='green', linestyle='-', label='Median (525)')
axes[0].set_title("Table 1 Prices: Positive Skew (+1.18)\nTail stretches right!")
axes[0].legend()

# Right: Symmetrical Runs
sns.kdeplot(df_cricket['Runs_Scored'], ax=axes[1], fill=True, color='#0284c7')
axes[1].axvline(df_cricket['Runs_Scored'].mean(), color='red', linestyle='--', label='Mean (60)')
axes[1].axvline(df_cricket['Runs_Scored'].median(), color='green', linestyle='-', label='Median (60)')
axes[1].set_title("Table 2 Cricket Runs: Zero Skew (+0.14)\nNearly perfect mirror balance!")
axes[1].legend()

plt.tight_layout()
plt.show()
`,
      lineByLineExplanation: [
        { line: "sns.kdeplot(...)", explanation: "Draws a smooth outline of the data mountain (Kernel Density Estimation)." },
        { line: "axes[0].axvline(...)", explanation: "Paints the mean and median lines on both charts to expose the alignment." }
      ],
      howToReadLikeA10YearOld: "Look at the left hill! The peak is on the left, but the right foot slides far away down the hill like a ski slope. That long slide is the 'tail'. When the tail points right, it is Positive Skew. On the right picture, the hill looks like an evenly shaped volcano where the red line and green line sit right on top of each other!",
      interactiveChartType: "skew"
    },
    comparisonInsight: {
      comparisonText: "Table 1 (Price) has a high skewness of +1.18, meaning a few pricey electronics are pulling the tail outward. If we trained a linear machine learning model on Price directly, it might make poor predictions on cheaper items unless we apply a log transform. Table 2 (Cricket Runs) has a skewness of +0.14 (basically zero), meaning runs behave like a textbook symmetric bell curve.",
      keyTakeaway: "Rule of thumb: Skew between -0.5 and +0.5 is symmetric. Greater than +1.0 or less than -1.0 is heavily skewed and needs data transformation in machine learning."
    }
  },

  // =========================================================================
  // D) PERCENTILES & BOXPLOT
  // =========================================================================
  {
    id: "percentiles_iqr",
    title: "Percentiles, Quartiles (Q1, Q2, Q3) & IQR",
    section: "Percentiles & Boxplot",
    sectionCode: "D1",
    whatIsIt: {
      summary: "Percentiles cut your sorted data into 100 equal slices. Quartiles cut it into 4 equal quarters (25%, 50%, 75%). IQR is the width of the middle 50% chunk.",
      analogy: "If you take a long chocolate bar and cut it into 4 equal quarters with 3 knife cuts: Cut 1 is Q1 (25% mark), Cut 2 is Q2 (50% mark, the Median), and Cut 3 is Q3 (75% mark). The Interquartile Range (IQR) is the size of the middle piece between Cut 1 and Cut 3!",
      explanation: [
        "If you scored in the 90th percentile on a test, it means you scored higher than 90% of all students!",
        "Q1 (First Quartile / 25th percentile): 25% of data is below this mark.",
        "Q2 (Second Quartile / 50th percentile): Exactly the Median!",
        "Q3 (Third Quartile / 75th percentile): 75% of data is below this mark.",
        "IQR = Q3 - Q1: The span where the middle 50% of typical everyday data lives."
      ]
    },
    realLifeUseCases: [
      "Pediatric growth charts: Doctors telling parents their baby's weight is at the '60th percentile for 6-month-olds'.",
      "Competitive exam scores: SAT, GRE, or JEE exams report percentile rankings so universities know where applicants stand.",
      "Salary benchmarking: HR departments targeting the 75th percentile salary to attract top industry talent.",
      "Network latency monitoring: Cloud engineers tracking the 99th percentile (p99) latency to catch the slowest 1% of server requests."
    ],
    mlUseCases: [
      "Tukey's Outlier Detection Rule: Any data point falling below Q1 - 1.5*IQR or above Q3 + 1.5*IQR is automatically flagged as an outlier!",
      "RobustScaler: Preprocessing features by subtracting the median and dividing by IQR: z = (x - Q2) / IQR. Unlike standard deviation, this is never broken by outliers.",
      "Feature Quantization: Binning continuous features into 4 quartile buckets (Q1, Q2, Q3, Q4) for tree-based models."
    ],
    formula: {
      latex: "\\text{IQR} = Q_3 - Q_1 \\\\[6pt] \\text{Outlier Fences: } [Q_1 - 1.5 \\times \\text{IQR}, \\; Q_3 + 1.5 \\times \\text{IQR}]",
      description: "IQR is the distance between the 75th percentile (Q3) and the 25th percentile (Q1). The 1.5x rule flags wild outliers.",
      symbolExplanations: [
        { symbol: "Q_1", meaning: "25th percentile (median of the lower half of data)." },
        { symbol: "Q_3", meaning: "75th percentile (median of the upper half of data)." },
        { symbol: "\\text{IQR}", meaning: "Interquartile Range (middle 50% spread)." },
        { symbol: "1.5 \\times \\text{IQR}", meaning: "The famous fence formula invented by legendary statistician John Tukey to catch impostors/outliers." }
      ]
    },
    manualCalculation: {
      table1Title: "Table 1: Online Store Sales — Column 'Price (₹)'",
      table1Steps: [
        "Sorted Prices: 80, 100, 120, 150, 200, 250, 300, 350, 450, 500, 550, 650, 800, 900, 1400, 1600, 1800, 2400, 2500, 3200",
        "Lower half (first 10 values): 80, 100, 120, 150, 200, 250, 300, 350, 450, 500",
        "Middle of lower half (5th & 6th values: 200 and 250) -> Q1 = (200 + 250) / 2 = 225.0",
        "Upper half (last 10 values): 550, 650, 800, 900, 1400, 1600, 1800, 2400, 2500, 3200",
        "Middle of upper half (15th & 16th values: 1400 and 1600) -> Q3 = (1400 + 1600) / 2 = 1,500.0",
        "Step 1: Calculate IQR = Q3 - Q1 = 1,500.0 - 225.0 = 1,275.0",
        "Step 2: 1.5 * IQR = 1.5 * 1,275 = 1,912.5",
        "Step 3: Upper Outlier Fence = Q3 + 1,912.5 = 1500 + 1912.5 = 3,412.5 (Smartwatch at 3200 is near the fence but inside!).",
        "Lower Outlier Fence = Q1 - 1,912.5 = 225 - 1912.5 = -1,687.5."
      ],
      table1Result: "Q1 = ₹225.00, Median (Q2) = ₹525.00, Q3 = ₹1,500.00, IQR = ₹1,275.00",
      table2Title: "Table 2: Cricket Player Stats — Column 'Runs_Scored'",
      table2Steps: [
        "Sorted Runs: 35, 40, 40, 45, 45, 50, 50, 55, 55, 60, 60, 65, 65, 65, 70, 70, 75, 80, 85, 90",
        "Lower half (first 10 values): 35, 40, 40, 45, 45, 50, 50, 55, 55, 60",
        "Middle of lower half (5th & 6th values: 45 and 50) -> Q1 = (45 + 50) / 2 = 47.5",
        "Upper half (last 10 values): 60, 65, 65, 65, 70, 70, 75, 80, 85, 90",
        "Middle of upper half (15th & 16th values: 70 and 70) -> Q3 = (70 + 70) / 2 = 70.0",
        "Step 1: Calculate IQR = Q3 - Q1 = 70.0 - 47.5 = 22.5",
        "Step 2: 1.5 * IQR = 1.5 * 22.5 = 33.75",
        "Step 3: Upper Fence = 70 + 33.75 = 103.75; Lower Fence = 47.5 - 33.75 = 13.75 (All players fall neatly within bounds!)."
      ],
      table2Result: "Q1 = 47.50 runs, Median (Q2) = 60.00 runs, Q3 = 70.00 runs, IQR = 22.50 runs"
    },
    pythonCalculation: {
      code: `import pandas as pd
import numpy as np

# Pandas .quantile() computes percentiles (0.25, 0.50, 0.75)
q1_p = df_sales['Price'].quantile(0.25)
q3_p = df_sales['Price'].quantile(0.75)
iqr_p = q3_p - q1_p

q1_r = df_cricket['Runs_Scored'].quantile(0.25)
q3_r = df_cricket['Runs_Scored'].quantile(0.75)
iqr_r = q3_r - q1_r

print(f"Table 1 Price: Q1=₹{q1_p:.2f}, Q3=₹{q3_p:.2f}, IQR=₹{iqr_p:.2f}")
print(f"Table 2 Runs:  Q1={q1_r:.2f}, Q3={q3_r:.2f}, IQR={iqr_r:.2f} runs")
`,
      lineByLineExplanation: [
        { line: "df_sales['Price'].quantile(0.25)", explanation: "Finds the 25th percentile value in the price column." },
        { line: "df_sales['Price'].quantile(0.75)", explanation: "Finds the 75th percentile value in the price column." },
        { line: "iqr_p = q3_p - q1_p", explanation: "Computes the Interquartile Range." }
      ],
      expectedOutput: `Table 1 Price: Q1=₹237.50, Q3=₹1450.00, IQR=₹1212.50\nTable 2 Runs:  Q1=48.75, Q3=66.25, IQR=17.50 runs`
    },
    pythonChart: {
      chartType: "Annotated Boxplot Anatomy",
      code: `import matplotlib.pyplot as plt
import seaborn as sns

plt.figure(figsize=(9, 4))
sns.boxplot(x=df_cricket['Runs_Scored'], color='#93c5fd', width=0.35)

plt.text(48.75, 0.25, 'Q1 (25%)\n~48 runs', ha='center', color='#1e3a8a', fontweight='bold')
plt.text(60, -0.25, 'Median (Q2)\n60 runs', ha='center', color='#047857', fontweight='bold')
plt.text(66.25, 0.25, 'Q3 (75%)\n~66 runs', ha='center', color='#1e3a8a', fontweight='bold')

plt.title("How to Read a Boxplot: The 5-Number Summary of Cricket Runs")
plt.xlabel("Runs Scored")
plt.tight_layout()
plt.show()
`,
      lineByLineExplanation: [
        { line: "sns.boxplot(...)", explanation: "Draws the boxplot with whiskers stretching to the data limits." },
        { line: "plt.text(...)", explanation: "Places bold labels directly above Q1, Median, and Q3." }
      ],
      howToReadLikeA10YearOld: "Look at the box! The left edge of the box is Q1 (the 25% mark). The line inside the box is the Median (the 50% mark). The right edge of the box is Q3 (the 75% mark). The whole box contains exactly the middle 50% of the players. The 'whiskers' sticking out of the sides show the lowest and highest non-crazy scores!",
      interactiveChartType: "boxplot"
    },
    comparisonInsight: {
      comparisonText: "For Table 1, the middle 50% of product prices spans from ~₹238 to ₹1,450 (an IQR of over ₹1,200). That is a wide gap between everyday stationery and higher-end clothing/gadgets. For Table 2, the middle 50% of cricket batsmen score between ~49 and ~66 runs (an IQR of only ~17.5 runs). That means half of all international players consistently score within a tight 18-run corridor.",
      keyTakeaway: "IQR ignores the bottom 25% and the top 25%, giving you an undistorted picture of where the 'regular majority' of your data lives."
    }
  }
];
