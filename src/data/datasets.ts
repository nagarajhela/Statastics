export interface StoreProduct {
  id: number;
  product_name: string;
  category: 'Electronics' | 'Grocery' | 'Clothing' | 'Stationery';
  price: number;
  units_sold: number;
}

export interface CricketPlayer {
  id: number;
  player_name: string;
  team: 'India' | 'Australia' | 'England' | 'Pakistan';
  runs_scored: number;
  strike_rate: number;
}

export const TABLE_1_ONLINE_SALES: StoreProduct[] = [
  { id: 1, product_name: "Wireless Mouse", category: "Electronics", price: 800, units_sold: 45 },
  { id: 2, product_name: "Mechanical Keyboard", category: "Electronics", price: 2500, units_sold: 18 },
  { id: 3, product_name: "USB-C Cable", category: "Electronics", price: 350, units_sold: 60 },
  { id: 4, product_name: "Bluetooth Speaker", category: "Electronics", price: 1800, units_sold: 25 },
  { id: 5, product_name: "Smartwatch", category: "Electronics", price: 3200, units_sold: 12 },
  { id: 6, product_name: "Basmati Rice (5kg)", category: "Grocery", price: 650, units_sold: 35 },
  { id: 7, product_name: "Olive Oil (1L)", category: "Grocery", price: 900, units_sold: 20 },
  { id: 8, product_name: "Dark Chocolate", category: "Grocery", price: 150, units_sold: 80 },
  { id: 9, product_name: "Green Tea Pack", category: "Grocery", price: 250, units_sold: 50 },
  { id: 10, product_name: "Almonds (500g)", category: "Grocery", price: 550, units_sold: 40 },
  { id: 11, product_name: "Cotton T-Shirt", category: "Clothing", price: 500, units_sold: 55 },
  { id: 12, product_name: "Denim Jeans", category: "Clothing", price: 1600, units_sold: 22 },
  { id: 13, product_name: "Running Shoes", category: "Clothing", price: 2400, units_sold: 15 },
  { id: 14, product_name: "Winter Hoodie", category: "Clothing", price: 1400, units_sold: 28 },
  { id: 15, product_name: "Sports Cap", category: "Clothing", price: 300, units_sold: 45 },
  { id: 16, product_name: "Spiral Notebook", category: "Stationery", price: 120, units_sold: 70 },
  { id: 17, product_name: "Gel Pen Pack", category: "Stationery", price: 80, units_sold: 100 },
  { id: 18, product_name: "Sketch Pen Set", category: "Stationery", price: 200, units_sold: 40 },
  { id: 19, product_name: "Desk Organizer", category: "Stationery", price: 450, units_sold: 30 },
  { id: 20, product_name: "Sticky Notes Pack", category: "Stationery", price: 100, units_sold: 90 },
];

export const TABLE_2_CRICKET_STATS: CricketPlayer[] = [
  { id: 1, player_name: "Virat Kohli", team: "India", runs_scored: 85, strike_rate: 138.5 },
  { id: 2, player_name: "Rohit Sharma", team: "India", runs_scored: 90, strike_rate: 145.2 },
  { id: 3, player_name: "KL Rahul", team: "India", runs_scored: 55, strike_rate: 122.0 },
  { id: 4, player_name: "Suryakumar Yadav", team: "India", runs_scored: 70, strike_rate: 175.4 },
  { id: 5, player_name: "Hardik Pandya", team: "India", runs_scored: 40, strike_rate: 150.0 },
  { id: 6, player_name: "David Warner", team: "Australia", runs_scored: 75, strike_rate: 135.0 },
  { id: 7, player_name: "Steve Smith", team: "Australia", runs_scored: 45, strike_rate: 118.5 },
  { id: 8, player_name: "Glenn Maxwell", team: "Australia", runs_scored: 65, strike_rate: 168.0 },
  { id: 9, player_name: "Mitchell Marsh", team: "Australia", runs_scored: 50, strike_rate: 140.0 },
  { id: 10, player_name: "Marcus Stoinis", team: "Australia", runs_scored: 35, strike_rate: 132.0 },
  { id: 11, player_name: "Jos Buttler", team: "England", runs_scored: 80, strike_rate: 155.0 },
  { id: 12, player_name: "Joe Root", team: "England", runs_scored: 60, strike_rate: 112.5 },
  { id: 13, player_name: "Ben Stokes", team: "England", runs_scored: 45, strike_rate: 130.0 },
  { id: 14, player_name: "Jonny Bairstow", team: "England", runs_scored: 65, strike_rate: 142.0 },
  { id: 15, player_name: "Harry Brook", team: "England", runs_scored: 50, strike_rate: 148.5 },
  { id: 16, player_name: "Babar Azam", team: "Pakistan", runs_scored: 70, strike_rate: 126.0 },
  { id: 17, player_name: "Mohammad Rizwan", team: "Pakistan", runs_scored: 65, strike_rate: 124.5 },
  { id: 18, player_name: "Fakhar Zaman", team: "Pakistan", runs_scored: 55, strike_rate: 136.0 },
  { id: 19, player_name: "Shadab Khan", team: "Pakistan", runs_scored: 40, strike_rate: 144.0 },
  { id: 20, player_name: "Iftikhar Ahmed", team: "Pakistan", runs_scored: 60, strike_rate: 152.0 },
];

export const PYTHON_SETUP_CODE = `import pandas as pd
import numpy as np
import scipy.stats as stats
import matplotlib.pyplot as plt
import seaborn as sns

# Set style for all charts
sns.set_theme(style="whitegrid", palette="muted")
plt.rcParams['font.sans-serif'] = 'DejaVu Sans'

# ==========================================
# TABLE 1: Online Store Sales (20 rows)
# ==========================================
df_sales = pd.DataFrame({
    'Product_Name': [
        'Wireless Mouse', 'Mechanical Keyboard', 'USB-C Cable', 'Bluetooth Speaker', 'Smartwatch',
        'Basmati Rice (5kg)', 'Olive Oil (1L)', 'Dark Chocolate', 'Green Tea Pack', 'Almonds (500g)',
        'Cotton T-Shirt', 'Denim Jeans', 'Running Shoes', 'Winter Hoodie', 'Sports Cap',
        'Spiral Notebook', 'Gel Pen Pack', 'Sketch Pen Set', 'Desk Organizer', 'Sticky Notes Pack'
    ],
    'Category': [
        'Electronics', 'Electronics', 'Electronics', 'Electronics', 'Electronics',
        'Grocery', 'Grocery', 'Grocery', 'Grocery', 'Grocery',
        'Clothing', 'Clothing', 'Clothing', 'Clothing', 'Clothing',
        'Stationery', 'Stationery', 'Stationery', 'Stationery', 'Stationery'
    ],
    'Price': [
        800, 2500, 350, 1800, 3200,
        650, 900, 150, 250, 550,
        500, 1600, 2400, 1400, 300,
        120, 80, 200, 450, 100
    ],
    'Units_Sold': [
        45, 18, 60, 25, 12,
        35, 20, 80, 50, 40,
        55, 22, 15, 28, 45,
        70, 100, 40, 30, 90
    ]
})

# ==========================================
# TABLE 2: Cricket Player Stats (20 rows)
# ==========================================
df_cricket = pd.DataFrame({
    'Player_Name': [
        'Virat Kohli', 'Rohit Sharma', 'KL Rahul', 'Suryakumar Yadav', 'Hardik Pandya',
        'David Warner', 'Steve Smith', 'Glenn Maxwell', 'Mitchell Marsh', 'Marcus Stoinis',
        'Jos Buttler', 'Joe Root', 'Ben Stokes', 'Jonny Bairstow', 'Harry Brook',
        'Babar Azam', 'Mohammad Rizwan', 'Fakhar Zaman', 'Shadab Khan', 'Iftikhar Ahmed'
    ],
    'Team': [
        'India', 'India', 'India', 'India', 'India',
        'Australia', 'Australia', 'Australia', 'Australia', 'Australia',
        'England', 'England', 'England', 'England', 'England',
        'Pakistan', 'Pakistan', 'Pakistan', 'Pakistan', 'Pakistan'
    ],
    'Runs_Scored': [
        85, 90, 55, 70, 40,
        75, 45, 65, 50, 35,
        80, 60, 45, 65, 50,
        70, 65, 55, 40, 60
    ],
    'Strike_Rate': [
        138.5, 145.2, 122.0, 175.4, 150.0,
        135.0, 118.5, 168.0, 140.0, 132.0,
        155.0, 112.5, 130.0, 142.0, 148.5,
        126.0, 124.5, 136.0, 144.0, 152.0
    ]
})

print("Datasets successfully initialized!")
print(f"Table 1: {len(df_sales)} rows, Table 2: {len(df_cricket)} rows")
`;
