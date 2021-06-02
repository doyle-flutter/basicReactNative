// *
// functions 에서 expo noti 로 보내기 위해서
// accessToken 생성 후 입력 필요(expo 홈페이지에서 생성 가능)

// --- 터미널 요약
// firebase login
// firebase init
// firebase deploy

// -- index.js --

const functions = require("firebase-functions");

exports.helloWorld = functions.https.onRequest((request, response) => {
  functions.logger.info("Hello logs!", {structuredData: true});
  response.json({name:'jamesdev'});
});

exports.expo = functions.https.onRequest(async (request, response) => {
    if(request.method != "POST") return response.json(false);
    const { Expo } = require('expo-server-sdk'),
    t = "",
    expo = new Expo({accessToken: t});
    const handlePushTokens = async (savedPushTokens) => {
        let notifications = [];
        for (let pushToken of savedPushTokens) {
          if (!Expo.isExpoPushToken(pushToken)) {
            console.error(`Push token ${pushToken} is not a valid Expo push token`);
            continue;
          }
      
          notifications.push({
            to: pushToken,
            sound: "default",
            title: "title",
            body: "body",
            data: { body: "body" }
          });
        }
      
        let chunks = expo.chunkPushNotifications(notifications);
      
        return (async () => {
          for (let chunk of chunks) {
            try {
              let receipts = await expo.sendPushNotificationsAsync(chunk);
              console.log(receipts);
            } catch (error) {
              console.error(error);
            }
          }
        })();
      };
    const {data, expoPushToken} = request.body,
      expoToken = expoPushToken.data;
    console.log(expoToken);
    await handlePushTokens([expoToken]);
    response.json(true);
  });
