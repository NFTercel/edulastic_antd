set -e

cd ~/edulastic-poc
yarn install
DESTINATION=~/poc_cdn_tmp yarn build
#uploading assets to cloudfront/s3 cdn with different public path and directory
aws s3 rm --recursive s3://edupoc

aws s3 sync ~/poc_cdn_tmp s3://edupoc
cp ~/poc_cdn_tmp/*.html ~/poc_dist/
cp -r ~/poc_cdn_tmp/docs ~/poc_dist/
