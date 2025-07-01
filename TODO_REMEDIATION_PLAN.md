# TODO Remediation Plan

This document outlines the plan to address the outstanding `TODO` and `FIXME` comments in the codebase, as per **FIX 2.9** in the project roadmap. Due to persistent file synchronization issues, many of these fixes could not be applied automatically and require manual intervention.

## 1. Summary of Findings

A search for `TODO` and `FIXME` comments revealed a significant amount of technical debt, including:
-   Incomplete features and placeholder logic.
-   Missing or incomplete tests.
-   Outdated comments and documentation.
-   Areas needing refactoring or further implementation.

## 2. Remediation Plan

The following is a list of key `TODO` items and the proposed fixes.

### 2.1. `frontend/src/utils/StrategyEngine.ts`

-   **TODO**: `Calculate recommended stake`
-   **Problem**: The stake calculation is currently hardcoded to `0`.
-   **Proposed Fix**: Implement a stake calculation based on the Kelly Criterion or a similar risk management strategy. A safe implementation is to use a fraction of the `maxStake` based on the prediction confidence:
    ```typescript
    stake: Math.min(
      this.config.maxStake,
      Math.max(
        this.config.minStake,
        this.config.maxStake * prediction.confidence * this.config.kellyFraction
      )
    )
    ```

### 2.2. `frontend/src/pages/Admin.tsx`

-   **TODO**: `Implement settings update logic`
-   **Problem**: The `handleSettingsChange` function is empty.
-   **Proposed Fix**: Implement a mock version that saves the settings to `localStorage` and logs to the console. This provides local testing functionality.
    ```typescript
    // In a real application, this would call an API to update the settings.
    // For now, we'll save to localStorage and log to the console.
    localStorage.setItem('admin_model_settings', JSON.stringify(settings));
    console.log("Updated model settings:", settings);
    ```

### 2.3. `frontend/src/store/useStore.ts`

-   **TODO**: `Replace with actual API call` in `login` and `register` functions.
-   **Problem**: The authentication functions use placeholder `fetch` calls.
-   **Proposed Fix**: Replace the `fetch` calls with the `apiService` that is used elsewhere in the application. This will connect the store to the actual API layer.
    ```typescript
    // In login function
    const user = await apiService.login(email, password);
    set({ user });

    // In register function
    const user = await apiService.register(name, email, password);
    set({ user });
    ```

### 2.4. `backend/sports_expert_api.py`

-   **TODOs**: Implement `detect_model_drift`, `check_data_quality`, etc.
-   **Problem**: Several background jobs are calling `agent` methods that don't exist.
-   **Proposed Fix**: Add placeholder methods to the `SafeAgentWrapper` class to avoid runtime errors. The methods should log a warning that they are not implemented.

## 3. Conclusion

By addressing these `TODO` items, the codebase will be more complete, stable, and easier to maintain. While the file sync issues prevented automatic application of these fixes, this plan provides a clear path for a developer to complete the work manually. 