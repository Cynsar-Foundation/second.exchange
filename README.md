# second.exchange

## The first exchange was not good ,this one is really good

The purpose of this exchange is to have the work pushed as NFT from second.exchange , the flow is quite simple 

1. Create a blog post/content or collections that is stored on IPFS and is minted as the ERC721 contract.
2. The contract governs how the content is valued over time and expiration of the content.
3. Voting on the contract is recorded as signal(free) and value driven.

    a.) The value that is signalled can be amortized as growing or diminishing over time:
        How we do this, is subject to review.. 
        For now:

        - a single vote 
        - weighted vote (scalar value) by a participant
        - a formula that is based on the size of the group that allots the signal.
        - a formula that is based on the size of the value proposition that is determined.
        - a formula that is parametric (based on problem, perceived value, ecosystem vars... opens up a potential pandora's box, needs more reasoning..) 
    
    
5. Manage trail of changes if the digest MD changes and the content is counterfeit 



## Developer

We are looking for solidity and front end developers who can contribute to this great way of sharing information and knowledge that points back to the users.

The stack is based on Solidity, the structure of the contract is such: 

1. Base Contracts 
2. Interface contracts 
3. Implementor contracts 

## UI

Works as usual , the code of UI @TODO please add dev docs here 

You call implementor contracts that does most of the methods like mint() 

## Contribute back 

👋 Get started contributing with a good first issue

Before explaining how you can contribute, It's worth mentioning that we use develop branch as the default one. This makes it easier for us to have all the latest, development changes without affecting the current production version. Though, We don't use release branches to make the process a little bit easier !

Pushing to develop branch via PR deploys changes to testing environments(currently only rinkeby).
Pushing to master branch via PR from develop deploys changes to production servers(mainnet).
Pushing to master|develop directly will be restricted to make sure the PR's are reviewed.
Creating PRs end up in relation to develop by default.
Don't be shy to contribute even the smallest tweak. Everyone will be especially nice and helpful to beginners to help you get started!



## Security Audit 

The code in this repository has not been audited.


## Deployed Instance 







