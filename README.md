# gatech-swapr-server-node
Node.js server for SWAPR

Our current model frontend lives in [gatech-swapr-client](https://github.gatech.edu/sdouglas6/gatech-swapr-client)

Our API lives on [apiary.io](http://docs.swaprapi.apiary.io/#)

## Installing node.js
On OS X, install Homebrew, then do
`brew install node`

## Installing the project dependencies
`npm install -d`

## Running the test suite
`npm test`

Note: Please go to company_practice_server/models/user.js to see an example of password hashing.

The username/password combos for the test students are as follows:

user_1, password1
user_2, password2
user_3, password3
user_5, password4

Hashes/salts are generated from https://www.bcrypt-generator.com. The bcrypt implementation uses only 10^8 iterations of the key derivation function (i.e., a "cost" of 08, as indicated by the $08 near the beginning of each salted hash). 10^12 is apparently best practice these days.