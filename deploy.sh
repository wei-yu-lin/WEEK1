set -e
pnpm run build
cd dist
git init
git add -A
git commit -m 'deploy'
git push -f https://github.com/wei-yu-lin/WEEK1.git master:gh-pages
cd -