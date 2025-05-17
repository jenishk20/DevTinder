# DevTinder APIs

## auth APIs

1. POST /login
2. POST /logout
3. POST /signup

## user Profile APIs

1. GET /user/profile
2. PATCH /user/profile
3. DELETE /user/profile
4. PATCH /user/profile/password

## connection Requests API

1. POST /request/send/interested/:profileID
2. POST /request/send/ignore/:profileID
3. POST /request/send/accept/:profileID
4. POST /request/send/reject/:profileID

## user Connections

1. GET /user/connections
2. GET /user/connections/:profileID
3. GET /user/feed
