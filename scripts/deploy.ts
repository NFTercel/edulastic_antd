require("dotenv").config();
import * as AWS from "aws-sdk";

AWS.config.update({
  accessKeyId: process.env.AWS_ACCESS_KEY_ID,
  secretAccessKey: process.env.AWS_SECRET_KEY
});
console.log("env", process.env.AWS_ACCESS_KEY_ID, process.env.AWS_SECRET_KEY);

const cloudfront = new AWS.CloudFront({ apiVersion: "2018-11-05" });

const getInfo = (id: string) =>
  new Promise((resolve, reject) => {
    cloudfront.getDistributionConfig({ Id: id }, (err, data) => {
      if (err) {
        reject(err);
      } else {
        resolve(data);
      }
    });
  });

const updateDist = (update: AWS.CloudFront.UpdateDistributionRequest) =>
  new Promise((resolve, reject) => {
    cloudfront.updateDistribution(update, (err, data) => {
      if (!err) {
        resolve(data);
      } else {
        reject(err);
      }
    });
  });

const waitForDeployment = (id: string) =>
  new Promise((resolve, reject) => {
    cloudfront.waitFor("distributionDeployed", { Id: id }, (err, data) => {
      if (!err) {
        resolve(data);
      } else {
        reject(err);
      }
    });
  });

const runUpdate = async (indexPath: string) => {
  const id = process.env.AWS_CLOUDFRONT_ID;
  let update = {} as AWS.CloudFront.UpdateDistributionRequest;
  let currentInfo: AWS.CloudFront.GetDistributionConfigResult = await getInfo(id);

  console.log("current data", currentInfo);
  update.IfMatch = currentInfo.ETag;
  update.Id = id;
  delete currentInfo.ETag;
  update.DistributionConfig = currentInfo.DistributionConfig;
  update.DistributionConfig.DefaultCacheBehavior.Compress = true;
  update.DistributionConfig.HttpVersion = "http2";
  update.DistributionConfig.DefaultRootObject = indexPath;
  update.DistributionConfig.CustomErrorResponses.Quantity = 2;
  update.DistributionConfig.CustomErrorResponses.Items = [
    {
      ErrorCode: 404,
      ResponsePagePath: `/${indexPath}`,
      ResponseCode: "200",
      ErrorCachingMinTTL: 60
    },
    {
      ErrorCode: 403,
      ResponsePagePath: `/${indexPath}`,
      ResponseCode: "200",
      ErrorCachingMinTTL: 60
    }
  ];

  console.log("updating data", update);
  const updateResponse = await updateDist(update);
  console.log("updateResponse", updateResponse);
  const deployedResult = await waitForDeployment(id);
  console.log("deployment done", "status", deployedResult);
};

runUpdate("index.html")
  .then(d => {
    console.log("info", d);
  })
  .catch(err => {
    console.log("error", err);
  });
