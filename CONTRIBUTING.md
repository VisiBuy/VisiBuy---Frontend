# CONTRIBUTING.md

## Visibuy Git Workflow Guide
_Last updated: March 2025_

### **Branching Strategy**
Visibuy follows the **Feature Branch Workflow** with a staging environment.

#### **Branches Used:**
- `staging` → Main testing branch before production.
- `feature/{feature-name}` → Each feature, bug fix, or update gets its own branch.
- `main` → Production-ready code (deploys after staging is validated).

---

## **Git Workflow Steps**

### **Step 1: Pull the Latest Staging Branch**
Before starting work, update your local repository:
```sh
git checkout staging
git pull origin staging
```

### **Step 2: Create a Feature Branch**
Each feature or fix should be developed on a separate branch:
```sh
git checkout -b feature/{feature-name}
```
Example:
```sh
git checkout -b feature/add-login
```
Work on your feature, then commit your changes regularly:
```sh
git add .
git commit -m "Added login page UI"
```

### **Step 3: Merge Staging into Your Feature Branch (If Needed)**
_This step is necessary **only if** new changes were merged into `staging` while you were working._

To ensure your feature branch is up-to-date:
```sh
git checkout feature/{feature-name}
git merge staging
```
Resolve any conflicts and test your code.

### **Step 4: Push Your Feature Branch & Open a PR**
Once the feature is complete:
```sh
git push origin feature/{feature-name}
```
Then, go to **GitHub** and open a **Pull Request (PR)** to merge your branch into `staging`.

### **Step 5: GitHub Actions Runs Automated Tests**
- ✅ PR triggers **automated tests & linting**.
- ❌ **Merging is blocked if tests fail**.
- ✅ A team member must review & approve the PR.

### **Step 6: Merge PR to Staging & Push**
Once approved:
```sh
git checkout staging
git merge feature/{feature-name}
git push origin staging
```
🚀 **Vercel will automatically deploy staging updates to:**  
👉 [staging.visibuy.com.ng](https://staging.visibuy.com.ng/)

---

## **GitHub Actions (CI/CD)**
- **PRs to `staging` must pass:**
  - ✅ **Linting (`npm run lint`)**
  - ✅ **Unit Tests (`npm test`)**
  - ❌ Cannot merge if tests fail
- **Merging to `staging` auto-deploys the latest version via Vercel**.

---

## **Best Practices**
✔ **Always work on a feature branch, never directly on `staging`.**  
✔ **Always open a PR for code review before merging.**  
✔ **Always run tests locally before pushing code.**  
✔ **Pull the latest `staging` branch before merging to avoid conflicts.**  
✔ **Use descriptive commit messages (e.g., "Added checkout page validation").**  

---

## **Common Git Commands**
| **Action** | **Command** |
|------------|------------|
| Update local `staging` | `git checkout staging && git pull origin staging` |
| Create a new feature branch | `git checkout -b feature/{feature-name}` |
| Merge `staging` into your feature branch | `git checkout feature/{feature-name} && git merge staging` |
| Push feature branch | `git push origin feature/{feature-name}` |
| Merge feature into `staging` | `git checkout staging && git merge feature/{feature-name} && git push origin staging` |

---

### 🔥 **Need Help?**
If you run into any issues, ask in the **developer Slack channel** or check the **GitHub repo wiki**.

🚀 Happy coding!  
— **Visibuy Dev Team**
