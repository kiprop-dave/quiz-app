
#!/usr/bin/env sh

# abort on errors
set -e

# build
#npm run build

# navigate into the build output directory
#cd dist

# if you are deploying to a custom domain
# echo 'www.example.com' > CNAME

#git init
#git remote add origin https://github.com/kiprop-dave/quiz-app.git
git add -A
git commit -m 'added score feature'
#git branch -M development
git push -u origin development

#cd -
