# NFTWishlist

A practise project using typescript react+express & mongodb, the basic concept is a shortlist of NFTs that you can easily share and edit with your friends via unique link/code.

## Functionality

- Create lists
- Add NFTs to list
- Delete NFTs from list
- Lock lists with a password to only allow those with the password to modify the lists
- Delete lists if authed

## Notes

- only implemented for NFTs minted on ETH mainnet

# Considerations if it were a real project

- Add support across the major chains
- Add support more marketplaces/link formats besides OS
- Add more information like last price/offer data, etc.
- add metrics/propper logging
- optimize backend db calls during auth and pass around the list across controllers for less calls

# Local usage instructions

1. configure the .env args (sample.env contains the necessary args)
2. `npm install` in the root directory
3. run `npm run build` script in root directory
4. run `npm run start` script in root directory
