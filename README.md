# Agentic AI QA E2E Playwright Workflow

This repository contains a complete, automated end-to-end Quality Assurance (QA) workflow for testing e-commerce checkout processes. The project utilizes **Playwright** for cross-browser testing and is configured to run with AI agents using the **Model Context Protocol (MCP)**.

---

## 📁 Project Structure

```bash
├── .antigravity/              # MCP Server configuration for Antigravity IDE
├── .claude/agents/            # Prompt definitions for Claude Code agents
├── .github/
│   ├── agents/                # Prompt definitions for VS Code agents
│   └── workflows/             # GitHub actions and Copilot setup steps
├── .vscode/                   # MCP Server configuration for VS Code
├── specs/                     # Test plans and specifications
│   └── saucedemo-checkout-test-plan.md
├── test-results/              # Test execution reports and evidence
│   ├── assets/                # Screenshots of test runs
│   └── checkout-test-report.md
├── tests/                     # Automated Playwright test scripts
│   ├── saucedemo-checkout/
│   │   └── checkout.spec.ts
│   ├── example.spec.ts
│   └── seed.spec.ts           # Baseline environment seed test
├── user-stories/              # Product requirements and Acceptance Criteria
│   └── ecommerce-checkout.md
└── playwright.config.ts       # Playwright configuration
```

---

## 🚀 Getting Started

### Prerequisites
Ensure you have **Node.js (version 18 or 20+)** installed on your system.

### 1. Install Dependencies
Clone the repository and install all required packages:
```bash
npm install
```

### 2. Download Playwright Browsers
Install the necessary browser binaries (Chromium, Firefox, WebKit):
```bash
npx playwright install
```

---

## 🧪 Running Tests

You can execute the automated test suites using the following commands:

*   **Run All Tests (Chromium, Firefox, WebKit)**:
    ```bash
    npx playwright test
    ```
*   **Run Checkout Tests Specifically**:
    ```bash
    npx playwright test tests/saucedemo-checkout/
    ```
*   **Run Tests in Headed Mode**:
    ```bash
    npx playwright test --headed
    ```
*   **View HTML Test Report**:
    ```bash
    npx playwright show-report
    ```

---

## 🤖 Model Context Protocol (MCP) Setup

This project is pre-configured with MCP settings for **Antigravity IDE**, **VS Code**, and **Claude Code** to enable AI agents to automate and heal tests.

### Configured Servers:
1.  **`playwright`** (`@playwright/mcp`): Enables browser automation and accessibility tree inspection.
2.  **`playwright-test`**: Integrates the test runner, permitting AI agents to run and heal spec scripts.
3.  **`github`** (`@modelcontextprotocol/server-github`): Automates git staging, commits, and remote syncing.

### Enabling the GitHub MCP Server
To use the GitHub MCP server, make sure to add your **GitHub Personal Access Token** under the `env` block in either [.antigravity/mcp.json](.antigravity/mcp.json) or [.vscode/mcp.json](.vscode/mcp.json):
```json
"env": {
  "GITHUB_PERSONAL_ACCESS_TOKEN": "YOUR_PERSONAL_ACCESS_TOKEN"
}
```

---

## 🐛 Documented Defects
During exploratory testing, one key defect was identified:
- **BUG-101: Empty Cart Checkout Allowed (Medium Severity)**: The application currently allows users to click the checkout button and proceed to input shipping info even when the shopping cart has `0` items. This violates Business Rule 3. A test case documenting this behavior is active in the suite.
