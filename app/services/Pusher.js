import Pusher from "pusher-js/react-native";
import { APP_KEY, APP_CLUSTER, APP_CHANNEL } from "@env";

Pusher.logToConsole = true;

var pusher = new Pusher(APP_KEY, {
  cluster: APP_CLUSTER,
});

var channel = pusher.subscribe(APP_CHANNEL);

export { pusher, channel };
