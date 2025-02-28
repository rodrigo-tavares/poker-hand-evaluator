# Poker Hand Evaluator ♠️♥️♣️♦️

## Overview

This project implements a Poker Hand Evaluator, which allows users to generate, evaluate, and compare poker hands. The core functionality includes a **hand selector**, **hand evaluator**, and **interactive UI components** to visualize and assess poker hands.

[Preview link](https://poker-hand-evaluator.vercel.app/)

![image](https://github.com/user-attachments/assets/269619f8-6575-44f4-964c-4efc29cc7db1)

## Design Decisions

### Component-Based Architecture

The project is structured using a modular component-based approach, making it easy to scale and maintain. The key components include:

- **HandSelector**: Allows users to generate or manually select poker hands.
- **PokerCard**: Displays an individual card.
- **PokerHandSearch**: Enables manual hand selection.
- **usePokerEvaluator**: Custom React Hook that determines the winner between two hands.

### State Management

State is handled using React's `useState` and `useEffect` hooks. The **hand state** is managed in the `HandSelector` component, and evaluation logic is encapsulated in `usePokerEvaluator` to ensure separation of concerns.

### Animations

Framer Motion is used for smooth transitions when dealing cards, enhancing the user experience.

## API Implementation

### `usePokerEvaluator`

This custom hook evaluates two hands and determines the winner.

#### **API Signature:**

```ts
const usePokerEvaluator = (hand1: Hand[], hand2: Hand[]) => HandResult;
```

#### **Logic:**

1. **Rank Identification:**
   - The function `getHandRank` determines the hand’s strength based on poker rules.
2. **Hand Comparison:**
   - Hands are ranked using a predefined ranking order.
   - If both hands have five cards, their ranks are compared to determine the winner.

### `HandSelector`

Handles card dealing and user selection.

#### **Props:**

```ts
interface HandSelectorPropTypes {
  hand: Hand[];
  setHand: (hand: Hand[]) => void;
  label: string;
  winner?: boolean;
}
```

#### **Features:**

- Automatically deals five random cards when triggered.
- Allows users to manually input a hand via `PokerHandSearch`.
- Visually highlights the winning hand.

## Challenges & Notable Features

### 1. **Ensuring Fair Card Distribution**

- Randomly generating five unique cards required handling duplicates.
- The `dealCards` function ensures variety by selecting random suits and ranks.

### 2. **Optimizing Performance**

- `usePokerEvaluator` leverages `useMemo` to prevent unnecessary recalculations.
- Framer Motion animations were tuned for smooth UI updates without lag.

### 3. **Handling Edge Cases**

- Prevents evaluation when either hand has fewer than five cards.
- Handles ties gracefully and provides clear feedback in the UI.

## Future Improvements

- Implement tie-breaking logic for hands of the same rank.
- Add drag-and-drop functionality for manual card selection.
- Extend support for multiplayer poker scenarios.



## Running the Project Locally
To run the project locally, follow these steps:

1. Clone the repository:
   ```sh
   git clone https://github.com/rodrigo-tavares/poker-hand-evaluator 
   cd poker-hand-evaluator
   ```

2. Install dependencies:
   ```sh
   yarn install
   ```

3. Start the development server:
   ```sh
   yarn dev
   ```
   The application should now be running at `http://localhost:5173`.


## Running Tests with Vitest
This project uses **Vitest** for unit testing.

1. Run the test suite:
   ```sh
   npm run test
   ```

2. Run tests in watch mode (for development):
   ```sh
   npm run test:watch
   ```

3. Generate a test coverage report:
   ```sh
   npm run test:coverage
   ```
