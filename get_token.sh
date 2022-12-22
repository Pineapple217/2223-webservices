curl --request POST \
  --url 'https://dev-xqnrn82wslg2vgry.us.auth0.com/oauth/token' \
  --header 'content-type: application/x-www-form-urlencoded' \
  --data grant_type=password \
  --data 'username=jules.rosier@student.hogent.be' \
  --data 'password=Woorden123' \
  --data 'audience=https://f1-jules.rosier.be' \
  --data scope=read:sample \
  --data 'client_id=DATzG3p8AbdDOBvoKbN7Rmelensh9lMG' \
  --data 'client_secret=5TW2tCB9zBXuvn3PfYxKvsSjFBsgOLXVSrcsbfEMO0LMRa00bW9POGyxuf89aEAO'