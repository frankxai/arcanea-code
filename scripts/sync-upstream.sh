#!/usr/bin/env bash
set -euo pipefail

echo "=== Arcanea Code Upstream Sync ==="
echo ""

# Ensure upstream remote exists
if ! git remote | grep -q upstream; then
  echo "Adding upstream remote..."
  git remote add upstream https://github.com/anomalyco/opencode.git
fi

# Fetch latest
echo "Fetching upstream/dev..."
git fetch upstream dev

# Check divergence
BEHIND=$(git rev-list --count HEAD..upstream/dev)
AHEAD=$(git rev-list --count upstream/dev..HEAD)
echo ""
echo "Status: $BEHIND commits behind, $AHEAD commits ahead of upstream"
echo ""

if [ "$BEHIND" -eq 0 ]; then
  echo "Already up to date!"
  exit 0
fi

# Show what changed upstream
echo "=== Recent upstream changes ==="
git log --oneline upstream/dev -10
echo ""

# Check for conflicts
echo "=== Checking for conflicts ==="
MERGE_BASE=$(git merge-base HEAD upstream/dev)
CONFLICTS=$(git merge-tree $MERGE_BASE HEAD upstream/dev 2>/dev/null | grep -c "^<<<<" || true)

if [ "$CONFLICTS" -gt 0 ]; then
  echo "WARNING: $CONFLICTS potential merge conflicts detected"
  echo ""
  echo "Conflicting files:"
  git merge-tree $MERGE_BASE HEAD upstream/dev 2>/dev/null | grep "^<<<< " | sed 's/^<<<< /  /'
  echo ""
  echo "Recommended: Create a sync branch and resolve manually"
  echo "  git checkout -b sync/upstream-$(date +%Y%m%d)"
  echo "  git merge upstream/dev"
  echo "  # resolve conflicts"
  echo "  git commit"
else
  echo "No conflicts detected! Clean merge possible."
  echo ""
  read -p "Merge upstream/dev now? [y/N] " -n 1 -r
  echo
  if [[ $REPLY =~ ^[Yy]$ ]]; then
    git merge upstream/dev -m "chore: sync upstream opencode ($BEHIND commits)"
    echo "Merge complete!"
  fi
fi
