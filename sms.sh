curl --header 'Access-Token: o.CkwgbghQdKuxqT5bxubgavgiCYMFhbeN' \
     --header 'Content-Type: application/json' \
     --data-binary '{
  "push": {
    "conversation_iden": "'" $numero"'",
    "message": "'" $mensaje"'",
    "package_name": "com.pushbullet.android",
    "source_user_iden": "ujyCMTeShi0sjAxHBQF7XU",
    "target_device_iden": "ujyCMTeShi0sjAxHBQF7XU",
    "type": "messaging_extension_reply"
  },
  "type": "push"
}' \
     --request POST \
     https://api.pushbullet.com/v2/ephemerals
