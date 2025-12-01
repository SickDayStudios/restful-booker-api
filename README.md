# 🚀 Restful-Booker API Testing Framework

A robust, enterprise-grade API testing framework built with **Playwright** and **TypeScript** for automated testing of the [Restful-Booker API](https://restful-booker.herokuapp.com/).

## ✨ Features

- 🎯 **Type-Safe Testing** - Full TypeScript support with strict typing
- 🏗️ **Clean Architecture** - Separation of concerns with organized folder structure
- 🔐 **Authentication Handling** - Cookie-based authentication with worker-scoped fixtures
- ✅ **Schema Validation** - Automated response schema validation
- 🔄 **Reusable API Client** - Abstract base class for consistent HTTP operations
- 📊 **HTML Reports** - Built-in Playwright HTML reporting
- ⚡ **Parallel Execution** - Fast test execution with parallel workers

## 📁 Project Structure

```
restful-booker-api/
├── fixtures/
│   └── workerAuth.ts         # Worker-scoped authentication fixture
├── helpers/
│   ├── apiFunctions.ts       # API endpoint methods
│   ├── baseApiClient.ts      # Base HTTP client with error handling
│   └── schemaValidation.ts   # Response schema validators
├── tests/
│   └── api.spec.ts           # API test suites
├── types/
│   └── bookingType.ts        # TypeScript type definitions
├── playwright.config.ts      # Playwright configuration
└── package.json
```

## 🛠️ Tech Stack

- **[Playwright](https://playwright.dev/)** - Modern automation framework
- **[TypeScript](https://www.typescriptlang.org/)** - Type-safe JavaScript
- **[Node.js](https://nodejs.org/)** - JavaScript runtime

## 📋 Prerequisites

- Node.js (v16 or higher)
- npm or yarn

## 🚀 Getting Started

### Installation

```powershell
# Clone the repository
git clone https://github.com/SickDayStudios/restful-booker-api.git

# Navigate to project directory
cd restful-booker-api

# Install dependencies
npm install

# Install Playwright browsers (if needed)
npx playwright install
```

### Running Tests

```powershell
# Run all tests
npm test

# Run tests with UI mode
npx playwright test --ui

# Run tests in headed mode
npx playwright test --headed

# Run specific test file
npx playwright test tests/api.spec.ts

# View HTML report
npx playwright show-report
```

## 🧪 Test Coverage

The framework provides comprehensive test coverage for all Restful-Booker API endpoints:

| Endpoint | Method | Test Coverage |
|----------|--------|---------------|
| `/ping` | GET | ✅ Health check |
| `/booking` | GET | ✅ List all bookings |
| `/booking?filters` | GET | ✅ Filtered booking search |
| `/booking/:id` | GET | ✅ Get booking by ID |
| `/booking` | POST | ✅ Create new booking |
| `/booking/:id` | PUT | ✅ Update entire booking |
| `/booking/:id` | PATCH | ✅ Partial booking update |
| `/booking/:id` | DELETE | ✅ Delete booking |

## 🏗️ Architecture Highlights

### Base API Client

The `BaseApiClient` provides a robust foundation for all HTTP operations:

- 🔄 Automatic JSON/text response parsing
- 🍪 Cookie-based authentication support
- ⚠️ Comprehensive error handling with descriptive messages
- 🔁 Request context management and cleanup

### Worker-Scoped Fixtures

The framework uses Playwright's worker-scoped fixtures to:

- 🎫 Authenticate once per worker (efficient)
- 📦 Create test data that persists across tests
- 🧹 Automatic cleanup after worker completion

### Schema Validation

All API responses are validated against TypeScript interfaces to ensure:

- ✅ Response structure integrity
- ✅ Data type correctness
- ✅ Required field presence

## 🔧 Configuration

The `playwright.config.ts` provides sensible defaults:

```typescript
{
  testDir: './tests',
  fullyParallel: true,
  retries: process.env.CI ? 2 : 0,
  reporter: 'html',
  use: {
    baseURL: 'https://restful-booker.herokuapp.com',
    extraHTTPHeaders: {
      Accept: "application/json",
      "Content-Type": "application/json"
    }
  }
}
```

## 🔐 Authentication

The API uses the following default credentials:
- **Username:** `admin`
- **Password:** `password123`

Authentication is handled automatically by the `workerAuth` fixture.

## 🤝 Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

## 📄 License

This project is licensed under the ISC License.

## 🔗 Resources

- [Restful-Booker API Documentation](https://restful-booker.herokuapp.com/apidoc/index.html)
- [Playwright Documentation](https://playwright.dev/docs/intro)
- [TypeScript Documentation](https://www.typescriptlang.org/docs/)

## 👤 Author

**Cason @ SickDayStudios**

---

*Built with ❤️ using Playwright and TypeScript*
