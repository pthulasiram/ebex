#!/bin/sh
# This is a comment!
rm -rf public
rm -rf /functions/dist
echo prod build started 
ng build --prod
echo ' ===================== executing  ng run ebooksden:server ====================='
ng run ebooksden:server
echo ' ===================== Preparing public folder to deploy in firebase hositng  ====================='
cp -a functions/dist/browser/. public/
mv public/index.html public/index2.html
echo ' ===================== Public folder created. Ready to deploy  ====================='
echo ' ===================== Initializing firebase deploy  ====================='
firebase deploy
echo ' ===================== Complete deployment  ====================='
