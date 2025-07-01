# API Consolidation and V4 Deprecation Plan

This document outlines the plan to consolidate the fragmented API endpoints and remove the legacy `/api/v4` version, as per **CRITICAL FIX 2.1** in the project roadmap.

## 1. Problem Summary

The backend currently has three separate `main` files (`main.py`, `main_enhanced.py`, `main_enhanced_optimized.py`), each defining a different set of API endpoints. This has led to a confusing and fragmented API, with many endpoints using a legacy `/api/v4` prefix. This makes the API difficult to maintain, test, and use.

## 2. Consolidation Plan

The goal is to have a single, unified `main.py` that contains all the application's functionality and a clean, versionless API structure (e.g., `/api/...`).

### Step 1: Merge `main_enhanced.py` into `main.py`

All the functionality from `main_enhanced.py` should be carefully merged into `main.py`. This includes:
-   **Pydantic Models**: Copy all Pydantic models (e.g., `ValueBetResponse`, `UserProfileResponse`, etc.) into `main.py`.
-   **Helper Functions**: Copy all helper functions (e.g., `get_user_profile`, `advanced_stake_sizing`, etc.) into `main.py`.
-   **API Endpoints**: Copy all API endpoints, removing the `/api/v4` prefix and placing them under a logical, versionless path (e.g., `/api/user/profile`).

### Step 2: Merge `main_enhanced_optimized.py` into `main.py`

Repeat the process for `main_enhanced_optimized.py`. This file contains similar but slightly different logic. The best parts of this file should be merged into the new `main.py`, ensuring there are no conflicts.

### Step 3: Delete Redundant Files

Once all functionality has been merged into `main.py`, the following files should be deleted:
-   `backend/main_enhanced.py`
-   `backend/main_enhanced_optimized.py`

## 3. V4 Endpoint Deprecation Map

The following is a non-exhaustive list of `/api/v4` endpoints that must be removed or replaced:

| Old Endpoint (V4) | New Endpoint (Proposed) | Action |
| --- | --- | --- |
| `/api/v4/monitoring/latency-health` | `/api/monitoring/latency` | Replace |
| `/api/v4/betting/value-bets` | `/api/betting/value-bets` | Replace |
| `/api/v4/betting/arbitrage` | `/api/arbitrage-opportunities` | Replace |
| `/api/v4/user/profile` | `/api/user/profile` | Replace |
| `/api/v4/user/profit-analytics` | `/api/user/analytics` | Replace |
| `/api/v4/model/retrain` | `/api/models/retrain` | Replace |
| `/api/v4/model/retrain/status/{job_id}` | `/api/models/retrain/{job_id}` | Replace |
| `/api/v4/model/rollback` | `/api/models/rollback` | Replace |
| `/api/v4/explain/{prediction_id}` | `/api/predictions/{prediction_id}/explain` | Replace |
| `/api/v4/audit/predictions` | `/api/audit/predictions` | Replace |
| `/api/v4/data/quality` | `/api/data/quality` | Replace |
| `/api/v4/ensemble/diversity` | `/api/ensemble/diversity` | Replace |

_This list should be completed during the refactoring process._

## 4. Conclusion

By following this plan, the backend API will be consolidated into a single, maintainable, and versionless structure. This will improve developer experience, simplify testing, and make the API easier for the frontend to consume. 