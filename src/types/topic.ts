export interface TopicTemplate {
  id: string;
  title: string;
  section: string;
  sectionCode: string; // e.g. "A1", "B2", "J", etc.
  
  // 1. 🧠 What is it?
  whatIsIt: {
    summary: string;
    analogy: string;
    explanation: string[];
  };

  // 2. 📍 Where is it used in real life?
  realLifeUseCases: string[];

  // 3. 🤖 Where is it used in Machine Learning / Data Analysis?
  mlUseCases: string[];

  // 4. 📐 Formula
  formula: {
    latex: string;
    description: string;
    symbolExplanations: { symbol: string; meaning: string }[];
  };

  // 5. ✍️ Manual Calculation
  manualCalculation: {
    table1Title: string;
    table1Steps: string[];
    table1Result: string;
    table2Title: string;
    table2Steps: string[];
    table2Result: string;
  };

  // 6. 🐍 Python Code (Calculation)
  pythonCalculation: {
    code: string;
    lineByLineExplanation: { line: string; explanation: string }[];
    expectedOutput: string;
  };

  // 7. 📊 Python Code (Chart)
  pythonChart: {
    chartType: string;
    code: string;
    lineByLineExplanation: { line: string; explanation: string }[];
    howToReadLikeA10YearOld: string;
    interactiveChartType: 'bar' | 'histogram' | 'boxplot' | 'scatter' | 'skew' | 'polygon' | 'bell' | 'contingency';
  };

  // 8. 🔍 Comparison & Insight
  comparisonInsight: {
    comparisonText: string;
    keyTakeaway: string;
  };
}

export interface SummaryRow {
  topic: string;
  formula: string;
  usedFor: string;
  realWorldExample: string;
  pythonFunction: string;
}

export interface DecisionNode {
  id: string;
  question: string;
  options: {
    label: string;
    description?: string;
    nextId?: string;
    result?: {
      testName: string;
      why: string;
      example: string;
    };
  }[];
}
