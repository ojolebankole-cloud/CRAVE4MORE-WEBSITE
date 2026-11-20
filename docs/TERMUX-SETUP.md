# Apply the Crave4more website foundation in Termux

The ZIP is a **project-root overlay**. It contains app code and configuration only; it does not contain or replace the existing 3D source assets.

1. Open the existing repository and check for unfinished work:

   ```bash
   cd ~/CRAVE4MORE-WEBSITE
   git status --short
   ```

   Commit or safely stash any local changes before continuing. Do not discard unknown changes.

2. Update `main`, then create a separate implementation branch:

   ```bash
   git switch main
   git pull --ff-only origin main
   git switch -c build/v1-foundation
   ```

3. Extract the ZIP into the repository root (adjust the download path if Android saved it elsewhere):

   ```bash
   unzip -o ~/storage/downloads/Crave4more-website-foundation-v1.zip -d .
   ```

4. Install dependencies and run the checks:

   ```bash
   npm install
   npm run typecheck
   npm run build
   npm run dev -- --host 0.0.0.0
   ```

   Open the local URL printed by Vite in Chrome. The first install creates `package-lock.json`; keep it and commit it with the source.

5. After local tests pass, commit and push the feature branch:

   ```bash
   git status --short
   git add .
   git commit -m "Build Crave4more responsive website foundation"
   git push -u origin build/v1-foundation
   ```

The existing `public/assets/` originals remain untouched. Vite is configured to serve only `public-site/`, so the original 174 MB asset collection is not copied into `dist/`. Only approved, licensed and optimized derivatives should be added to `public-site/assets/`.
