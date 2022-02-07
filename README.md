# second.exchange

## Dev Setup
For now since the repository is unstable we are dependent on some external git submodules particularly nostr-tools. This is going to change in near future. For now dev setup requires initiating git submodules

For macos and linux: Provided you have configured ssh and added the key to your github account, you have to open the terminal and execute following command
```
git submodule update --init --recursive
```
For windows:
ssh based submodules is bit involved in windows. You have to create a ssh key and add it to your github account, then open git bash navigate to the repo folder or open vscode in location with `code .` and start new git bash terminal and type following command
```
GIT_SSH_COMMAND="ssh -i ~/.ssh/<Your ssh private key>" git submodule update --init --recursive 
```
Once the submodule is added, navigate to the submodule folder and apply patch from the patches folder and do npm install
```
> cd src/external/nostr-tools/
> git apply ../patches/nostr-tools-modification-for-second-exchange.patch
> npm install
```
Now go back to the root folder and start with usual react workflow
```
> cd ../../../
> npm install
> npm run dev
```
This entire submodule stuff needs to be done only once. For the subsequent run just `npm install` and `npm run dev` should suffice

## The first exchange was not good ,this one is really good

Second exchange is an experimental social media service that lets anyone, anywhere in the world to create content. Second Exchange uses peer-to-peer technology to operate with no central authority, Second Exchange Core is the name of open source software which enables the use of this service.

1. Create a blog post/content or collections that is stored on client side only and is realyed using nostr.
2. Follow people and content 
3. Group content
4. Feature in future like adding tips , votes, and more in pipeline 

## Developer

We are looking for amazing front end developers who can contribute to this great way of sharing information and knowledge that points back to the users.


## UI

Works as usual , the code of UI @TODO please add dev docs here 


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

Coming soon







